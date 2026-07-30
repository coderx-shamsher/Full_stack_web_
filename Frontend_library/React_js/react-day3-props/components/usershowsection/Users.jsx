import React from 'react'
import Usercard from './Usercard';

const Users = (users) => {
    // console.log(users.users);    
  return (
    <>
      <div className="usercards  w-ful h-full bg-gray-100">
        
       {/* {users.users.map((user) =>(
          <Usercard username={user.name} email={user.email} />
       ))} */}
        
    
      </div>
        
    </>
  )
}

export default Users