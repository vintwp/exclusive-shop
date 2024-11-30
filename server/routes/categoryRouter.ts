import { Router } from "express";
import { Role as PrismaUserRole } from "@prisma/client";
import { CategoryController } from "../controllers";
import CheckRoleMiddleware from "../middleware/RoleMiddleware";

const router = Router();

// router.post('/', CheckRoleMiddleware(PrismaUserRole.ADMIN), CategoryController.create);
router.post('/', CategoryController.create);
router.get('/', CategoryController.getAll);
router.put('/:id', CategoryController.update);
router.get('/:id', CategoryController.getById);
router.delete('/:id', CategoryController.delete);



export default router;