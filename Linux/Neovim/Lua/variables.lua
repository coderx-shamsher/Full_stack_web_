-- Variables with local in lua ! 
-- what is variables !? i now you know !! 

-- so this is variable 
-- a string value variable or string variable ! 
-- but also its a global variable in lua !!

name = "selena" -- global variable 

-- print() like python !! 
print("Her Name ->> ",name)
print(" >>-- this is print method -<<")
print()

-- local creates a variable limited to the current file or block.
-- so let see 

local variable = 334

print("local variable ",variable)


-- NOTE : Without local, the variable becomes global, which can cause conflicts in larger configs.

-- Lua’s basic types include strings, numbers, booleans, and nil.

--nil means “no value” or “nothing.”


-- let create differ variables 

-- string local 

local user = "Admin" 

local uid = 396

local sudo = true 

local errors = nil -- nill means nothing or null | no values

print() 
print("All lua Different Variables ->")
print("User => ",user)
print("Uid => ", uid)
print("Sudo => ", sudo) 
print("Errors =>", errors) 
print()


-- some string operations 

print(name .. " " .. "👋🏼" .. " " .. "Hello Girl")

-- Lua joins strings using .., not +. 

-- Strings can use double quotes or single quotes.

skill = 'backend' 

print("Skill ->",skill)


-- + is only for numeric addition.

print("10 + 30 => ",10 + 30) 





