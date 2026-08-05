# *Data Modelling with mongoose (backend js)*


## *Data Modelling*
*the process of creating a visual blueprint for how data is stored, organized, and connected within a system. It defines key business concepts, data attributes, and their relationships to ensure information remains accurate and consistent.*

- Conceptual Model: A high-level, simple view made for business people to understand general ideas like customers and orders.

- Logical Model: A detailed map that shows data structures, attributes, and connections without tying them to a specific software or tool.

- Physical Model: The final technical design built for a specific database system, including exact data types and storage settings.



### Why it matters 

- Clear Design: Acts as a roadmap before writing code or building databases.

- Better Quality: Stops data duplication and keeps records clean.

- Easy Sharing: Gives teams a common way to talk about business data.


   ## **Data modelling tool** 
    *Moon Modeler is a visual, no-code tool designed to map, design, and document complex NoSQL databases like MongoDB. It simplifies data structuring, automates code generation, and visualizes existing database schemas to improve understanding and efficiency. You can learn more by visiting the Datanoise Moon Modeler website.*

- its paid yeah !! for pro usage only 

**For data modeling data modelling Diagrams - easer.io website, but i have extension in vscode for creating diagrams easly...**

---
*** 

## **Mongoose**
   *Mongoose is an Object Data Modeling (ODM) library built for MongoDB and Node.js. It acts as a structured bridge between your JavaScript backend application code and your MongoDB NoSQL database.*

   *While MongoDB natively accepts any structural design because it is schema-less, Mongoose steps in to provide a neat, semi-rigid blueprint at the application layer to keep your datasets organized and predictable.*

   ## Why You Should Use Mongoose
   *Using Mongoose instead of the native MongoDB driver offers several key advantages:*

   - **Enforces Schemas:** MongoDB allows you to save any JSON file inside a collection. The Mongoose Schema definition tool forces a strict structural layout, declaring exactly what keys, object definitions, and data types (like Strings, Numbers, or Booleans) are accepted.
   
   - **Built-in Validation:** It automatically rejects bad data before sending requests to your database clusters. You can easily mark keys as required, establish numerical maximum boundaries, or use custom Regex patterns.
   
   - **Automatic Type Casting:** If a query transfers a text string value of "5" but your database model requires a Number type, Mongoose converts the data form automatically.Advanced Middleware Hooks: You can run custom code chains right before or after specific actions occur, such as hashing passwords right before running a .save() process.

   - **Simpler Data Queries:** It provides clean, human-readable helper actions like .find(), .findById(), or .updateOne(), reducing the amount of complex backend code you have to write manually.
   
   - **Relationship Population:** While NoSQL doesn't use standard SQL joins, Mongoose lets you link different document files together across distinct collections and pull them in seamlessly via .populate().

---
***

- **Practical code online spaces** 
**git codesapces** 
**codesandbox**
**stackblitz** -- now using it, go to website signup and lets gooo !! 


--- 

