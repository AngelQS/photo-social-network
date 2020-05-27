// Third
import { Request, Response, NextFunction } from "express";

export default class AuthControllers {
  static redirectTo(req: Request, res: Response, next: NextFunction): void {
    new Promise(async (resolve, reject) => {
      // Error if redirectTo is null
      if (!res.locals.redirectTo) {
        return reject(
          new Error(
            "Unable to get res.locals.redirectTo on IndexController.redirectTo"
          )
        );
      }

      const redirectTo = res.locals.redirectTo;

      return resolve(redirectTo);
    }).then((redirectPath) => {
      return res.redirect(`${redirectPath}`);
    });
  }

  static getProtected(req: Request, res: Response, next: NextFunction): void {
    new Promise(async (resolve, reject) => {
      res.json({ message: "Has entrado en la ruta protegida" });
    });
  }
}
