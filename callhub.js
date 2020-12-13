const twilio = require("twilio");
const VoiceResponse = require('twilio/lib/twiml/VoiceResponse');

require("dotenv").config();

class Callhub {
  phoneNumber = process.env.PHONE_NUMBER;
  phoneNumberSid = process.env.PHONE_NUMBER_SID;
  tokenSid = process.env.TOKEN_SID;
  tokenSecret = process.env.TOKEN_SECRET;
  accountSid = process.env.ACCOUNT_SID;
  serviceId = process.env.SERVICE_SID;
  outgoingApplicationSid = process.env.OUTGOING_APP_SID;

  client;

  constructor() {
    this.client = twilio(this.tokenSid, this.tokenSecret, {
      accountSid: this.accountSid,
    });
  }
  getTwilio() {
    this.client;
  }
  // Function for sending verification code sms
  async sendVerify(to, channel) {
    const data = await this.client.verify
      .services(this.serviceId)
      .verifications.create({
        to,
        channel,
      });
    console.log("sendVerify", data);
    return data;
  }
  // Function for verifying the verification code
  async verifyCode(to, code) {
    const data = await this.client.verify
      .services(this.serviceId)
      .verificationChecks.create({
        to,
        code,
      });
    console.log("verifyCode", data);
    return data;
  }

  voiceResponse(message) {
    const twiml = new VoiceResponse();
    twiml.say(
      {
        voice: "man",
        // loop: 2,
      },
      message
    );
    // twiml.enqueue
    // As soon as greeting message is offered
    // redirect to the enqueue endpoint where
    // enqueueCall is invoked
    twiml.redirect("https://mehdi-callhub.loca.lt/enqueue");
    return twiml;
  }
  // Function to enqueue call
  // called by the server
  enqueueCall(queueName) {
    const twiml = new VoiceResponse();
    twiml.enqueue(queueName);
    return twiml;
  }

    // identity is the person being granted access
    getAccessTokenForVoice = (identity) => {
    console.log(`Access token for ${identity}`);
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;
    const outgoingAppSid = this.outgoingApplicationSid;
    // instance of voice grant
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: outgoingAppSid,
      incomingAllow: true,
    });
    const token = new AccessToken(
      this.accountSid,
      this.tokenSid,
      this.tokenSecret,
      { identity }
    );
    token.addGrant(voiceGrant);
    console.log('Access granted with JWT', token.toJwt());
    return token.toJwt();
  };


}



const instance = new Callhub();
Object.freeze(instance);

module.exports = instance;
