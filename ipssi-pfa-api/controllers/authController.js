const User = require("../models/user");
const Auth = require("../models/auth");
const crypto = require("crypto");
const controller = {};
/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
controller.register = async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    throw Error("Missing fields");
  try {
    User.validateScheme(email, password);
    const user = new Auth(email, password);
    await user.register(firstname, lastname);

    res.json({ message: "User created" }).end();
  } catch (err) {
    if (err.message === "EmailAlreadyExists") {
      return res.status(403).end();
    } else {
      return res.status(400).end();
    }
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
controller.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw Error("Missing fields");
  try {
    User.validateScheme(email, password);
    const user = new Auth(email, password);
    const userData = await user.login();

    if (Boolean(userData)) {
      return res
        .status(200)
        .cookie("user_session", userData.user_id, {
          expires: new Date(Date.now() + 900000000000), //  expires: new Date(Date.now() + 900000), // 15 minutes
          httpOnly: true,
        })
        .end();
    } else {
      return res.status(401).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
controller.logout = async (req, res, next) => {
  try {
    res.clearCookie("user_session").end();
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
controller.checkCookie = async (req, res, next) => {
  try {
    if (req.cookies.user_session) {
      const user_id = req.cookies.user_session;

      const user = await User.getUserInfo(user_id);

      return res.json({ ...user.payload, max_storage: 20 }).end();
    } else {
      return res.status(401).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(401).end();
  }
};
module.exports = controller;
