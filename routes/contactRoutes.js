import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// POST /api/contact
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('message', 'Message must be at least 4 characters').isLength({ min: 4 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  submitContactForm
);

export default router;