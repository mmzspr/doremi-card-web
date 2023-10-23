export class InvalidKeyError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'InvalidKeyError';
    this.stack = (new Error() as any).stack;
  }
}

export class UnexpectedArgumentError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'UnexpectedArgumentError';
    this.stack = (new Error() as any).stack;
  }
}

export class UndefinedDomError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'UndefinedDomError';
    this.stack = (new Error() as any).stack;
  }
}
