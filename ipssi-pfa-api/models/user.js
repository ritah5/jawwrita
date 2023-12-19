const db = require("../services/aws/dynamo")("IpssiUsers");
const s3 = require("../services/aws/s3")("users-storage");
module.exports = class User {
  constructor(user_id, payload) {
    this.user_id = user_id;
    this.payload = payload;
  }

  async getOnLoggingInfo() {
    const infos = await s3.readDir(this.payload.email);
    return infos;
  }

  async putFiles(files) {
    const promises = files.map((file) => {
      return s3.putFile(
        `${this.payload.email}/${file.originalname}`,
        file.buffer
      );
    });
    return Promise.all(promises);
  }

  async downloadFile(filename) {
    const url = await s3.downloadFile(filename);
    return url;
  }

  async deleteFile(filename) {
    const url = await s3.deleteFile(filename);
    return url;
  }

  static validateScheme(email, password) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Za-z]).{8,}$/;

    if (!email.match(emailRegex) || !password.match(passwordRegex)) {
      throw Error("InvalidEmailOrPassword"); //"Invalid password. It must have at least one number, one alphabet character, and be at least 8 characters long";
    }

    return true;
  }

  static async checkIfExists(email) {
    const user = await db.query({
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    });

    return Boolean(user.Count);
  }

  static async getUserInfo(user_id) {
    if (!user_id) {
      return null;
    }
    const user = await db.get({
      Key: {
        user_id,
      },
      ProjectionExpression: "firstname, lastname, email",
    });

    return new User(user_id, user.Item);
  }
};
