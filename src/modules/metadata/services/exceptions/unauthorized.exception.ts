export class UnauthorizedException extends Error {
  constructor() {
    super('Unauthorized to perform this action');
  }
}
