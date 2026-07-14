const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { AppError } = require('../lib/errors');

function parseAuthToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice('Bearer '.length).trim();
}

function authRequired(req, res, next) {
  try {
    const token = parseAuthToken(req);
    if (!token) {
      throw new AppError('No token provided', 401);
    }

    req.user = jwt.verify(token, jwtConfig.secret);
    next();
  } catch (error) {
    next(error.isOperational ? error : new AppError('Token is invalid or expired', 401));
  }
}

function authOptional(req, res, next) {
  try {
    const token = parseAuthToken(req);
    if (!token) {
      return next();
    }

    req.user = jwt.verify(token, jwtConfig.secret);
    next();
  } catch (error) {
    next(new AppError('Token is invalid or expired', 401));
  }
}

module.exports = {
  authRequired,
  authOptional
};
