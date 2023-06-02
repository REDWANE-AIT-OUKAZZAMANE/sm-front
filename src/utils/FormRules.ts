import { Rule } from 'antd/lib/form';

import RegexPatterns from './RegexPatterns';

type Rules =
  | 'required'
  | 'allRequired'
  | 'email'
  | 'password'
  | 'wallTitle'
  | 'announcementTitle'
  | 'announcementDescription';

const FormRules = Object.freeze<{ [key in Rules]: (args?: any) => Rule }>({
  required: (message = 'This field is required') => ({
    required: true,
    message,
  }),
  allRequired: () => ({
    required: true,
    message: 'All fields are required',
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
  wallTitle: (message = 'Title must contain at least 5 characters') => ({
    pattern: RegexPatterns.wallTitle,
    message,
  }),
  announcementTitle: (
    message = 'Title must contain at least 5 characters, only alpha-numeric characters, dashes and aposthrophes are allowed'
  ) => ({
    pattern: RegexPatterns.announcementTitle,
    message,
  }),
  announcementDescription: (
    message = 'Description must contain a maximum of 200 characters'
  ) => ({
    max: 200,
    message,
  }),
});

export default FormRules;
