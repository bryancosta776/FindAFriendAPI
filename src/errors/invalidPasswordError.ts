export class InvalidPasswordError extends Error {
  constructor() {
    super("The password is incorrect");
  }
}
