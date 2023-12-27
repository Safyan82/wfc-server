import bcrypt from "bcrypt";

export const VerifyPasswordMiddleware = async ({ args }, next) => {
  // Check if the mutation involves updating or creating a user
  if (args.input && args.input.password) {
    const hashedPassword = await bcrypt.hash(args.input.password, 10); // You can adjust the salt rounds as needed

    // Replace the plain text password with the hashed one
    args.input.password = hashedPassword;
  }

  return next();
};

