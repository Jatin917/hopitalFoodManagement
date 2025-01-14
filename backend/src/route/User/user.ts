import express from 'express'
import { getAllUser, userSignIn, userSignUp, tokenAuth } from '../../controller/User/userController.js';

const userRouter = express.Router();
userRouter.post('/signup', userSignUp);
userRouter.post('/signin', userSignIn);
userRouter.get("/getAllUser", getAllUser);
userRouter.post('/tokenAuth', tokenAuth);

export default userRouter