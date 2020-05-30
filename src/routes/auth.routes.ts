// Third
import { Router } from "express";

// Local
import AuthControllers from "../controllers/auth.ctrl";
import UserMiddlewares from "../middlewares/user.middlewares";
import AuthMiddlewares from "../middlewares/auth.middlewares";

import signUpValidator from "../services/validators/signup-validator";

// Initializations
const { redirectTo, getProtected } = AuthControllers;
const {
  grantUserSignUp,
  grantUserLogIn,
  requiresAuthorization,
} = AuthMiddlewares;
const { getValidationChain: signUpValidationChain } = signUpValidator;

class AuthRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post(
      "/signup",
      signUpValidationChain(),
      grantUserSignUp,
      redirectTo
    );

    this.router.post("/login", grantUserLogIn);
    this.router.get("/protected", requiresAuthorization, getProtected);
  }
}

const authRoutes = new AuthRoutes();

export default authRoutes.router;