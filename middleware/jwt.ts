import * as jwt from 'jsonwebtoken'
require("dotenv").config();

interface JWT_Structure {
    id: Number,
    username: String
}

export function generateJWT(id: number, username: string): string {
    return jwt.sign({id: id , username: username}, process.env.JWT_TOKEN as string)
}

export function verifyJWT(token: string) {
    var decoded = jwt.verify(token, process.env.JWT_TOKEN as string);
    return decoded
}

export const authorization = (req: any, res: any, next: any) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(
      token,
      process.env.JWT_TOKEN as string
    ) as JWT_Structure;
    req.userId = data.id
    req.username = data.username
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

