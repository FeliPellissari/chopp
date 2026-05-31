import { ApiError } from "../middlewares/error";

export class InvalidCredentialsError extends Error implements ApiError {
  statusCode = 401;
  code = "INVALID_CREDENTIALS";

  constructor(message = "Invalid email or password") {
    super(message);
    this.name = "InvalidCredentialsError";
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}

export class InactiveUserError extends Error implements ApiError {
  statusCode = 401;
  code = "INACTIVE_USER";

  constructor(message = "User account is inactive") {
    super(message);
    this.name = "InactiveUserError";
    Object.setPrototypeOf(this, InactiveUserError.prototype);
  }
}

export class InvalidTokenError extends Error implements ApiError {
  statusCode = 401;
  code = "INVALID_TOKEN";

  constructor(message = "Invalid or expired token") {
    super(message);
    this.name = "InvalidTokenError";
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
}

export class TokenRevokedError extends Error implements ApiError {
  statusCode = 401;
  code = "TOKEN_REVOKED";

  constructor(message = "Token has been revoked") {
    super(message);
    this.name = "TokenRevokedError";
    Object.setPrototypeOf(this, TokenRevokedError.prototype);
  }
}
