Edit

# Linux Mastery — Users, Groups, Permissions & Ownership

This topic is extremely important because Linux is a **multi-user operating system**. Linux controls:

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

---

## 1. What Is a Linux User?

### Technical Definition

A **user** is an identity recognized by the Linux operating system. Every process runs under a user identity, and Linux uses that identity to determine access to files, devices, processes, and other resources.

Each user has a unique numeric identifier called a **UID**.

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

### Hinglish Explanation

Linux mein user ka matlab sirf woh person nahi hai jo computer use kar raha hai.

User ek identity hoti hai jiske through Linux decide karta hai:

> Is user ko kis file ko read, write, execute ya access karne ki permission hai?

---

## 2. Types of Linux Users

### 2.1 Root User

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

```
id root
```

Example output:

```
uid=0(root) gid=0(root) groups=0(root)
```

### Important Warning

Root has almost unrestricted power.

For example, an incorrect command such as:

```
rm -rf /some/important/path
```

can destroy important data.

**Best practice:** Use root privileges only when required.

---

### 2.2 Regular Users

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

---

### 2.3 System Users

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

> **Least privilege:** A process should have only the permissions it needs.

---

## 3. Important Identity Commands

### 3.1 `whoami`

#### Definition

Displays the username of the current effective user.

#### Syntax

```
whoami
```

Example:

```
whoami
```

Output:

```
coder
```

#### Hinglish

Yeh batata hai:

> Main abhi kis user ke naam se command chala raha hoon?

---

### 3.2 `id`

#### Definition

Displays the current user's UID, GID, and group memberships.

#### Syntax

```
id [options] [username]
```

Examples:

```
id
id coder
id root
```

Example output:

```
uid=1000(coder) gid=1000(coder) groups=1000(coder),27(sudo),100(users)
```

#### Important Options

| Option | Meaning                              |
| ------ | ------------------------------------ |
| `-u`   | Show UID only                        |
| `-g`   | Show primary GID only                |
| `-G`   | Show all group IDs                   |
| `-n`   | Show names instead of numbers        |
| `-r`   | Show real ID instead of effective ID |

Examples:

```
id -u
id -g
id -G
id -un
id -gn
id -Gn
```

---

### 3.3 `groups`

#### Definition

Displays the groups to which a user belongs.

```
groups
groups coder
```

Example:

```
coder : coder sudo developers
```

### Difference

| Command  | Main Purpose                    |
| -------- | ------------------------------- |
| `id`     | UID, GID, and detailed identity |
| `groups` | Group membership                |

---

### 3.4 `who`

#### Definition

Shows users currently logged into the system.

```
who
```

---

### 3.5 `w`

#### Definition

Shows logged-in users and what they are currently doing.

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

---

### 3.6 `last`

#### Definition

Displays login history.

```
last
```

Show the last 10 entries:

```
last -n 10
```

Search a specific user's login history:

```
last coder
```

---

## 4. Linux User Database Files

Linux stores local user and group information in several important files.

### 4.1 `/etc/passwd`

`/etc/passwd` stores basic information about local user accounts.

View it:

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

| Field         | Meaning                                      |
| ------------- | -------------------------------------------- |
| `coder`       | Username                                     |
| `x`           | Password information stored in `/etc/shadow` |
| `1000`        | UID                                          |
| `1000`        | Primary GID                                  |
| `Coder User`  | Comment/full name                            |
| `/home/coder` | Home directory                               |
| `/bin/bash`   | Login shell                                  |

The `x` does not mean the password is literally `x`. It normally means the password hash is stored in `/etc/shadow`.

---

### 4.2 `/etc/shadow`

`/etc/shadow` stores password hashes and password-aging information.

View it only when necessary:

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

**Best practice:** Never share `/etc/shadow` contents publicly.

---

### 4.3 `/etc/group`

`/etc/group` stores local group information.

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

---

### 4.4 `/etc/gshadow`

Stores secure group-management information.

```
sudo cat /etc/gshadow
```

Do not manually edit these account files unless you know exactly what you are doing. Prefer commands such as `useradd`, `usermod`, `groupadd`, and `passwd`.

---

## 5. Creating Users

Linux commonly provides two commands:

* `useradd`

* `adduser`

---

### 5.1 `useradd`

#### Technical Definition

`useradd` is a low-level command used to create a user account.

#### Syntax

```
sudo useradd [options] username
```

#### Basic Example

```
sudo useradd devuser
```

Depending on the distribution and options, this may not create a home directory or configure all login settings.

#### Recommended Form

```
sudo useradd -m -s /bin/bash devuser
```

Meaning:

* `-m`: Create the home directory

* `-s /bin/bash`: Set Bash as the login shell

Then set a password:

```
sudo passwd devuser
```

#### Important `useradd` Options

| Option | Definition                                | Example                  |
| ------ | ----------------------------------------- | ------------------------ |
| `-m`   | Create home directory                     | `useradd -m devuser`     |
| `-M`   | Do not create home directory              | `useradd -M serviceuser` |
| `-d`   | Specify home directory                    | `-d /home/custom`        |
| `-s`   | Set login shell                           | `-s /bin/bash`           |
| `-u`   | Specify UID                               | `-u 1500`                |
| `-g`   | Set primary group                         | `-g developers`          |
| `-G`   | Set supplementary groups                  | `-G developers,sudo`     |
| `-c`   | Set comment/full name                     | `-c "Development User"`  |
| `-e`   | Set account expiration date               | `-e 2027-01-01`          |
| `-f`   | Set password inactivity period            | `-f 30`                  |
| `-r`   | Create a system account                   | `-r serviceuser`         |
| `-U`   | Create a private group with the same name | `-U devuser`             |
| `-N`   | Do not create a private group             | `-N devuser`             |
| `-k`   | Use a skeleton directory                  | `-k /etc/skel`           |
| `-b`   | Set base directory for home directories   | `-b /home`               |

#### Professional Example

```
sudo useradd \
  -m \
  -s /bin/bash \
  -c "Application Developer" \
  devuser
```

Set the password:

```
sudo passwd devuser
```

#### Warning About `useradd -p`

Avoid this:

```
sudo useradd -p mypassword devuser
```

Problems:

* `-p` expects an encrypted password, not normal plain text

* The password may be stored in shell history

* It may be visible to other users through process inspection in some situations

Prefer:

```
sudo passwd devuser
```

---

### 5.2 `adduser`

#### Technical Definition

`adduser` is a higher-level, interactive user-creation utility commonly available on Debian-based distributions.

```
sudo adduser devuser
```

It usually guides you through:

* Password

* Full name

* User information

* Home directory setup

### `useradd` vs `adduser`

| Feature      | `useradd`                       | `adduser`                           |
| ------------ | ------------------------------- | ----------------------------------- |
| Type         | Low-level utility               | High-level helper                   |
| Interaction  | Usually non-interactive         | Usually interactive                 |
| Automation   | Better for scripts              | Less suitable for scripts           |
| Defaults     | More manual                     | More guided                         |
| Common usage | Automation and detailed control | Manual Debian/Ubuntu administration |

### Hinglish

* `useradd` = manual and powerful

* `adduser` = guided and beginner-friendly

---

## 6. Password Management with `passwd`

### Technical Definition

`passwd` changes a user's password and manages password-related settings.

### Syntax

```
passwd [options] [username]
```

Change your own password:

```
passwd
```

Change another user's password as administrator:

```
sudo passwd devuser
```

### Important `passwd` Options

| Option | Meaning                            |
| ------ | ---------------------------------- |
| `-d`   | Delete password                    |
| `-l`   | Lock password                      |
| `-u`   | Unlock password                    |
| `-e`   | Expire password immediately        |
| `-S`   | Display password status            |
| `-n`   | Minimum password age               |
| `-x`   | Maximum password age               |
| `-w`   | Warning period before expiration   |
| `-i`   | Inactivity period after expiration |

Examples:

```
sudo passwd -S devuser
sudo passwd -e devuser
sudo passwd -l devuser
sudo passwd -u devuser
```

### Security Note

Deleting a password with:

```
sudo passwd -d devuser
```

can create a passwordless account and may be unsafe. Use it only when you fully understand the authentication configuration.

---

## 7. Password Aging with `chage`

### Technical Definition

`chage` manages password expiration and account-aging policies.

### Syntax

```
sudo chage [options] username
```

View settings:

```
sudo chage -l devuser
```

### Important `chage` Options

| Option | Meaning                               |
| ------ | ------------------------------------- |
| `-l`   | List password-aging information       |
| `-d`   | Set last password-change date         |
| `-m`   | Minimum days between password changes |
| `-M`   | Maximum password age                  |
| `-W`   | Warning days before expiration        |
| `-I`   | Inactivity days after expiration      |
| `-E`   | Account expiration date               |

Examples:

```
sudo chage -M 90 devuser
sudo chage -m 1 devuser
sudo chage -W 14 devuser
sudo chage -E 2027-01-01 devuser
```

Force password change at next login:

```
sudo passwd -e devuser
```

---

## 8. Modifying Users with `usermod`

### Technical Definition

`usermod` modifies an existing user account.

### Syntax

```
sudo usermod [options] username
```

### Important `usermod` Options

| Option | Meaning                                 |
| ------ | --------------------------------------- |
| `-l`   | Change login name                       |
| `-d`   | Change home directory                   |
| `-m`   | Move home contents with `-d`            |
| `-s`   | Change login shell                      |
| `-u`   | Change UID                              |
| `-g`   | Change primary group                    |
| `-G`   | Set supplementary groups                |
| `-a`   | Append groups instead of replacing them |
| `-c`   | Change comment/full name                |
| `-L`   | Lock account password                   |
| `-U`   | Unlock account password                 |
| `-e`   | Set account expiration date             |
| `-f`   | Set password inactivity period          |

### Change Login Shell

```
sudo usermod -s /bin/bash devuser
```

For a service account that should not have an interactive shell:

```
sudo usermod -s /usr/sbin/nologin serviceuser
```

Check valid shells:

```
cat /etc/shells
```

### Add User to a Group

```
sudo usermod -aG developers devuser
```

Meaning:

* `-G developers`: Supplementary group

* `-a`: Append to existing group memberships

### Very Important Mistake

This can replace the user's existing supplementary groups:

```
sudo usermod -G developers devuser
```

For adding one group, use:

```
sudo usermod -aG developers devuser
```

After adding a group, the user may need to log out and log back in.

Check:

```
id devuser
groups devuser
```

### Change Primary Group

```
sudo usermod -g developers devuser
```

Difference:

```
-g developers
```

changes the primary group.

```
-aG developers
```

adds `developers` as a supplementary group.

### Change Home Directory

```
sudo usermod -d /home/newhome -m devuser
```

* `-d`: New home path

* `-m`: Move existing home contents

Be careful because this can affect:

* SSH keys

* Shell configuration

* Application paths

* Cron jobs

* Ownership

* User-specific software

### Change Username

```
sudo usermod -l newname oldname
```

This changes the login name, but a complete rename may also require updating:

* Home directory

* Primary group

* File ownership

* Cron entries

* SSH configuration

* Application settings

---

## 9. Deleting Users

### `userdel`

#### Technical Definition

`userdel` deletes a user account.

#### Syntax

```
sudo userdel [options] username
```

Delete account but preserve home directory:

```
sudo userdel devuser
```

Delete account and home directory:

```
sudo userdel -r devuser
```

### Important Options

| Option | Meaning                                         |
| ------ | ----------------------------------------------- |
| `-r`   | Remove home directory and mail spool            |
| `-f`   | Force deletion in certain situations; dangerous |

### Safe Pre-Deletion Checks

Before deleting a user:

```
id devuser
groups devuser
ps -u devuser
```

Find files owned by the user:

```
sudo find / -xdev -user devuser 2>/dev/null
```

Check:

* Running processes

* SSH keys

* Cron jobs

* Application files

* Shared project files

* Files outside the home directory

* Services running under that account

### Safer Alternatives

Instead of deleting immediately, you can:

```
sudo passwd -l devuser
```

or:

```
sudo usermod -s /usr/sbin/nologin devuser
```

---

## 10. Locking and Disabling Accounts

### Lock Password

```
sudo passwd -l devuser
```

or:

```
sudo usermod -L devuser
```

### Unlock Password

```
sudo passwd -u devuser
```

or:

```
sudo usermod -U devuser
```

### Disable Interactive Login

```
sudo usermod -s /usr/sbin/nologin devuser
```

### Set Account Expiration

```
sudo usermod -e 2026-12-31 devuser
```

### Check Status

```
sudo passwd -S devuser
sudo chage -l devuser
```

### Lock vs Delete

| Action              | Meaning                                 |
| ------------------- | --------------------------------------- |
| Lock password       | Restricts password authentication       |
| Set `nologin` shell | Prevents normal interactive shell login |
| Expire account      | Account becomes expired                 |
| Delete account      | Removes account database entry          |
| `userdel -r`        | Removes account and home directory      |

---

## 11. Groups in Linux

### Technical Definition

A group is a collection of users used to manage access to files and resources.

Instead of giving permission to 20 users individually, create a group:

```
developers
├── coder
├── alice
└── bob
```

Then assign permissions to the group.

---

## 12. Group Commands

### 12.1 `groupadd`

Creates a new group.

### Syntax

```
sudo groupadd [options] groupname
```

Example:

```
sudo groupadd developers
```

### Important Options

| Option | Meaning                                                   |
| ------ | --------------------------------------------------------- |
| `-g`   | Specify GID                                               |
| `-r`   | Create a system group                                     |
| `-f`   | Exit successfully if group already exists where supported |
| `-o`   | Allow non-unique GID; generally avoid                     |

Example:

```
sudo groupadd -g 1500 developers
```

Check:

```
getent group developers
```

---

### 12.2 `groupdel`

Deletes a group.

```
sudo groupdel developers
```

### Warning

Do not delete a group that is still the primary group of a user.

Check:

```
id devuser
```

---

### 12.3 `groupmod`

Modifies an existing group.

### Syntax

```
sudo groupmod [options] groupname
```

Important options:

| Option | Meaning                                     |
| ------ | ------------------------------------------- |
| `-n`   | Change group name                           |
| `-g`   | Change GID                                  |
| `-o`   | Allow non-unique GID; avoid unless required |

Example:

```
sudo groupmod -n frontend developers
```

---

### 12.4 `gpasswd`

Manages group membership and group administrators.

Add user:

```
sudo gpasswd -a devuser developers
```

Remove user:

```
sudo gpasswd -d devuser developers
```

Set group administrators:

```
sudo gpasswd -A adminuser developers
```

Check membership:

```
getent group developers
```

---

### 12.5 `getent`

Queries system databases configured through the Name Service Switch.

Examples:

```
getent passwd devuser
getent group developers
getent passwd
getent group
```

`getent` can work with configured identity sources beyond only local files.

---

### 12.6 `newgrp`

Starts a new shell using a specified group as the effective group.

```
newgrp developers
```

Check:

```
id
```

This is useful for testing group permissions without fully logging out.

---

## 13. Primary and Supplementary Groups

Every user normally has a primary group and may have multiple supplementary groups.

### Primary Group

The main group associated with the user.

Example:

```
gid=1000(coder)
```

### Supplementary Groups

Additional groups that grant access.

Example:

```
groups=coder,sudo,developers,docker
```

Check:

```
id devuser
groups devuser
```

Change primary group:

```
sudo usermod -g developers devuser
```

Add supplementary group:

```
sudo usermod -aG developers devuser
```

---

## 14. File Ownership

Every file generally has:

1. User owner

2. Group owner

3. Permission bits

Example:

```
ls -l report.txt
```

Output:

```
-rw-r----- 1 coder developers 1200 Sep 11 report.txt
```

Breakdown:

```
-rw-r----- 1 coder developers 1200 Sep 11 report.txt
              │      │
              │      └── Group owner
              └── User owner
```

---

## 15. Linux Permission Structure

Consider:

```
-rwxr-xr--
```

The first character is the file type:

```
-
```

The next nine characters are permissions:

```
rwx r-x r--
│   │   │
│   │   └── Others
│   └────── Group
└────────── Owner
```

### Permission Classes

| Class      | Meaning                 |
| ---------- | ----------------------- |
| User/Owner | File owner              |
| Group      | Members of file's group |
| Others     | Everyone else           |

---

## 16. Meaning of `r`, `w`, and `x`

| Permission | Regular File    | Directory                      |
| ---------- | --------------- | ------------------------------ |
| `r`        | Read contents   | List directory names           |
| `w`        | Modify contents | Create, delete, rename entries |
| `x`        | Execute program | Enter/traverse directory       |

### Important Directory Concept

For a directory:

* `r` = list names

* `w` = create/delete/rename entries

* `x` = enter or traverse it

A user may need `x` permission on every parent directory in a path to access a file.

---

## 17. Numeric Permissions

| Permission    | Value |
| ------------- | ----- |
| `r`           | 4     |
| `w`           | 2     |
| `x`           | 1     |
| No permission | 0     |

Examples:

```
rwx = 4 + 2 + 1 = 7
r-x = 4 + 0 + 1 = 5
r-- = 4 + 0 + 0 = 4
```

Therefore:

```
rwxr-xr--
```

equals:

```
754
```

| Class  | Permission | Number |
| ------ | ---------- | ------ |
| Owner  | `rwx`      | 7      |
| Group  | `r-x`      | 5      |
| Others | `r--`      | 4      |

---

## 18. `chmod`

### Technical Definition

`chmod` changes the permission mode of files and directories.

### Syntax

```
chmod [options] mode file
```

There are two methods:

1. Numeric mode

2. Symbolic mode

---

### Numeric `chmod`

Examples:

```
chmod 644 file.txt
chmod 600 private.txt
chmod 755 script.sh
chmod 700 private-directory
chmod 775 shared-directory
chmod 664 shared-file.txt
```

### Common Modes

| Mode  | Meaning                               | Typical Usage              |
| ----- | ------------------------------------- | -------------------------- |
| `600` | Owner read/write only                 | Private files              |
| `644` | Owner read/write, others read         | Normal files               |
| `700` | Owner full access only                | Private directories        |
| `755` | Owner full, others read/execute       | Scripts/public directories |
| `664` | Owner/group read/write, others read   | Shared files               |
| `775` | Owner/group full, others read/execute | Shared directories         |
| `777` | Everyone full access                  | Usually unsafe             |

Avoid this as a default fix:

```
chmod 777 file
```

It gives everyone read, write, and execute permissions and often creates security problems.

---

### Symbolic `chmod`

#### Syntax

```
chmod [who][operator][permissions] file
```

#### Who

| Symbol | Meaning |
| ------ | ------- |
| `u`    | Owner   |
| `g`    | Group   |
| `o`    | Others  |
| `a`    | All     |

#### Operators

| Operator | Meaning              |
| -------- | -------------------- |
| `+`      | Add permission       |
| `-`      | Remove permission    |
| `=`      | Set exact permission |

Examples:

```
chmod u+x script.sh
chmod o-w file.txt
chmod g+r file.txt
chmod u=rw,g=r,o= file.txt
chmod a+r file.txt
chmod o= file.txt
chmod ug+rw project.txt
```

---

### Recursive `chmod`

The `-R` option applies permission changes recursively.

```
chmod -R 755 project/
```

### Warning

This command changes every item below the directory.

Avoid:

```
chmod -R 777 project/
```

It may:

* Make sensitive files writable

* Make every file executable

* Expose configuration files

* Create security vulnerabilities

A more targeted pattern is often better:

```
chmod -R g+rwX project/
```

Uppercase `X` adds execute permission only to directories or files that already have execute permission.

---

## 19. `chown`

### Technical Definition

`chown` changes the user owner and optionally the group owner of a file or directory.

### Syntax

```
chown [options] owner[:group] file
```

Usually, changing ownership requires root privileges.

### Change User Owner

```
sudo chown alice report.txt
```

### Change User and Group

```
sudo chown alice:developers report.txt
```

### Change Only Group

```
sudo chown :developers report.txt
```

### Recursive Ownership Change

```
sudo chown -R alice:developers project/
```

### Important Warning

Do not blindly run recursive ownership commands on system directories.

Incorrect commands such as:

```
sudo chown -R user:group /
```

can break the entire operating system.

### Important `chown` Options

| Option             | Meaning                                          |
| ------------------ | ------------------------------------------------ |
| `-R`               | Recursive                                        |
| `-v`               | Verbose output                                   |
| `-c`               | Report only when a change occurs                 |
| `-f`               | Suppress most error messages                     |
| `-h`               | Affect symbolic links themselves where supported |
| `--reference=FILE` | Copy ownership from another file                 |

Examples:

```
sudo chown -v alice:developers report.txt
sudo chown --reference=template.txt report.txt
```

---

## 20. `chgrp`

### Technical Definition

`chgrp` changes the group ownership of files and directories.

### Syntax

```
chgrp [options] group file
```

Example:

```
sudo chgrp developers report.txt
```

Recursive:

```
sudo chgrp -R developers project/
```

### Important Options

| Option             | Meaning                                |
| ------------------ | -------------------------------------- |
| `-R`               | Recursive                              |
| `-v`               | Verbose                                |
| `-c`               | Report only changed files              |
| `-f`               | Suppress most errors                   |
| `--reference=FILE` | Copy group ownership from another file |

### Comparison

| Command                 | Purpose               |
| ----------------------- | --------------------- |
| `chown alice file`      | Change user owner     |
| `chown alice:devs file` | Change user and group |
| `chown :devs file`      | Change only group     |
| `chgrp devs file`       | Change only group     |

---

## 21. Inspect Permissions and Ownership

### `ls -l`

```
ls -l file.txt
```

### `ls -ld`

Inspect the directory itself:

```
ls -ld project/
```

Without `-d`, `ls -l project/` normally displays the directory contents.

### `stat`

```
stat file.txt
```

Displays:

* File type

* Size

* Inode

* Owner

* Group

* Permissions

* Timestamps

* Link count

### `namei`

Shows permissions for each component of a path:

```
namei -l /home/coder/project/file.txt
```

This is useful when debugging `Permission denied`.

### `getfacl`

Displays ACL information:

```
getfacl file.txt
```

---

## 22. Shared Project Example

Suppose you want `coder` and `alice` to collaborate on:

```
/opt/shared-project
```

### Step 1: Create a group

```
sudo groupadd developers
```

### Step 2: Add users

```
sudo usermod -aG developers coder
sudo usermod -aG developers alice
```

### Step 3: Change group ownership

```
sudo chgrp -R developers /opt/shared-project
```

### Step 4: Give group collaboration permissions

```
sudo chmod -R g+rwX /opt/shared-project
```

### Step 5: Enable SGID on the directory

```
sudo chmod g+s /opt/shared-project
```

Or numeric form:

```
sudo chmod 2775 /opt/shared-project
```

Newly created files and directories commonly inherit the shared directory's group.

---

## 23. Special Permissions

Linux has three important special permission mechanisms:

1. SUID

2. SGID

3. Sticky Bit

---

### 23.1 SUID

SUID means **Set User ID**.

When applied to an executable file, the program runs with the effective privileges of the file owner.

Example:

```
ls -l /usr/bin/passwd
```

You may see:

```
-rwsr-xr-x
```

The `s` in the owner execute position indicates SUID.

### Security Warning

SUID programs must be carefully maintained. A vulnerability in a root-owned SUID program may lead to privilege escalation.

Find SUID files:

```
sudo find / -xdev -type f -perm -4000 2>/dev/null
```

---

### 23.2 SGID

SGID means **Set Group ID**.

For executable files, it can run with the file's group privileges.

For directories, SGID causes newly created files and directories to commonly inherit the directory's group.

Set SGID:

```
chmod g+s shared-project/
```

Numeric form:

```
chmod 2775 shared-project/
```

You may see:

```
drwxrwsr-x
```

---

### 23.3 Sticky Bit

The sticky bit on a directory restricts deletion or renaming of entries. Normally, only the file owner, directory owner, or root can remove or rename an entry.

Check `/tmp`:

```
ls -ld /tmp
```

Typical output:

```
drwxrwxrwt
```

The `t` indicates the sticky bit.

Set sticky bit:

```
chmod +t shared-directory/
```

Numeric form:

```
chmod 1777 shared-directory/
```

This is useful for shared temporary directories.

---

## 24. ACLs — Advanced Permissions

### Technical Definition

ACLs, or **Access Control Lists**, allow additional user-specific and group-specific permissions beyond the traditional owner/group/others model.

Example requirement:

* Owner: full access

* Group: read/write

* Alice: read-only

* Bob: read/write

* Others: no access

ACLs can handle this more precisely.

### Check ACL

```
getfacl file.txt
```

### Give a user read/write access

```
sudo setfacl -m u:alice:rw file.txt
```

### Give a group read/write access

```
sudo setfacl -m g:developers:rw file.txt
```

### Remove a user ACL

```
sudo setfacl -x u:alice file.txt
```

### Remove extended ACLs

```
setfacl -b file.txt
```

### Set a default ACL on a directory

```
sudo setfacl -m d:g:developers:rwx shared-project/
```

Default ACLs affect newly created items inside the directory.

ACL support may require the `acl` package and filesystem support.

---

## 25. `sudo`

### Technical Definition

`sudo` allows an authorized user to execute a command as another user, usually root.

### Syntax

```
sudo command
```

Examples:

```
sudo apt update
sudo systemctl restart nginx
sudo useradd -m devuser
```

Run a command as another user:

```
sudo -u alice whoami
```

Start a root login-like shell:

```
sudo -i
```

Start an elevated shell while preserving more of the current environment:

```
sudo -s
```

| Command                 | Meaning                                  |
| ----------------------- | ---------------------------------------- |
| `sudo command`          | Run one command with elevated privileges |
| `sudo -u alice command` | Run command as `alice`                   |
| `sudo -i`               | Start a root login-like shell            |
| `sudo -s`               | Start an elevated shell                  |

### Best Practice

Prefer:

```
sudo specific-command
```

instead of staying inside a root shell unnecessarily.

---

## 26. `visudo` and Sudo Policy

The sudo configuration determines who can run which commands with elevated privileges.

Safely edit sudo policy:

```
sudo visudo
```

`visudo` validates syntax before saving.

Avoid casually editing:

```
sudo nano /etc/sudoers
```

because a syntax mistake can break sudo access.

Custom rules are often stored in:

```
/etc/sudoers.d/
```

Granting unrestricted sudo access should be avoided unless there is a clear administrative requirement.

---

## 27. Permission-Denied Troubleshooting

When you see:

```
Permission denied
```

Do not immediately use:

```
chmod -R 777 .
```

Use this workflow.

### Step 1: Check current user

```
whoami
id
groups
```

### Step 2: Inspect target permissions

```
ls -l target-file
ls -ld target-directory
```

### Step 3: Inspect every directory in the path

```
namei -l /path/to/target
```

### Step 4: Check ownership and metadata

```
stat target-file
```

### Step 5: Check group membership

```
id username
getent group groupname
```

### Step 6: Check ACLs

```
getfacl target-file
```

### Step 7: Apply the smallest required fix

Possible fixes:

* Change owner with `chown`

* Change group with `chgrp`

* Add user to a group

* Modify one permission bit

* Add a targeted ACL

* Fix parent-directory traversal permission

---

## 28. Good Practices

### User Management

* Use separate accounts for separate people.

* Do not share user accounts.

* Avoid using root for daily work.

* Use `sudo` for administrative commands.

* Lock unused accounts.

* Use `/usr/sbin/nologin` for service accounts where appropriate.

* Avoid manually editing `/etc/passwd` and `/etc/shadow`.

* Review group memberships regularly.

* Do not delete accounts without checking owned files and running processes.

### Passwords

* Use strong, unique passwords.

* Do not place plain-text passwords in commands.

* Do not expose `/etc/shadow`.

* Prefer SSH keys for server administration.

* Use MFA where possible.

* Use secret managers for production credentials.

### Permissions

* Follow least privilege.

* Avoid `chmod 777`.

* Avoid unnecessary recursive permission changes.

* Use groups for team access.

* Use SGID for shared directories when appropriate.

* Use ACLs when normal owner/group/others permissions are insufficient.

* Inspect before changing ownership.

* Be cautious with `sudo chown -R`.

* Keep private SSH keys highly restricted.

---

## 29. Safe Practice Lab

Use a test VM, disposable Linux machine, or a safe environment. Do not experiment with important system users.

### Step 1: Create a test group

```
sudo groupadd linuxlearners
```

If it already exists, continue.

### Step 2: Create a test user

```
sudo useradd -m -s /bin/bash -c "Linux Practice User" linuxstudent
```

Set password:

```
sudo passwd linuxstudent
```

### Step 3: Add the user to the group

```
sudo usermod -aG linuxlearners linuxstudent
```

Verify:

```
id linuxstudent
groups linuxstudent
```

### Step 4: Create a practice directory

```
sudo mkdir -p /opt/linux-permission-lab
```

### Step 5: Create a file

```
sudo touch /opt/linux-permission-lab/example.txt
```

### Step 6: Change group ownership

```
sudo chgrp linuxlearners /opt/linux-permission-lab
```

### Step 7: Set directory permissions

```
sudo chmod 2775 /opt/linux-permission-lab
```

### Step 8: Set file ownership and permissions

```
sudo chown root:linuxlearners /opt/linux-permission-lab/example.txt
sudo chmod 664 /opt/linux-permission-lab/example.txt
```

### Step 9: Inspect

```
ls -ld /opt/linux-permission-lab
ls -l /opt/linux-permission-lab
stat /opt/linux-permission-lab/example.txt
getfacl /opt/linux-permission-lab
```

### Step 10: Test as the user

```
sudo -u linuxstudent touch /opt/linux-permission-lab/student-file.txt
```

Check:

```
ls -l /opt/linux-permission-lab
```

Because of SGID, the new file will commonly inherit the directory's group.

### Step 11: Clean up

Only run this if the directory and user are purely for practice:

```
sudo userdel -r linuxstudent
sudo groupdel linuxlearners
sudo rm -rf /opt/linux-permission-lab
```

---

## 30. Complete Cheat Sheet

### Identity

```
whoami
id
id username
groups
who
w
last
```

### Create Users

```
sudo useradd -m -s /bin/bash username
sudo adduser username
sudo passwd username
```

### Modify Users

```
sudo usermod -aG group username
sudo usermod -g group username
sudo usermod -s /bin/bash username
sudo usermod -s /usr/sbin/nologin username
sudo usermod -L username
sudo usermod -U username
```

### Delete Users

```
sudo userdel username
sudo userdel -r username
```

### Password Aging

```
sudo passwd -S username
sudo chage -l username
sudo chage -M 90 username
sudo chage -E 2027-01-01 username
```

### Groups

```
sudo groupadd groupname
sudo groupdel groupname
sudo groupmod -n newname oldname
sudo gpasswd -a username groupname
sudo gpasswd -d username groupname
getent group groupname
```

### Ownership

```
ls -l file
stat file
sudo chown user file
sudo chown user:group file
sudo chown :group file
sudo chgrp group file
```

### Permissions

```
chmod 644 file
chmod 755 script.sh
chmod 700 private-directory
chmod u+x script.sh
chmod g+w file
chmod o-r file
chmod -R g+rwX project/
```

### ACL

```
getfacl file
setfacl -m u:alice:rw file
setfacl -m g:developers:rw file
setfacl -x u:alice file
setfacl -b file
```

---

## 31. Final Revision

| Concept    | Meaning                                           |
| ---------- | ------------------------------------------------- |
| User       | Identity that owns files and runs processes       |
| UID        | Numeric ID of a user                              |
| Group      | Collection of users for access control            |
| GID        | Numeric ID of a group                             |
| Root       | Superuser with extensive privileges               |
| `useradd`  | Creates a user                                    |
| `adduser`  | Interactive user-creation helper                  |
| `usermod`  | Modifies a user                                   |
| `userdel`  | Deletes a user                                    |
| `passwd`   | Manages passwords                                 |
| `chage`    | Manages password aging                            |
| `groupadd` | Creates a group                                   |
| `groupdel` | Deletes a group                                   |
| `gpasswd`  | Manages group membership                          |
| `chmod`    | Changes permissions                               |
| `chown`    | Changes user/group ownership                      |
| `chgrp`    | Changes group ownership                           |
| `sudo`     | Runs authorized commands with elevated privileges |
| SUID       | Runs executable with file owner's privileges      |
| SGID       | Inherits group behavior / group privileges        |
| Sticky bit | Restricts deletion in shared directories          |
| ACL        | Provides advanced per-user/per-group permissions  |

**Most important commands to master first:**

```
id
whoami
sudo
useradd
adduser
usermod
userdel
passwd
groupadd
groups
getent
chmod
chown
chgrp
stat
ls -l
```
