import bcrypt from "bcryptjs";

/**
 * Hashes a plain text password.
 * @param password User password.
 * @returns Hashed password.
 */
 const hashPassword = async (
  password: string
): Promise<string> => {
  return bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUNDS ?? 10)
  );
};

/**
 * Compares a plain password with a hashed password.
 *
 * @param password Plain password.
 * @param hashedPassword Stored hashed password.
 * @returns True if password matches.
 */
 const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

const password = {
    comparePassword,
    hashPassword
};

export default password;