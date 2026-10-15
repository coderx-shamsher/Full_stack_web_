-- functions 

-- we dont use {} to declare function body 
local function hello()
  print("Hello its lua function")
end

-- end function with end keyword
-- local function creates a function stored in a local variable.
-- functioname() calls or runs the function.
--This function takes no input and returns nothing.

hello() -- calling function 

print() 

-- function with parameter  name is parameter 
local function greet(name)
  print("Welcome !" .. " " .. name )

end

-- passing argument (value of parameter) 
greet("asuna")
print()
greet("leo")

-- function with return value 

print() 

local function sum(a,b)
   return a + b 
end

local result = sum(22,10)
print("Total -> "  .. " " .. result)


local function null()
end

print(null)
print(null()) -- nill prints nothing !! 


-- function that return multiple values 
local function user()
  return "alex", 20, "b.c.a"

end

-- assigning multiple values to differ variables 
local name, age, course = user() 

print(name)
print(age)
print(course) 


-- default parameter values

local function welcome(name)
  name = name or "Guest"

  print("hello" .. " " .. name)

end

print()
welcome()
welcome("miya")

