import { Router } from "express";
import { ItemController } from "../controllers";

const router = Router();

// router.post('/', CheckRoleMiddleware(PrismaUserRole.ADMIN), StoreController.create);
router.get('/', ItemController.getAll);



export default router;