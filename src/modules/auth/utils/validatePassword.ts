export type PasswordValidation = {
  mayus: boolean;
  minus: boolean;
  length: boolean;
  specialChars: boolean;
};

export const validatePassword = (password: string): PasswordValidation => {
  let mayus = false;
  let minus = false;
  let length = false;
  let specialChars = false;

  if (password.length >= 8) {
    length = true;
  }

  // Al menos una letra mayúscula
  if (/[A-Z]/.test(password)) {
    mayus = true;
  }

  // Al menos una letra minúscula
  if (/[a-z]/.test(password)) {
    minus = true;
  }

  // Al menos un carácter especial
  if (/[!@#$%^&*()_+{}\\[\]:;<>,.?~\\-]/.test(password)) {
    specialChars = true;
  }

  return { mayus, minus, length, specialChars };
};
