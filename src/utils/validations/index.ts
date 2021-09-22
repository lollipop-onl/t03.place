import { Validate } from 'react-hook-form';

export const isPermalink: Validate<unknown> = (value) => {
  if (typeof value !== 'string') {
    return false;
  }

  return /^[^ /]+$/.test(value);
}
