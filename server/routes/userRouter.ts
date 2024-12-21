import { Router } from "express";
import { UserController } from "../controllers";
import AuthMiddleware from "../middleware/AuthMiddleware";
import TokenMiddleware from "../middleware/TokenMiddleware";

const router = Router();

router.post('/signup', UserController.registration); // resitration with credentials
router.post('/signin', UserController.login); // login with credentials or OAuth | register user during first entering with OAuth 
router.get('/auth', TokenMiddleware, UserController.refreshToken); // generating accessToken with refresh token
router.get('/:id', TokenMiddleware, UserController.getProfile); // get user info
router.post('/:id', TokenMiddleware, UserController.updateProfile); // update user info
router.get('/', AuthMiddleware, UserController.checkRole, UserController.getAll) // get all users;



export default router;