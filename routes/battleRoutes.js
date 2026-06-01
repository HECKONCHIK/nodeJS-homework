import { Router } from "express";
import { battleService } from "../services/battleService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get('/history', (req, res, next) => {
  try {
    const battles = battleService.getAll();
    res.data = battles;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/history', (req, res, next) => {
  try {
    const newBattle = battleService.create(req.body);
    res.data = newBattle;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
