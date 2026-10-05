
export function AdminDashBoard(userId,username,role,res){
    return res.status(200).json({
        Success : false,
        Message : `Welcome to Admin Dashboard !  UserName<${username}> | Role<${role}> | AdminId=<${userId}> | `
    })
}