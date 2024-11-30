import { Router } from "express";
import userRouter from './userRouter';
import brandRouter from './brandRouter';
import categoryRouter from './categoryRouter';
import deviceRouter from './deviceRouter';
import storeRouter from './storeRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/store', storeRouter);
router.use('/category', categoryRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

export default router;