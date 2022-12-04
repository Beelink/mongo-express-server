// utils
import bcrypt from "bcrypt";

export const hashPassword = (plainPassword: string): string => {
  const hash = bcrypt.hashSync(plainPassword, 10);
  return hash;
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
): boolean => {
  const compared = bcrypt.compareSync(plainPassword, hashedPassword);
  return compared;
};
