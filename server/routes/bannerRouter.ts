import { Router } from "express";
import { BannerController } from "../controllers";

const router = Router();

router.get('/', BannerController.get);

export default router;