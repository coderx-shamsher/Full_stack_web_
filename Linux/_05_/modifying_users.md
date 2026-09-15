## Modifying Users with `usermod`

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

------------------------------------------------------

## Giving Sudo Permissions to New Created user ! 
- yeh step bhot important hai, and make sure k ham verified or real user ko he permissions assign kren !! 

![login new user ](./loginuser2.jpg)

- now see k es user k koi apni home directory nhi show nhi ho rahi or filhal ham access bhi nhi kr skte ` cd /home -> ls `  kr ks


```sh 

sudo usermod -aG sudo YournewUsersName

```

![permission of sudo ! ](./usermod_sudo_permissions1.jpg)

------ 


### Change Login Shell

```sh
sudo usermod -s /bin/bash devuser
```

![](./change_current_working_shell.jpg)

 ## jump into other shell without changing ! 

 ![](./jump_shells_without_changing.jpg)


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

![](./adding_user_into_groups.jpg)

********

![](./change_Primary_group_.jpg)

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