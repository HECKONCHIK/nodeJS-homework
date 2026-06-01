import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const users = userService.getAll();
    res.data = users;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  try {
    const user = userService.search({ id: req.params.id });
    res.data = user;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
  try {
    const newUser = userService.create(req.body);
    res.data = newUser;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.patch('/:id', updateUserValid, (req, res, next) => {
  try {
    const updatedUser = userService.update(req.params.id, req.body);
    res.data = updatedUser;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    const deletedUser = userService.delete(req.params.id);
    res.data = deletedUser;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
