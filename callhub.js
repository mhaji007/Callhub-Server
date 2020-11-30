const twilio = require("twilio");

require("dotenv").config();

class Callhub {
  
  phoneNumber = process.env.PHONE_NUMBER;
  phoneNumberSid = process.env.PHONE_NUMBER_SID;
  tokenSid = process.env.TOKEN_SID;
  tokenSecret = process.env.TOKEN_SECRET;
  accountSid = process.env.ACCOUNT_SID;
  serviceId = process.env.SERVICE_SID;

  client;

  constructor() {
    this.client = twilio(this.tokenSid, this.tokenSecret, {
      accountSid: this.accountSid,
    });
  }
  getTwilio() {
    this.client
  }

  async sendVerify(to, channel) {
    const data = await this.client.verify.services(this.serviceId).verifications.create({
      to,
      channel
    });
    console.log('sendVerify', data)
    return data;
  }
}

const instance = new Callhub();
Object.freeze(instance);

module.exports = instance;
