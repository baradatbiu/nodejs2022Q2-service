export enum ERRORS {
  FORBIDDEN = 'The entered password does not match the existing one',
  NOT_FOUND = 'The entity by this identifier does not exist',
  ALREADY_EXIST = 'The passed identifier already exists',
  AUTH_FAILED_LOGIN = 'Authentication failed: user with this login does not exist',
  AUTH_FAILED_PASSWORD = 'Authentication failed: the password does not match the real one',
  REFRESH_TOKEN_FAILED = 'refreshToken should not be empty',
  REFRESH_TOKEN_INVALID = 'Refresh token is invalid or expired',
}
