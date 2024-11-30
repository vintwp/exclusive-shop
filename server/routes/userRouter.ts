import { Router } from "express";
import { UserController } from "../controllers";
import AuthMiddleware from "../middleware/AuthMiddleware";
import TokenMiddleware from "../middleware/TokenMiddleware";

const router = Router();

router.post('/signup', UserController.registration); // resitration with credentials
router.post('/signin', UserController.login); // login with credentials or OAuth | register user during first entering with OAuth 
router.get('/auth', TokenMiddleware, UserController.refreshToken); // generating accessToken with refresh token
router.get('/get-profile', TokenMiddleware, UserController.getProfile); // get user info
router.post('/update-profile', TokenMiddleware, UserController.updateProfile); // update user info
router.get('/get-all', AuthMiddleware, UserController.checkRole, UserController.getAll);



export default router;