-- tables in lua Like objects in javascript 


local user = {
   username = "test",
   role = "backend",
   age = 20,
   is_admin = false,
}

-- ham = ka use krte hai key ko value assign krne k liye 
-- just like objects it also a key-value pair ! 

-- user.name and user["name"] do the same thing.
print() 
print("Username :",user.username)
print("Role     :",user["role"])
print("Admin    :",user.is_admin)

-- This format is used heavily in plugin configuration.

-- nested table mostly used in lua 

local devop = {
    username = "martha",
    role = "devop",
   
    skills = {
        languages = {"javascript","python","bash","lua"},   
    },
   
} 

print() 
print("Devop ->>") 
print(" Username : ",devop.username)
print("Role : ",devop.role)
print("Skills :",devop.skills.languages[1])


-- skils using for loop => 
for i,items in ipairs(devop.skills.languages) do
  print(i,items)

end
        
        

--- loop on table
print()
print("User Detail ->")

for key,value in pairs(user)
  do
    print(key.." -> ",value)
end

