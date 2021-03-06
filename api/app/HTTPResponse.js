"use strict";

const STATUS_OK = 200;

const STATUS_MOVED_PERMANENTLY = 301;

const STATUS_MOVED_TEMPORARILY = 302;

const STATUS_BAD_REQUEST = 400;

const STATUS_UNAUTHORIZED = 401;

const STATUS_FORBIDDEN = 403;

const STATUS_NOT_FOUND = 404;

const STATUS_METHOD_NOT_ALLOWED = 405;

const STATUS_CONFLICT = 409;

const STATUS_INTERNAL_SERVER_ERROR = 500;

const STATUS_TOO_MANY_REQUESTS = 429;

module.exports = {
  STATUS_OK,
  STATUS_MOVED_PERMANENTLY,
  STATUS_MOVED_TEMPORARILY,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_METHOD_NOT_ALLOWED,
  STATUS_CONFLICT,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_TOO_MANY_REQUESTS
};
