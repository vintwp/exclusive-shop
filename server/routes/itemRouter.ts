import { Router } from "express";
import { ItemController } from "../controllers";

const router = Router();

// router.post('/', CheckRoleMiddleware(PrismaUserRole.ADMIN), StoreController.create);
router.get('/', ItemController.getAll);
router.get('/sales', ItemController.getFlashSales);
router.get('/best-selling', ItemController.getBestSelling);
router.get('/:id', ItemController.getById);



export default router;