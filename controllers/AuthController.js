import jwt from 'jsonwebtoken';

import userModel from '../Models/userModel.js';

const secretKey = process.env.secretKey;
const AuthController = {

  register: async (req, res) => {
    const { UserName, Password } = req.body;
    try {
      if (await (await userModel.find({ username: UserName })).length > 0) {
        console.log("user exist")
        throw ({ message: "a user already exist " })
      }
      const newUser = await userModel.create({ username: UserName, password: Password });
      const token = jwt.sign({ id: newUser.id, username: newUser.username }, secretKey);
      res.json({ token });
    }
    catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  login: async (req, res) => {
    const { UserName, Password } = req.body;
    try {
      const [user] = await userModel.find({ username: UserName, password: Password })
      console.log({ id: user._id, username: user.username })
      const token = jwt.sign({ id: user.id, username: user.username }, secretKey);
      res.json({ token })
    }
    catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  auth: (req, res, next) => {
    try {
      const token = req.headers.authorization.slice("Bearer ".length)
      const decoded = jwt.verify(token, secretKey);
      req.body.user = decoded;
      console.log(req.body.user);
      next();
    }
    catch {
      res.status(401).send("login");
    }
  }
}
export default AuthController