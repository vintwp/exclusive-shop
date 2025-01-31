import { Router } from "express";
import { PromoController } from "../controllers";

const router = Router();

router.get('/banner', PromoController.banner_get);
router.get('/category', PromoController.category_get);
router.get('/new-arrival', PromoController.new_arrival_get);

export default router;