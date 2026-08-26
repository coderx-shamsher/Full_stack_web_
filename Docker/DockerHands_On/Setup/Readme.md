## Install and Setup Docker

**Docker offical website -> [Docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install/)**

> install for your system !! 

*setup in your system*

---


## Run first Docker Command
- open terminal 

```pwsh

 docker

 docker --version 
```

--- 

## setup docker in wsl 

- open you wsl **im using wsl kali linux**

```sh
kali@kali:~$ sudo apt update
kali@kali:~$
kali@kali:~$ sudo apt install -y docker.io
kali@kali:~$
kali@kali:~$ sudo systemctl enable docker --now
kali@kali:~$ docker
kali@kali:~$ docker --version

```


## Run your first container
Open your CLI terminal and start a container by running the docker run command:

```sh
sudo  docker run -d -p 8080:80 docker/welcome-to-docker

```

## Access the frontend
*For this container, the frontend is accessible on port 8080. To open the website, visit http://localhost:8080 in your browser.*

--- 

