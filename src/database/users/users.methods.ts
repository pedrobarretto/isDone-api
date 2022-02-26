import bcrypt from 'bcryptjs';

export async function handlePasswordHash(password: string) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}
