Node.js ka **`fs` (File System) module** files aur folders ke saath kaam karne ke liye use hota hai. Isse tum file read, create, update, delete, rename, copy, directory manage, file metadata check aur file changes watch kar sakte ho. Ye Node.js ka built-in module hai, isliye install karne ki zarurat nahi hoti. [nodejs](https://nodejs.org/api/fs.html)

## 1. `fs` module kyon seekhna chahiye?

Backend developer ke liye `fs` important hai kyunki server ko aksar local file system ke saath kaam karna padta hai:

- Files read karna.
- Logs save karna.
- JSON data store karna.
- Uploads handle karna.
- Reports ya CSV files generate karna.
- Temporary files banana.
- Folders create karna.
- Files rename/move/delete karna.
- File changes monitor karna.

Node.js ka `fs` module standard POSIX file-system operations ke around bana hai. [nodejs](https://nodejs.org/api/fs.html)

Real-world examples:

- Image/PDF upload save karna.
- Server logs file me likhna.
- JSON-based small database banana.
- Static HTML read karke response bhejna.
- Build tools aur scripts banana.
- Backup ya export files generate karna.

## 2. Import kaise karein

### CommonJS

```js
const fs = require("node:fs");
```

### Promise API

Modern async code ke liye:

```js
const fs = require("node:fs/promises");
```

### ES Modules

```js
import fs from "node:fs";
```

Promise API:

```js
import fs from "node:fs/promises";
```

Node.js `fs/promises` API asynchronous methods provide karti hai jo Promises return karti hain. [docs.deno](https://docs.deno.com/api/node/fs/promises/)

***

# 3. Synchronous vs asynchronous methods

`fs` methods ke generally do versions milte hain:

```js
fs.readFileSync();
fs.readFile();
```

### Synchronous method

Synchronous method ka matlab: operation complete hone tak Node.js aage ka code block kar deta hai.

```js
const fs = require("node:fs");

const data = fs.readFileSync("notes.txt", "utf8");

console.log(data);
console.log("This runs after file reading");
```

Ye simple hai, lekin server request handling me large files ke liye risky hai kyunki event loop block ho sakta hai.

### Asynchronous method

Asynchronous method operation complete hone ka wait karte hue Node.js ko doosra kaam karne deta hai.

```js
const fs = require("node:fs/promises");

async function readNotes() {
  const data = await fs.readFile("notes.txt", "utf8");

  console.log(data);
  console.log("File reading complete");
}

readNotes();
```

Production server code me generally async Promise-based API prefer karo. `fs/promises` methods Promise return karte hain. [docs.deno](https://docs.deno.com/api/node/fs/promises/)

### Kab sync use kar sakte ho?

Synchronous methods useful ho sakte hain:

- Small startup scripts.
- CLI tools.
- Configuration load karte waqt app start hone se pehle.
- Simple learning examples.

Normal web server request handler me preferably async methods use karo.

***

# 4. File read karna: `readFile()`

`readFile()` file ka complete content read karta hai. [heynode](https://heynode.com/tutorial/what-fs-file-system-module/)

```js
const fs = require("node:fs/promises");

async function readFileData() {
  try {
    const data = await fs.readFile("notes.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.error("File read nahi ho saki:", error.message);
  }
}

readFileData();
```

## `"utf8"` kyon likhte hain?

Agar encoding nahi doge, to result `Buffer` object ke form me aa sakta hai.

```js
const data = await fs.readFile("notes.txt");

console.log(data); // Buffer
```

Text ke liye:

```js
const data = await fs.readFile("notes.txt", "utf8");

console.log(data); // String
```

## Synchronous version

```js
const fs = require("node:fs");

try {
  const data = fs.readFileSync("notes.txt", "utf8");
  console.log(data);
} catch (error) {
  console.error(error.message);
}
```

## Important error

Agar file exist nahi karti, to `ENOENT` error aa sakta hai. Isliye production code me `try...catch` use karo.

***

# 5. File create ya overwrite karna: `writeFile()`

`writeFile()` file me data write karta hai. Agar file exist karti hai to by default uska purana content replace ho jata hai. [heynode](https://heynode.com/tutorial/what-fs-file-system-module/)

```js
const fs = require("node:fs/promises");

async function createFile() {
  try {
    await fs.writeFile("message.txt", "Hello from Node.js", "utf8");
    console.log("File create ho gayi");
  } catch (error) {
    console.error(error.message);
  }
}

createFile();
```

Agar `message.txt` pehle se exist nahi karti, create ho jayegi. Agar exist karti hai, content overwrite ho jayega.

## JSON file write karna

```js
const fs = require("node:fs/promises");

const user = {
  id: 1,
  name: "Aman",
  role: "developer",
};

async function saveUser() {
  await fs.writeFile(
    "user.json",
    JSON.stringify(user, null, 2),
    "utf8"
  );

  console.log("User save ho gaya");
}

saveUser();
```

`JSON.stringify(user, null, 2)` JSON ko readable indentation ke saath save karta hai.

## File me append karna

Agar purana content preserve karke end me naya content add karna ho, `appendFile()` use karo. [heynode](https://heynode.com/tutorial/what-fs-file-system-module/)

```js
const fs = require("node:fs/promises");

async function addLog() {
  await fs.appendFile(
    "app.log",
    `${new Date().toISOString()} - Server started\n`,
    "utf8"
  );

  console.log("Log add ho gaya");
}

addLog();
```

`appendFile()` file na hone par file create bhi kar sakta hai. [geeksforgeeks](https://www.geeksforgeeks.org/node-js/how-to-use-the-fs-module-in-node/)

***

# 6. Directory create karna: `mkdir()`

`mkdir()` directory create karta hai.

```js
const fs = require("node:fs/promises");

async function createFolder() {
  await fs.mkdir("uploads");
  console.log("Folder create ho gaya");
}

createFolder().catch(console.error);
```

## Nested folders create karna

Agar parent folders bhi automatically create karne ho, `recursive: true` use karo.

```js
const fs = require("node:fs/promises");

async function createNestedFolders() {
  await fs.mkdir("storage/images/products", {
    recursive: true,
  });

  console.log("All folders create ho gaye");
}

createNestedFolders();
```

Ye production me uploads ya generated files ke folders ke liye common hai.

***

# 7. Directory read karna: `readdir()`

`readdir()` folder ke andar files aur directories ki list return karta hai. [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)

```js
const fs = require("node:fs/promises");

async function listFiles() {
  const files = await fs.readdir("uploads");

  console.log(files);
}

listFiles().catch(console.error);
```

Output:

```js
["image1.png", "image2.jpg", "report.pdf"]
```

## File type ke saath list

```js
const fs = require("node:fs/promises");

async function listFolder() {
  const entries = await fs.readdir("storage", {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      console.log("Folder:", entry.name);
    } else {
      console.log("File:", entry.name);
    }
  }
}

listFolder().catch(console.error);
```

***

# 8. File delete karna: `unlink()`

`unlink()` file delete karta hai. [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)

```js
const fs = require("node:fs/promises");

async function deleteFile() {
  try {
    await fs.unlink("old-file.txt");
    console.log("File delete ho gayi");
  } catch (error) {
    console.error("Delete failed:", error.message);
  }
}

deleteFile();
```

Agar file exist nahi karti, error aa sakta hai.

Safe delete:

```js
const fs = require("node:fs/promises");

async function deleteIfExists(filePath) {
  try {
    await fs.unlink(filePath);
    console.log("File deleted");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File already does not exist");
    } else {
      throw error;
    }
  }
}

deleteIfExists("old-file.txt");
```

***

# 9. Directory delete karna: `rm()`

Modern Node.js me directory ya file remove karne ke liye `rm()` useful hai.

```js
const fs = require("node:fs/promises");

async function removeFolder() {
  await fs.rm("old-folder", {
    recursive: true,
    force: true,
  });

  console.log("Folder remove ho gaya");
}

removeFolder().catch(console.error);
```

- `recursive: true` = folder ke andar ka content bhi remove.
- `force: true` = path missing ho to error avoid.

Purane code me `rmdir()` mil sakta hai, lekin modern code me recursive removal ke liye `rm()` prefer karo.

***

# 10. File rename ya move karna: `rename()`

`rename()` file ka naam change karta hai ya file ko doosre folder me move kar sakta hai. [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)

```js
const fs = require("node:fs/promises");

async function renameFile() {
  await fs.rename("old-name.txt", "new-name.txt");
  console.log("File rename ho gayi");
}

renameFile().catch(console.error);
```

Move example:

```js
await fs.rename(
  "temporary/report.pdf",
  "storage/reports/report.pdf"
);
```

Destination folder pehle se exist hona chahiye.

***

# 11. File copy karna: `copyFile()`

```js
const fs = require("node:fs/promises");

async function copyFile() {
  await fs.copyFile("original.txt", "backup.txt");
  console.log("File copy ho gayi");
}

copyFile().catch(console.error);
```

Real-world use:

- Backup create karna.
- Uploaded file duplicate karna.
- Template file copy karna.

***

# 12. File information: `stat()`

`stat()` file ya folder ki metadata return karta hai, jaise size, timestamps aur type. [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)

```js
const fs = require("node:fs/promises");

async function getFileInfo() {
  const stats = await fs.stat("notes.txt");

  console.log("Size:", stats.size, "bytes");
  console.log("Created:", stats.birthtime);
  console.log("Modified:", stats.mtime);
  console.log("Is file:", stats.isFile());
  console.log("Is directory:", stats.isDirectory());
}

getFileInfo().catch(console.error);
```

## File ya folder check karna

```js
const fs = require("node:fs/promises");

async function checkPath(path) {
  const stats = await fs.stat(path);

  if (stats.isFile()) {
    console.log(`${path} ek file hai`);
  } else if (stats.isDirectory()) {
    console.log(`${path} ek folder hai`);
  }
}

checkPath("storage").catch(console.error);
```

Important: `stat()` path missing hone par error throw karta hai.

***

# 13. Path exist karta hai ya nahi: `access()`

`fs.exists()` use karne ke bajay generally `access()` ya direct operation + error handling use karna better hota hai. `access()` check karta hai ki path accessible hai ya nahi.

```js
const fs = require("node:fs/promises");

async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function check() {
  const exists = await pathExists("notes.txt");
  console.log(exists ? "Path exists" : "Path does not exist");
}

check();
```

Lekin ek important production principle hai: sirf pehle check karke baad me file operation karna race condition create kar sakta hai. Better hai direct operation karo aur error handle karo.

***

# 14. `access()` permissions ke saath

```js
const fs = require("node:fs/promises");

async function checkReadable(path) {
  try {
    await fs.access(path);
    console.log("Path accessible hai");
  } catch (error) {
    console.log("Path accessible nahi hai");
  }
}

checkReadable("notes.txt");
```

Permissions constants ke liye:

```js
const fs = require("node:fs/promises");
const constants = require("node:fs").constants;

async function checkReadAccess(path) {
  try {
    await fs.access(path, constants.R_OK);
    console.log("File readable hai");
  } catch {
    console.log("File readable nahi hai");
  }
}

checkReadAccess("notes.txt");
```

***

# 15. File content update karna

Suppose JSON file me users hain:

```json
[
  {
    "id": 1,
    "name": "Aman"
  }
]
```

Read, modify aur write:

```js
const fs = require("node:fs/promises");

async function addUser() {
  const fileData = await fs.readFile("users.json", "utf8");
  const users = JSON.parse(fileData);

  users.push({
    id: 2,
    name: "Shamsher",
  });

  await fs.writeFile(
    "users.json",
    JSON.stringify(users, null, 2),
    "utf8"
  );

  console.log("New user added");
}

addUser().catch(console.error);
```

Ye small projects, learning aur local tools me useful hai. Production database replacement ke roop me large data ke liye JSON files use nahi karni chahiye.

***

# 16. Express server me `fs` use karna

```js
const express = require("express");
const fs = require("node:fs/promises");

const app = express();

app.get("/notes", async (req, res) => {
  try {
    const notes = await fs.readFile("notes.txt", "utf8");
    res.send(notes);
  } catch (error) {
    res.status(500).json({
      message: "Notes read nahi ho sake",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Important: request handler me async API use karo, taaki large file operations event loop ko unnecessarily block na karein.

***

# 17. Upload folder example

```js
const fs = require("node:fs/promises");
const path = require("node:path");

async function prepareUploadFolder() {
  const uploadPath = path.join(process.cwd(), "uploads");

  await fs.mkdir(uploadPath, {
    recursive: true,
  });

  console.log(`Upload folder ready: ${uploadPath}`);
}

prepareUploadFolder().catch(console.error);
```

Yahan `path` module use karna important hai. File paths ko manually slash se concatenate mat karo:

```js
// Avoid
const filePath = "uploads/" + fileName;
```

Prefer:

```js
const filePath = path.join("uploads", fileName);
```

Isse Windows, Linux aur macOS ke path differences handle hote hain.

***

# 18. File watching: `watch()`

`fs.watch()` file ya directory me changes observe karta hai. [heynode](https://heynode.com/tutorial/what-fs-file-system-module/)

```js
const fs = require("node:fs");

const watcher = fs.watch("config.json", (eventType, filename) => {
  console.log("Event:", eventType);
  console.log("Changed file:", filename);
});
```

Possible event types:

```text
rename
change
```

Use cases:

- Development tools.
- Config reload.
- File-based CMS.
- Build tools.
- Log monitoring.

Important: `fs.watch()` behavior operating system aur filesystem ke according vary kar sakta hai. Production-critical file watching ke liye edge cases test karo.

***

# 19. `readFile()` vs streams

`readFile()` poori file ko memory me load karta hai:

```js
const data = await fs.readFile("large-video.mp4");
```

Large files ke liye ye memory-heavy ho sakta hai.

Streams better hain:

```js
const fs = require("node:fs");

const readStream = fs.createReadStream("large-video.mp4");

readStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk.length);
});

readStream.on("end", () => {
  console.log("File reading complete");
});
```

Readable stream ko HTTP response me pipe karna:

```js
const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream("large-video.mp4");

  res.writeHead(200, {
    "Content-Type": "video/mp4",
  });

  stream.pipe(res);
});

server.listen(3000);
```

Rule:

- Small text/JSON file → `readFile()`.
- Large video, audio, backup, export → streams.
- Large upload/download → streaming approach.

***

# 20. `createReadStream()` aur `createWriteStream()`

Large files ko chunks me read/write karne ke liye:

```js
const fs = require("node:fs");

const input = fs.createReadStream("large-input.txt");
const output = fs.createWriteStream("large-copy.txt");

input.pipe(output);

output.on("finish", () => {
  console.log("Copy complete");
});
```

Isme poori file memory me load nahi hoti.

***

# 21. File permissions: `chmod()`

Linux/macOS systems me file permissions change karne ke liye `chmod()` use hota hai.

```js
const fs = require("node:fs/promises");

async function makeExecutable() {
  await fs.chmod("script.sh", 0o755);
  console.log("Permission updated");
}

makeExecutable().catch(console.error);
```

Common permissions:

```text
0o644 -> owner read/write, others read
0o755 -> executable
```

Permissions carefully change karo. Incorrect permissions security issue create kar sakti hain.

***

# 22. File descriptor aur advanced methods

Low-level file operations ke liye:

- `open()`
- `read()`
- `write()`
- `close()`
- `appendFile()`
- `truncate()`
- `fsync()`

Example:

```js
const fs = require("node:fs/promises");

async function lowLevelExample() {
  const file = await fs.open("data.txt", "r");

  const buffer = Buffer.alloc(20);
  const result = await file.read(buffer, 0, 20, 0);

  console.log("Bytes read:", result.bytesRead);
  console.log(buffer.toString("utf8", 0, result.bytesRead));

  await file.close();
}

lowLevelExample().catch(console.error);
```

Beginner ke liye ye immediately necessary nahi hain. Ye tab seekho jab high-performance file processing, custom file formats, streams, ya low-level I/O karna ho.

***

# 23. Most important methods checklist

Modern Node.js developer ke liye sabse important methods:

| Method | Use |
|---|---|
| `readFile()` | File read karna.  [heynode](https://heynode.com/tutorial/what-fs-file-system-module/) |
| `writeFile()` | File create/overwrite karna.  [heynode](https://heynode.com/tutorial/what-fs-file-system-module/) |
| `appendFile()` | Existing file ke end me data add karna.  [heynode](https://heynode.com/tutorial/what-fs-file-system-module/) |
| `mkdir()` | Directory create karna.  [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) |
| `readdir()` | Folder contents read karna.  [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) |
| `unlink()` | File delete karna.  [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) |
| `rm()` | File/folder remove karna. |
| `rename()` | Rename ya move karna.  [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) |
| `copyFile()` | File copy karna. |
| `stat()` | File metadata/type check karna.  [w3schools](https://www.w3schools.com/nodejs/nodejs_filesystem.asp) |
| `access()` | Path/access check karna. |
| `watch()` | File changes watch karna.  [heynode](https://heynode.com/tutorial/what-fs-file-system-module/) |
| `createReadStream()` | Large file chunks me read karna. |
| `createWriteStream()` | Large file chunks me write karna. |

***

# 24. Modern best practices

## Promise API prefer karo

```js
const fs = require("node:fs/promises");

const data = await fs.readFile("file.txt", "utf8");
```

Callbacks aur sync APIs ko samajhna zaroori hai, lekin new application code me async/await generally clean aur scalable hota hai. `fs/promises` asynchronous Promise methods provide karta hai. [docs.deno](https://docs.deno.com/api/node/fs/promises/)

## Errors handle karo

```js
try {
  const data = await fs.readFile("file.txt", "utf8");
} catch (error) {
  console.error(error);
}
```

## User input ko directly file path mat banao

Dangerous:

```js
const fileName = req.query.file;
await fs.readFile(fileName);
```

Isse path traversal risk ho sakta hai, jaise:

```text
../../../../etc/passwd
```

Safer approach:

```js
const path = require("node:path");

const baseDirectory = path.resolve("uploads");
const requestedPath = path.resolve(baseDirectory, fileName);

if (!requestedPath.startsWith(baseDirectory + path.sep)) {
  throw new Error("Invalid file path");
}
```

File names validate aur sanitize karo.

## Large files ke liye streams use karo

`readFile()` complete file memory me laata hai. Large data ke liye stream better hai.

## Paths ke liye `path` module use karo

```js
const path = require("node:path");

const filePath = path.join(process.cwd(), "data", "users.json");
```

## Sensitive files protect karo

Passwords, API keys aur secrets ko plain text files me store mat karo. Environment variables ya secure secret manager use karo.

***

# 25. Kitna seekhna chahiye?

## Beginner level

Ye must-know hain:

- `readFile()`
- `writeFile()`
- `appendFile()`
- `mkdir()`
- `readdir()`
- `unlink()`
- `rename()`
- `stat()`
- `fs/promises`
- `try...catch`

## Intermediate level

Ye seekho:

- `copyFile()`
- `rm()`
- `access()`
- `watch()`
- `createReadStream()`
- `createWriteStream()`
- JSON file CRUD
- `path` ke saath file paths
- File uploads aur safe path handling

## Advanced level

Baad me:

- File descriptors.
- `open()`, `read()`, `write()`, `close()`.
- Streams aur backpressure.
- File permissions.
- Symlinks.
- `lstat()`, `realpath()`.
- Concurrency aur race conditions.
- Large file processing.
- File locking patterns.

## Interview definition

**Node.js `fs` module ek built-in core module hai jo application ko operating system ke file system ke saath interact karne deta hai. Iske through files aur directories ko read, write, create, update, rename, copy, delete aur monitor kiya ja sakta hai.** [nodejs](https://nodejs.org/api/fs.html)

## Final mental model

- File read → `readFile()`
- File create/overwrite → `writeFile()`
- File me add → `appendFile()`
- Folder create → `mkdir()`
- Folder list → `readdir()`
- File delete → `unlink()`
- File/folder remove → `rm()`
- Rename/move → `rename()`
- Copy → `copyFile()`
- Details → `stat()`
- Existence/access → `access()`
- Large files → streams
- Modern async code → `node:fs/promises`

---
***

`fs` aur `fs/promises` dono Node.js me file system ke saath kaam karne ke APIs hain. Difference mainly **method style** ka hai:

- `node:fs` = callback-based methods + synchronous methods.
- `node:fs/promises` = Promise-based asynchronous methods, jo `async/await` ke saath use hote hain. [nodejs](https://nodejs.org/download/release/latest-jod/docs/api/fs.html)

## Short answer

Modern backend code me generally:

```js
const fs = require("node:fs/promises");
```

use karo.

`node:fs` tab use karo jab:

- Callback-based legacy code maintain karna ho.
- Streams use karne ho, jaise `createReadStream()` / `createWriteStream()`.
- Very small startup script me synchronous method suitable ho.
- Kisi specific API ka callback/stream version chahiye.

Synchronous methods jaise `readFileSync()` event loop ko block karte hain, isliye request handling ke andar avoid karo. [nodejs](https://nodejs.org/download/release/v25.8.0/docs/api/fs.html)

***

# 1. `node:fs` kya hai?

`node:fs` main File System module hai. Isme asynchronous callback methods aur synchronous methods dono available hain.

```js
const fs = require("node:fs");
```

Iske examples:

```js
fs.readFile();
fs.writeFile();
fs.readFileSync();
fs.writeFileSync();
fs.createReadStream();
fs.createWriteStream();
```

## Callback-based asynchronous example

```js
const fs = require("node:fs");

fs.readFile("notes.txt", "utf8", (error, data) => {
  if (error) {
    console.error("File read failed:", error.message);
    return;
  }

  console.log(data);
});

console.log("Ye file read hone se pehle bhi run ho sakta hai");
```

Yahan `readFile()` asynchronous hai. Node.js file operation ke complete hone ka wait karte hue event loop ko doosre kaam karne deta hai. Callback complete hone par run hota hai. [nodejs](https://nodejs.org/download/release/latest-jod/docs/api/fs.html)

## Synchronous example

```js
const fs = require("node:fs");

try {
  const data = fs.readFileSync("notes.txt", "utf8");
  console.log(data);
} catch (error) {
  console.error(error.message);
}

console.log("Ye line file read ke baad run hogi");
```

`readFileSync()` complete hone tak JavaScript execution aur event loop block ho jata hai. [nodejs](https://nodejs.org/download/release/v25.8.0/docs/api/fs.html)

***

# 2. `node:fs/promises` kya hai?

`node:fs/promises` file-system methods ka Promise-based version hai. Iske methods Promise return karte hain, isliye `await` aur `try...catch` use kar sakte ho. [nodejs](https://nodejs.org/download/release/latest-jod/docs/api/fs.html)

```js
const fs = require("node:fs/promises");
```

Example:

```js
const fs = require("node:fs/promises");

async function readNotes() {
  try {
    const data = await fs.readFile("notes.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.error("File read failed:", error.message);
  }
}

readNotes();
```

Ye modern code me usually readable aur maintainable hota hai. Promise-based file operations underlying Node.js thread pool ka use karti hain, event loop ko block nahi karti. [nodejs](https://nodejs.org/download/release/latest-jod/docs/api/fs.html)

***

# 3. Same operation: `fs` vs `fs/promises`

## `fs` callback version

```js
const fs = require("node:fs");

fs.writeFile("message.txt", "Hello Node.js", "utf8", (error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("File write ho gayi");
});
```

## `fs/promises` version

```js
const fs = require("node:fs/promises");

async function saveMessage() {
  try {
    await fs.writeFile("message.txt", "Hello Node.js", "utf8");
    console.log("File write ho gayi");
  } catch (error) {
    console.error(error);
  }
}

saveMessage();
```

Dono ka result same hai. Difference syntax aur error-handling style ka hai.

| Point | `node:fs` | `node:fs/promises` |
|---|---|---|
| Main style | Callback + sync methods | Promise-based async methods |
| Example | `fs.readFile(path, callback)` | `fs.readFile(path)` |
| Error handling | Error-first callback | `try...catch` with `await` |
| Event loop | Callback async non-blocking; sync methods blocking | Async, non-blocking |
| Readability | Nested callbacks ho sakte hain | `async/await` clean hota hai |
| Best use | Legacy code, streams, callbacks | Modern async application code |

 [nodejs](https://nodejs.org/download/release/latest-jod/docs/api/fs.html)

***

# 4. Callback version me problem kya ho sakti hai?

Agar multiple file operations sequence me karni hon, callbacks nested ho sakte hain:

```js
const fs = require("node:fs");

fs.readFile("a.txt", "utf8", (error, dataA) => {
  if (error) return console.error(error);

  fs.writeFile("b.txt", dataA, "utf8", (error) => {
    if (error) return console.error(error);

    fs.readFile("b.txt", "utf8", (error, dataB) => {
      if (error) return console.error(error);

      console.log(dataB);
    });
  });
});
```

Ye callback nesting code ko difficult bana sakti hai.

Same flow with `fs/promises`:

```js
const fs = require("node:fs/promises");

async function copyContent() {
  try {
    const data = await fs.readFile("a.txt", "utf8");
    await fs.writeFile("b.txt", data, "utf8");

    const copiedData = await fs.readFile("b.txt", "utf8");

    console.log(copiedData);
  } catch (error) {
    console.error(error);
  }
}

copyContent();
```

Isliye new async code me Promise API generally easier hoti hai. [transloadit](https://transloadit.com/devtips/efficiently-read-files-in-node-js-with-the-fs-module/)

***

# 5. Kya `fs/promises` non-blocking hai?

Haan, `fs/promises` asynchronous API hai. File operation Promise ke through complete hota hai, aur Node.js underlying thread pool ka use karta hai, event loop thread ko block nahi karta. [nodejs](https://nodejs.org/download/release/latest-jod/docs/api/fs.html)

Lekin ek important nuance:

- Async API ka matlab ye nahi ki operation magically instant hai.
- File operation background me complete hota hai.
- `await` sirf current async function ko pause karta hai; poora Node.js process block nahi karta.

Example:

```js
const fs = require("node:fs/promises");

async function readFile() {
  const data = await fs.readFile("large-file.txt", "utf8");
  console.log(data.length);
}

readFile();

console.log("Node.js doosra kaam kar sakta hai");
```

***

# 6. Synchronous methods kab use karne chahiye?

Synchronous methods:

```js
const fs = require("node:fs");

const data = fs.readFileSync("config.json", "utf8");
```

Ye tab suitable ho sakte hain:

- CLI script ke startup par.
- Small one-time scripts.
- App startup ke time configuration read karni ho.
- Jab blocking behavior intentionally chahiye.

Example:

```js
const fs = require("node:fs");

const config = JSON.parse(
  fs.readFileSync("config.json", "utf8")
);

console.log(config);
```

Lekin HTTP request handler me avoid karo:

```js
// Avoid in high-traffic request handler
app.get("/data", (req, res) => {
  const data = fs.readFileSync("large.json", "utf8");
  res.send(data);
});
```

Kyunki ek request ke dauran synchronous operation event loop ko block kar sakta hai aur doosri requests delay ho sakti hain. [nodejs](https://nodejs.org/download/release/v25.8.0/docs/api/fs.html)

***

# 7. Streams ka kya?

`fs/promises` file read/write ke Promise-based methods deta hai, lekin streams ke liye normally `node:fs` use karte hain.

```js
const fs = require("node:fs");

const readStream = fs.createReadStream("large-video.mp4");
const writeStream = fs.createWriteStream("copy-video.mp4");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Copy complete");
});
```

Large files ke liye streams better hote hain kyunki poori file ko ek saath memory me load nahi karte.

Use:

- Large videos.
- Large CSV files.
- Backups.
- File downloads/uploads.
- Continuous data processing.

So, `fs/promises` ko default async file operations ke liye use karo, aur `node:fs` ko streams ke liye bhi yaad rakho.

***

# 8. `fs.promises` alternative syntax

Ye bhi valid hai:

```js
const fs = require("node:fs");

async function readFile() {
  const data = await fs.promises.readFile("notes.txt", "utf8");
  console.log(data);
}
```

Lekin modern code me directly ye likhna zyada clear hai:

```js
const fs = require("node:fs/promises");
```

Ya named imports:

```js
const {
  readFile,
  writeFile,
  mkdir,
} = require("node:fs/promises");

async function example() {
  await mkdir("data", { recursive: true });
  await writeFile("data/message.txt", "Hello", "utf8");

  const data = await readFile("data/message.txt", "utf8");
  console.log(data);
}

example();
```

***

# 9. Practical examples

## File read

### `fs`

```js
const fs = require("node:fs");

fs.readFile("users.json", "utf8", (error, data) => {
  if (error) {
    console.error(error.message);
    return;
  }

  const users = JSON.parse(data);
  console.log(users);
});
```

### `fs/promises`

```js
const fs = require("node:fs/promises");

async function getUsers() {
  try {
    const data = await fs.readFile("users.json", "utf8");
    const users = JSON.parse(data);

    console.log(users);
  } catch (error) {
    console.error(error.message);
  }
}

getUsers();
```

## File write

### `fs`

```js
const fs = require("node:fs");

fs.writeFile(
  "log.txt",
  "Server started\n",
  "utf8",
  (error) => {
    if (error) {
      console.error(error.message);
      return;
    }

    console.log("Log saved");
  }
);
```

### `fs/promises`

```js
const fs = require("node:fs/promises");

async function saveLog() {
  try {
    await fs.appendFile(
      "log.txt",
      "Server started\n",
      "utf8"
    );

    console.log("Log saved");
  } catch (error) {
    console.error(error.message);
  }
}

saveLog();
```

## Folder create

```js
const fs = require("node:fs/promises");

async function createFolders() {
  await fs.mkdir("uploads/images", {
    recursive: true,
  });

  console.log("Folders ready");
}

createFolders().catch(console.error);
```

***

# 10. Kya `fs/promises` hamesha best hai?

Mostly modern async application code ke liye haan, but “hamesha” nahi.

## `fs/promises` choose karo jab:

- Modern Node.js backend likh rahe ho.
- `async/await` use kar rahe ho.
- Multiple file operations sequence me hain.
- Error handling simple chahiye.
- API route/request handler me file operation karna hai.
- Read/write/mkdir/readdir/stat jaise normal file operations chahiye.

## `node:fs` choose karo jab:

- Existing callback-based code maintain karna ho.
- `createReadStream()` ya `createWriteStream()` use karna ho.
- Event-based file watching use karna ho.
- Synchronous startup operation chahiye.
- Kisi library ko callback API required ho.

## `fsSync` avoid karo jab:

- High-traffic HTTP server ho.
- Request handler ke andar ho.
- File large ho.
- Multiple users simultaneously request kar rahe hon.

***

# 11. Important concurrency warning

Promise API async hai, lekin same file par multiple writes ek saath karne par unexpected result aa sakta hai. Node.js documentation bhi warn karti hai ki Promise file operations automatically synchronized ya thread-safe nahi hote. [nodejs](https://nodejs.org/download/release/latest-jod/docs/api/fs.html)

Risky pattern:

```js
await Promise.all([
  fs.writeFile("data.txt", "First"),
  fs.writeFile("data.txt", "Second"),
]);
```

Dono writes ek hi file par parallel chal rahi hain. Final content predictable nahi hona chahiye.

Safer sequential version:

```js
await fs.writeFile("data.txt", "First");
await fs.writeFile("data.txt", "Second");
```

Ya data pehle combine karo:

```js
const content = "First\nSecond\n";

await fs.writeFile("data.txt", content, "utf8");
```

***

# 12. Final recommendation

Tumhare liye simple rule:

```js
// Modern normal file work
const fs = require("node:fs/promises");
```

Use this for:

```js
await fs.readFile();
await fs.writeFile();
await fs.appendFile();
await fs.mkdir();
await fs.readdir();
await fs.rename();
await fs.unlink();
await fs.stat();
```

Aur ye yaad rakho:

```js
// Streams and callback APIs
const fs = require("node:fs");
```

Use this for:

```js
fs.createReadStream();
fs.createWriteStream();
fs.watch();
fs.readFile(path, callback);
```

## Interview answer

**`node:fs` Node.js ka complete file-system module hai jisme callback-based asynchronous, synchronous aur stream APIs available hoti hain. `node:fs/promises` usi file-system functionality ka Promise-based asynchronous interface hai, jo `async/await` ke saath kaam karta hai. Modern backend code me normal file operations ke liye `fs/promises` prefer karna chahiye, jabki streams, legacy callbacks ya intentional startup-time synchronous operations ke liye `fs` use kiya ja sakta hai.** 