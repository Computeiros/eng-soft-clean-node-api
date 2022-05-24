export class InternalServerError extends Error {
  constructor(stack: string | undefined, message) {
    super('Internal server error');
    this.name = 'ServerError';
    this.stack = stack;
    this.message = message;
  }
}
