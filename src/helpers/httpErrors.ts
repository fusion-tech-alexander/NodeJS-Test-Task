import { StatusCodes } from 'http-status-codes';

class HttpErrors extends Error {
  data: any;
  code: any;

  constructor(code, msg) {
    super(msg);
    this.data = msg;
    this.code = code;
  }

  static withCode(code) {
    return (msg) => new HttpErrors(code, msg);
  }

  static unprocessableEntity(msg) {
    return new HttpErrors(StatusCodes.UNPROCESSABLE_ENTITY, msg);
  }

  static badRequest(msg) {
    return new HttpErrors(StatusCodes.BAD_REQUEST, msg);
  }

  static notFound(msg) {
    return new HttpErrors(StatusCodes.NOT_FOUND, msg);
  }

  static forbidden(msg) {
    return new HttpErrors(StatusCodes.FORBIDDEN, msg);
  }

  static unauthorized(msg) {
    return new HttpErrors(StatusCodes.UNAUTHORIZED, msg);
  }

  static noContent(msg) {
    return new HttpErrors(StatusCodes.NO_CONTENT, msg);
  }
}

export default HttpErrors;
