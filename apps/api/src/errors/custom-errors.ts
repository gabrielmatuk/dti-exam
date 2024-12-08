class CustomError extends Error {
  status: number;

  code: string | undefined;

  error: object | string;

  constructor(status: number, error: object | string, code?: string) {
    super(error instanceof Object ? JSON.stringify(error) : error);
    this.code = code;
    this.status = status;
    this.error = error;
  }

  getStatus() {
    return this.status;
  }

  getError() {
    return this.error;
  }
}

export default CustomError;
