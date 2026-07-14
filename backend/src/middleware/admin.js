const { AppError } = require('../lib/errors');

module.exports = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Unauthorized', 401));
  }

  if (req.user.role !== 'ADMIN') {
    return next(new AppError('Access denied. Admin only.', 403));
  }

  return next();
};
