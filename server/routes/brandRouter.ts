import { Router } from "express";
import { Role as PrismaUserRole } from "@prisma/client";
import { BrandController } from "../controllers";
import CheckRoleMiddleware from "../middleware/RoleMiddleware";

const router = Router();

router.post('/',  CheckRoleMiddleware(PrismaUserRole.ADMIN), BrandController.create);
router.get('/', BrandController.getAll);
router.put('/:id', CheckRoleMiddleware(PrismaUserRole.ADMIN), BrandController.update);
router.get('/:id', BrandController.getById);
router.delete('/:id', CheckRoleMiddleware(PrismaUserRole.ADMIN), BrandController.delete);
router.post('/create-many', CheckRoleMiddleware(PrismaUserRole.ADMIN), BrandController.createMany);

export default router;