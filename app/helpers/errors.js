const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.BAD_REQUEST = 'badRequest';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);

exports.UNAUTHORIZED = 'unauthorized';
exports.unauthorized = message => internalError(message, exports.UNAUTHORIZED);

exports.NOT_FOUND = 'notFound';
exports.notFound = message => internalError(message, exports.NOT_FOUND);

exports.CONFLICT_SERVER = 'conflict';
exports.conflictServer = message => internalError(message, exports.CONFLICT_SERVER);

exports.DATABASE_ERROR = 'databaseError';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'defaultError';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);
