import User from '../models/user_model'
import { Request,Response } from 'express'
import { StatusCodes } from "http-status-codes";

/**
 * findUserByEmail
 * @param req html request
 * @param res html respond
 * @returns User
 */
export const findUserByEmail =async (req: Request, res: Response) => {
    console.log("getPostById id=" + req.params.id);
  const email = req.params.email;
  if (email == null || email == undefined) {
    return res.status(400).send({ err: "no email provided" });
  }

  try {
    const user = await User.findById(email);
    if (user == null) {
      res.status(400).send({
        err: "user doesnot exists",
      });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }
}



