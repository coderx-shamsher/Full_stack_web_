
import pool from "../Db/Server/db.server.connection.js";
import { UpdateUser } from "./UpdateUser.query.js";

export function checkoutuser(previousUser, UpdateUserWith, res) {
  const { userId, email, password } = previousUser;

  const { new_email, message } = UpdateUserWith;

  console.log(userId);
  console.log(email);
  console.log(password);

  // ->> First checkout user exists or not
  pool.query(
    "select * from users where userId=? and email=?",
    [userId, email],
    (err, existingUser) => {
      if (err) {
        console.log("DB Error :", err);
      }
      // if user exists ->>
      if (existingUser.length >0) {
        console.log("User is Exists : \n", existingUser, "\n");

        // ->>second validate user
        pool.query(
          "select * from users where password=?",
          [password],
          (err, validate) => {
            if (err) {
              console.log("Db Error : \n", err, "\n");
            }
            if (validate.length > 0) {
              console.log("User is validated !! ", validate);

              // controller to update user details 
              UpdateUser(new_email, email, message, res);
            }
            if (!validate.length > 0) {
              return res.status(404).json({
                Message: "user Password is wrong !!",
              });
            }
          },
        );
      }

      // --->> IF User NOT Exists
      //  we cannot update anythink
      if (existingUser.length === 0 ) {
        return res.status(404).json({
          Message: "User is not exists we cannot update !!",
        });
      }

    },
  );
}
