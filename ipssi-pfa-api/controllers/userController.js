const User = require("../models/user");

const controller = {};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
controller.loadUserInfo = async (req, res, next) => {
  const user = await User.getUserInfo(req.cookies.user_session);

  if (!user) {
    return res.status(401).end();
  }

  try {
    const infos = await user.getOnLoggingInfo();
    return res.json(infos).end();
  } catch (err) {
    console.log(err);
    return res.status(401).end();
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
controller.putFile = async (req, res, next) => {
  const user = await User.getUserInfo(req.cookies.user_session);

  if (!user) {
    return res.status(401).end();
  }

  try {
    await user.putFiles(req.files);
    const newFilesData = await user.getOnLoggingInfo();
    return res.json(newFilesData).end();
  } catch (err) {
    console.log(err);
    return res.status(401).end();
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
controller.downloadFile = async (req, res, next) => {
  const user = await User.getUserInfo(req.cookies.user_session);

  if (!user) {
    return res.status(401).end();
  }

  try {
    const url = await user.downloadFile(req.body.filename);
    return res.json(url).end();
  } catch (err) {
    console.log(err);
    return res.status(401).end();
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
controller.deleteFile = async (req, res, next) => {
  const user = await User.getUserInfo(req.cookies.user_session);

  if (!user) {
    return res.status(401).end();
  }

  try {
    const url = await user.deleteFile(req.body.filename);
    return res.json(url).end();
  } catch (err) {
    console.log(err);
    return res.status(401).end();
  }
};
module.exports = controller;
