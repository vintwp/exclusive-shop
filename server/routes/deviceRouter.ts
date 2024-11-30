import { Router } from "express";
import { Role as PrismaUserRole } from "@prisma/client";
import { DeviceController } from "../controllers";
import CheckRoleMiddleware from "../middleware/RoleMiddleware";

const router = Router();

router.post('/', CheckRoleMiddleware(PrismaUserRole.ADMIN), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getById);
router.delete('/:id', CheckRoleMiddleware(PrismaUserRole.ADMIN), DeviceController.delete);
router.post('/:id', CheckRoleMiddleware(PrismaUserRole.ADMIN), DeviceController.update);



export default router;