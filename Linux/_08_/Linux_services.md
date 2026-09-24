# Linux Services and `systemd`

We have completed the Linux Boot Process. Now we are moving to the next part of the same section:

> How Linux starts, manages, monitors, and stops services.

This topic is especially important for servers, DevOps, backend development, databases, web servers, SSH, Docker hosts, and production systems.

We will cover the concepts in this order:

1. What is a service?

2. Daemon vs service

3. What is `systemd`?

4. What is `systemctl`?

5. Service states

6. Start, stop, restart, reload

7. Enable and disable services at boot

8. Check service status

9. Logs with `journalctl`

10. Services and targets

11. Unit files

12. Dependencies

13. Practical service-management lab

14. Common mistakes and professional practices

# 1. What Is a Service?

## Technical Definition

A service is a program or background process that provides a specific function to the operating system, users, applications, or other computers.

Examples:

* SSH service: allows remote login.

* Web server: serves websites or APIs.

* Database service: stores and retrieves data.

* Network service: manages network connectivity.

* Logging service: collects system logs.

* Cron service: runs scheduled tasks.

A service generally runs in the background and waits for requests or performs continuous work.

## Examples of Linux Services

|
Service

|

Purpose

|
| --- | --- |
|

`ssh` / `sshd`

|

Remote login through SSH

|
|

`nginx`

|

Web server and reverse proxy

|
|

`apache2` / `httpd`

|

Web server

|
|

`mysql`

|

MySQL database

|
|

`mariadb`

|

MariaDB database

|
|

`postgresql`

|

PostgreSQL database

|
|

`docker`

|

Docker daemon

|
|

`NetworkManager`

|

Network management

|
|

`cron` / `crond`

|

Scheduled jobs

|
|

`systemd-journald`

|

System logging

|

The exact service name depends on the Linux distribution and installation.

## Simple Hinglish Explanation

Service ek aisa program hai jo background mein run hota hai aur koi specific kaam provide karta hai.

For example:

* SSH service remote connection allow karti hai.

* MySQL service database chalati hai.

* Nginx service website serve karti hai.

* Docker service containers manage karti hai.

Aap service ko ek background worker samajh sakte ho.

# 2. What Is a Daemon?

## Technical Definition

A daemon is a long-running background process that performs a task or provides a service without requiring direct user interaction.

Linux daemon names often end with the letter `d`.

Examples:

```
sshd
systemd
dockerd
crond
systemd-journald
```

The `d` commonly stands for “daemon.”

However, not every service process necessarily ends with `d`.

## Why Do Daemons Run?

A daemon may:

* Listen for network requests.

* Monitor hardware or system events.

* Manage a subsystem.

* Execute scheduled jobs.

* Handle incoming client connections.

* Maintain a background function.

### Example

When an SSH server is running:

```
sshd
```

It waits for incoming SSH connections:

```
SSH Client → sshd → Login Session
```

## Daemon vs Service

These terms are related but not exactly identical.

|
Term

|

Meaning

|
| --- | --- |
|

Daemon

|

The actual long-running background process

|
|

Service

|

The functionality provided, or the managed background workload

|
|

Service manager

|

Program that starts, stops, monitors, and manages services

|

For example:

```
systemctl → manages → ssh.service → starts/manages → sshd process
```

A service is often represented by a unit file, while the daemon is the process executing the work.

### Simple Hinglish Explanation

* Daemon = background mein chalne wala actual process.

* Service = woh kaam/function jo background process provide karta hai.

* systemd = in services ko manage karne wala manager.

Example:

```
sshd = daemon/process
SSH = service/function
systemd = manager
```

# 3. What Is `systemd`?

## Technical Definition

`systemd` is a system and service manager used by many modern Linux distributions.

It is usually started as PID 1, the first user-space process after the kernel initializes.

`systemd` is responsible for:

* Starting system services.

* Managing service lifecycles.

* Managing service dependencies.

* Starting services in parallel where possible.

* Managing targets.

* Handling system startup and shutdown.

* Managing sockets, mounts, timers, devices, and other units.

* Integrating with system logs through the journal.

* Tracking processes belonging to services.

## Main Responsibilities

```
Boot
 ↓
systemd
 ├── Network service
 ├── SSH service
 ├── Logging service
 ├── Cron service
 ├── Database service
 └── Login service
```

## Why Is `systemd` Used?

Traditional startup systems often started services sequentially through scripts. `systemd` provides a more structured model with:

* Dependency management

* Parallel startup

* Service supervision

* Restart policies

* Centralized commands

* Logging integration

* Resource control through cgroups

## Check Whether Your System Uses `systemd`

Bash

```
ps -p 1 -o pid,comm,args
```

Example:

```
PID  COMMAND  COMMAND
1    systemd  /sbin/init
```

You can also run:

Bash

```
systemctl --version
```

Check the init path:

Bash

```
readlink -f /sbin/init
```

Possible result:

```
/usr/lib/systemd/systemd
```

The path may differ between distributions.

### Simple Hinglish Explanation

`systemd` Linux ka main service manager hai.

Boot ke baad yeh decide karta hai:

* Kaunsi service start karni hai?

* Kis service ko pehle start karna hai?

* Agar service crash ho jaye to kya karna hai?

* Shutdown ke time services ko kaise stop karna hai?

* Kaunsi services boot par automatically start hongi?

Isliye `systemd` ko Linux ka background-services supervisor samajh sakte ho.

# 4. What Is `systemctl`?

## Technical Definition

`systemctl` is the command-line tool used to communicate with and control `systemd`.

It allows you to:

* Start services.

* Stop services.

* Restart services.

* Reload service configuration.

* Enable services at boot.

* Disable services at boot.

* Check service status.

* Inspect unit files.

* View dependencies.

* Manage system states.

General syntax:

Bash

```
systemctl [OPTIONS] COMMAND [UNIT]
```

A unit can be:

* Service

* Socket

* Timer

* Mount

* Target

* Device

* Path

* Other systemd-managed object

For services, the unit usually ends in:

```
.service
```

Example:

```
ssh.service
nginx.service
docker.service
```

The `.service` suffix can often be omitted:

Bash

```
systemctl status ssh
```

is usually equivalent to:

Bash

```
systemctl status ssh.service
```

# 5. Finding Available Services

## List Running Services

Bash

```
systemctl list-units --type=service
```

This displays currently loaded service units, generally including active units.

## List All Installed Service Unit Files

Bash

```
systemctl list-unit-files --type=service
```

This shows installed service definitions and their enablement state.

## List Active Services

Bash

```
systemctl list-units --type=service --state=active
```

## List Failed Services

Bash

```
systemctl --failed
```

Or:

Bash

```
systemctl list-units --failed
```

## Search for a Service

Bash

```
systemctl list-unit-files | grep -i ssh
```

You can also use:

Bash

```
systemctl list-units --all | grep -i nginx
```

## Check Whether a Unit Exists

Bash

```
systemctl cat ssh
```

If the unit exists, this may display its unit file. If not, you will receive an error.

# 6. Service States

A service can have different states. It is important to understand that active, enabled, and running do not mean the same thing.

## Common Runtime States

|
State

|

Meaning

|
| --- | --- |
|

`active (running)`

|

Service is currently running

|
|

`active (exited)`

|

Service completed its task successfully but no long-running process remains

|
|

`inactive (dead)`

|

Service is not running

|
|

`failed`

|

Service failed to start or stopped due to an error

|
|

`activating`

|

Service is currently starting

|
|

`deactivating`

|

Service is currently stopping

|
|

`reloading`

|

Service is reloading its configuration

|
|

`unknown`

|

State could not be determined normally

|

## Enablement States

|
State

|

Meaning

|
| --- | --- |
|

`enabled`

|

Configured to start automatically during the relevant boot target

|
|

`disabled`

|

Not configured for automatic startup

|
|

`static`

|

Cannot be enabled directly; normally started as a dependency

|
|

`masked`

|

Completely blocked from being started normally

|
|

`indirect`

|

Enabled through another mechanism or alias

|
|

`generated`

|

Generated dynamically

|

### Important Difference

```
Running now?       → active/inactive
Start at boot?     → enabled/disabled
Allowed to start?  → masked/unmasked
```

A service can be:

```
active + disabled
```

This means it is running now but will not automatically start at boot.

It can also be:

```
inactive + enabled
```

This means it is configured to start at boot but is not running at this moment.

# 7. Starting and Stopping Services

For demonstrations, use a service that is actually installed on your system. `ssh` is commonly available, but the exact name may be `ssh` or `sshd`.

## Start a Service

Bash

```
sudo systemctl start SERVICE
```

Example:

Bash

```
sudo systemctl start ssh
```

This starts the service immediately.

Important: `start` does not automatically configure the service to start during future boots.

## Stop a Service

Bash

```
sudo systemctl stop SERVICE
```

Example:

Bash

```
sudo systemctl stop ssh
```

This stops the service now.

Be careful when stopping network-related services over an SSH connection. You may disconnect yourself.

## Restart a Service

Bash

```
sudo systemctl restart SERVICE
```

Example:

Bash

```
sudo systemctl restart nginx
```

Restart means:

```
Stop service → Start service again
```

It is commonly used after configuration changes, but it may interrupt active connections.

## Reload a Service

Bash

```
sudo systemctl reload SERVICE
```

Example:

Bash

```
sudo systemctl reload nginx
```

Reload asks the service to reread its configuration without fully stopping and starting the main process.

However:

* Not every service supports reload.

* The service must implement reload behavior.

* If reload is unsupported, systemd may report an error.

## Reload systemd's Unit Configuration

This is different from reloading an individual service:

Bash

```
sudo systemctl daemon-reload
```

Use it after changing or creating a systemd unit file so that systemd rereads the unit definitions.

### Difference Summary

|
Command

|

Purpose

|
| --- | --- |
|

`start`

|

Start service now

|
|

`stop`

|

Stop service now

|
|

`restart`

|

Stop and start service

|
|

`reload`

|

Ask service to reload its own configuration

|
|

`daemon-reload`

|

Ask systemd to reread unit files

|

## Try Status After Each Action

Bash

```
systemctl status ssh
```

# 8. Enable and Disable Services at Boot

## Enable a Service

Bash

```
sudo systemctl enable SERVICE
```

Example:

Bash

```
sudo systemctl enable ssh
```

This configures the service to start automatically during the appropriate boot process.

It does not necessarily start the service immediately.

## Enable and Start Together

Bash

```
sudo systemctl enable --now SERVICE
```

Example:

Bash

```
sudo systemctl enable --now ssh
```

This:

1. Enables the service for future boots.

2. Starts it immediately.

## Disable a Service

Bash

```
sudo systemctl disable SERVICE
```

Example:

Bash

```
sudo systemctl disable ssh
```

This removes its automatic startup configuration.

It does not necessarily stop a currently running service.

## Disable and Stop Together

Bash

```
sudo systemctl disable --now SERVICE
```

Example:

Bash

```
sudo systemctl disable --now ssh
```

## Check Enablement

Bash

```
systemctl is-enabled ssh
```

Possible output:

```
enabled
```

or:

```
disabled
```

## Check Runtime Activity

Bash

```
systemctl is-active ssh
```

Possible output:

```
active
```

### Simple Hinglish Explanation

Do cheezein alag hain:

* Start = abhi service chalao.

* Enable = computer boot hone par service automatically chalao.

Example:

Bash

```
sudo systemctl start nginx
```

Nginx abhi start hoga.

Bash

```
sudo systemctl enable nginx
```

Nginx future boot par automatically start hoga.

Dono ek saath:

Bash

```
sudo systemctl enable --now nginx
```

# 9. Checking Service Status

## Basic Status

Bash

```
systemctl status SERVICE
```

Example:

Bash

```
systemctl status ssh
```

The output generally includes:

* Loaded unit-file information

* Enablement state

* Active state

* Main process ID

* Recent log lines

* Process information

* Startup result

Example structure:

```
● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (...)
     Active: active (running)
   Main PID: 1234 (sshd)
      Tasks: 1
     Memory: ...
     CGroup: ...
```

## Status Without Pager

Bash

```
systemctl status ssh --no-pager
```

## Only Check Active State

Bash

```
systemctl is-active ssh
```

## Only Check Enablement State

Bash

```
systemctl is-enabled ssh
```

## Check Whether It Has Failed

Bash

```
systemctl is-failed ssh
```

## Show Main PID

Bash

```
systemctl show -p MainPID ssh
```

## Show Detailed Properties

Bash

```
systemctl show ssh
```

Filter a specific property:

Bash

```
systemctl show ssh -p ActiveState -p SubState -p MainPID
```

# 10. Logs with `journalctl`

## Technical Definition

`journalctl` is the command-line tool used to query and display logs collected by the systemd journal.

The journal may contain:

* Kernel messages

* Service logs

* Boot messages

* Authentication-related messages

* System startup information

* Application logs sent to standard output/error


# Linux Services and `systemd`

We have completed the Linux Boot Process. Now we are moving to the next topic:

> Linux Services, `systemd`, `systemctl`, targets, and service logs

These concepts are extremely important for Linux administration, servers, DevOps, backend development, databases, Docker hosts, and production environments.

# 1. What Is a Service?

## Technical Definition

A service is a program or background process that provides a particular function to the operating system, users, applications, or other computers.

A service usually runs in the background and waits for requests or performs continuous tasks.

### Examples

|
Service

|

Purpose

|
| --- | --- |
|

SSH

|

Remote login

|
|

Nginx

|

Web server/reverse proxy

|
|

Apache

|

Web server

|
|

MySQL

|

Database server

|
|

PostgreSQL

|

Database server

|
|

Docker

|

Container management

|
|

Cron

|

Scheduled tasks

|
|

NetworkManager

|

Network management

|
|

`systemd-journald`

|

System logging

|

For example, when you run a backend application, it may depend on:

```
Backend application
       ↓
Database service
       ↓
MySQL/PostgreSQL
```

## Simple Hinglish Explanation

Service ek aisa program hai jo background mein run hota hai aur koi specific kaam provide karta hai.

Examples:

* SSH remote connection provide karta hai.

* MySQL database provide karta hai.

* Nginx website serve karta hai.

* Docker containers manage karta hai.

Aap service ko ek background worker samajh sakte ho.

# 2. Daemon vs Service

## What Is a Daemon?

A daemon is a long-running background process that performs a task without requiring direct user interaction.

Linux daemon names often end with `d`.

Examples:

```
sshd
dockerd
crond
systemd-journald
```

The `d` usually stands for daemon.

## Daemon vs Service

|
Term

|

Meaning

|
| --- | --- |
|

Daemon

|

Actual background process

|
|

Service

|

Function provided by the process, or the managed service unit

|
|

Service manager

|

Program that starts, stops, monitors, and manages services

|

Example:

```
systemd
   ↓ manages
ssh.service
   ↓ starts/manages
sshd process
```

### Simple Hinglish

* Daemon = actual background process.

* Service = us process ka provided function.

* systemd = services ko manage karne wala manager.

Example:

```
sshd = daemon
SSH = service/function
systemd = manager
```

# 3. What Is `systemd`?

## Technical Definition

`systemd` is a system and service manager used by many modern Linux distributions.

It is normally started as PID 1, the first user-space process after the kernel initializes.

## Main Responsibilities of `systemd`

`systemd` manages:

* System startup

* Service startup and shutdown

* Service dependencies

* Service failures and restart policies

* System shutdown and reboot

* Targets

* Timers

* Mounts

* Sockets

* Devices

* Logging integration

* Process groups and resource management

Conceptually:

```
Linux Kernel
     ↓
systemd
 ┌───┼─────────────┐
 ↓   ↓             ↓
SSH  Network       Database
     ↓             ↓
  Services      Applications
```

## Check Whether `systemd` Is PID 1

Bash

```
ps -p 1 -o pid,ppid,comm,args
```

Example:

```
PID  PPID COMMAND  COMMAND
1    0    systemd  /sbin/init
```

Check its version:

Bash

```
systemctl --version
```

Check the actual init executable:

Bash

```
readlink -f /sbin/init
```

Possible output:

```
/usr/lib/systemd/systemd
```

The exact path can vary by distribution.

## Hinglish Explanation

`systemd` Linux ka main system manager hai.

Boot hone ke baad yeh manage karta hai:

* Kaunsi service start hogi?

* Kis service ko pehle start karna hai?

* Service crash hone par kya karna hai?

* Shutdown ke time services kaise stop hongi?

* Kaunsi services boot par automatically start hongi?

# 4. What Is `systemctl`?

## Technical Definition

`systemctl` is the command-line tool used to communicate with and control `systemd`.

General syntax:

Bash

```
systemctl [OPTIONS] COMMAND [UNIT]
```

A unit is an object managed by systemd. Examples include:

```
.service
.socket
.target
.timer
.mount
.path
.device
```

For service units, the name generally ends with:

```
.service
```

For example:

```
ssh.service
nginx.service
docker.service
```

The suffix can usually be omitted:

Bash

```
systemctl status ssh
```

is generally equivalent to:

Bash

```
systemctl status ssh.service
```

# 5. Finding Services

## List Running or Loaded Services

Bash

```
systemctl list-units --type=service
```

## List All Installed Service Unit Files

Bash

```
systemctl list-unit-files --type=service
```

Difference:

|
Command

|

Shows

|
| --- | --- |
|

`list-units`

|

Currently loaded units, generally active or known to systemd

|
|

`list-unit-files`

|

Installed unit definitions and enablement states

|

## List Active Services

Bash

```
systemctl list-units --type=service --state=active
```

## List Failed Units

Bash

```
systemctl --failed
```

Or:

Bash

```
systemctl list-units --failed
```

## Search for a Service

Bash

```
systemctl list-unit-files --type=service | grep -i ssh
```

You can also use:

Bash

```
systemctl list-units --all | grep -i nginx
```

# 6. Service States

A service has two important categories of states:

1. Runtime state — Is it running now?

2. Enablement state — Will it start automatically at boot?

## Runtime States

|
State

|

Meaning

|
| --- | --- |
|

`active (running)`

|

Service is currently running

|
|

`active (exited)`

|

Service completed successfully but has no continuously running process

|
|

`inactive (dead)`

|

Service is not running

|
|

`failed`

|

Service failed to start or stopped unexpectedly

|
|

`activating`

|

Service is currently starting

|
|

`deactivating`

|

Service is currently stopping

|
|

`reloading`

|

Service is reloading configuration

|

## Enablement States

|
State

|

Meaning

|
| --- | --- |
|

`enabled`

|

Configured to start automatically

|
|

`disabled`

|

Not configured to start automatically

|
|

`static`

|

Cannot normally be enabled directly; started as a dependency

|
|

`masked`

|

Completely blocked from being started normally

|
|

`indirect`

|

Enabled indirectly through another unit

|
|

`generated`

|

Unit was generated dynamically

|

## Important Difference

```
active/inactive = running status
enabled/disabled = boot configuration
masked/unmasked = whether starting is blocked
```

A service can be:

```
active + disabled
```

Meaning:

> It is running now but will not automatically start at boot.

Or:

```
inactive + enabled
```

Meaning:

> It is configured for boot but is not running right now.

# 7. Starting, Stopping, Restarting, and Reloading

Use a service that exists on your system. For examples, we will use `ssh`, but your system may use `sshd`.

## Start a Service

Bash

```
sudo systemctl start SERVICE
```

Example:

Bash

```
sudo systemctl start ssh
```

This starts the service immediately.

It does not necessarily enable it at boot.

## Stop a Service

Bash

```
sudo systemctl stop SERVICE
```

Example:

Bash

```
sudo systemctl stop ssh
```

This stops the service immediately.

> Be careful when stopping SSH or networking services while connected remotely. You may lose your connection.

## Restart a Service

Bash

```
sudo systemctl restart SERVICE
```

Example:

Bash

```
sudo systemctl restart nginx
```

Restart usually means:

```
Stop → Start
```

It may interrupt active connections.

## Reload a Service

Bash

```
sudo systemctl reload SERVICE
```

Example:

Bash

```
sudo systemctl reload nginx
```

Reload asks the service to reread its configuration without completely stopping the service.

Important:

* Not every service supports reload.

* Reload behavior depends on the service.

* If unsupported, systemd may show an error.

## `daemon-reload`

This is different:

Bash

```
sudo systemctl daemon-reload
```

Use it after creating or changing a systemd unit file.

It tells systemd:

> “Reread the unit configuration files.”

### Difference Table

|
Command

|

Purpose

|
| --- | --- |
|

`start`

|

Start service now

|
|

`stop`

|

Stop service now

|
|

`restart`

|

Stop and start service

|
|

`reload`

|

Ask service to reread its own configuration

|
|

`daemon-reload`

|

Ask systemd to reread unit files

|

# 8. Enable and Disable Services at Boot

## Enable a Service

Bash

```
sudo systemctl enable SERVICE
```

Example:

Bash

```
sudo systemctl enable ssh
```

This configures the service to start automatically during boot.

It does not necessarily start the service immediately.

## Enable and Start Together

Bash

```
sudo systemctl enable --now SERVICE
```

Example:

Bash

```
sudo systemctl enable --now ssh
```

This:

1. Enables the service for future boots.

2. Starts it now.

## Disable a Service

Bash

```
sudo systemctl disable SERVICE
```

Example:

Bash

```
sudo systemctl disable ssh
```

This removes automatic startup configuration.

It does not necessarily stop a currently running service.

## Disable and Stop Together

Bash

```
sudo systemctl disable --now SERVICE
```

Example:

Bash

```
sudo systemctl disable --now ssh
```

## Check Whether a Service Is Enabled

Bash

```
systemctl is-enabled ssh
```

## Check Whether a Service Is Active

Bash

```
systemctl is-active ssh
```

### Hinglish Explanation

Yaad rakho:

```
start  = abhi chalao
enable = boot ke time automatically chalao
```

Example:

Bash

```
sudo systemctl start nginx
```

Nginx abhi start hoga.

Bash

```
sudo systemctl enable nginx
```

Nginx future boot par start hoga.

Dono ek saath:

Bash

```
sudo systemctl enable --now nginx
```

# 9. Checking Service Status

## Basic Status

Bash

```
systemctl status SERVICE
```

Example:

Bash

```
systemctl status ssh
```

Status output generally shows:

* Service description

* Unit file location

* Enabled/disabled state

* Active/inactive state

* Main PID

* Recent log entries

* Process information

* Failure reason, if any

## Avoid the Pager

Bash

```
systemctl status ssh --no-pager
```

## Check Only Runtime State

Bash

```
systemctl is-active ssh
```

## Check Only Boot State

Bash

```
systemctl is-enabled ssh
```

## Show Main PID

Bash

```
systemctl show -p MainPID ssh
```

## Show Selected Properties

Bash

```
systemctl show ssh -p ActiveState -p SubState -p MainPID
```

## Show All Properties

Bash

```
systemctl show ssh
```

# 10. Logs with `journalctl`

## Technical Definition

`journalctl` is used to query logs collected by the systemd journal.

The journal may contain:

* Kernel messages

* Service logs

* Boot messages

* Authentication-related messages

* Startup and shutdown events

* Application output

* System errors

## View All Logs

Bash

```
journalctl
```

This can display a very large amount of data.

## View Logs for a Service

Bash

```
journalctl -u SERVICE
```

Example:

Bash

```
journalctl -u ssh
```

Here:

```
-u = unit
```

## View Current Boot Logs for a Service

Bash

```
journalctl -u ssh -b
```

## Follow Logs Live

Bash

```
journalctl -u ssh -f
```

Yes. We will complete all 10 subtopics of Linux Services and `systemd` properly, then I’ll clearly tell you what is completed and what the next topic is.

The 10 subtopics are:

1. `systemd`

2. `systemctl`

3. Services and targets

4. Logs with `journalctl`

5. Package managers: APT, DNF, Pacman

6. Repositories

7. Installing software

8. Updating and upgrading software

9. Removing software

10. System shutdown and reboot

The first four were already covered. Now we will complete the remaining software-management and shutdown topics in detail.


# Linux Services and Software — Remaining Topics

We have already covered:

* ✅ `systemd`

* ✅ `systemctl`

* ✅ Services and targets

* ✅ Logs with `journalctl`

Now we will complete:

5. Package managers: APT, DNF, Pacman

6. Repositories

7. Installing software

8. Updating and upgrading software

9. Removing software

10. System shutdown and reboot

# 5. Package Managers: APT, DNF, and Pacman

## 5.1 What Is a Package?

### Technical Definition

A package is a bundled collection of files required to install and run a software application on Linux.

A package may contain:

* Program binaries

* Configuration files

* Documentation

* Libraries

* Metadata

* Installation scripts

* Dependency information

Examples of packages:

```
nginx
curl
git
vim
python3
nodejs
mysql-server
docker.io
```

Different Linux distributions use different package formats.

|
Distribution family

|

Package format

|

Package manager

|
| --- | --- | --- |
|

Debian, Ubuntu, Kali

|

`.deb`

|

`apt`, `apt-get`, `dpkg`

|
|

Fedora, RHEL, Rocky, AlmaLinux

|

`.rpm`

|

`dnf`, `rpm`

|
|

Arch Linux, Manjaro

|

`.pkg.tar.zst`

|

`pacman`

|

## 5.2 What Is a Package Manager?

### Technical Definition

A package manager is a tool that automates software installation, updating, removal, dependency resolution, and package metadata management.

Without a package manager, you would often need to:

1. Find software manually.

2. Download it.

3. Find its dependencies.

4. Install dependencies individually.

5. Configure it.

6. Update it manually.

7. Remove all related files manually.

A package manager automates most of this process.

### Simple Hinglish Explanation

Package manager Linux ka software manager hai.

Jaise Windows mein Microsoft Store ya software installer use karte ho, Linux mein package manager software ko:

* Install karta hai

* Update karta hai

* Remove karta hai

* Dependencies install karta hai

* Software versions manage karta hai

# 6. APT — Debian/Ubuntu/Kali Package Manager

## Technical Definition

APT stands for:

> Advanced Package Tool

APT is used on Debian-based distributions such as:

* Debian

* Ubuntu

* Linux Mint

* Kali Linux

* Pop!_OS

APT normally downloads packages from configured repositories and resolves dependencies automatically.

## Common APT Commands

Bash

```
apt
```

or, for administrative operations:

Bash

```
sudo apt
```

General syntax:

Bash

```
sudo apt COMMAND [PACKAGE]
```

## 6.1 Update Package Lists

Bash

```
sudo apt update
```

### What It Does

It downloads the latest package information from configured repositories.

It updates information such as:

* Available package versions

* Package names

* Dependency metadata

* Security updates

* Repository indexes

### Important

Bash

```
sudo apt update
```

does not upgrade installed software.

It only refreshes the package lists.

### Hinglish

`apt update` ka matlab:

> “Repository se software ki latest available information le aao.”

Software actually update nahi hota.

## 6.2 Upgrade Installed Packages

Bash

```
sudo apt upgrade
```

This installs available upgrades for installed packages without normally removing packages or making major dependency changes.

For a more comprehensive upgrade:

Bash

```
sudo apt full-upgrade
```

`full-upgrade` may install or remove packages if required to resolve dependency changes.

### Difference

|
Command

|

Purpose

|
| --- | --- |
|

`apt update`

|

Refresh package information

|
|

`apt upgrade`

|

Upgrade installed packages

|
|

`apt full-upgrade`

|

Upgrade packages while allowing dependency changes

|

### Typical Update Workflow

Bash

```
sudo apt update
```

Bash

```
sudo apt upgrade
```

## 6.3 Search for a Package

Bash

```
apt search PACKAGE
```

Example:

Bash

```
apt search nginx
```

Search package descriptions:

Bash

```
apt search "web server"
```

## 6.4 Show Package Information

Bash

```
apt show PACKAGE
```

Example:

Bash

```
apt show curl
```

This may show:

* Package name

* Version

* Architecture

* Repository

* Size

* Dependencies

* Description

## 6.5 Install a Package

Bash

```
sudo apt install PACKAGE
```

Example:

Bash

```
sudo apt install curl
```

Install multiple packages:

Bash

```
sudo apt install git vim curl
```

Install a specific version, if available:

Bash

```
sudo apt install PACKAGE=VERSION
```

The exact version must exist in your configured repositories.

## 6.6 Reinstall a Package

Bash

```
sudo apt install --reinstall PACKAGE
```

Example:

Bash

```
sudo apt install --reinstall curl
```

Useful when package files are damaged or some installed files need to be restored.

## 6.7 Download Without Installing

Bash

```
apt download PACKAGE
```

Example:

Bash

```
apt download curl
```

This downloads the package file into the current directory without installing it.

Be careful: manually downloaded packages may not automatically have all dependencies installed.

## 6.8 Check Installed Packages

Bash

```
apt list --installed
```

Search within installed packages:

Bash

```
apt list --installed | grep -i nginx
```

You can also use:

Bash

```
dpkg -l
```

## 6.9 Find Which Package Provides a File

For installed package files:

Bash

```
dpkg -S /path/to/file
```

Example:

Bash

```
dpkg -S /usr/bin/curl
```

This asks:

> Which installed package owns this file?

For files not yet installed, tools such as `apt-file` may be used after setup.

# 7. DNF — Fedora/RHEL Package Manager

## Technical Definition

DNF stands for:

> Dandified YUM

DNF is the modern package manager used by distributions such as:

* Fedora

* RHEL

* Rocky Linux

* AlmaLinux

* CentOS Stream

It works with RPM packages and handles dependencies through configured repositories.

Some older systems use `yum`, while modern systems commonly use `dnf`.

## General Syntax

Bash

```
sudo dnf COMMAND [PACKAGE]
```

## 7.1 Refresh and Update Packages

Bash

```
sudo dnf check-update
```

This checks whether updates are available.

To update installed packages:

Bash

```
sudo dnf upgrade
```

On many systems, this also works:

Bash

```
sudo dnf update
```

In modern DNF, `update` is commonly an alias or equivalent to `upgrade`.

### Typical Workflow

Bash

```
sudo dnf check-update
```

Bash

```
sudo dnf upgrade
```

## 7.2 Search for Packages

Bash

```
dnf search PACKAGE
```

Example:

Bash

```
dnf search nginx
```

Search package names only:

Bash

```
dnf list available
```

## 7.3 Show Package Information

Bash

```
dnf info PACKAGE
```

Example:

Bash

```
dnf info curl
```

## 7.4 Install Packages

Bash

```
sudo dnf install PACKAGE
```

Example:

Bash

```
sudo dnf install curl
```

Multiple packages:

Bash

```
sudo dnf install git vim curl
```

## 7.5 Remove Packages

Bash

```
sudo dnf remove PACKAGE
```

Example:

Bash

```
sudo dnf remove nginx
```

DNF generally resolves dependencies and removes packages accordingly.

## 7.6 List Installed Packages

Bash

```
dnf list installed
```

Search installed packages:

Bash

```
dnf list installed | grep -i nginx
```

## 7.7 List Available Updates

Bash

```
dnf list --updates
```

## 7.8 Clean Package Cache

Bash

```
sudo dnf clean all
```

This removes cached package metadata and packages. It may require metadata to be downloaded again later.

# 8. Pacman — Arch Linux Package Manager

## Technical Definition

Pacman is the package manager used by Arch Linux and Arch-based distributions such as:

* Arch Linux

* Manjaro

* EndeavourOS

* Garuda Linux

Pacman manages binary packages and synchronizes with configured repositories.

## General Syntax

Bash

```
sudo pacman OPTION [PACKAGE]
```

Pacman options are often combined.

## 8.1 Synchronize Package Databases

Bash

```
sudo pacman -Sy
```

This refreshes package databases.

However, running only `-Sy` and then installing packages later can create a partial-upgrade risk on Arch-based systems.

For normal full system updates, prefer:

Bash

```
sudo pacman -Syu
```

## 8.2 Update the Entire System

Bash

```
sudo pacman -Syu
```

Breakdown:

|
Option

|

Meaning

|
| --- | --- |
|

`-S`

|

Synchronize/install packages

|
|

`-y`

|

Refresh package databases

|
|

`-u`

|

Upgrade outdated packages

|

This is the standard Arch Linux full-system upgrade command.

## 8.3 Install a Package

Bash

```
sudo pacman -S PACKAGE
```

Example:

Bash

```
sudo pacman -S curl
```

Multiple packages:

Bash

```
sudo pacman -S git vim curl
```

## 8.4 Search for Packages

Search remote repositories:

Bash

```
pacman -Ss PACKAGE
```

Example:

Bash

```
pacman -Ss nginx
```

Search installed packages:

Bash

```
pacman -Qs PACKAGE
```

## 8.5 Show Package Information

Remote package information:

Bash

```
pacman -Si PACKAGE
```

Installed package information:

Bash

```
pacman -Qi PACKAGE
```

## 8.6 Remove a Package

Bash

```
sudo pacman -R PACKAGE
```

Remove a package and its unused dependencies:

Bash

```
sudo pacman -Rs PACKAGE
```

Remove package, dependencies, and configuration files:

Bash

```
sudo pacman -Rns PACKAGE
```

Use `-Rns` carefully. Review what Pacman plans to remove before confirming.

-------