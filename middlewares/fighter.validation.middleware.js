import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const { id, health = 85, ...rest } = req.body;

  if (id) {
    return res.status(400).json({ error: true, message: "Id is not allowed" });
  }

  const requiredFields = Object.keys(FIGHTER).filter(key => key !== 'id' && key !== 'health');
  for (const field of requiredFields) {
    if (!rest[field]) {
      return res.status(400).json({ error: true, message: `Field ${field} is required` });
    }
  }

  const allowedFields = Object.keys(FIGHTER).filter(key => key !== 'id');
  const extraFields = Object.keys(rest).filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
  }

  const { power, defense } = rest;

  if (typeof power !== 'number' || power < 1 || power > 100) {
    return res.status(400).json({ error: true, message: "Power must be a number between 1 and 100" });
  }

  if (typeof defense !== 'number' || defense < 1 || defense > 10) {
    return res.status(400).json({ error: true, message: "Defense must be a number between 1 and 10" });
  }

  if (health < 80 || health > 120) {
    return res.status(400).json({ error: true, message: "Health must be a number between 80 and 120" });
  }

  req.body.health = health;
  next();
};

const updateFighterValid = (req, res, next) => {
  const { id, ...rest } = req.body;

  if (id) {
    return res.status(400).json({ error: true, message: "Id is not allowed" });
  }

  const allowedFields = Object.keys(FIGHTER).filter(key => key !== 'id');
  const extraFields = Object.keys(rest).filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
  }

  if (Object.keys(rest).length === 0) {
    return res.status(400).json({ error: true, message: "At least one field to update is required" });
  }

  const { power, defense, health } = rest;

  if (power && (typeof power !== 'number' || power < 1 || power > 100)) {
    return res.status(400).json({ error: true, message: "Power must be a number between 1 and 100" });
  }

  if (defense && (typeof defense !== 'number' || defense < 1 || defense > 10)) {
    return res.status(400).json({ error: true, message: "Defense must be a number between 1 and 10" });
  }

  if (health && (health < 80 || health > 120)) {
    return res.status(400).json({ error: true, message: "Health must be a number between 80 and 120" });
  }

  next();
};

export { createFighterValid, updateFighterValid };
