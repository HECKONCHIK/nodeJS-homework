import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  const { id, ...rest } = req.body;

  if (id) {
    return res.status(400).json({ error: true, message: "Id is not allowed" });
  }

  const requiredFields = Object.keys(USER).filter(key => key !== 'id');
  for (const field of requiredFields) {
    if (!rest[field]) {
      return res.status(400).json({ error: true, message: `Field ${field} is required` });
    }
  }

  const extraFields = Object.keys(rest).filter(key => !Object.keys(USER).includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
  }

  const { email, phone, password } = rest;

  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: true, message: "Invalid email format, should be like *@gmail.com" });
  }

  if (!/^\+380\d{9}$/.test(phone)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format, should be +380xxxxxxxxx" });
  }

  if (password.length < 3) {
    return res.status(400).json({ error: true, message: "Password must be at least 3 characters long" });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const { id, ...rest } = req.body;

  if (id) {
    return res.status(400).json({ error: true, message: "Id is not allowed" });
  }

  const allowedFields = Object.keys(USER).filter(key => key !== 'id');
  const extraFields = Object.keys(rest).filter(key => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({ error: true, message: `Extra fields are not allowed: ${extraFields.join(', ')}` });
  }

  if (Object.keys(rest).length === 0) {
    return res.status(400).json({ error: true, message: "At least one field to update is required" });
  }

  const { email, phone, password } = rest;

  if (email && !email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: true, message: "Invalid email format, should be like *@gmail.com" });
  }

  if (phone && !/^\+380\d{9}$/.test(phone)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format, should be +380xxxxxxxxx" });
  }

  if (password && password.length < 3) {
    return res.status(400).json({ error: true, message: "Password must be at least 3 characters long" });
  }

  next();
};

export { createUserValid, updateUserValid };
