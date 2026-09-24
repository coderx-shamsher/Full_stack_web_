# Linux Mastery — Users, Privileges & Process Management

In this section, we’ll learn how Linux manages:

* Administrative privileges

* The `root` user

* Running programs and processes

* Process IDs

* Monitoring processes

* Sending signals

* Stopping or terminating processes

* Foreground and background jobs

* `nohup` for long-running commands

# Part 1: `sudo` and `root`

## 1. What is `root`?

### Technical Definition

`root` is the Linux superuser account. It has almost unrestricted permissions over the system.

The root user can generally:

* Install and remove software

* Create, modify, and delete users

* Change file ownership and permissions

* Start and stop system services

* Read or modify protected files

* Change system configuration

* Kill almost any process

* Access hardware and system resources

The root user has a UID of:

Bash

```
0
```

You can check the current user:

Bash

```
whoami
```

Check UID and groups:

Bash

```
id
```

Example output:

```
uid=1000(coder) gid=1000(coder) groups=1000(coder),27(sudo)
```

For root, it may show:

```
uid=0(root) gid=0(root) groups=0(root)
```

## Simple Hinglish

Linux mein normal user ke paas limited permissions hoti hain.

`root` system ka highest-privilege user hota hai.

Example:

* Normal user: apne files modify kar sakta hai.

* Root: almost kisi bhi user ki files aur system settings modify kar sakta hai.

Isliye root powerful bhi hai aur dangerous bhi.

> Root ke saath ek galat command poore system ko damage kar sakti hai.

# 2. What is `sudo`?

## Technical Definition

`sudo` means:

> Superuser Do

It allows an authorized normal user to execute a command with elevated privileges, usually as root.

Syntax:

Bash

```
sudo command
```

Example:

Bash

```
sudo apt update
```

Here, `apt update` root privileges ke saath run hota hai.

## Hinglish Explanation

`sudo` ka matlab hai:

> “Is ek command ko administrator/root permission ke saath chalao.”

Example:

Bash

```
apt update
```

Agar permission denied aaye, use:

Bash

```
sudo apt update
```

# 3. Why is `sudo` safer than logging in as root?

With `sudo`:

* You use elevated privileges only when needed.

* Normal commands still run as your normal user.

* Commands can be logged.

* You reduce accidental system damage.

* You don't need to stay in a permanent root shell.

Recommended:

Bash

```
sudo apt install nginx
```

Less preferable for routine work:

Bash

```
su -
```

and then running everything as root.

# 4. Important `sudo` Commands

### Run one command as root

Bash

```
sudo command
```

Example:

Bash

```
sudo systemctl restart nginx
```

### Open a root login shell

Bash

```
sudo -i
```

Now:

Bash

```
whoami
```

Output:

```
root
```

Exit:

Bash

```
exit
```

### Open a root shell using current environment

Bash

```
sudo -s
```

Difference:

* `sudo -i`: root login environment

* `sudo -s`: root shell using a shell environment

For learning, prefer one-command `sudo` whenever possible.

### Run command as another user

Bash

```
sudo -u username command
```

Example:

Bash

```
sudo -u alice whoami
```

Output:

```
alice
```

### Check sudo permissions

Bash

```
sudo -l
```

This shows which commands the current user is allowed to run with `sudo`.

# 5. `su` vs `sudo`

|
Command

|

Meaning

|
| --- | --- |
|

`sudo command`

|

Run one command with elevated privilege

|
|

`sudo -i`

|

Open root login shell

|
|

`su username`

|

Switch to another user

|
|

`su -`

|

Switch user with login environment

|
|

`sudo -u user command`

|

Run command as another user

|

Example:

Bash

```
su -
```

This generally asks for the root account password.

But:

Bash

```
sudo -i
```

usually asks for the current user's password, provided that user has sudo permission.

# 6. Root Safety Rules

Before running a command with `sudo`, ask:

1. What exactly will this command change?

2. Am I in the correct directory?

3. Is the command deleting or overwriting anything?

4. Did I check the command syntax?

5. Do I really need root privileges?

Be especially careful with:

Bash

```
sudo rm -rf
```

Bash

```
sudo chmod -R
```

Bash

```
sudo chown -R
```

Bash

```
sudo dd
```

Bash

```
sudo mkfs
```

These can cause serious damage if used incorrectly.

# Part 2: Processes and PIDs

# 1. What is a process?

## Technical Definition

A process is an instance of a running program.

When you execute a program, Linux loads it into memory and creates a process with its own:

* Process ID

* Memory space

* CPU state

* Open files

* Environment variables

* Security permissions

* Parent process information

For example, when you run:

Bash

```
firefox
```

Linux creates a process for Firefox.

When you run:

Bash

```
node app.js
```

Linux creates a Node.js process.

## Simple Hinglish

Program ek file/code hota hai.

Process us program ka running form hota hai.

Example:

```
Program: calculator application
Process: calculator currently running
```

Agar program ko run nahi kiya, to woh normally process nahi hai.

# 2. What is PID?

## Technical Definition

PID means:

> Process ID

It is a unique numeric identifier assigned by the Linux kernel to a running process.

Example:

```
PID  COMMAND
1200 firefox
1450 node
1800 bash
```

You can use the PID to inspect or control a process.

## Find your current shell PID

Bash

```
echo $$
```

`$$` is a shell variable containing the PID of the current shell.

Example:

```
2451
```

## Find parent process ID

Bash

```
echo $PPID
```

`$PPID` means Parent Process ID.

# 3. Special Process IDs

### PID 1

On most modern Linux systems, PID 1 is commonly:

```
systemd
```

It is responsible for starting and managing many system services.

On some systems, PID 1 may be another init system.

Check it:

Bash

```
ps -p 1 -f
```

### PID 0

PID 0 is associated with the kernel scheduler or special kernel context. It is not a normal user-space process.

# 4. Parent and Child Processes

A process can create another process.

Example:

```
systemd
  └── bash
       └── sleep
```

Here:

* `systemd` is the parent of `bash`.

* `bash` is the parent of `sleep`.

* `sleep` is the child process.

Linux process relationships form a process tree.

# Part 3: `ps`

## Technical Definition

`ps` means process status.

It displays information about currently running processes.

# Basic Usage

Bash

```
ps
```

Usually, this shows processes associated with the current terminal.

Example:

```
PID TTY          TIME CMD
2451 pts/0    00:00:00 bash
2780 pts/0    00:00:00 ps
```

The `ps` command itself appears because it is also a running process while executing.

# Important `ps` Forms

Linux has different option styles for `ps`.

## Show processes for the current user

Bash

```
ps -u
```

More detailed:

Bash

```
ps -u "$USER"
```

## Show all processes of the current terminal

Bash

```
ps -f
```

`-f` means full-format listing.

## Show all processes

Bash

```
ps -e
```

or:

Bash

```
ps -A
```

Both generally display all processes.

## Full details of all processes

Bash

```
ps -ef
```

Common output:

```
UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 10:00 ?        00:00:02 /sbin/init
coder       2451    2200  0 20:10 pts/0    00:00:00 bash
coder       2900    2451  0 20:12 pts/0    00:00:00 ps -ef
```

Important columns:

|
Column

|

Meaning

|
| --- | --- |
|

`UID`

|

User who owns the process

|
|

`PID`

|

Process ID

|
|

`PPID`

|

Parent Process ID

|
|

`C`

|

CPU utilization indicator

|
|

`STIME`

|

Start time

|
|

`TTY`

|

Terminal associated with process

|
|

`TIME`

|

CPU time used

|
|

`CMD`

|

Command used to start process

|

## BSD-style process view

Bash

```
ps aux
```

This is extremely common.

Meaning:

* `a`: processes for all users with terminals

* `u`: user-oriented format

* `x`: include processes without a controlling terminal

Example:

Bash

```
ps aux
```

Important columns:

|
Column

|

Meaning

|
| --- | --- |
|

`USER`

|

Process owner

|
|

`PID`

|

Process ID

|
|

`%CPU`

|

CPU usage

|
|

`%MEM`

|

Memory usage

|
|

`VSZ`

|

Virtual memory size

|
|

`RSS`

|

Resident memory in RAM

|
|

`STAT`

|

Process state

|
|

`START`

|

Start time

|
|

`TIME`

|

CPU time

|
|

`COMMAND`

|

Full command

|

## Search a specific PID

Bash

```
ps -p 2451
```

Detailed:

Bash

```
ps -p 2451 -f
```

## Show process tree

Bash

```
ps --forest
```

Or:

Bash

```
ps -ef --forest
```

This helps understand parent-child relationships.

# Part 4: `top`

## Technical Definition

`top` is an interactive, real-time process monitoring tool.

It continuously displays:

* CPU usage

* Memory usage

* Load average

* Running processes

* Process states

* Resource consumption

Run:

Bash

```
top
```

## Important `top` Keys

While `top` is running:

|
Key

|

Action

|
| --- | --- |
|

`q`

|

Quit

|
|

`P`

|

Sort by CPU usage

|
|

`M`

|

Sort by memory usage

|
|

`N`

|

Sort by PID

|
|

`T`

|

Sort by CPU time

|
|

`k`

|

Send signal/kill a process

|
|

`r`

|

Change process priority

|
|

`1`

|

Show individual CPU cores

|
|

`h`

|

Help

|
|

`Space`

|

Refresh immediately

|

To stop `top`:

```
q
```

## Understand top's summary

Typical information:

```
load average: 0.20, 0.15, 0.10
```

These represent average system load over approximately:

```
1 minute, 5 minutes, 15 minutes
```

Load average is not exactly the same as CPU percentage. It represents runnable or uninterruptible work waiting for system resources.

# Part 5: `htop`

## Technical Definition

`htop` is an interactive process viewer similar to `top`, but generally more user-friendly.

It often provides:

* Colored display

* Scrollable process list

* Tree view

* Easier process selection

* Interactive function keys

* CPU core visualization

Run:

Bash

```
htop
```

If not installed:

Bash

```
sudo apt update
sudo apt install htop
```

## Important `htop` Keys

|
Key

|

Action

|
| --- | --- |
|

`F1`

|

Help

|
|

`F2`

|

Setup

|
|

`F3`

|

Search

|
|

`F4`

|

Filter

|
|

`F5`

|

Tree view

|
|

`F6`

|

Sort

|
|

`F9`

|

Kill/send signal

|
|

`F10`

|

Quit

|

You can also use:

```
q
```

to quit in many terminal setups.

# `top` vs `htop`

|
`top`

|

`htop`

|
| --- | --- |
|

Usually preinstalled

|

May need installation

|
|

Basic interface

|

More user-friendly

|
|

Available on minimal servers

|

Better interactive controls

|
|

Lightweight

|

More visual features

|

For servers, knowing `top` is important because `htop` may not be installed.

# Part 6: `pgrep`

## Technical Definition

`pgrep` searches running processes by name or other process attributes and prints matching PIDs.

## Basic Syntax

Bash

```
pgrep [options] pattern
```

Example:

Bash

```
pgrep firefox
```

Got it. You are reviewing/completing the process-management section, and the correct order is:

```
Processes and PIDs
   ├── ps, top, htop
   ├── pgrep
   ├── Signals, kill, pkill
   ├── Process priority
   ├── /proc
   └── Foreground/background jobs
         ├── jobs
         ├── bg
         ├── fg
         └── nohup
```

We already covered most of these, but process priority and `/proc` were missing, and `pgrep`, signals, and job control need to be organized into the complete section.

# Linux Process Management — Complete Section

# 1. `pgrep`

## Technical Definition

`pgrep` searches currently running processes based on their name, user, terminal, or other attributes and displays their PIDs.

## Hinglish

`pgrep` ka use kisi running process ka PID dhundne ke liye hota hai.

### Syntax

Bash

```
pgrep [options] pattern
```

### Find a process by name

Bash

```
pgrep nginx
```

### Show PID and complete command

Bash

```
pgrep -a nginx
```

### Show full command line

Bash

```
pgrep -af node
```

### Exact process-name match

Bash

```
pgrep -x bash
```

### Find processes owned by a user

Bash

```
pgrep -u coder
```

### Practical example

Bash

```
pgrep -af "node server.js"
```

This helps you find the PID of a running Node.js server.

### `pgrep` vs `ps | grep`

Instead of:

Bash

```
ps aux | grep nginx
```

you can use:

Bash

```
pgrep -a nginx
```

`pgrep` is cleaner because it directly searches the process table.

# 2. Signals

## Technical Definition

A signal is a software notification sent to a process or the kernel to request a specific action.

Signals can ask a process to:

* Interrupt

* Terminate

* Stop

* Continue

* Reload configuration

* Quit

## Hinglish

Signal process ko bheja gaya ek message hai:

> “Stop ho jao”, “pause ho jao”, “continue karo”, ya “reload karo”.

### List all signals

Bash

```
kill -l
```

## Important Signals

|
Signal

|

Number

|

Purpose

|
| --- | --- | --- |
|

`SIGHUP`

|

1

|

Terminal hangup; often used for reload

|
|

`SIGINT`

|

2

|

Interrupt; usually `Ctrl+C`

|
|

`SIGQUIT`

|

3

|

Quit, possibly create core dump

|
|

`SIGKILL`

|

9

|

Forcefully terminate

|
|

`SIGTERM`

|

15

|

Graceful termination request

|
|

`SIGSTOP`

|

19

|

Stop/pause process

|
|

`SIGCONT`

|

18

|

Continue stopped process

|
|

`SIGTSTP`

|

20

|

Terminal stop; usually `Ctrl+Z`

|

# 3. `kill`

## Technical Definition

`kill` sends a signal to a process using its PID.

Despite its name, `kill` can send signals other than termination.

### Syntax

Bash

```
kill [signal] PID
```

### Gracefully terminate a process

Bash

```
kill PID
```

By default, this normally sends `SIGTERM`.

Equivalent:

Bash

```
kill -TERM PID
```

or:

Bash

```
kill -15 PID
```

### Forcefully terminate

Bash

```
kill -9 PID
```

or:

Bash

```
kill -KILL PID
```

### Stop a process

Bash

```
kill -STOP PID
```

### Continue a stopped process

Bash

```
kill -CONT PID
```

### Check whether a process exists

Bash

```
kill -0 PID
```

`kill -0` does not terminate the process. It checks whether the process exists and whether you have permission to signal it.

## `SIGTERM` vs `SIGKILL`

### `SIGTERM`

Bash

```
kill -TERM PID
```

This politely asks the process to stop. The process may:

* Save data

* Close files

* Clean up resources

* Perform shutdown operations

### `SIGKILL`

Bash

```
kill -9 PID
```

This immediately forces termination. The process cannot catch, ignore, or handle `SIGKILL`.

### Recommended order

```
SIGTERM
   ↓
Check whether process stopped
   ↓
SIGKILL only if necessary
```

Do not use `kill -9` as your first choice.

# 4. `pkill`

## Technical Definition

`pkill` sends signals to processes based on their names or matching criteria.

### Syntax

Bash

```
pkill [options] pattern
```

### Terminate processes by name

Bash

```
pkill firefox
```

### Send graceful termination

Bash

```
pkill -TERM firefox
```

### Forcefully terminate

Bash

```
pkill -KILL firefox
```

### Exact process-name match

Bash

```
pkill -x firefox
```

### Match processes owned by a user

Bash

```
pkill -u coder firefox
```

## Safety Rule

Before using `pkill`, inspect the matching processes:

Bash

```
pgrep -af firefox
```

Be careful with broad commands such as:

Bash

```
pkill node
```

This may terminate multiple Node.js applications.

# 5. Process Priority

Linux allows processes to receive different CPU scheduling priorities.

There are two important concepts:

1. Nice value

2. Niceness

## Technical Definition

The nice value influences how much CPU scheduling preference a normal process receives compared with other normal processes.

The usual nice-value range is:

```
-20 to 19
```

* `-20` = highest priority among normal nice values

* `19` = lowest priority

* `0` = default

Important:

> A higher nice value means the process is “nicer” to other processes because it receives less CPU preference.

## Hinglish

Imagine several processes CPU ke liye compete kar rahe hain.

* Low nice value: process ko comparatively zyada CPU preference mil sakti hai.

* High nice value: process CPU ko dusre processes ke liye zyada free chhodta hai.

  Nice -20 → higher priority
  Nice   0 → default
  Nice  19 → lower priority

This is a scheduling preference, not a strict guarantee.

# 5.1 `nice`

## Technical Definition

`nice` starts a new command with a specified nice value.

### Syntax

Bash

```
nice -n VALUE command
```

### Start with default nice value

Bash

```
nice sleep 100
```

### Start with lower CPU priority

Bash

```
nice -n 10 python3 backup.py
```

This runs the backup with a higher nice value, making it less aggressive in CPU usage.

### Start with higher CPU priority

Bash

```
nice -n -5 command
```

Changing to a negative nice value usually requires elevated privileges:

Bash

```
sudo nice -n -5 command
```

# 5.2 `renice`

## Technical Definition

`renice` changes the nice value of an already-running process.

### Syntax

Bash

```
renice VALUE -p PID
```

### Change process priority

Bash

```
renice 10 -p 4500
```

This changes the process's nice value to `10`.

### Increase priority

Bash

```
sudo renice -5 -p 4500
```

Normal users generally cannot arbitrarily increase a process's priority or give it a more favorable negative nice value.

# 5.3 Check nice value

Using `ps`:

Bash

```
ps -o pid,ni,pri,comm -p PID
```

Important columns:

|
Column

|

Meaning

|
| --- | --- |
|

`PID`

|

Process ID

|
|

`NI`

|

Nice value

|
|

`PRI`

|

Scheduling priority

|
|

`COMMAND`

|

Process name

|

For all processes:

Bash

```
ps -eo pid,ni,pri,comm
```

Using `top`:

Bash

```
top
```

Look for:

* `NI` = nice value

* `PR` = priority

## Important Difference: `NI` and `PR`

* `NI` is the configured nice value.

* `PR` is the scheduler priority shown by the monitoring tool.

Do not assume they are always identical.

## Practical Example

Start a CPU-consuming test process with lower priority:

Bash

```
nice -n 15 sha256sum /dev/zero
```

Stop it with `Ctrl+C`.

Or run it in the background:

Bash

```
nice -n 15 sha256sum /dev/zero &
```

Find it:

Bash

```
pgrep -af sha256sum
```

Inspect it:

Bash

```
ps -o pid,ni,pri,comm -p PID
```

Change its nice value:

Bash

```
renice 19 -p PID
```

Stop it:

Bash

```
kill PID
```

⚠️ Do not leave an infinite CPU-consuming process running unnecessarily.

# 6. `/proc`

## Technical Definition

`/proc` is a virtual, pseudo-filesystem provided by the Linux kernel. It exposes information about:

* Running processes

* Kernel state

* CPU information

* Memory usage

* System configuration

* Hardware and runtime statistics

It does not behave like a normal disk directory. Much of its content is generated dynamically by the kernel.

Check it:

Bash

```
ls /proc
```

## Hinglish

`/proc` ko Linux ka live information center samjho.

Yahan files mein system aur processes ki current information milti hai.

Most information real-time kernel se generate hoti hai.

# 6.1 Process directories inside `/proc`

Every running process usually has a directory named after its PID.

Example:

```
/proc/1
/proc/1000
/proc/2451
```

If your process PID is `2451`:

Bash

```
ls /proc/2451
```

Common entries include:

|
Entry

|

Information

|
| --- | --- |
|

`/proc/PID/cmdline`

|

Command used to start process

|
|

`/proc/PID/comm`

|

Process name

|
|

`/proc/PID/status`

|

Human-readable process status

|
|

`/proc/PID/stat`

|

Process statistics

|
|

`/proc/PID/environ`

|

Environment variables

|
|

`/proc/PID/fd/`

|

Open file descriptors

|
|

`/proc/PID/cwd`

|

Current working directory

|
|

`/proc/PID/exe`

|

Executable path

|
|

`/proc/PID/root`

|

Process root directory

|

## Read process name

Bash

```
cat /proc/$$/comm
```

Here, `$$` means the current shell's PID.

## Read process status

Bash

```
cat /proc/$$/status
```

This may show:

```
Name:
State:
Pid:
PPid:
Uid:
Gid:
Threads:
VmSize:
VmRSS:
```

## Read command line

Bash

```
cat /proc/$$/cmdline
```

The output may appear without normal line breaks because `/proc/PID/cmdline` uses null separators.

A clearer version:

Bash

```
tr '\0' ' ' < /proc/$$/cmdline
```

## Read environment variables

Bash

```
tr '\0' '\n' < /proc/$$/environ
```

This displays the environment variables of the current shell process.

Remember: access to another process's environment may be restricted by permissions.

## Check current working directory

Bash

```
readlink /proc/$$/cwd
```

## Check executable path

Bash

```
readlink /proc/$$/exe
```

## List open file descriptors

Bash

```
ls -l /proc/$$/fd
```

A process may have file descriptors such as:

```
0 → stdin
1 → stdout
2 → stderr
```

# 6.2 Important system-wide `/proc` files

## CPU information

Bash

```
cat /proc/cpuinfo
```

## Memory
