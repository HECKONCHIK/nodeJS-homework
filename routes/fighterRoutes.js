import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const fighters = fighterService.getAll();
    res.data = fighters;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  try {
    const fighter = fighterService.search({ id: req.params.id });
    res.data = fighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  try {
    const newFighter = fighterService.create(req.body);
    res.data = newFighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch('/:id', updateFighterValid, (req, res, next) => {
  try {
    const updatedFighter = fighterService.update(req.params.id, req.body);
    res.data = updatedFighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    const deletedFighter = fighterService.delete(req.params.id);
    res.data = deletedFighter;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
