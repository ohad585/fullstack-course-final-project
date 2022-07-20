import UserModel from '../models/user_model'
import { Request,Response } from 'express'
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'
import { use } from '../routes/post_routes';


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
    const user = await UserModel.findById(email);
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



/**
 * EditUser
 * @param req html request
 * @param res html respond
 * @returns User
 */
 export const editUser =async (req: Request, res: Response) => {
  const oldEmail = req.params.oldEmail;
  const newEmail = req.params.newEmail;
  const password = req.params.passowrd
  const imageUri = req.params.imageUri

  console.log("edditing user " + req.params.id);
if (oldEmail == null || oldEmail == undefined) {
  return res.status(400).send({ err: "no email provided" });
}

try {
  const user = await UserModel.findById(oldEmail);
  if (user == null) {
    res.status(400).send({
      err: "user doesnot exists",
    });
  } else {
    user.email=newEmail
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    user.passowrd=encryptedPassword
    user.imageUri=imageUri
    const newUser = await user.save() 
    res.status(200).send({
      _id:newUser._id
    });
  }
} catch (err) {
  res.status(400).send({
    err: err.message,
  });
}
}





