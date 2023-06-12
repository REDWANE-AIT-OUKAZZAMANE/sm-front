const RegexPatterns = Object.freeze({
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  wallTitle: /^[\s\S]{5,}$/,
  announcementTitle: /^[a-zA-Z0-9' -]{5,}$/,
});

export default RegexPatterns;
