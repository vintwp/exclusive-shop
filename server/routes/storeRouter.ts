import { Router } from "express";
import { Role as PrismaUserRole } from "@prisma/client";
import { StoreController } from "../controllers";
import CheckRoleMiddleware from "../middleware/RoleMiddleware";

const router = Router();

// router.post('/', CheckRoleMiddleware(PrismaUserRole.ADMIN), StoreController.create);
router.post('/', StoreController.create);
router.get('/', StoreController.get);
router.put('/:id', StoreController.update);
router.delete('/:id', StoreController.delete);



export default router;