# Simple express demo
**created using the stackbiltz**

## install mongoose

```sh

npm install mongoose

```

### **create models folder in root**

- create Todos folder
  - create user.model.js
  - create sub-todos.model.js
  - create todo.model.js

```sh

❯ cd models/Todos/

❯ touch user.model.js && touch sub-todos.model.js && touch todo.model.js

```

---

#### User.model.js ->

_user model is here with comment notes in detail_

```js

// first step is importing the package (mongoose)
import mongoose from 'mongoose';

// 2nd is create schema using the mongoose.schema() method and store it in a variable jo bhi name app us schema ka khrana hai

// write fields here in {}

// first way simple way
// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   isActive: Boolean,
// });

// pro way ->
// -> timestamp (user kab create huya or kiya updated hai etc with timestamp using defualt built in mongoose )
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // for unique
    unique: true,
    // for all lowercase usernames
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    // custom require with message
    required: [true, 'password is required'],
  },
  isActive: Boolean,
},
 {timeseries:true}
 // this is how to declare timestamp
// note down k timestamp nhi timestamps add krna hai keoki hame dono properties chaahie createat updatedat

);

// exporting the schema
// why we cannot export the userschema ??

// now ham mongoose.model() k help se ham schema create krte hain yeh 2 arguaments leyta hai,  1) kiya schema create krna hai (name) , 2) kisse base par to hamne pahle he userschema create kra hai to uske bas pr he create krenge
// mongoose.model("schemaname",yourschema)

export const User = mongoose.model('User', UserSchema);
// export User keo kiya keoki hame kafi code files mein yehi schema use krna hota hai to hame aisi files se he schema ko import krte hain
// NOTE -> jo bhi name hamne model mein pass kiya let say "User" yan "Todo" to jab yeh database mein store hota hai to yeh 1) lowercase mein rehta hai or user se -> users hoga , Todo se -> todos , sab k piche s laga deta hai... its important to know.. little detail..

// these 3 lines are same...

```

---

---

#### Todo.model.js

_lets create todo model ->_

```js
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    content : {
       type : String,
       required : true,
    },
    complete : {
       type : Boolean,
       default : false 
    },
    // now ham yana declare krenge ki kisne todo create kiya
    createBy : {
      // first hame type main mongoose.schema.types.objectid lete hai next important hai, jo ki hai reference 
       type : mongoose.Schema.Types.ObjectId,
       // give the ref name jo hamen model mein pass kr hai line mere user model main "User" tha 
       ref : "User"
    },
    // subtodo 
    // array of object of subtodos
    subTodos : [
       {
         type : mongoose.Schema.Types.ObjectId,
         ref : "SubTodo"
       }
    ]
}, { timeseries: true });

export const Todo = mongoose.model('Todo', TodoSchema);
```

---

--- 

#### subtodos.model.js
```js


import mongoose from 'mongoose';

const Sub_Todo_Schema = new mongoose.Schema({
   content : {
     type : String,
     required : true,
   },
   complete : {
      type : Boolean,
      default : false
   },
   // optional jab need hogi uncomment krluga 
  //  createBy: {
  //     type : mongoose.Schema.Types.ObjectId,
  //     ref : "User"
  //  }
}, { timestamps: true });

export const SubTodo = mongoose.model('SubTodo', Sub_Todo_Schema);
```

> NOTE -> jo hamne type : objectid and ref set kra hai vo hamne relations setup krein hai models k  beach mein so make sure k remember it ese kaise krna hi aur kiya concept hai.. 

---
*** 

**Today just practice data modelling in mongoose with TOdo app data model structure..**

---
***

# *Ecommerce & hospital mangement Data models*

## **Ecommerce Data models here ->**
**More practice on modelling**

- **Create Ecommerce folder in models and create files** 
```sh

❯ cd models/

❯ mkdir Ecommerce

❯ cd Ecommerce/

❯ touch user.model.js && touch products.model.js && touch category.model.js && touch order.model.js

```


- NOTE -> in vs code go into setting -> snippets -> javascript.json -> create a custom code snippet for mongoose 
**aur you can use this**
```js 
{
	"mongoose default": {
		"prefix": "mongoosemodel",
		"body": [
			"import mongoose from 'mongoose' ",
			"     ",
			"      ",
			"const yourSchemaname$1 = new mongoose.Schema({})",
			"     ",
			"      ",
			"export const yourexportname = mongoose.model('modelname',yourSchemaname$1)"
		],
		"description": "this is mongoose basic setup"
	}

}
```

- now after setup json just type mongoosemodel and you have code !!! 


--- 
--- 

###  */Ecommerce/user.model.js*
```js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password : {
         type : String,
         required : true
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", UserSchema);

```

### Ecommerce/products.model.js

```js

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    productname: {
      type: String,
      required: true,
    },
    productimage: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    productstock: {
      default: 0,
      type: Number,
    },

    // model relation with category model
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", ProductSchema);

```
---

### Ecommerce/Category.model.js
```js

import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model("Category", CategorySchema);

```

---

### Ecommerce/order.model.js
```js 

import mongoose from "mongoose";
import { Product } from "./products.model";

// mini models for complex models

const orderItemsSchema = new mongoose.Schema({
  Productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
}); // we can also create this into separate file but its also a good

const OrderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // order with mini schema
    orderItems: {
      type: [orderItemsSchema],
    },

    // nested model , ager mini model extra create nhi krna to ese kr skte hain
    address: [
      {
        pincode: {
          type: String,
        },
        receivername: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        countryname: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        city: {
          type: String,
        },
        landmark: {
          type: String,
        },
        addresstype: {
          type: String,
          enum: ["Home", "Office", "Other"],
          default: "Home",
        },
      },
    ],

    orderStatus: {
      type: String,
      //speacial type checking with enum ->
      // for speacial requirements
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", OrderSchema);

```

---
***







