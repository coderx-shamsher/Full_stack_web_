# Phase 2 — Linux Users, Permissions & Ownership

This is one of the most important Linux topics because Linux is a multi-user operating system. Multiple users and services can work on the same machine, and Linux controls who can access, modify, or execute files.

We will cover:

1. Users and groups

2. Root user and `sudo`

3. User-related files

4. Creating users

5. Modifying users

6. Deleting users

7. Password management

8. Groups and group management

9. File ownership

10. Linux permissions

11. `chmod`

12. `chown`

13. `chgrp`

14. Special permissions: SUID, SGID, Sticky Bit

15. ACLs

16. Best practices and safety

17. Practical lab and exercises

> Important: Practice user-management commands inside a VM, test Linux installation, or disposable WSL environment. Do not experiment with deleting or modifying important system users on your main machine.

# 1. Users in Linux

## Technical Definition

A user is an identity recognized by the Linux operating system. Every process runs with a user identity, and that identity determines what resources the process can access.

Linux uses a numeric identifier called a UID:

> UID = User ID

Each user normally has:

* Username

* UID

* Primary group

* Supplementary groups

* Home directory

* Login shell

* Password/account information

* File ownership relationships

Example:

```
Username: coder
UID: 1000
Primary group: coder
Home: /home/coder
Shell: /bin/bash
```

## Hinglish Explanation

Linux mein user ka matlab sirf login karne wala person nahi hai.

A user ek identity hai jiske naam par:

* Files own hoti hain

* Processes run hote hain

* Permissions apply hoti hain

* Commands ko access milta hai

Linux har user ko ek number deta hai, jise UID kehte hain.

# 2. Types of Users

Linux systems generally contain three broad categories of users.

## 2.1 Root User

The root user is the superuser.

```
Username: root
UID: 0
```

Root can generally:

* Create and delete users

* Change ownership

* Modify system files

* Install packages

* Start and stop services

* Change permissions

* Access many files regardless of normal permissions

Check:

Bash

```
id root
```

Example:

```
uid=0(root) gid=0(root) groups=0(root)
```

### Important Warning

Root has extremely high privileges.

A command such as:

Bash

```
rm -rf /
```

or an incorrectly constructed command using `sudo` can severely damage the system.

> Use root privileges only when necessary.

## 2.2 Normal/Regular Users

Regular users generally have UIDs starting from a distribution-defined range, commonly around `1000` and above on desktop Linux systems.

Example:

```
coder
developer
student
```

A normal user usually has:

```
/home/username
```

as its home directory.

## 2.3 System Users

System users are created for services and background processes.

Examples may include:

```
www-data
nobody
daemon
messagebus
systemd-network
```

They may not be intended for interactive login.

For example, a web server may run as `www-data` instead of root to reduce risk.

### Security Principle

> A service should run with the minimum privileges required for its job.

This is called the principle of least privilege.

# 3. Important User-Identity Commands

## 3.1 `whoami`

### Definition

Displays the username of the current effective user.

### Syntax

Bash

```
whoami
```

Example:

Bash

```
whoami
```

Output:

```
coder
```

### Hinglish

Yeh batata hai:

> “Main abhi kis user ke naam se command chala raha hoon?”

## 3.2 `id`

### Definition

Displays the current user's UID, GID, and group memberships.

### Syntax

Bash

```
id [options] [username]
```

Examples:

Bash

```
id
id coder
id root
```

Example output:

```
uid=1000(coder) gid=1000(coder) groups=1000(coder),27(sudo),100(users)
```

Meaning:

|
Part

|

Meaning

|
| --- | --- |
|

`uid=1000(coder)`

|

User ID and username

|
|

`gid=1000(coder)`

|

Primary group ID and name

|
|

`groups=...`

|

Groups the user belongs to

|

### Useful options

|
Option

|

Meaning

|
| --- | --- |
|

`-u`

|

Display only UID

|
|

`-g`

|

Display only primary GID

|
|

`-G`

|

Display all group IDs

|
|

`-n`

|

Display names instead of numeric IDs

|
|

`-r`

|

Display real ID instead of effective ID

|

Examples:

Bash

```
id -u
id -g
id -G
id -un
id -gn
```

## 3.3 `groups`

### Definition

Displays the groups to which a user belongs.

### Syntax

Bash

```
groups [username]
```

Examples:

Bash

```
groups
groups coder
```

Output:

```
coder : coder sudo users
```

### Difference between `id` and `groups`

* `id` displays UID, GID, and detailed identity information.

* `groups` focuses mainly on group membership.

## 3.4 `who`

### Definition

Displays users currently logged into the system.

Bash

```
who
```

Example:

```
coder   pts/0   2026-09-11 19:30
```

Useful for checking active login sessions.

## 3.5 `w`

### Definition

Displays currently logged-in users and what they are doing.

Bash

```
w
```

Example:

```
 19:40:00 up 2 days,  3:12,  1 user,  load average: 0.10, 0.08, 0.05
USER   TTY   FROM       LOGIN@   IDLE   JCPU   PCPU WHAT
coder  pts/0  localhost 19:30    1.00s  0.10s  0.02s w
```

It can show:

* Current time

* System uptime

* Number of logged-in users

* Load average

* User sessions

* Current command

## 3.6 `last`

### Definition

Displays login history, usually from system login records.

Bash

```
last
```

Useful options:

Bash

```
last -n 10
last coder
```

|
Option

|

Meaning

|
| --- | --- |
|

`-n 10`

|

Show last 10 entries

|

Note: Availability and exact records depend on the system and login configuration.

# 4. User Database Files

Linux stores local user and group information in important files.

## 4.1 `/etc/passwd`

### Definition

`/etc/passwd` contains basic account information for local users.

View it:

Bash

```
cat /etc/passwd
```

A typical line looks like:

```
coder:x:1000:1000:Coder User:/home/coder:/bin/bash
```

The fields are separated by colons:

```
username:password-placeholder:UID:GID:GECOS:home:shell
```

|
Field

|

Meaning

|
| --- | --- |
|

`coder`

|

Username

|
|

`x`

|

Password hash is stored elsewhere

|
|

`1000`

|

UID

|
|

`1000`

|

Primary GID

|
|

`Coder User`

|

Comment/full name field

|
|

`/home/coder`

|

Home directory

|
|

`/bin/bash`

|

Login shell

|

### Important

The password field usually contains `x`, meaning the password hash is stored in `/etc/shadow`.

## 4.2 `/etc/shadow`

### Definition

`/etc/shadow` stores password hashes and password-aging information.

View it:

Bash

```
sudo cat /etc/shadow
```

Access is restricted because it contains sensitive authentication data.

A shadow entry may look conceptually like:

```
coder:$6$hash...:...
```

Do not share or expose this file.

### Important permissions

Typically, `/etc/shadow` is readable only by root or a restricted administrative group.

## 4.3 `/etc/group`

### Definition

`/etc/group` contains local group information.

View it:

Bash

```
cat /etc/group
```

Example:

```
developers:x:1001:coder,alice
```

Fields:

```
groupname:password-placeholder:GID:members
```

## 4.4 `/etc/gshadow`

Stores additional secure group information, including group administrator and membership-related data.

View only when necessary:

Bash

```
sudo cat /etc/gshadow
```

Do not modify these files manually unless you fully understand the account database format. Use account-management commands instead.

# 5. Creating Users

There are two commonly encountered commands:

* `useradd`

* `adduser`

They are related but not identical.

# 5.1 `useradd`

## Technical Definition

`useradd` is a low-level command used to create a new user account.

### Basic Syntax

Bash

```
sudo useradd [options] username
```

Example:

Bash

```
sudo useradd devuser
```

This creates the account, but depending on distribution and options, it may not create a home directory or configure a usable login environment.

### Recommended Basic Form

Bash

```
sudo useradd -m -s /bin/bash devuser
```

Meaning:

* `-m`: Create the home directory

* `-s /bin/bash`: Set Bash as the login shell

Then set a password:

Bash

```
sudo passwd devuser
```

## Important `useradd` Options

|
Option

|

Definition

|

Example

|
| --- | --- | --- |
|

`-m`

|

Create home directory

|

`useradd -m devuser`

|
|

`-M`

|

Do not create home directory

|

`useradd -M serviceuser`

|
|

`-d`

|

Specify home directory

|

`-d /home/custom`

|
|

`-s`

|

Set login shell

|

`-s /bin/bash`

|
|

`-u`

|

Specify UID

|

`-u 1500`

|
|

`-g`

|

Set primary group

|

`-g developers`

|
|

`-G`

|

Add supplementary groups

|

`-G sudo,docker`

|
|

`-c`

|

Set comment/full name

|

`-c "Development User"`

|
|

`-e`

|

Set account expiration date

|

`-e 2027-01-01`

|
|

`-f`

|

Set password inactivity period

|

`-f 30`

|
|

`-r`

|

Create system account

|

`-r serviceuser`

|
|

`-U`

|

Create a group with same name and use it as primary group

|

`-U devuser`

|
|

`-N`

|

Do not create a private group

|

`-N devuser`

|
|

`-k`

|

Use files from a skeleton directory

|

`-k /etc/skel`

|
|

`-b`

|

Set base directory for home directories

|

`-b /home`

|
|

`-p`

|

Set encrypted password

|

Avoid using casually

|

### Recommended example

Bash

```
sudo useradd \
  -m \
  -s /bin/bash \
  -c "Application Developer" \
  devuser
```

Then:

Bash

```
sudo passwd devuser
```

### Important warning about `-p`

Do not put a plain-text password into a command.

This is unsafe:

Bash

```
sudo useradd -p mypassword devuser
```

The `-p` option expects an encrypted password, not a normal plain-text password. Also, command history may expose sensitive information.

Prefer:

Bash

```
sudo passwd devuser
```

# 5.2 `adduser`

## Technical Definition

`adduser` is a higher-level, more interactive user-creation utility available on many Debian-based systems, including Ubuntu and Debian.

Example:

Bash

```
sudo adduser devuser
```

It usually guides you through:

* Password creation

* Full name

* User information

* Home directory setup

### Why beginners often use `adduser`

It provides a friendlier workflow and applies distribution-specific defaults.

### `useradd` vs `adduser`

|
Feature

|

`useradd`

|

`adduser`

|
| --- | --- | --- |
|

Type

|

Low-level utility

|

Higher-level helper

|
|

Interaction

|

Usually non-interactive

|

Usually interactive

|
|

Automation

|

Very suitable

|

Less suitable for scripts

|
|

Defaults

|

Must often specify options

|

More guided defaults

|
|

Availability

|

Common on Linux

|

Common on Debian-based systems

|

### Hinglish

* `useradd` = detailed/manual control

* `adduser` = beginner-friendly guided command

For scripting and automation, `useradd` is commonly preferred. For manual Debian/Ubuntu administration, `adduser` is convenient.

# 6. Set and Manage Passwords

## 6.1 `passwd`

### Definition

`passwd` changes a user's password or manages password-related account settings.

### Syntax

Bash

```
passwd [options] [username]
```

Change your own password:

Bash

```
passwd
```

Change another user's password as administrator:

Bash

```
sudo passwd devuser
```

### Important Options

|
Option

|

Meaning

|
| --- | --- |
|

`-d`

|

Delete password

|
|

`-l`

|

Lock password

|
|

`-u`

|

Unlock password

|
|

`-e`

|

Expire password immediately

|
|

`-S`

|

Display password status

|
|

`-n`

|

Minimum password age

|
|

`-x`

|

Maximum password age

|
|

`-w`

|

Warning period before expiration

|
|

`-i`

|

Inactivity period after password expiration

|

Examples:

Bash

```
sudo passwd -S devuser
sudo passwd -e devuser
sudo passwd -l devuser
sudo passwd -u devuser
```

### Important distinction

Bash

```
sudo passwd -l devuser
```

locks the password authentication mechanism. It does not necessarily disable every possible authentication method or terminate existing sessions.

# 7. `chage` — Password Aging

## Technical Definition

`chage` changes password-aging and account-expiration settings.

### Syntax

Bash

```
sudo chage [options] username
```

View settings:

Bash

```
sudo chage -l devuser
```

Example output may include:

```
Last password change
Password expires
Password inactive
Account expires
Minimum number of days between password change
Maximum number of days between password change
Number of days of warning before password expires
```

### Important Options

|
Option

|

Meaning

|
| --- | --- |
|

`-l`

|

List password-aging information

|
|

`-d`

|

Set last password-change date

|
|

`-m`

|

Minimum days between password changes

|
|

`-M`

|

Maximum password age

|
|

`-W`

|

Warning days before expiration

|
|

`-I`

|

Inactivity days after expiration

|
|

`-E`

|

Account expiration date

|

Examples:

Bash

```
sudo chage -M 90 devuser
sudo chage -m 1 devuser
sudo chage -W 14 devuser
sudo chage -E 2027-01-01 devuser
```

### Good practice

For human users, define password-aging policies according to your organization’s security policy. Do not blindly force frequent password changes if your environment uses strong passwords, MFA, SSH keys, or centralized identity management.

# 8. Modifying Users

## 8.1 `usermod`

### Technical Definition

`usermod` modifies an existing user account.

### Syntax

Bash

```
sudo usermod [options] username
```

## Important `usermod` Options

|
Option

|

Meaning

|
| --- | --- |
|

`-l`

|

Change login name

|
|

`-d`

|

Change home directory

|
|

`-m`

|

Move existing home contents when used with `-d`

|
|

`-s`

|

Change login shell

|
|

`-u`

|

Change UID

|
|

`-g`

|

Change primary group

|
|

`-G`

|

Set supplementary groups

|
|

`-a`

|

Append groups instead of replacing them

|
|

`-c`

|

Change comment/full name

|
|

`-L`

|

Lock account password

|
|

`-U`

|

Unlock account password

|
|

`-e`

|

Set account expiration date

|
|

`-f`

|

Set password inactivity period

|
|

`-p`

|

Set encrypted password; avoid casual use

|

## Change a User's Shell

Bash

```
sudo usermod -s /bin/bash devuser
```

Set a non-login shell for a service account:

Bash

```
sudo usermod -s /usr/sbin/nologin serviceuser
```

Check available shells:

Bash

```
cat /etc/shells
```

### Why use `/usr/sbin/nologin`?

It prevents normal interactive login for accounts that should run services but should not be used as regular login accounts.

## Add User to Supplementary Groups

Bash

```
sudo usermod -aG developers devuser
```

Meaning:

* `-G developers`: supplementary group list

* `-a`: append instead of replacing existing supplementary groups

### Extremely important mistake

This command can remove existing supplementary group memberships:

Bash

```
sudo usermod -G developers devuser
```

The safer form for adding one group is:

Bash

```
sudo usermod -aG developers devuser
```

### Apply new group membership

The user may need to:

* Log out and log back in

* Start a new session

* Use `newgrp` for a temporary group context

Bash

```
newgrp developers
```

Check:

Bash

```
groups devuser
```

## Change Home Directory

Bash

```
sudo usermod -d /home/newhome -m devuser
```

Meaning:

* `-d /home/newhome`: new home directory

* `-m`: move existing contents

### Caution

Changing home directories can affect:

* SSH keys

* Shell configuration

* Application paths

* File ownership

* Scheduled jobs

* User-specific software

Plan carefully before doing this on a real system.

## Change Username

Bash

```
sudo usermod -l newname oldname
```

This changes the login name, but it does not automatically handle every path, ownership reference, or application configuration related to the old name.

For a complete rename, you may also need to update:

* Home directory

* Primary group

* File ownership

* Cron entries

* SSH configuration

* Application settings

# 9. Deleting Users

## 9.1 `userdel`

### Technical Definition

`userdel` deletes a user account.

### Syntax

Bash

```
sudo userdel [options] username
```

Delete the account but preserve the home directory:

Bash

```
sudo userdel devuser
```

Delete account and home


# Linux Mastery — Users, Groups, Permissions & Ownership

This topic is extremely important because Linux is a multi-user operating system. Linux controls:

* Who can log in

* Who owns a file

* Who can read, modify, or execute a file

* Which users can perform administrative tasks

* Which services can access specific resources

We will cover this in a practical, professional way:

1. Users and user identities

2. Root and `sudo`

3. User-related files

4. Creating users

5. Modifying users

6. Deleting and locking users

7. Password management

8. Groups and group management

9. Permissions

10. Ownership

11. `chmod`

12. `chown`

13. `chgrp`

14. Special permissions

15. ACLs

16. Troubleshooting

17. Best practices

18. Practice lab

# 1. What Is a Linux User?

## Technical Definition

A user is an identity recognized by the Linux operating system. Every process runs under a user identity, and Linux uses that identity to determine access to files, devices, processes, and other resources.

Each user has a unique numeric identifier called a UID.

```
UID = User ID
```

A user account generally contains:

* Username

* UID

* Primary group

* Supplementary groups

* Home directory

* Login shell

* Password information

* Account expiration information

Example:

```
Username: coder
UID: 1000
Primary Group: coder
Home Directory: /home/coder
Shell: /bin/bash
```

## Hinglish Explanation

Linux mein user ka matlab sirf woh person nahi hai jo computer use kar raha hai.

User ek identity hoti hai jiske through Linux decide karta hai:

> Is user ko kis file ko read, write, execute ya access karne ki permission hai?

# 2. Types of Linux Users

## 2.1 Root User

The root user is the superuser.

```
Username: root
UID: 0
```

Root can generally:

* Create and delete users

* Change ownership

* Change permissions

* Install software

* Start and stop services

* Modify system files

* Access many protected resources

Check root information:

Bash

```
id root
```

Example:

```
uid=0(root) gid=0(root) groups=0(root)
```

### Important Warning

Root has almost unrestricted power.

For example, an incorrect command such as:

Bash

```
rm -rf /some/important/path
```

can destroy important data.

Best practice: Use root privileges only when required.

## 2.2 Regular Users

Regular users are normal human accounts.

Examples:

```
coder
alice
developer
student
```

Their home directories are usually located under:

```
/home/username
```

Example:

```
/home/coder
/home/alice
```

## 2.3 System Users

System users are usually created for services and background processes.

Examples:

```
www-data
nobody
daemon
messagebus
```

A web server may run as `www-data` instead of root.

This follows the principle of:

> Least privilege: A process should have only the permissions it needs.

# 3. Important Identity Commands

## 3.1 `whoami`

### Definition

Displays the username of the current effective user.

### Syntax

Bash

```
whoami
```

Example:

Bash

```
whoami
```

Output:

```
coder
```

### Hinglish

Yeh batata hai:

> Main abhi kis user ke naam se command chala raha hoon?

## 3.2 `id`

### Definition

Displays the current user's UID, GID, and group memberships.

### Syntax

Bash

```
id [options] [username]
```

Examples:

Bash

```
id
id coder
id root
```

Example output:

```
uid=1000(coder) gid=1000(coder) groups=1000(coder),27(sudo),100(users)
```

### Important Options

|
Option

|

Meaning

|
| --- | --- |
|

`-u`

|

Show UID only

|
|

`-g`

|

Show primary GID only

|
|

`-G`

|

Show all group IDs

|
|

`-n`

|

Show names instead of numbers

|
|

`-r`

|

Show real ID instead of effective ID

|

Examples:

Bash

```
id -u
id -g
id -G
id -un
id -gn
```

Useful combinations:

Bash

```
id -un
```

Meaning:

> Show the current username.

Bash

```
id -Gn
```

Meaning:

> Show all group names of the current user.

## 3.3 `groups`

### Definition

Displays the groups to which a user belongs.

Bash

```
groups
groups coder
```

Example:

```
coder : coder sudo developers
```

### Difference

|
Command

|

Main Purpose

|
| --- | --- |
|

`id`

|

UID, GID, and detailed identity

|
|

`groups`

|

Group membership

|

## 3.4 `who`

### Definition

Shows users currently logged into the system.

Bash

```
who
```

Possible output:

```
coder  pts/0  2026-09-11 19:30
```

## 3.5 `w`

### Definition

Shows logged-in users and what they are currently doing.

Bash

```
w
```

It may display:

* Current time

* System uptime

* Logged-in users

* Idle time

* Current commands

* System load average

## 3.6 `last`

### Definition

Displays login history.

Bash

```
last
```

Show the last 10 entries:

Bash

```
last -n 10
```

Search a specific user's login history:

Bash

```
last coder
```

The exact output depends on system logging configuration.

# 4. Linux User Database Files

Linux stores local user and group information in several important files.

## 4.1 `/etc/passwd`

### Definition

`/etc/passwd` stores basic information about local user accounts.

View it:

Bash

```
cat /etc/passwd
```

Example line:

```
coder:x:1000:1000:Coder User:/home/coder:/bin/bash
```

The fields are separated by `:`.

```
username:password:UID:GID:comment:home:shell
```

|
Field

|

Meaning

|
| --- | --- |
|

`coder`

|

Username

|
|

`x`

|

Password information stored in `/etc/shadow`

|
|

`1000`

|

UID

|
|

`1000`

|

Primary GID

|
|

`Coder User`

|

Comment/full name

|
|

`/home/coder`

|

Home directory

|
|

`/bin/bash`

|

Login shell

|

### Important

The `x` does not mean the password is literally `x`. It normally means the password hash is stored in `/etc/shadow`.

## 4.2 `/etc/shadow`

### Definition

`/etc/shadow` stores password hashes and password-aging information.

View it only when necessary:

Bash

```
sudo cat /etc/shadow
```

This file is sensitive and normally restricted.

It may contain:

* Password hash

* Last password-change date

* Password expiration period

* Password inactivity period

* Account expiration information

### Best Practice

Never share `/etc/shadow` contents publicly.

## 4.3 `/etc/group`

### Definition

`/etc/group` stores local group information.

Bash

```
cat /etc/group
```

Example:

```
developers:x:1001:coder,alice,bob
```

Format:

```
groupname:password-placeholder:GID:members
```

## 4.4 `/etc/gshadow`

Stores secure group-management information.

Bash

```
sudo cat /etc/gshadow
```

Do not manually edit these account files unless you know exactly what you are doing. Prefer commands such as `useradd`, `usermod`, `groupadd`, and `passwd`.

# 5. Creating Users

Linux commonly provides two commands:

* `useradd`

* `adduser`

# 5.1 `useradd`

## Technical Definition

`useradd` is a low-level command used to create a user account.

### Syntax

Bash

```
sudo useradd [options] username
```

### Basic Example

Bash

```
sudo useradd devuser
```

Depending on the distribution and options, this may not create a home directory or configure all login settings.

### Recommended Form

Bash

```
sudo useradd -m -s /bin/bash devuser
```

Meaning:

* `-m`: Create the home directory

* `-s /bin/bash`: Set Bash as the login shell

Then set a password:

Bash

```
sudo passwd devuser
```

## Important `useradd` Options

|
Option

|

Definition

|

Example

|
| --- | --- | --- |
|

`-m`

|

Create home directory

|

`useradd -m devuser`

|
|

`-M`

|

Do not create home directory

|

`useradd -M serviceuser`

|
|

`-d`

|

Specify home directory

|

`-d /home/custom`

|
|

`-s`

|

Set login shell

|

`-s /bin/bash`

|
|

`-u`

|

Specify UID

|

`-u 1500`

|
|

`-g`

|

Set primary group

|

`-g developers`

|
|

`-G`

|

Set supplementary groups

|

`-G developers,sudo`

|
|

`-c`

|

Set comment/full name

|

`-c "Development User"`

|
|

`-e`

|

Set account expiration date

|

`-e 2027-01-01`

|
|

`-f`

|

Set password inactivity period

|

`-f 30`

|
|

`-r`

|

Create a system account

|

`-r serviceuser`

|
|

`-U`

|

Create a private group with the same name

|

`-U devuser`

|
|

`-N`

|

Do not create a private group

|

`-N devuser`

|
|

`-k`

|

Use a skeleton directory

|

`-k /etc/skel`

|
|

`-b`

|

Set base directory for home directories

|

`-b /home`

|

### Professional Example

Bash

```
sudo useradd \
  -m \
  -s /bin/bash \
  -c "Application Developer" \
  devuser
```

Set the password:

Bash

```
sudo passwd devuser
```

## Warning About `useradd -p`

Avoid this:

Bash

```
sudo useradd -p mypassword devuser
```

Problems:

* `-p` expects an encrypted password, not normal plain text

* The password may be stored in shell history

* It may be visible to other users through process inspection in some situations

Prefer:

Bash

```
sudo passwd devuser
```

# 5.2 `adduser`

## Technical Definition

`adduser` is a higher-level, interactive user-creation utility commonly available on Debian-based distributions.

Bash

```
sudo adduser devuser
```

It usually guides you through:

* Password

* Full name

* User information

* Home directory setup

### `useradd` vs `adduser`

|
Feature

|

`useradd`

|

`adduser`

|
| --- | --- | --- |
|

Type

|

Low-level utility

|

High-level helper

|
|

Interaction

|

Usually non-interactive

|

Usually interactive

|
|

Automation

|

Better for scripts

|

Less suitable for scripts

|
|

Defaults

|

More manual

|

More guided

|
|

Common usage

|

Automation and detailed control

|

Manual Debian/Ubuntu administration

|

### Hinglish

* `useradd` = manual and powerful

* `adduser` = guided and beginner-friendly

# 6. Password Management with `passwd`

## Technical Definition

`passwd` changes a user's password and manages password-related settings.

### Syntax

Bash

```
passwd [options] [username]
```

Change your own password:

Bash

```
passwd
```

Change another user's password as administrator:

Bash

```
sudo passwd devuser
```

## Important `passwd` Options

|
Option

|

Meaning

|
| --- | --- |
|

`-d`

|

Delete password

|
|

`-l`

|

Lock password

|
|

`-u`

|

Unlock password

|
|

`-e`

|

Expire password immediately

|
|

`-S`

|

Display password status

|
|

`-n`

|

Minimum password age

|
|

`-x`

|

Maximum password age

|
|

`-w`

|

Warning period before expiration

|
|

`-i`

|

Inactivity period after expiration

|

Examples:

Bash

```
sudo passwd -S devuser
sudo passwd -e devuser
sudo passwd -l devuser
sudo passwd -u devuser
```

### Important Security Note

Deleting a password with:

Bash

```
sudo passwd -d devuser
```

can create a passwordless account and may be unsafe. Use it only when you fully understand the authentication configuration.

# 7. Password Aging with `chage`

## Technical Definition

`chage` manages password expiration and account-aging policies.

### Syntax

Bash

```
sudo chage [options] username
```

View settings:

Bash

```
sudo chage -l devuser
```

## Important `chage` Options

|
Option

|

Meaning

|
| --- | --- |
|

`-l`

|

List password-aging information

|
|

`-d`

|

Set last password-change date

|
|

`-m`

|

Minimum days between password changes

|
|

`-M`

|

Maximum password age

|
|

`-W`

|

Warning days before expiration

|
|

`-I`

|

Inactivity days after expiration

|
|

`-E`

|

Account expiration date

|

Examples:

Bash

```
sudo chage -M 90 devuser
sudo chage -m 1 devuser
sudo chage -W 14 devuser
sudo chage -E 2027-01-01 devuser
```

Force password change at next login:

Bash

```
sudo passwd -e devuser
```

# 8. Modifying Users with `usermod`

## Technical Definition

`usermod` modifies an existing user account.

### Syntax

Bash

```
sudo usermod [options] username
```

## Important `usermod` Options

|
Option

|

Meaning

|
| --- | --- |
|

`-l`

|

Change login name

|
|

`-d`

|

Change home directory

|
|

`-m`

|

Move home contents with `-d`

|
|

`-s`

|

Change login shell

|
|

`-u`

|

Change UID

|
|

`-g`

|

Change primary group

|
|

`-G`

|

Set supplementary groups

|
|

`-a`

|

Append groups instead of replacing them

|
|

`-c`

|

Change comment/full name

|
|

`-L`

|

Lock account password

|
|

`-U`

|

Unlock account password

|
|

`-e`

|

Set account expiration date

|
|

`-f`

|

Set password inactivity period

|

## Change Login Shell

Bash

```
sudo usermod -s /bin/bash devuser
```

For a service account that should not have an interactive shell:

Bash

```
sudo usermod -s /usr/sbin/nologin serviceuser
```

Check valid shells:

Bash

```
cat /etc/shells
```

## Add User to a Group

Bash

```
sudo usermod -aG developers devuser
```

### Meaning

* `-G developers`: Supplementary group

* `-a`: Append to existing group memberships

### Very Important Mistake

This can replace the user's existing supplementary groups:

Bash

```
sudo usermod -G developers devuser
```

For adding one group, use:

Bash

```
sudo usermod -aG developers devuser
```

After adding a group, the user may need to log out and log back in.

Check:

Bash

```
id devuser
groups devuser
```


