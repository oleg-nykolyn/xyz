export class NullUtils {
  static mapToUndefinedIfAbsent<T>(value: T): T | undefined {
    return value == null ? undefined : value;
  }
}
