import { ContactController } from '../controllers';
import { Router } from "express";

const router = Router();

router.get('/', ContactController.get);
router.post('/', ContactController.create);

export default router;