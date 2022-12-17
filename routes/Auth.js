import express from 'express';
const router = express.Router();
import { getData, userSignUp, userSignup } from '../controllers/userController.js';

// user Sign Up
router.post('/signup', userSignup)

//user Sign In
router.post('/signin', userSignUp)

//get datas for table
router.get("/usersData",getData)

export default router