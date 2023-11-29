export abstract class JwtService {
  abstract isTokenValid(token: string): boolean;
  abstract issueToken(subject: string): string;
}
