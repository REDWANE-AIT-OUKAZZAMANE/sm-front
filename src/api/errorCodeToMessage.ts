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
    case 13:
      return 'Announcement date range overlaps with existing announcements';
    case 14:
      return "We can't pin a hidden post";

    default:
      return 'Unknown error occured';
  }
}
