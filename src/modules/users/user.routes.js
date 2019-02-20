import { Router } from "express";
import validate from "express-validation";
import { authLocal } from "../../services/auth.services";
import * as userController from "./user.controller";
import userValidation from "./user.validations";

const routes = new Router();

routes.post("/signup", validate(userValidation.signup), userController.singUp);
routes.post("/login", authLocal, userController.logIn);

export default routes;
