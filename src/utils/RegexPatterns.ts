const RegexPatterns = Object.freeze({
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
});

export default RegexPatterns;
