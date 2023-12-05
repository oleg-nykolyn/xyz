import { NullUtils } from './null.utils';

export class StringUtils {
  static capitalize(str): string {
    if (NullUtils.isAbsent(str)) {
      return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
