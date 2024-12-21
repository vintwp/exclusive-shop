import SearchController from "../controllers/SearchController";
import { Router } from "express";

const router = Router();

router.get('/', SearchController.search);

export default router;