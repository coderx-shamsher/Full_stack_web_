Groups in Linux

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
## Group Commands

### `groupadd`

Creates a new group.

### Syntax

```
sudo groupadd [options] groupname
```

Example:

```
sudo groupadd developers
```

## create group in linux 

```sh 

sudo groupadd groupname 


```

![](../_05_/image/groups1.jpg)

![](./image/group_Adding_users2.jpg)


## Important Options

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

![](./image/group_with_gid.jpg)

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

## Add User to a Group

Bash

```
sudo usermod -aG developers devuser
```

### Meaning

* `-G developers`: Supplementary group

* `-a`: Append to existing group memberships

![](./image/group_adding_3.jpg)

--------

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

-------- 

## 12.3 `groupmod`

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

![](./image/groupmod1.jpg)

-----


## 12.4 `gpasswd`

Manages group membership and group administrators.

Add user:

```
sudo gpasswd -a devuser developers
```

- ham existing users koi he groups mein add kr skte hain 

![](./image/gpasswd1.jpg)


Remove user:

```
sudo gpasswd -d devuser developers
```
- ham kisi user k primary group ko delete nhi kr skte 

![](./image/primarygpdelete.jpg)

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

![](./image/getent.jpg)

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

********* 

## 14. File&Folders Ownership

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

![](./image/Permissions/ls-permissions.jpg)


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

