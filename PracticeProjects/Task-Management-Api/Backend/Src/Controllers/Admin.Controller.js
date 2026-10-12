import { AdminDashBoard } from "../Controllers/AdminDashboard.Controller.js";
import pool from "../Database/Config/mysql.pool.js";

export const AdminRouteController = async (req, res, next) => {
  const { userId, role } = req.body;

  console.log("\n------------<Requst Start >------------\n");

  console.log("\nAdmin Request data -<", req.body, ">- \n");

  console.log("\nToken Data -<", req.User, ">- \n");

  console.log("\n------------<Requst End >------------\n");

  if (!role) {
    return res.status(403).json({
      Success: false,
      Message: "User Role not found",
    });
  }

  if (!role === "admin") {
    return res.status(403).json({
      Success: false,
      Message:
        "You are not authorized to perform this action (only for admins)",
    });
  }

  // returning the res  with dashboard ....>
  if (req.User.userId === userId) {
    try {
      const [user] = await pool.query(`select * from users where userId = ?`, [
        userId,
      ]);

      if (user.length > 0) {
        console.log("\n-----------<Start of Db Query Result>------------\n");
        console.log("\n User Founed !! --> \n");
        console.log(user[0]);
        console.log("\n-----------<End of Db Query Result>------------\n");

        // if user founded with userid then we give his dashboard !!
        AdminDashBoard(userId, user[0].username, role, res);
      }

      if (!user.length > 0) {
        console.log("\n-----------<Start of Db Query Result>------------\n");
        console.log("\n User not Founed !! (userId was Wrong !!)\n");
        console.log(user);
        console.log("\n-----------<End of Db Query Result>------------\n");
        return res.status(404).json({
          Message: "User Not Found",
          Success: false,
        });
      }
    } catch (error) {
      error.context = {
        controller: "Admin.Controller.js",
        file: "Admin.Controller.js",
        function: "query Inside inside this file ",
        operation: "Admin User Fetch Failed !! ",
        layer: "Database Query",
      };
      next(error);
    }
  } else {
    return res.status(404).json({
      Success: false,
      Message: "UserID is not Macthed with Token Signature !! (Invalid id )",
    });
  }
};
