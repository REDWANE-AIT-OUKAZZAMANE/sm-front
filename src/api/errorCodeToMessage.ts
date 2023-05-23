export function errorCodeToMessage(code: number | undefined): string {
  switch (code) {
    case 5:
      return 'Your account is inactive. Please contact an administrator';
    case 7:
      return 'Oops! User not found';
    case 8:
      return 'Constraints violation';
    case 10:
      return 'Your email/password are incorrect. Try again.';

    default:
      return 'Unknown error occured';
  }
}
