import { body, validationResult } from "express-validator";

export const validateUserProfile = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("bio").optional().isString().withMessage("Bio must be a string"),
  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),
  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Using espress-validator to validate user profile fields
