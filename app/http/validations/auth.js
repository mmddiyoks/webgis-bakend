const { body } = require("express-validator");
function registerValidator() {
  return [
    body("username")
      .notEmpty()
      .isLength({ min: 4, max: 30 })
      .withMessage(
        "username characters most between 4 and 30 character and not be empty !"
      ),

    body("name")
      .notEmpty()
      .isLength({ min: 4, max: 60 })
      .withMessage(
        "Name characters most between 4 and 60 character and not be empty !"
      ),
    body("password")
      .notEmpty()
      .isLength({ min: 6, max: 16 })
      .withMessage("Password most between 6 and 16 characters !"),
  ];
}

module.exports = { registerValidator };
