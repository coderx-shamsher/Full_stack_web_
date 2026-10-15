-- Arrray in lua 
-- in lua we use {} to create arrays 


local languages = { "lua", "python", "bash" } 


-- to get all languages ->> 
print(languages) -- it give me table: 0x5d0696f46650 like that 
print() 


-- #languages gives the number of items. means length of array ! 
print(#languages)

-- let print values with indexing 
-- Lua arrays start from 1, not 0.

print('Item 1 ->',languages[1])
print('Item 2 ->',languages[2])
print('Item 3 ->',languages[3])
print('Item 4 ->',languages[4]) -- age value es index par nhi hai to nil return hoga.. 








