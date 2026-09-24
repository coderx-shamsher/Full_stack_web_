# Boot, Services & Software

We are now starting the next major Linux section:

> Boot, Services & Software — Learn how Linux starts, runs services, and manages software packages.

Our first topic is:

# 1. Linux Boot Process

The boot process is the complete sequence through which a computer goes from power-on to a usable Linux system.

In simple terms:

> When you press the power button, Linux does not start instantly. Several components work one after another to initialize hardware, load the Linux kernel, start the first system process, and finally bring you to the login screen or desktop.

## Boot Process Overview

```
Power ON
   ↓
BIOS / UEFI
   ↓
Bootloader
   ↓
Linux Kernel
   ↓
init / systemd
   ↓
System Services
   ↓
Login Screen / Shell
```

The main stages are:

1. BIOS or UEFI

2. Bootloader

3. Linux kernel

4. init system, usually `systemd`

5. Services and targets

6. Login screen or terminal

# 2. BIOS and UEFI

## Technical Definition

BIOS and UEFI are firmware interfaces stored on the computer's motherboard. They run immediately after the machine is powered on and prepare the hardware for starting an operating system.

Firmware is software that runs before the operating system.

### BIOS

BIOS stands for:

> Basic Input/Output System

It is the older firmware standard used to initialize hardware and begin the boot process.

### UEFI

UEFI stands for:

> Unified Extensible Firmware Interface

UEFI is the modern replacement for traditional BIOS. Most modern computers use UEFI.

## What BIOS/UEFI Does

When the computer starts, BIOS/UEFI:

* Performs basic hardware initialization.

* Checks important hardware components.

* Initializes the CPU, RAM, keyboard, storage, and other devices.

* Determines which device should boot.

* Searches for a bootable disk or boot entry.

* Starts the bootloader.

### Example boot-device order

Your firmware may be configured to check devices in this order:

```
1. USB drive
2. SSD
3. Network boot
```

If a bootable USB is connected, the computer may start from it before the internal SSD.

## BIOS vs UEFI

|
Feature

|

BIOS

|

UEFI

|
| --- | --- | --- |
|

Age

|

Older standard

|

Modern standard

|
|

Interface

|

Usually text-based

|

Can support graphical interfaces

|
|

Partition support

|

Commonly uses MBR

|

Commonly uses GPT

|
|

Boot mode

|

Legacy boot

|

UEFI boot

|
|

Security

|

Limited

|

Supports Secure Boot

|
|

Boot speed

|

Generally slower

|

Generally faster and more flexible

|
|

Boot files

|

Boot code in MBR

|

`.efi` files in EFI System Partition

|

### Simple Hinglish Explanation

BIOS/UEFI computer ka first startup manager hai.

Jab aap power button press karte ho, operating system abhi start nahi hua hota. Sabse pehle motherboard ka firmware check karta hai:

> “Hardware ready hai? Kis disk se operating system start karna hai?”

Uske baad yeh bootloader ko control de deta hai.

# 3. Bootloader

## Technical Definition

A bootloader is a small program responsible for loading the operating system kernel into memory and starting its execution.

Linux systems commonly use:

* GRUB

* systemd-boot

* U-Boot, especially in embedded systems

The most common bootloader in traditional Linux desktop/server installations is GRUB.

## GRUB

GRUB stands for:

> Grand Unified Bootloader

GRUB can:

* Display a boot menu.

* Let you choose between operating systems.

* Let you select different Linux kernels.

* Pass boot parameters to the kernel.

* Start Linux.

* Boot other operating systems such as Windows.

### Example GRUB menu

```
Ubuntu
Advanced options for Ubuntu
Windows Boot Manager
```

The Advanced options entry may show multiple installed kernels:

```
Ubuntu, with Linux 6.x.x
Ubuntu, with Linux 6.x.x - recovery mode
```

## What the Bootloader Loads

The bootloader generally loads:

1. The Linux kernel

2. The initial RAM filesystem, called `initramfs` or `initrd`

3. Kernel boot parameters

The kernel is often stored under:

```
/boot/
```

Example files may include:

```
/boot/vmlinuz-...
/boot/initrd.img-...
/boot/grub/
```

Exact filenames depend on the distribution and installed kernel version.

## Kernel Boot Parameters

The bootloader passes configuration parameters to the kernel.

You can inspect the parameters used by the currently running kernel with:

Bash

```
cat /proc/cmdline
```

Example output:

```
BOOT_IMAGE=/boot/vmlinuz root=/dev/sda2 ro quiet splash
```

Common parameters include:

|
Parameter

|

Meaning

|
| --- | --- |
|

`root=`

|

Specifies the root filesystem

|
|

`ro`

|

Initially mount root filesystem read-only

|
|

`rw`

|

Mount root filesystem read-write

|
|

`quiet`

|

Reduce boot messages

|
|

`splash`

|

Show graphical splash screen

|
|

`nomodeset`

|

Can help with certain graphics-driver boot problems

|

### Simple Hinglish Explanation

Bootloader Linux ka starter program hai.

BIOS/UEFI bolta hai:

> “Ab operating system start karo.”

Bootloader Linux kernel ko RAM mein load karta hai aur usko start kar deta hai.

Agar computer mein Windows aur Linux dono installed hain, to GRUB aapko choice deta hai:

> “Windows start karna hai ya Linux?”

# 4. Linux Kernel

## Technical Definition

The Linux kernel is the core component of the operating system. It manages hardware resources and provides essential services to user-space programs.

The kernel is responsible for:

* CPU scheduling

* Memory management

* Process management

* Device management

* File-system access

* Networking

* Security mechanisms

* System calls

## What Happens During Boot?

After the bootloader loads the kernel:

1. The kernel decompresses itself, if necessary.

2. It initializes core subsystems.

3. It detects and initializes hardware.

4. It initializes memory management.

5. It loads necessary drivers.

6. It prepares the root filesystem.

7. It starts the first user-space process.

The kernel does not directly provide your desktop, terminal, browser, or file manager. Those are user-space programs.

## Kernel and User Space

```
User Space
────────────────────────────
Desktop
Terminal
Web Browser
SSH
System Services
Shell
────────────────────────────
Kernel Space
────────────────────────────
CPU Management
Memory Management
Drivers
File Systems
Networking
Security
────────────────────────────
Hardware
```

### Check the Running Kernel

Bash

```
uname -r
```

Example:

```
6.8.0-xx-generic
```

More complete information:

Bash

```
uname -a
```

Other useful commands:

Bash

```
hostnamectl
```

Bash

```
cat /proc/version
```

### Simple Hinglish Explanation

Kernel Linux ka main engine hai.

Bootloader kernel ko start karta hai. Kernel phir hardware ko control karta hai:

* CPU ko kaam assign karna

* RAM manage karna

* Disk se data read/write karna

* Network manage karna

* Devices ko operate karna

Kernel ke bina Linux operating system properly kaam nahi kar sakta.

# 5. init System

## Technical Definition

After the kernel initializes the system, it starts the first user-space process. This process traditionally is called `init` and has PID 1.

The init system is responsible for bringing the system into a usable state and managing system services.

On most modern Linux distributions, the init system is:

> systemd

Older systems may use:

* SysVinit

* OpenRC

* runit

* BusyBox init

## PID 1

The first user-space process has process ID `1`.

Check it with:

Bash

```
ps -p 1 -o pid,ppid,comm,args
```

Typical output on a systemd-based distribution:

```
PID  PPID COMMAND  COMMAND
1    0    systemd  /sbin/init
```

Notice that `/sbin/init` may actually be a symbolic link to `systemd`.

Check it with:

Bash

```
readlink -f /sbin/init
```

Possible output:

```
/usr/lib/systemd/systemd
```

The exact path may vary by distribution.

## Why PID 1 Is Important

PID 1:

* Starts essential services.

* Manages service dependencies.

* Handles system startup.

* Reaps orphaned processes.

* Helps coordinate system shutdown.

* Responds to service failures and restart policies.

### Simple Hinglish Explanation

Kernel ke baad system ko chalane ke liye ek first process start hota hai.

Uska PID hota hai:

```
PID 1
```

Modern Linux mein usually yeh `systemd` hota hai.

Aap isko Linux ka main manager samajh sakte ho. Yeh decide karta hai:

> “Network start karo, SSH start karo, logging start karo, login screen ready karo.”

# 6. `init` vs `systemd`

Historically, Linux used a program called `init` as the first process. Today, `init` is also used as a general name for the initialization system.

There are two meanings:

1. Generic concept: The first user-space initialization process.

2. Specific modern implementation: `systemd`.

For example:

```
Kernel → init system → services
```

On a modern Ubuntu system:

```
Kernel → systemd → services
```

The command:

Bash

```
ps -p 1 -o comm=
```

can show the actual process name.

# 7. initramfs: The Temporary Early Root Filesystem

This is an important part of the boot process.

## Technical Definition

`initramfs` means:

> Initial RAM Filesystem

It is a temporary filesystem loaded into RAM by the bootloader along with the kernel.

It contains the tools, scripts, and drivers required to prepare the real root filesystem.

## Why Is initramfs Needed?

Sometimes the kernel cannot immediately access the real root filesystem because it needs:

* Storage drivers

* RAID support

* LVM tools

* Disk encryption tools

* Filesystem modules

* Network boot support

The `initramfs` environment helps prepare these things before the real root filesystem is mounted.

## Boot Flow with initramfs

```
BIOS/UEFI
   ↓
Bootloader
   ↓
Kernel + initramfs
   ↓
Hardware and storage preparation
   ↓
Real root filesystem mounted
   ↓
systemd / init starts
```

### Inspect initramfs Files

Bash

```
ls -lh /boot
```

On many distributions, you may see files such as:

```
vmlinuz-...
initrd.img-...
```

The `initrd.img` or similar file is commonly the initial RAM filesystem image.

### Simple Hinglish Explanation

Kabhi-kabhi kernel ko actual disk tak pahunchne ke liye pehle kuch drivers ya tools chahiye hote hain.

`initramfs` ek temporary mini Linux environment hota hai jo RAM mein load hota hai. Yeh kernel ko help karta hai:

> “Pehle disk unlock/mount/prepare kar lo, phir actual Linux filesystem start karte hain.”

# 8. Complete Linux Boot Sequence

Now combine everything:

```
1. Power button pressed
        ↓
2. BIOS/UEFI firmware starts
        ↓
3. Hardware initialization and checks
        ↓
4. Firmware selects boot device
        ↓
5. Bootloader such as GRUB starts
        ↓
6. Bootloader loads Linux kernel
        ↓
7. Bootloader loads initramfs
        ↓
8. Kernel initializes CPU, RAM, drivers, and devices
        ↓
9. initramfs prepares and finds the real root filesystem
        ↓
10. Kernel starts PID 1
        ↓
11. systemd starts required services and targets
        ↓
12. Login service or graphical display manager starts
        ↓
13. User gets a terminal or desktop
```

## Visual Mental Model

## Linux Boot Chain

Power ON

Computer receives power.

BIOS / UEFI

Initializes hardware and selects boot device.

Bootloader

Loads the kernel and initramfs.

Linux Kernel

Initializes hardware and core operating-system functions.

systemd / init

Starts services and prepares the system.

Login / Desktop / Shell

The system is ready for the user.

# 9. Useful Commands for Investigating Boot

## 9.1 Check Kernel Version

Bash

```
uname -r
```

## 9.2 Check Kernel Command Line

Bash

```
cat /proc/cmdline
```

## 9.3 Check PID 1

Bash

```
ps -p 1 -o pid,ppid,comm,args
```

## 9.4 Check init implementation

Bash

```
readlink -f /sbin/init
```

## 9.5 Check systemd version

Bash

```
systemctl --version
```

## 9.6 View Boot Logs

Bash

```
journalctl -b
```

Here:

* `journalctl` reads systemd journal logs.

* `-b` means the current boot.

View kernel messages from the current boot:

Bash

```
journalctl -k -b
```

Show only errors from the current boot:

Bash

```
journalctl -b -p err
```

Show previous boot logs:

Bash

```
journalctl -b -1
```

> The availability of previous boot logs depends on whether persistent journal storage is configured.

## 9.7 Check Boot Time

Bash

```
systemd-analyze
```

Example output:

```
Startup finished in 5.2s (firmware) + 1.8s (loader) + 2.4s (kernel) + 4.1s (userspace) = 13.5s
```

View services that took the most startup time:

Bash

```
systemd-analyze blame
```

View the boot dependency chain:

Bash

```
systemd-analyze critical-chain
```

# 10. Common Misunderstandings

## Misunderstanding 1: BIOS is Linux

No. BIOS/UEFI is motherboard firmware. Linux is the operating system kernel and its surrounding user-space components.

## Misunderstanding 2: GRUB is the Linux kernel

No.

* GRUB = bootloader

* Linux = kernel

GRUB loads the kernel.

## Misunderstanding 3: `init` and `systemd` are always separate

Not necessarily. On many modern distributions, `systemd` is the init system and provides the PID 1 process.

## Misunderstanding 4: The kernel starts the desktop directly

The kernel starts the first user-space process. The init system starts services, including the display manager that may eventually show the graphical login screen.

## Misunderstanding 5: Booting and logging in are the same thing

No. Booting includes many steps before the user logs in. Login is one of the final stages of the boot process.

# 11. Practical Lab

Run these commands one by one:

Bash

```
uname -r
```

Bash

```
cat /proc/cmdline
```

Bash

```
ps -p 1 -o pid,ppid,comm,args
```

Bash

```
readlink -f /sbin/init
```

Bash

```
systemctl --version
```

Bash

```
ls -lh /boot
```

Bash

```
systemd-analyze
```

Bash

```
journalctl -b -p err
```

## Practice Questions

Try answering these without looking above:

1. What is the role of BIOS/UEFI?

2. What does a bootloader do?

3. What is GRUB?

4. What is the Linux kernel?

5. What is PID 1?

6. Why is `initramfs` needed?

7. What is the difference between `init` and `systemd`?

8. Which command shows the current kernel version?

9. Which command shows the current boot logs?

10. Which command shows the boot-time breakdown?


## Boot Process — Completion Status

The Linux Boot Process topic is now completed.

You should now understand this complete chain:

```
BIOS/UEFI
   ↓
Bootloader / GRUB
   ↓
Linux Kernel
   ↓
initramfs
   ↓
PID 1 / systemd
   ↓
System Services
   ↓
Login Screen / Terminal
```

### Important Commands Revised

Bash

```
uname -r
```

Shows the running kernel version.

Bash

```
cat /proc/cmdline
```

Shows kernel boot parameters.

Bash

```
ps -p 1 -o pid,ppid,comm,args
```

Shows the PID 1 process.

Bash

```
readlink -f /sbin/init
```

Shows which init implementation is being used.

Bash

```
systemctl --version
```

Shows the installed systemd version.

Bash

```
journalctl -b
```

Shows logs from the current boot.

Bash

```
systemd-analyze
```

Shows boot-time information.

Bash

```
systemd-analyze blame
```

Shows services ordered by startup time.

# Progress Update

|
Topic

|

Status

|
| --- | --- |
|

Boot process: BIOS/UEFI → bootloader → kernel → init

|

✅ Completed

|
|

Services and service management

|

⏳ Next

|
|

`systemd` and `systemctl`

|

⏳ Next

|
|

`journalctl` and service logs

|

⏳ Next

|
|

Software/package management revision

|

Later

|

## Next Topic

We will now move to:

# Linux Services and `systemd`

We will cover:

* What is a service?

* Daemon vs service

* What is `systemd`?

* What is `systemctl`?

* Start, stop, restart, reload services

* Enable and disable services at boot

* Check service status

* View service logs

* Service states

* Targets and runlevels

* Service files and unit files

* Dependencies

* Practical service-management lab

* Common mistakes and professional practices

Boot Process is done. Next: Linux Services and `systemd`.
