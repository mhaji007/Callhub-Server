const twilio = require("twilio");

require("dotenv").config();

class Callhub {
  phoneNumber = process.env.PHONE_NUMBER;
  phoneNumberSid = process.env.PHONE_NUMBER_SID;
  tokenSid = process.env.TOKEN_SID;
  tokenSecret = process.env.TOKEN_SECRET;
  accountSid = process.env.ACCOUNT_SID;
  serviceId = process.env.SERVICE_SID;

  constructor() {
    this.client = twilio(this.tokenSid, this.tokenSecret, {
      accountSid: this.accountSid,
    });
  }
  getTwilio() {
    this.client
  }
}

const instance = new Callhub();
Object.freeze(instance);

module.exports = instance;
