Absolutely. These four are **core TypeScript concepts for frontend interviews**:

```text
Union
  ↓
Type Narrowing
  ↓
Type Guards
  ↓
Generics
  ↓
Utility Types
```

I'll explain each from **zero → practical frontend usage → interview level**.

---

# 1. Type Narrowing

## What is Type Narrowing?

Suppose you have:

```ts
let value: string | number;
```

TypeScript knows:

```text
value can be:
    string
      OR
    number
```

But if you want to call a string-specific method:

```ts
value.toUpperCase();
```

TypeScript says ❌ because `number` doesn't have `toUpperCase()`.

So you **narrow** the possible types.

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }

  if (typeof value === "number") {
    console.log(value.toFixed(2));
  }
}
```

Here:

```text
string | number
      ↓
 typeof check
      ↓
┌─────────────┐
│             │
string      number
│             │
toUpperCase  toFixed
```

That's **type narrowing**.

### Simple definition

> **Type narrowing means reducing a broad type into a more specific type based on some condition.**

---

# 2. Common Ways to Narrow Types

There are several techniques you should know for interviews.

---

## `typeof`

Best for primitive types.

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    // value is string
    console.log(value.toUpperCase());
  }

  if (typeof value === "number") {
    // value is number
    console.log(value.toFixed(2));
  }
}
```

Common `typeof` results:

```text
string
number
boolean
undefined
bigint
symbol
function
object
```

---

# 3. `Array.isArray()`

Suppose:

```ts
function process(value: string | string[]) {

  if (Array.isArray(value)) {
    console.log(value.length);
  } else {
    console.log(value.toUpperCase());
  }

}
```

TypeScript understands:

```text
Array.isArray(value)
       ↓
true  → string[]
false → string
```

Very common in real frontend code.

---

# 4. `instanceof`

Used when working with classes/objects.

```ts
function handleError(error: unknown) {

  if (error instanceof Error) {
    console.log(error.message);
  }

}
```

Before the check:

```text
error → unknown
```

After:

```text
error instanceof Error
        ↓
error → Error
```

Now you can safely use:

```ts
error.message
error.stack
```

---

# 5. The `in` Operator

Very useful with object unions.

Remember our earlier example:

```ts
type Admin = {
  name: string;
  permissions: string[];
};

type Customer = {
  name: string;
  orders: number;
};

type User = Admin | Customer;
```

We can narrow it:

```ts
function handleUser(user: User) {

  if ("permissions" in user) {
    console.log(user.permissions);
  } else {
    console.log(user.orders);
  }

}
```

TypeScript understands:

```text
"permissions" in user
        ↓
      true
        ↓
      Admin
```

Otherwise:

```text
Customer
```

---

# 6. Discriminated Union = Excellent Narrowing

This is one of the most useful frontend patterns.

```ts
type RequestState =
  | {
      status: "loading";
    }
  | {
      status: "success";
      data: string[];
    }
  | {
      status: "error";
      message: string;
    };
```

Now:

```ts
function render(state: RequestState) {

  if (state.status === "loading") {
    return "Loading...";
  }

  if (state.status === "success") {
    return state.data;
  }

  if (state.status === "error") {
    return state.message;
  }

}
```

The `status` property narrows the type.

```text
RequestState
     ↓
 status
     ↓
 ┌─────────┬─────────┬─────────┐
 ↓         ↓         ↓
loading   success   error
           ↓         ↓
          data    message
```

---

# 7. Type Guards

Now we move to the next concept.

A **type guard** is a condition/function that tells TypeScript:

> "If this condition is true, this value is this specific type."

You've already seen built-in type guards:

```ts
typeof
instanceof
in
Array.isArray()
```

For example:

```ts
function print(value: string | number) {

  if (typeof value === "string") {
    // TypeScript knows value is string
  }

}
```

`typeof value === "string"` is acting as a **type guard**.

---

# 8. Custom Type Guards ⭐⭐⭐

This is an important interview topic.

Suppose:

```ts
type User = {
  name: string;
  age: number;
};
```

We can create our own type guard:

```ts
function isUser(value: unknown): value is User {

  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "age" in value
  );

}
```

Notice:

```ts
value is User
```

This is special TypeScript syntax.

It tells TypeScript:

> If this function returns `true`, treat `value` as a `User`.

Now:

```ts
function process(value: unknown) {

  if (isUser(value)) {
    console.log(value.name);
    console.log(value.age);
  }

}
```

Without the guard:

```ts
value.name
```

❌

With the guard:

```ts
isUser(value)
```

TypeScript knows:

```text
unknown
  ↓
isUser()
  ↓
User
```

---

# 9. Why Do We Need Custom Type Guards?

They are especially useful when data comes from **outside your TypeScript application**.

For example:

```ts
const response = await fetch("/api/user");

const data: unknown = await response.json();
```

TypeScript can't guarantee what the server sent.

You can validate:

```ts
if (isUser(data)) {
  console.log(data.name);
}
```

This is much safer than:

```ts
const data: any = await response.json();
```

---

# 10. Generics

Now let's move to one of the **most important TypeScript interview topics**.

## What problem do generics solve?

Imagine you write:

```ts
function identity(value: string): string {
  return value;
}
```

Works for strings.

But:

```ts
function identity(value: number): number {
  return value;
}
```

Now you've duplicated the function.

You could use `any`:

```ts
function identity(value: any): any {
  return value;
}
```

But you've lost type safety.

Instead, use a **generic**.

```ts
function identity<T>(value: T): T {
  return value;
}
```

Here `T` is a placeholder for a type.

---

# 11. How Generic Works

```ts
const result = identity<string>("Steve");
```

TypeScript understands:

```text
T = string
```

So effectively:

```ts
(value: string) => string
```

And:

```ts
const result = identity<number>(100);
```

means:

```text
T = number
```

So:

```text
(value: number) => number
```

---

# 12. TypeScript Often Infers Generics

You don't usually need to explicitly write `<string>`.

```ts
const result = identity("Steve");
```

TypeScript automatically infers:

```text
T = string
```

And:

```ts
const result = identity(100);
```

infers:

```text
T = number
```

That's why generics are so powerful.

---

# 13. Generic Array Function

Suppose you want the first item from an array.

Bad:

```ts
function first(arr: any[]) {
  return arr[0];
}
```

Better:

```ts
function first<T>(arr: T[]): T {
  return arr[0];
}
```

Now:

```ts
const number = first([10, 20, 30]);
```

TypeScript knows:

```ts
number: number
```

And:

```ts
const name = first(["Steve", "Alex"]);
```

TypeScript knows:

```ts
name: string
```

---

# 14. Generics With Objects

```ts
function getProperty<T, K extends keyof T>(
  object: T,
  key: K
) {
  return object[key];
}
```

Now:

```ts
const user = {
  name: "Steve",
  age: 22
};

const name = getProperty(user, "name");
```

TypeScript knows:

```text
name → string
```

And:

```ts
const age = getProperty(user, "age");
```

knows:

```text
age → number
```

But:

```ts
getProperty(user, "email");
```

❌ Error.

Because `"email"` isn't a key of `user`.

This is an advanced but excellent interview example.

---

# 15. Generics in Frontend Development ⭐⭐⭐

Generics are everywhere in React and frontend libraries.

For example:

```ts
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
```

Now you can create:

```ts
type UserResponse = ApiResponse<User>;
```

or:

```ts
type ProductResponse = ApiResponse<Product>;
```

Same structure, different data.

```text
ApiResponse<T>
      ↓
 ┌────┴────┐
 ↓         ↓
User     Product
```

---

# 16. Generic API Function

You might write:

```ts
async function fetchData<T>(
  url: string
): Promise<T> {

  const response = await fetch(url);

  return response.json();
}
```

Then:

```ts
const users = await fetchData<User[]>("/api/users");
```

TypeScript understands:

```text
T = User[]
```

So:

```text
Promise<User[]>
```

And:

```ts
const products =
  await fetchData<Product[]>("/api/products");
```

becomes:

```text
Promise<Product[]>
```

---

# 17. Utility Types

Now the last major concept.

TypeScript gives us **built-in utility types** that let us transform existing types.

Suppose:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
```

Instead of creating many similar interfaces manually, we can transform `User`.

---

# 18. `Partial<T>`

Makes every property optional.

```ts
type UpdateUser = Partial<User>;
```

Equivalent to:

```ts
type UpdateUser = {
  id?: number;
  name?: string;
  email?: string;
  age?: number;
};
```

Very useful for update forms/API PATCH requests.

```ts
function updateUser(
  id: number,
  updates: Partial<User>
) {
  // ...
}
```

Now:

```ts
updateUser(1, {
  name: "Alex"
});
```

You don't need to provide every property.

---

# 19. `Required<T>`

Does the opposite.

```ts
type RequiredUser = Required<User>;
```

Every property becomes required.

If you had:

```ts
interface User {
  id?: number;
  name?: string;
}
```

Then:

```ts
type CompleteUser = Required<User>;
```

becomes:

```ts
{
  id: number;
  name: string;
}
```

---

# 20. `Readonly<T>`

Makes properties readonly.

```ts
type ReadonlyUser = Readonly<User>;
```

Then:

```ts
const user: ReadonlyUser = {
  id: 1,
  name: "Steve",
  email: "steve@example.com",
  age: 22
};

user.name = "Alex";
```

❌ Error.

Useful when you want to prevent accidental mutation.

---

# 21. `Pick<T, K>`

Select specific properties.

Suppose:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
```

You only need:

```text
id
name
```

Use:

```ts
type UserPreview = Pick<User, "id" | "name">;
```

Equivalent:

```ts
type UserPreview = {
  id: number;
  name: string;
};
```

### Frontend example

Your API returns:

```text
id
name
email
password
address
phone
```

But your card only needs:

```text
id
name
```

`Pick` is perfect.

---

# 22. `Omit<T, K>`

The opposite of `Pick`.

```ts
type PublicUser = Omit<User, "email" | "age">;
```

Equivalent:

```ts
type PublicUser = {
  id: number;
  name: string;
};
```

Useful when you want **everything except certain properties**.

---

# 23. `Record<K, T>`

This is extremely useful in frontend development.

Suppose:

```ts
type Status = "loading" | "success" | "error";
```

You want an object where every status has a string:

```ts
type StatusMessages = Record<Status, string>;
```

Now:

```ts
const messages: StatusMessages = {
  loading: "Loading...",
  success: "Success!",
  error: "Something went wrong"
};
```

If you forget one:

```ts
const messages: StatusMessages = {
  loading: "Loading...",
  success: "Success!"
};
```

❌ TypeScript complains because `error` is missing.

---

# 24. `ReturnType<T>`

Gets the return type of a function.

```ts
function getUser() {
  return {
    id: 1,
    name: "Steve"
  };
}
```

Then:

```ts
type User = ReturnType<typeof getUser>;
```

TypeScript produces:

```ts
type User = {
  id: number;
  name: string;
};
```

Very useful when you don't want to manually duplicate a complex return type.

---

# 25. `Parameters<T>`

Gets the parameter types of a function.

```ts
function createUser(
  name: string,
  age: number
) {}
```

Then:

```ts
type Params = Parameters<typeof createUser>;
```

Result:

```ts
type Params = [name: string, age: number];
```

---

# 26. Utility Types Cheat Sheet

| Utility         | What it does                  |
| --------------- | ----------------------------- |
| `Partial<T>`    | Makes everything optional     |
| `Required<T>`   | Makes everything required     |
| `Readonly<T>`   | Makes properties readonly     |
| `Pick<T, K>`    | Selects properties            |
| `Omit<T, K>`    | Removes properties            |
| `Record<K, T>`  | Creates object type from keys |
| `ReturnType<T>` | Gets function return type     |
| `Parameters<T>` | Gets function parameter types |

These are the ones I'd prioritize for frontend interviews.

---

# 🔥 Putting Everything Together

Let's build a realistic frontend example.

Suppose:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}
```

### API response

```ts
type ApiResponse<T> = {
  data: T;
  status: number;
};
```

Then:

```ts
type UsersResponse = ApiResponse<User[]>;
```

### Update user

```ts
type UpdateUser = Partial<User>;
```

So:

```ts
function updateUser(
  id: number,
  updates: UpdateUser
) {
  // ...
}
```

### User card

```ts
type UserCardData = Pick<User, "id" | "name" | "role">;
```

### Public user

```ts
type PublicUser = Omit<User, "email">;
```

### API state

```ts
type UserState =
  | {
      status: "loading";
    }
  | {
      status: "success";
      data: User[];
    }
  | {
      status: "error";
      message: string;
    };
```

Then:

```ts
function renderUsers(state: UserState) {

  if (state.status === "loading") {
    return "Loading...";
  }

  if (state.status === "error") {
    return state.message;
  }

  return state.data.map(user => user.name);
}
```

Here you're using:

```text
interface
   ↓
Union
   ↓
Discriminated Union
   ↓
Type Narrowing
   ↓
Generics
   ↓
Utility Types
```

This is exactly how these concepts start appearing together in real frontend applications.

---

# 🎯 Interview Mental Model

Remember these four questions:

### Type Narrowing

> **"How do I prove to TypeScript what type this value is?"**

```ts
if (typeof value === "string") {}
```

---

### Type Guard

> **"What condition/function can TypeScript use as proof?"**

```ts
value instanceof Error
```

or:

```ts
value is User
```

---

### Generics

> **"How can I write reusable code while preserving the actual type?"**

```ts
function identity<T>(value: T): T
```

---

### Utility Types

> **"How can I transform an existing type instead of writing a new one?"**

```ts
Partial<User>
Pick<User, "name">
Omit<User, "email">
```

---

## 🔥 The interview progression I'd recommend

You've now covered:

```text
Basic Types
   ↓
any
   ↓
unknown
   ↓
Union
   ↓
Discriminated Union
   ↓
Type Narrowing
   ↓
Type Guards
   ↓
Generics
   ↓
Utility Types
```

The **next TypeScript interview layer** should be:

```text
Generic Constraints
      ↓
keyof
      ↓
typeof (TypeScript usage)
      ↓
Indexed Access Types
      ↓
Conditional Types
      ↓
Mapped Types
      ↓
Template Literal Types
      ↓
never
      ↓
Exhaustiveness Checking
```

After that, we can move into the **React + TypeScript interview layer**: typing props, `children`, events, `useState`, `useRef`, `useReducer`, API responses, custom hooks, generic components, and common React TypeScript interview traps.
