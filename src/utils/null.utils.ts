export class NullUtils {
  static mapToUndefinedIfAbsent(value) {
    return NullUtils.isAbsent(value) ? undefined : value;
  }

  static isAbsent(value): boolean {
    return value == null;
  }

  static valueOrDefault(value, defaultValue) {
    return NullUtils.isAbsent(value) ? defaultValue : value;
  }
}
