export class NullUtils {
  static mapToUndefinedIfAbsent<T>(value: T): T | undefined {
    // == is used to check for both null and undefined
    return value == null ? undefined : value;
  }
}
