#!/usr/bin/env lua 


-- if you know python or any language its easy to lean the syntax of lua conditions and operators are same here !?? let see 
print(" -->> Conditions && Operators In lua    <<---")


-- lua mein bhi if , if else, if esleif etc hain so lets gooo !! 


-- if syntax  -->> 
-- with == equal to opr !
if 10 == 10 then
  print("10 is equal !!")
end

-- so es mein ham () use nhi krte if esleif mein ! , then, or end ka use krte hain end for ending the if block !! 
print() 


username = 'x09'
role = 'user'

-- ~=  -> Not Equal to sign ! in lua 
--
-- Both conditions true --> and  its logical opr !! 

if username == 'x09' and role == 'user'
  then
     print("This is User ->>",username,"Welcome In Lua !!")
end


print() 


user1 = 'bob'

-- overwrite values of vairable 
user1 = 'miya'
role = 'admin'
if user1 == 'bob' and  role == 'user'
  then
     print("welcome " .. " " .. bob)
elseif user1 == 'miya' and role == 'admin'
  then
    print("welcome" .. " " .. user1)
end

print() 

error = false 
if role == "admin" and not error 
  then
     print("true")
end

