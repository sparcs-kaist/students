export class JwtException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JwtException";
  }
}
