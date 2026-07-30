import React from 'react'
import Users from './Users'
import Usercard from './Usercard'

const Usershow = () => {
  let users = [
    {id:1,name:"user1",email:"user1@gmail.com"},
    {id:2,name:"user2",email:"user2@gmail.com"},
    {id:3,name:"user3",email:"user3@gmail.com"},
    {id:4,name:"user4",email:"user4@gmail.com"},
    {id:5,name:"user5",email:"user5@gmail.com"},
    {id:6,name:"user6",email:"user6@gmail.com"},
    {id:7,name:"user7",email:"user7@gmail.com"},
    {id:8,name:"user8",email:"user8@gmail.com"},
    {id:9,name:"user9",email:"user9@gmail.com"},
    {id:10,name:"user10",email:"user10@gmail.com"},
  ]
    return (
    <>
      <main className="w-full h-full bg-gray-100 flex gap-10 flex-wrap pl-20 pt-10">

       {/* {
         users.map((user)=>(
            <Usercard key={user.id}  username={user.name} email={user.email} />
         ))
       } */}


    {/* using the ...object ham pura ka pura object as props send kr sakte hain or jis component mein send kra hai wahan destructuring kr k use kr sakte hain  */}
       {
         users.map((user)=>(
            <Usercard key={user.id} {...user} />
         ))
       }

        {/* <Usercard users={users} />    */}

      </main>
    </>
  )
}

export default Usershow