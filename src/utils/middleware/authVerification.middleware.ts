import jwt from 'jsonwebtoken';

export const authCheckerMiddleware =  async({ context }, next) => {
  const token = context?.req?.headers?.authorization?.split(" ")[1]; // Extract the token from the cookie (you may use other methods like headers)
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.PRIVATEKEY); // Verify and decode the token
      context.user = decoded; // Attach the decoded user information to the context
    
    } catch (err) {
      console.log (err?.message);
      throw new Error('Authorization is required.');
    }
  }else{
    throw new Error('Authorization is required.');
  }
  return next();
};
