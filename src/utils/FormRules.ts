import { Rule } from 'antd/lib/form';

import RegexPatterns from './RegexPatterns';

type Rules = 'required' | 'email' | 'password';

const FormRules = Object.freeze<{ [key in Rules]: (args?: any) => Rule }>({
  required: (message = 'This field is required') => ({
    required: true,
    message,
  }),
  email: (message = 'Please enter a valid email address!') => ({
    pattern: RegexPatterns.email,
    message,
  }),
  password: (
    message = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
  ) => ({
    pattern: RegexPatterns.password,
    message,
  }),
});

export default FormRules;
