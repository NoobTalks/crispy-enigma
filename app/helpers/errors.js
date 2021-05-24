const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.BAD_REQUEST = 'invalid_data';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.ACCESS_DENIED = 'unauthorized';
exports.accessDenied = message => internalError(message, exports.ACCESS_DENIED);

exports.CONFLICT_SERVER = 'conflict';
exports.conflictServer = message => internalError(message, exports.CONFLICT_SERVER);

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);
