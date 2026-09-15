## Password Management with `passwd`

> after creating users with two differ ways , aur hamne manualy way main password bhi set kra in useradd method ! , in this md docu lets see how to handle passwords as admin ! 


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

-------- 

![](./changing_current_passwd1.jpg)

-------- 

![](./changing_otheruser_password_as_sudo.jpg)

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


![](./deleting_pass_as_admin_other_user.jpg)
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

![](./chage%20password%201%20.jpg)

-------

![](./maxpasschangelimiset.jpg)

