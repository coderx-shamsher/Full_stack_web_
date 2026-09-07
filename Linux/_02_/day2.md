Perfect. We’ll start from **Terminal & Shell**, then move through **Filesystem Hierarchy → Basic Commands → Getting Help**.

# 🐧 Linux Mastery — Lesson 1

## Terminal, Shell & Bash

Before learning commands like `ls`, `cd`, `mkdir`, etc., you should understand **where you are typing them and who actually executes them**.

---

# 1. Terminal — Technical Definition

> **A terminal is a text-based interface through which a user interacts with a computer by entering commands and receiving textual output.**

Historically, a terminal was a physical device connected to a computer.

Today, when we open:

```text
GNOME Terminal
Konsole
Windows Terminal
VS Code Terminal
```

we are generally using a **terminal emulator**.

### Architecture

```text
You
 ↓
Terminal Emulator
 ↓
Shell
 ↓
Command / Program
 ↓
Linux Kernel
 ↓
Hardware
```

This distinction is extremely important.

---

# 2. Terminal ≠ Shell

Beginners commonly think:

> Terminal = Bash

No.

They are different.

```text
Terminal
   ↓
Provides the interface/window
   ↓
Shell
   ↓
Interprets your commands
```

For example, you might open:

```text
Windows Terminal
```

and run:

```text
Ubuntu / WSL
```

Inside it, you might be running:

```text
Bash
```

So:

```text
Windows Terminal
       ↓
      WSL
       ↓
     Bash
       ↓
    Linux
```

---

# 3. What Is a Shell?

## Technical Definition

> **A shell is a command-line interpreter that accepts commands from the user, interprets them, and launches programs or performs shell operations.**

In simple words:

> **Shell is the program that understands what you're typing in the command line.**

For example:

```bash
ls
```

You type:

```text
ls
```

The shell interprets this command and executes the `ls` program.

---

# 4. What Is Bash?

**Bash** stands for:

> **Bourne Again SHell**

It is one of the most widely used Unix/Linux shells.

You may see:

```bash
$ 
```

or:

```bash
user@ubuntu:~$
```

That usually means Bash is waiting for your command.

Example:

```bash
user@ubuntu:~$ ls
```

Here:

```text
user       → username
@ubuntu    → hostname
:          → separator
~          → current directory (home)
$          → normal user prompt
```

---

# 5. Shell vs Bash

This is another important distinction.

**Shell** is a category/interface concept.

**Bash** is one particular shell.

Similar to:

```text
Browser
├── Chrome
├── Firefox
└── Edge
```

Likewise:

```text
Shell
├── Bash
├── Zsh
├── Fish
├── Dash
└── Ksh
```

So:

```text
Bash IS a shell.
```

But:

```text
Shell ≠ Bash
```

---

# 6. What Happens When You Type a Command?

Let's take:

```bash
ls
```

The complete conceptual flow is:

```text
You type:
ls
 ↓
Terminal receives keyboard input
 ↓
Shell receives "ls"
 ↓
Shell interprets the command
 ↓
Shell finds the ls executable
 ↓
ls executes
 ↓
Linux kernel provides required resources
 ↓
Filesystem is accessed
 ↓
Output is returned
 ↓
Terminal displays output
```

This is the foundation for understanding Linux.

---

# 7. What Exactly Is a Command?

A **command** can refer to something you ask the shell to execute.

For example:

```bash
ls
```

The shell may execute an actual executable program.

But not every command is necessarily an external executable.

Commands can be:

### External commands

Examples:

```bash
ls
cat
grep
cp
mv
```

These generally correspond to executable programs installed on the system.

### Shell builtins

Some commands are implemented directly inside the shell.

Examples:

```bash
cd
echo
export
pwd
```

This distinction becomes important later.

---

# 8. Your First Important Command: `pwd`

Now let's start actual Linux commands.

## Technical Definition

> **`pwd` prints the absolute pathname of the current working directory.**

`pwd` means:

```text
Print Working Directory
```

Run:

```bash
pwd
```

You might get:

```text
/home/coder
```

This tells you:

> "The shell's current working directory is `/home/coder`."

---

# 9. What Is a Working Directory?

Every shell session has a **current working directory**.

Think of it as:

> "The directory I'm currently standing inside."

For example:

```text
/home/coder/projects
```

If you're currently here:

```text
/home/coder/projects
```

then:

```bash
pwd
```

returns:

```text
/home/coder/projects
```

Many commands operate relative to this directory.

---

# 10. Linux Filesystem Hierarchy

Now we need to understand something fundamental.

Linux doesn't have:

```text
C:\
D:\
E:\
```

like Windows.

Linux has **one main filesystem tree**.

It starts at:

```text
/
```

This is called:

> **Root directory**

Not to be confused with the `root` user.

---

# 11. Linux Filesystem Structure

A simplified version:

```text
/
├── bin
├── boot
├── dev
├── etc
├── home
├── lib
├── media
├── mnt
├── opt
├── proc
├── root
├── run
├── sbin
├── srv
├── sys
├── tmp
├── usr
└── var
```

Don't try to memorize everything yet.

We'll understand each directory properly.

---

# 12. `/` — Root Directory

```text
/
```

is the top of the Linux filesystem hierarchy.

Everything is underneath it.

```text
/
├── home
├── etc
├── var
├── usr
└── ...
```

Think:

```text
Windows:
C:\

Linux:
/ 
```

But internally they're not exactly equivalent; `/` is the root of the Linux filesystem namespace.

---

# 13. `/home`

Normal users generally have their personal directories under:

```text
/home
```

Example:

```text
/home/coder
```

Inside:

```text
/home/coder
├── Documents
├── Downloads
├── Pictures
├── Projects
└── ...
```

So if your username is `coder`:

```bash
cd /home/coder
```

takes you to your home directory.

---

# 14. `~` — Home Directory Shortcut

Linux provides:

```text
~
```

as shorthand for the current user's home directory.

For example:

```bash
cd ~
```

means:

```text
Go to my home directory.
```

If your home directory is:

```text
/home/coder
```

then:

```bash
~
```

represents:

```text
/home/coder
```

You can verify:

```bash
pwd
```

---

# 15. `/root`

This one causes confusion.

```text
/root
```

is the home directory of the **root user**.

It is NOT the same thing as:

```text
/
```

Remember:

```text
/       → root directory
/root   → root user's home directory
```

Very different things.

---

# 16. `/etc`

`/etc` contains system-wide configuration files.

Examples:

```text
/etc/hosts
/etc/passwd
/etc/ssh/
```

Later you'll learn:

```text
/etc
 ↓
system configuration
```

This directory is extremely important for Linux administration.

---

# 17. `/var`

`/var` contains data that frequently changes.

Examples include:

```text
logs
caches
spools
application data
```

For example:

```text
/var/log
```

contains many system/application logs.

---

# 18. `/tmp`

Temporary files commonly go here:

```text
/tmp
```

Programs can use it for temporary data.

Don't assume every temporary file on Linux must be here—applications can use other locations too.

---

# 19. `/usr`

Historically, `/usr` contained user-related programs/data, and on modern Linux systems it is a major part of the installed operating-system software hierarchy.

You'll commonly find:

```text
/usr/bin
/usr/sbin
/usr/lib
/usr/share
```

For example:

```text
/usr/bin/
```

contains many executable programs.

---

# 20. `/bin` and `/sbin`

You'll often encounter:

```text
/bin
/sbin
```

These traditionally represented essential user commands and system administration commands.

On many modern distributions, they may be **symbolic links merged into `/usr`**, so don't build your mental model around `/bin` and `/usr/bin` always being physically separate directories.

We'll study this properly when we cover the filesystem hierarchy.

---

# 21. `/dev`

This is one of the coolest Linux concepts.

```text
/dev
```

contains device files/interfaces.

Examples:

```text
/dev/sda
/dev/null
/dev/zero
```

Linux follows the famous Unix philosophy:

> **"Everything is a file"**

More precisely, Linux exposes many resources through file-like interfaces.

We'll go very deep into `/dev` later.

---

# 22. `/proc`

```text
/proc
```

is a virtual filesystem provided by the kernel.

It exposes information about:

```text
Processes
CPU
Memory
Kernel
System information
```

For example:

```bash
cat /proc/cpuinfo
```

We'll eventually use `/proc` to understand what the Linux kernel knows about the running system.

---

# 23. `/sys`

Similarly:

```text
/sys
```

is another kernel-provided virtual filesystem.

It exposes information and interfaces related to:

```text
Devices
Drivers
Kernel subsystems
Hardware
```

This becomes very important when you learn Linux internals.

---

# 24. Now Let's Learn `ls`

## Technical Definition

> **`ls` lists directory contents such as files and directories.**

Basic:

```bash
ls
```

Example:

```text
Documents
Downloads
Pictures
Projects
```

---

## `ls -l`

```bash
ls -l
```

`-l` means **long listing format**.

Example:

```text
drwxr-xr-x  2 coder coder 4096 Sep  6 Projects
-rw-r--r--  1 coder coder  120 Sep  6 notes.txt
```

Later we'll learn every column:

```text
d rwxr-xr-x 2 coder coder 4096 Sep 6 Projects
│ │         │ │     │
│ │         │ │     └── filename
│ │         │ └──────── owner/group
│ │         └────────── links
│ └──────────────────── permissions
└────────────────────── file type
```

Don't worry about understanding permissions yet.

---

# 25. `ls -a`

```bash
ls -a
```

`-a` means:

> **Show all entries, including hidden entries.**

Linux hidden files/directories generally begin with:

```text
.
```

Example:

```text
.
..
.bashrc
.profile
Documents
Downloads
```

---

# 26. `ls -lah`

You'll frequently see professionals use:

```bash
ls -lah
```

Break it down:

```text
-l → long format
-a → all entries
-h → human-readable sizes
```

This is a good example of how Linux commands are composed from options.

---

# 27. `cd`

## Technical Definition

> **`cd` changes the shell's current working directory.**

`cd` = **change directory**

Example:

```bash
cd /etc
```

Then:

```bash
pwd
```

Output:

```text
/etc
```

You've changed the shell's current working directory.

---

# 28. `cd ..`

```bash
cd ..
```

`..` means:

> Parent directory.

Suppose you're here:

```text
/home/coder/projects
```

Run:

```bash
cd ..
```

Now you're here:

```text
/home/coder
```

---

# 29. `cd .`

```bash
cd .
```

`.` means:

> Current directory.

Therefore:

```bash
cd .
```

essentially means:

> Stay where you are.

It may look useless now, but `.` becomes very useful in paths and commands.

For example:

```bash
./program
```

means:

> Execute `program` from the current directory.

---

# 30. Absolute vs Relative Paths

This is **very important**.

### Absolute path

Starts from `/`.

Example:

```text
/home/coder/projects/app
```

It gives the complete path.

### Relative path

Starts from your current directory.

Suppose:

```text
pwd
```

returns:

```text
/home/coder
```

Then:

```bash
cd projects
```

means:

```text
/home/coder/projects
```

because `projects` is interpreted relative to your current location.

---

# 31. Linux Path Mental Model

Remember these:

```text
/       → filesystem root
.       → current directory
..      → parent directory
~       → current user's home directory
```

This tiny concept is foundational.

---

# 🧪 Your First Linux Practice

Open your WSL/Linux terminal and **don't just copy-paste**. Type these yourself:

```bash
pwd
```

Then:

```bash
ls
```

Then:

```bash
ls -la
```

Then:

```bash
cd /
```

Then:

```bash
pwd
```

Then:

```bash
ls
```

Then:

```bash
cd /tmp
```

Then:

```bash
pwd
```

Then:

```bash
cd ..
```

Then:

```bash
pwd
```

Finally:

```bash
cd ~
pwd
```

---

# 🎯 What You Learned Today

```text
Terminal
   ↓
provides text interface

Shell
   ↓
interprets commands

Bash
   ↓
one type of shell

Command
   ↓
asks shell to perform an operation

pwd
   ↓
shows current working directory

ls
   ↓
lists directory contents

cd
   ↓
changes current directory
```

And filesystem navigation:

```text
/   → root
~   → home
.   → current directory
..  → parent directory
```

---

# 🚀 Next Lesson

Before we start learning dozens of commands, the **next part should be Linux filesystem hierarchy in depth**:

```text
/
├── /home
├── /root
├── /etc
├── /var
├── /usr
├── /bin
├── /sbin
├── /dev
├── /proc
├── /sys
├── /run
├── /tmp
├── /opt
├── /mnt
├── /media
└── /boot
```

We'll understand **what each directory is for, what normally lives there, which ones are real vs virtual filesystems, what happens during boot, and which directories you should/shouldn't modify**.

After that we'll return to **basic commands** and start learning them one-by-one like a Linux administrator.
