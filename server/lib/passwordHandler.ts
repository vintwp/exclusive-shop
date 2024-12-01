import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 5);
  return hashedPassword;
}

export async function comparePassword(inputPassword: string, hashedPassword: string) {
  const isTruePassword = await bcrypt.compare(inputPassword, hashedPassword);

  return isTruePassword;
}