## Creating Users 
- Lets play with users 


## Current user (current logged in user)
```sh 

whoami 

``` 

## Create user with ( $ sudo adduser Username -> command )

```sh 

sudo adduser Username

sudo adduser Testuser


```
- **ager ese command ko hit krte ho to pahle password type krna hota hai new user k liye ! or bad mein baki detail jo ki skip kr skte hain** 

## check user (login with new user)
```sh 
sudo su Username 

sudo su Testuser

## now you login as new user !! 

```

![](./loginnewuser.jpg)

*******

![](./sudopermissionnotfound.jpg)


-------

## User  Information (with id command)

> Displays the current user's UID, GID, and group memberships.


![](./userid.jpg)


------

## Groups (kin groups ka part hai user ? )

![](./groups.jpg)


-----


## Linux User Database Files 
- Linux stores local user and group information in several important files.

  ### **/etc/passwd**
   - #### */etc/passwd stores basic information about local user accounts.*

![](./userdatabase.jpg)

---

  ### **/etc/shadow
   - #### /etc/shadow stores password hashes and password-aging information

![](./shadowetc.jpg)