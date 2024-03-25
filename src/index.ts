import {onRequest} from "firebase-functions/v2/https";
import Joi = require("joi");

type User = {
  firstName: string;
  lastName: string;
  email: string;
}

const userSchema = Joi.object<User>({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
});

export const createUser = onRequest((req, res) => {
  const result = userSchema.validate(req.body);

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

  // The `user` object is guaranteed to be of type User at this stage
  const user = result.value;

  res.status(200).json({
    fullName: `${user.firstName} ${user.lastName ?? ""}`.trim(),
  });
})
