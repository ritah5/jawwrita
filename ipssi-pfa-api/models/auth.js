const User = require("./user");

const db = require("../services/aws/dynamo")("IpssiUsers");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
module.exports = class Auth {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.salt = "$2a$10$xaoxkPnn8lRqZDqET6NAOu";
  }

  async register(firstname, lastname) {
    if (!this.email || !this.password) {
      throw Error("MissingEmailOrPassword");
    }
    const exists = await User.checkIfExists(this.email);

    if (exists) {
      throw Error("EmailAlreadyExists");
    }
    const hashedPassword = await bcrypt.hash(this.password, this.salt);

    await db.put({
      Item: {
        user_id: crypto.randomUUID(),
        email: this.email,
        password: hashedPassword,
        firstname,
        lastname,
      },
    });
    return;
  }

  async login() {
    if (!this.email || !this.password) {
      throw Error("MissingEmailOrPassword");
    }

    const user = await db.query({
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": this.email,
      },
    });

    if (!user.Count) {
      throw Error("UserNotFound");
    }

    const hashedPassword = user.Items[0].password;
    const match = await bcrypt.compare(this.password, hashedPassword);

    if (!match) {
      throw Error("InvalidPassword");
    }
    return user.Items[0];
  }
};
