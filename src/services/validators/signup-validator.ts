// Third
import { body, ValidationError } from "express-validator";

class SignUpValidator {
  public getValidationChain() {
    return [
      body(["firstname", "lastname"])
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Names are required files")
        .isString()
        .withMessage("Names fields only must contain alphabetic characters")
        .trim()
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage("Names fields must not be empty")
        .isLength({ min: 2 })
        .withMessage("Names fields must be at least 2 characters")
        .isLength({ max: 50 })
        .withMessage("Names fields must be at max 30 characters"),

      body("username")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Username is a required field")
        .isAlphanumeric("sr-RS@latin")
        .withMessage("Username field only must contain alphanumeric characters")
        .trim()
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage("Username field must not be empty")
        .isLength({ min: 2 })
        .withMessage("Username field must be at least 2 characters")
        .isLength({ max: 30 })
        .withMessage("Username field must be at max 30 characters"),

      body("email")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Email is a required field")
        .isString()
        .withMessage("Email field only must contain alphabetic characters")
        .trim()
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage("Email field must not be empty")
        .isEmail()
        .withMessage("Email entered is invalid"),

      body("password")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Password is a required field")
        .isAlphanumeric("sr-RS@latin")
        .withMessage("Password field only must contain alphanumeric characters")
        .trim()
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage("Password field must be not empty")
        .isLength({ min: 8 })
        .withMessage("Password field must be at least 8 characters")
        .isLength({ max: 72 })
        .withMessage("Password field must be at max 30 characters")
        .matches(/\d{1,}/)
        .withMessage("Password field must contain at least 1 number")
        .matches(/([a-z]){1,}/)
        .withMessage(
          "Password field must contain at least 1 lowercase alphabetic character"
        )
        .matches(/([A-Z]){1,}/)
        .withMessage(
          "Password field must contain at least 1 uppercase alphabetic character"
        ),
    ];
  }

  public getErrorFormater() {
    return function (error: ValidationError) {
      return {
        type: "ValidationError",
        name: "Signup failure",
        location: error.location,
        message: error.msg,
        param: error.param,
        value: error.value,
        nestedErrors: error.nestedErrors,
        context: "none",
      };
    };
  }
}

const signUpValidator = new SignUpValidator();

export default signUpValidator;