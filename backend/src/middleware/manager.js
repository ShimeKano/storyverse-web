const { AppError } = require('../lib/errors');

module.exports = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Unauthorized', 401));
  }

  if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
    return next(new AppError('Access denied. Manager/Admin only.', 403));
  }

  return next();
};
