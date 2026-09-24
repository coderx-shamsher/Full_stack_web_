#  — Files, Search & Text Processing

We’ll cover:

1. `find`
2. `locate`
3. `grep`
4. `sort`
5. `uniq`
6. `wc`
7. `cut`
8. `tr`
9. Pipes `|`
10. Redirection `>`, `>>`, `<`
11. `tee`
12. `xargs`
13. Regular Expressions

A very important idea connects almost everything here:

> **Linux commands are designed to work together.**

For example:

```bash
cat users.txt | grep "admin" | sort | uniq
```

Each command does one small job, and the output of one command becomes the input of another.

---

# 1. `find`

## Technical Definition

`find` is a Linux command used to **search for files and directories in a filesystem based on conditions** such as:

* name
* type
* size
* permissions
* owner
* modification time
* access time
* etc.

Unlike commands that search only by filename, `find` can search using many properties.

---

## Simple Hinglish

Socho tumhare computer mein:

```text
project/
├── index.html
├── app.js
├── style.css
├── images/
│   ├── logo.png
│   └── banner.jpg
└── backup/
    └── old.js
```

Aur tumhe `app.js` dhundna hai.

Instead of manually folders open karne ke:

```bash
find . -name "app.js"
```

Linux automatically search karega.

---

# Basic Syntax

```bash
find [starting-location] [conditions]
```

Example:

```bash
find . -name "app.js"
```

Meaning:

```text
.          → current directory
-name      → search by name
"app.js"   → filename
```

---

# Important `find` Examples

### Search current directory

```bash
find .
```

### Search by exact filename

```bash
find . -name "test.txt"
```

### Case-insensitive search

```bash
find . -iname "test.txt"
```

This can find:

```text
test.txt
Test.txt
TEST.TXT
Test.TXT
```

---

## Search only directories

```bash
find . -type d
```

`d` = directory.

Example:

```bash
find /home -type d
```

---

## Search only files

```bash
find . -type f
```

This is extremely common.

---

## Search by extension

```bash
find . -type f -name "*.js"
```

Find all JavaScript files.

```bash
find . -type f -name "*.txt"
```

Find all text files.

---

# Search by Size

```bash
find . -type f -size +100M
```

Find files larger than 100 MB.

Other examples:

```bash
find . -type f -size +1G
```

Larger than 1 GB.

```bash
find . -type f -size -10M
```

Smaller than 10 MB.

---

# Search by Modification Time

```bash
find . -type f -mtime -1
```

Files modified within the last 1 day.

```bash
find . -type f -mtime +30
```

Files modified more than 30 days ago.

---

# Search and Execute

One of the most powerful features:

```bash
find . -type f -name "*.log" -exec ls -lh {} \;
```

Here:

```text
{}   → current file found by find
\;   → end of -exec command
```

Another example:

```bash
find . -type f -name "*.tmp" -exec rm {} \;
```

⚠️ **Be careful with `rm`.**

First inspect:

```bash
find . -type f -name "*.tmp"
```

Then delete only when you're sure.

---

# 2. `locate`

## Technical Definition

`locate` searches for files using a **pre-built database of filesystem paths**.

Example:

```bash
locate app.js
```

---

## Hinglish

`find` actual filesystem ko search karta hai.

`locate` ek **database/list** mein search karta hai.

That's why:

```text
locate → usually very fast
find   → more flexible
```

---

## Important Difference

| `find`                             | `locate`                     |
| ---------------------------------- | ---------------------------- |
| Searches filesystem                | Searches database            |
| More powerful                      | Very fast                    |
| Can search size/type/time          | Mainly path/name             |
| Doesn't depend on updated database | Database can become outdated |

---

## Update locate database

Depending on distro:

```bash
sudo updatedb
```

Then:

```bash
locate filename
```

If a newly created file doesn't appear:

```bash
sudo updatedb
```

---

# 3. `grep`

This is one of the **most important Linux commands**.

## Technical Definition

`grep` searches text for lines matching a specified **pattern**.

---

## Hinglish

Suppose:

```text
users.txt
```

contains:

```text
john
admin
alice
admin123
bob
```

You want only lines containing `admin`.

```bash
grep "admin" users.txt
```

Output:

```text
admin
admin123
```

---

# Basic Syntax

```bash
grep [options] "pattern" file
```

---

# Important `grep` Options

### `-i` → ignore case

```bash
grep -i "admin" users.txt
```

Matches:

```text
admin
Admin
ADMIN
AdMiN
```

---

### `-n` → show line number

```bash
grep -n "admin" users.txt
```

Output:

```text
2:admin
4:admin123
```

---

### `-v` → invert match

```bash
grep -v "admin" users.txt
```

Meaning:

> Show lines that **do NOT** contain `admin`.

---

### `-r` → recursive search

```bash
grep -r "password" .
```

Search all files inside current directory and subdirectories.

Very useful for source-code searching.

---

### `-w` → whole word

```bash
grep -w "admin" users.txt
```

This matches:

```text
admin
```

but not:

```text
administrator
admin123
```

---

### `-c` → count matching lines

```bash
grep -c "admin" users.txt
```

---

### `-l` → show filenames containing match

```bash
grep -rl "TODO" .
```

Very useful in programming projects.

---

# `grep` + Pipe

```bash
ps aux | grep nginx
```

Meaning:

```text
ps aux
   ↓
process list
   ↓
grep nginx
   ↓
only lines containing nginx
```

This introduces our next concept.

---

# 4. Pipes `|`

## Technical Definition

A pipe connects the **standard output (`stdout`) of one command to the standard input (`stdin`) of another command**.

Syntax:

```bash
command1 | command2
```

---

## Hinglish

Pipe ka simple meaning:

> **Pehle command ka output → next command ka input**

Example:

```bash
ls | grep ".txt"
```

Flow:

```text
ls
 ↓
files ki list
 ↓
grep ".txt"
 ↓
sirf .txt files
```

---

# Multiple Pipes

You can chain many commands:

```bash
cat users.txt | sort | uniq
```

Flow:

```text
cat
 ↓
sort
 ↓
uniq
```

This is the real power of Linux.

---

# 5. `sort`

## Technical Definition

`sort` sorts lines of text.

```bash
sort users.txt
```

Input:

```text
zebra
apple
mango
banana
```

Output:

```text
apple
banana
mango
zebra
```

---

## Reverse order

```bash
sort -r users.txt
```

---

## Numeric sorting

Suppose:

```text
10
2
30
4
```

Normal:

```bash
sort numbers.txt
```

may produce:

```text
10
2
30
4
```

because it performs lexical/string sorting.

Use:

```bash
sort -n numbers.txt
```

Output:

```text
2
4
10
30
```

---

## Human-readable numeric sorting

For values such as:

```text
2K
10M
1G
500M
```

use:

```bash
sort -h
```

---

# 6. `uniq`

## Technical Definition

`uniq` removes or reports **adjacent duplicate lines**.

Important:

> `uniq` works on consecutive duplicates.

Example:

```text
apple
apple
banana
banana
apple
```

Run:

```bash
uniq file.txt
```

Output:

```text
apple
banana
apple
```

The final `apple` remains because it wasn't adjacent to the previous `apple`.

---

# Most Common Pattern

```bash
sort file.txt | uniq
```

Why?

First:

```text
apple
apple
banana
banana
apple
```

After `sort`:

```text
apple
apple
apple
banana
banana
```

Then `uniq`:

```text
apple
banana
```

---

# Count duplicates

```bash
sort file.txt | uniq -c
```

Output:

```text
3 apple
2 banana
```

Very useful for logs and analytics.

---

# 7. `wc`

`wc` = **word count**

It can count:

* lines
* words
* bytes
* characters

---

## Count lines

```bash
wc -l file.txt
```

---

## Count words

```bash
wc -w file.txt
```

---

## Count characters

```bash
wc -m file.txt
```

---

## Count bytes

```bash
wc -c file.txt
```

---

## Everything

```bash
wc file.txt
```

Example output:

```text
10 25 180 file.txt
```

Generally:

```text
lines words bytes filename
```

---

# Practical Example

Count number of JavaScript files:

```bash
find . -type f -name "*.js" | wc -l
```

This is an excellent real-world Linux pattern.

Flow:

```text
find
 ↓
JS files
 ↓
wc -l
 ↓
number of JS files
```

---

# 8. `cut`

## Technical Definition

`cut` extracts selected portions of each line.

It is especially useful with **delimited data**.

Suppose:

```text
john:25:developer
alice:30:designer
bob:22:developer
```

---

## Extract first field

```bash
cut -d ':' -f 1 users.txt
```

Output:

```text
john
alice
bob
```

Meaning:

```text
-d ':' → delimiter is :
-f 1   → field 1
```

---

## Extract second field

```bash
cut -d ':' -f 2 users.txt
```

Output:

```text
25
30
22
```

---

## Extract multiple fields

```bash
cut -d ':' -f 1,3 users.txt
```

Output:

```text
john:developer
alice:designer
bob:developer
```

---

# 9. `tr`

`tr` = **translate characters**

It can:

* replace characters
* delete characters
* convert case
* compress repeated characters

---

## Convert lowercase → uppercase

```bash
echo "hello linux" | tr 'a-z' 'A-Z'
```

Output:

```text
HELLO LINUX
```

---

## Replace characters

```bash
echo "hello world" | tr ' ' '_'
```

Output:

```text
hello_world
```

---

## Delete characters

```bash
echo "hello123" | tr -d '0-9'
```

Output:

```text
hello
```

---

## Multiple spaces → one space

```bash
echo "hello     linux" | tr -s ' '
```

Output:

```text
hello linux
```

`-s` = squeeze repeated characters.

---

# 10. Redirection

Linux commands normally use three important streams:

```text
stdin   → 0
stdout  → 1
stderr  → 2
```

Think:

```text
Input
  ↓
stdin
  ↓
Command
  ↓
stdout → normal output
stderr → error output
```

---

# `>`

Redirect stdout to a file.

```bash
ls > files.txt
```

Instead of displaying the output on terminal, it goes into:

```text
files.txt
```

### Important

`>` **overwrites** the file.

Example:

```bash
echo "Hello" > test.txt
```

Then:

```bash
echo "World" > test.txt
```

Now the file contains only:

```text
World
```

---

# `>>`

Append output.

```bash
echo "Hello" > test.txt
echo "World" >> test.txt
```

File:

```text
Hello
World
```

So:

```text
>   overwrite
>>  append
```

Remember this distinction very carefully.

---

# `<`

Input redirection.

```bash
wc -l < file.txt
```

Here:

```text
file.txt
   ↓
stdin
   ↓
wc
```

---

# Redirect errors

Because:

```text
stderr = 2
```

you can do:

```bash
command 2> errors.txt
```

Example:

```bash
ls /something-that-does-not-exist 2> errors.txt
```

The error goes into:

```text
errors.txt
```

---

# Redirect stdout + stderr

Common syntax:

```bash
command > output.txt 2>&1
```

Meaning:

```text
stdout → output.txt
stderr → stdout → output.txt
```

Modern Bash also supports:

```bash
command &> output.txt
```

---

# 11. `tee`

## Technical Definition

`tee` reads stdin and writes it to **stdout and one or more files simultaneously**.

---

## Hinglish

Normally:

```bash
command > file.txt
```

output terminal se disappear ho jata hai because it goes to file.

But:

```bash
command | tee file.txt
```

means:

```text
             ┌→ terminal
command → tee
             └→ file
```

Example:

```bash
ls | tee files.txt
```

Output terminal par bhi dikhega and `files.txt` mein bhi save hoga.

---

## Append with `tee`

```bash
command | tee -a file.txt
```

`-a` = append.

---

# 12. `xargs`

This is a little more advanced, but **very important professionally**.

## Technical Definition

`xargs` converts input from stdin into **arguments for another command**.

Example:

```bash
echo "file1 file2 file3" | xargs rm
```

Conceptually becomes:

```bash
rm file1 file2 file3
```

---

## Simple Example

```bash
echo "hello world" | xargs echo
```

Input is converted into arguments.

---

# `find` + `xargs`

Very common pattern:

```bash
find . -type f -name "*.log" -print0 | xargs -0 ls -lh
```

Why `-print0` and `-0`?

Because filenames can contain spaces.

For example:

```text
my important log.txt
```

Using null-separated input makes the operation safer.

---

# `xargs` vs `-exec`

Both can execute commands based on `find` results.

```bash
find . -type f -name "*.txt" -exec wc -l {} \;
```

or:

```bash
find . -type f -name "*.txt" -print0 | xargs -0 wc -l
```

For now, remember:

> `xargs` = take input and turn it into command arguments.

---

# 13. Regular Expressions

Now we're reaching a **very important Linux + programming skill**.

Regular expressions, commonly called **regex**, are patterns used to match text.

You will use regex with:

```text
grep
sed
awk
find
programming languages
log analysis
validation
```

---

# Basic Regex Concepts

Suppose:

```text
cat
car
cap
dog
```

---

## `.`

`.` means:

> Any single character.

```bash
grep "c.t" file.txt
```

Can match:

```text
cat
cut
cot
c9t
```

---

# `^`

Beginning of line.

```bash
grep "^admin" users.txt
```

Matches lines beginning with:

```text
admin
administrator
admin123
```

---

# `$`

End of line.

```bash
grep "admin$" users.txt
```

Matches:

```text
superadmin
myadmin
admin
```

but not:

```text
admin123
```

---

# `[]`

Character class.

```bash
grep "[abc]" file.txt
```

Matches lines containing:

```text
a
b
c
```

---

## Range

```bash
grep "[0-9]" file.txt
```

Contains a digit.

```bash
grep "[a-z]" file.txt
```

Lowercase letters.

```bash
grep "[A-Z]" file.txt
```

Uppercase letters.

---

# `*`

Zero or more occurrences of the preceding pattern.

For example:

```bash
grep "ab*" file.txt
```

Can match:

```text
a
ab
abb
abbb
```

---

# `+`

One or more occurrences.

With extended regex:

```bash
grep -E "ab+" file.txt
```

Matches:

```text
ab
abb
abbb
```

but not just:

```text
a
```

---

# `?`

Zero or one occurrence.

```bash
grep -E "colou?r" file.txt
```

Matches:

```text
color
colour
```

---

# `{}`

Specify number of repetitions.

```bash
grep -E "[0-9]{3}" file.txt
```

Matches three digits:

```text
123
456
999
```

---

# `|` in Regex

This is different from the shell pipe depending on context.

In regex:

```bash
grep -E "cat|dog" file.txt
```

means:

```text
cat OR dog
```

---

# `()` Grouping

```bash
grep -E "(cat|dog)s" file.txt
```

Can match:

```text
cats
dogs
```

---

# Basic Regex Cheat Sheet

| Regex   | Meaning              |    |
| ------- | -------------------- | -- |
| `.`     | Any single character |    |
| `^`     | Beginning of line    |    |
| `$`     | End of line          |    |
| `[]`    | Character class      |    |
| `[0-9]` | Any digit            |    |
| `[a-z]` | Lowercase letter     |    |
| `*`     | Zero or more         |    |
| `+`     | One or more          |    |
| `?`     | Zero or one          |    |
| `{n}`   | Exactly n            |    |
| `{n,m}` | n to m               |    |
| `       | `                    | OR |
| `()`    | Group                |    |

---

# Putting Everything Together 🔥

This is where Linux starts becoming really powerful.

Suppose you have a log:

```text
INFO user=john
ERROR user=alice
INFO user=bob
ERROR user=john
ERROR user=alice
```

Find errors:

```bash
grep "ERROR" app.log
```

Count errors:

```bash
grep "ERROR" app.log | wc -l
```

Extract usernames:

```bash
grep "ERROR" app.log | cut -d '=' -f 2
```

Sort usernames:

```bash
grep "ERROR" app.log | cut -d '=' -f 2 | sort
```

Remove duplicates:

```bash
grep "ERROR" app.log | cut -d '=' -f 2 | sort | uniq
```

Count each user:

```bash
grep "ERROR" app.log | cut -d '=' -f 2 | sort | uniq -c
```

You might get:

```text
2 alice
1 john
```

This is the **Unix philosophy**:

> **Do one thing well, then combine commands together.**

---

# 🧠 The Mental Model You Should Build

Think of these commands as tools in a pipeline:

```text
              SEARCH
                │
        ┌───────┴───────┐
      find            grep
        │                │
        └───────┬────────┘
                ↓
             sort
                ↓
             uniq
                ↓
              cut
                ↓
              tr
                ↓
              wc
                ↓
             output
```

And pipes connect them:

```bash
command1 | command2 | command3 | command4
```

Redirection controls where the data goes:

```bash
>     overwrite file
>>    append file
<     input from file
```

While:

```bash
tee
```

lets you **see + save** output, and:

```bash
xargs
```

turns input into **command arguments**.

---

# 🔥 Most Important Commands to Practice

Don't just memorize these. Run them.

Create a practice directory:

```bash
mkdir linux-text-practice
cd linux-text-practice
```

Create data:

```bash
printf "apple\nbanana\napple\norange\nbanana\napple\n" > fruits.txt
```

Now practice:

```bash
cat fruits.txt
```

```bash
sort fruits.txt
```

```bash
sort fruits.txt | uniq
```

```bash
sort fruits.txt | uniq -c
```

```bash
wc -l fruits.txt
```

```bash
grep "apple" fruits.txt
```

```bash
grep -n "apple" fruits.txt
```

```bash
grep -v "apple" fruits.txt
```

```bash
tr 'a-z' 'A-Z' < fruits.txt
```

```bash
sort fruits.txt | uniq -c | sort -nr
```

That last command is especially useful:

```text
sort
 ↓
group duplicates
 ↓
count them
 ↓
sort by number, descending
```

It gives you a frequency ranking.

---

# 🎯 What You Should Master First

Don't try to memorize everything at once.

### Level 1 — Must Know

```bash
find
grep
sort
uniq
wc
cut
tr
```

### Level 2 — Must Understand

```bash
|
>
>>
<
```

### Level 3 — Important Professional Tools

```bash
tee
xargs
```

### Level 4 — Very Important Skill

```text
Regular Expressions
```

And after this, the natural next Linux text-processing topics are:

```text
sed
awk
head
tail
less
diff
```

Especially **`sed` and `awk`**—they build directly on everything you've learned here.
