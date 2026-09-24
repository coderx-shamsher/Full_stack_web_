# Linux Networking Fundamentals

Networking is one of the most important Linux topics for:

* Servers

* Backend development

* Docker and containers

* Cloud infrastructure

* SSH

* APIs

* DNS

* Web hosting

* Network troubleshooting

We will build the foundation step by step.

# 1. What Is Linux Networking?

## Technical Definition

Networking is the process through which computers, servers, containers, and other devices communicate and exchange data using defined protocols.

In Linux, networking is handled through:

1. Network interfaces

2. IP addresses

3. Routing tables

4. Ports

5. Protocols

6. DNS

7. Network utilities

### Simple Hinglish Explanation

Networking ka simple matlab hai:

> Ek computer ya server ka doosre computer/server ke saath data exchange karna.

For example:

```
Your Browser
     |
     | HTTP Request
     v
Web Server
     |
     | Database Request
     v
Database Server
```

Linux server ko internet par kisi website, API, database, ya doosre server se communicate karne ke liye networking ki zaroorat hoti hai.

# 2. Important Networking Concepts

Before commands, understand these basic terms:

|
Concept

|

Meaning

|
| --- | --- |
|

IP Address

|

Device/interface ka network address

|
|

Network Interface

|

Network connection ka Linux representation

|
|

MAC Address

|

Network hardware/interface ka unique address

|
|

Route

|

Data ko kis direction mein bhejna hai

|
|

Gateway

|

Another network tak pahunchne ka router

|
|

DNS

|

Domain name ko IP address mein convert karta hai

|
|

Port

|

Specific application/service ka communication endpoint

|
|

Socket

|

IP + port + protocol ka communication endpoint

|

Example:

```
https://example.com:443
```

Here:

* `example.com` = domain name

* `443` = HTTPS port

* DNS domain ko IP mein resolve karega

* Route decide karega packet kahan bhejna hai

# 3. IP Addresses

## Technical Definition

An IP address is a logical numerical address assigned to a network interface so that devices can identify and communicate with each other over an IP network.

Linux commonly works with:

* IPv4

* IPv6

## 3.1 IPv4

IPv4 uses 32 bits and is normally written in four decimal sections.

Example:

```
192.168.1.10
```

Each section is called an octet and ranges from:

```
0 to 255
```

Another example:

```
10.0.0.5
172.16.0.20
8.8.8.8
```

### Hinglish

IPv4 ek address hota hai jo device ko network par identify karta hai.

Jaise ghar ka address hota hai, waise network mein device ka IP address hota hai.

## 3.2 IPv6

IPv6 uses 128 bits and is written in hexadecimal format.

Example:

```
2001:db8::1
```

Another example:

```
fe80::a00:27ff:fe4e:66a1
```

IPv6 was introduced mainly because IPv4 addresses are limited.

## 3.3 Private IP Addresses

Private IP addresses are used inside local networks.

Common private IPv4 ranges:

```
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
```

Examples:

```
192.168.1.10
10.0.0.5
172.16.20.4
```

These are generally not directly routable over the public internet.

### Hinglish

Private IP ghar, office, VM, Docker network, ya internal server ke andar use hota hai.

## 3.4 Public IP Address

A public IP address is reachable through the public internet, depending on routing and firewall configuration.

Example:

```
203.0.113.10
```

> `203.0.113.0/24` is reserved for documentation examples, so it is useful in tutorials but not for real public hosting.

## 3.5 Loopback Address

Loopback means the machine communicating with itself.

IPv4 loopback:

```
127.0.0.1
```

Common hostname:

```
localhost
```

IPv6 loopback:

```
::1
```

Example:

Bash

```
ping 127.0.0.1
```

### Hinglish

`127.0.0.1` ka matlab hai:

> Main khud se communication kar raha hoon.

Backend development mein:

```
localhost:3000
localhost:5000
localhost:3306
```

common examples hain.

# 4. Network Interfaces

## Technical Definition

A network interface is a software or hardware endpoint through which a Linux system sends and receives network traffic.

Examples:

* `eth0` — traditional Ethernet interface

* `ens33` — predictable Ethernet naming

* `enp0s3` — common VirtualBox interface

* `wlan0` — traditional Wi-Fi interface

* `wlp2s0` — predictable Wi-Fi naming

* `lo` — loopback interface

* `docker0` — Docker bridge interface

Your system may use different names.

## 4.1 View Network Interfaces

The modern command is:

Bash

```
ip link
```

or:

Bash

```
ip link show
```

Example output:

```
1: lo: <LOOPBACK,UP,LOWER_UP> ...
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> ...
```

### Meaning

|
Part

|

Meaning

|
| --- | --- |
|

`lo`

|

Loopback interface

|
|

`eth0`

|

Ethernet interface

|
|

`UP`

|

Interface is administratively enabled

|
|

`LOWER_UP`

|

Physical/link layer is active

|
|

`BROADCAST`

|

Supports broadcast

|
|

`MULTICAST`

|

Supports multicast

|

## 4.2 Show IP Addresses of Interfaces

Bash

```
ip addr
```

Short form:

Bash

```
ip a
```

Specific interface:

Bash

```
ip addr show eth0
```

Example:

```
2: eth0:
    inet 192.168.1.20/24
    inet6 fe80::1234/64
```

This tells us:

* Interface: `eth0`

* IPv4 address: `192.168.1.20`

* Prefix length: `/24`

* IPv6 address: `fe80::1234`

## 4.3 Understand Interface State

Bash

```
ip link show eth0
```

Bring an interface up:

Bash

```
sudo ip link set eth0 up
```

Bring an interface down:

Bash

```
sudo ip link set eth0 down
```

> Be careful. If you disable the interface through which you are connected to a remote server, your SSH connection may terminate.

### Important Note

Commands using `ip` may change the current runtime configuration. Depending on the Linux distribution and network manager, changes may not persist after reboot.

For persistent configuration, use the system's networking system, such as:

* NetworkManager

* Netplan

* systemd-networkd

* Distribution-specific configuration

# 5. The `ip` Command

## Technical Definition

`ip` is a modern Linux command-line utility used to inspect and manage:

* Network interfaces

* IP addresses

* Routing tables

* Neighbors/ARP

* Network namespaces

* Network configuration

It is part of the `iproute2` package.

## Basic Syntax

Bash

```
ip OBJECT COMMAND
```

Common objects:

```
link
addr
route
neigh
rule
```

Examples:

Bash

```
ip link
ip addr
ip route
ip neigh
```

## 5.1 Important `ip` Commands

### Show interfaces

Bash

```
ip link show
```

### Show IP addresses

Bash

```
ip addr show
```

### Show routes

Bash

```
ip route show
```

### Show ARP/neighbour table

Bash

```
ip neigh show
```

### Show one interface

Bash

```
ip addr show dev eth0
```

### Add an IP address temporarily

Bash

```
sudo ip addr add 192.168.1.50/24 dev eth0
```

### Remove an IP address

Bash

```
sudo ip addr del 192.168.1.50/24 dev eth0
```

### Bring interface up

Bash

```
sudo ip link set dev eth0 up
```

### Bring interface down

Bash

```
sudo ip link set dev eth0 down
```

## 5.2 Important `ip` Options and Keywords

|
Command/Keyword

|

Purpose

|
| --- | --- |
|

`ip -br addr`

|

Brief readable IP output

|
|

`ip -c addr`

|

Colored output where supported

|
|

`ip -s link`

|

Show interface statistics

|
|

`ip -d link`

|

Show detailed link information

|
|

`ip link show dev eth0`

|

Show specific interface

|
|

`ip addr flush dev eth0`

|

Remove addresses from interface

|
|

`ip route get IP`

|

Show route selected for destination

|
|

`ip neigh`

|

Show neighbor/ARP information

|

### Useful examples

Bash

```
ip -br addr
```

This gives a compact output such as:

```
lo       UNKNOWN        127.0.0.1/8 ::1/128
eth0     UP             192.168.1.20/24
```

View route selection:

Bash

```
ip route get 8.8.8.8
```

This is extremely useful for troubleshooting.

# 6. Routes and Routing Tables

## Technical Definition

A route is a rule that tells the operating system where and through which interface to send network packets.

The Linux kernel checks the routing table to decide:

* Destination network

* Gateway

* Interface

* Source IP

* Route priority/metric

## 6.1 View Routing Table

Bash

```
ip route
```

Example:

```
default via 192.168.1.1 dev eth0
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.20
```

Let's break it down.

### Default Route

```
default via 192.168.1.1 dev eth0
```

Meaning:

* `default` = For destinations not matching a more specific route

* `via 192.168.1.1` = Send traffic to gateway

* `dev eth0` = Use `eth0`

### Connected Route

```
192.168.1.0/24 dev eth0
```

Meaning:

* Network: `192.168.1.0/24`

* Directly reachable through `eth0`

### Source Address

```
src 192.168.1.20
```

This is the source IP Linux may use for that route.

## 6.2 Default Gateway

A default gateway is the router used when the destination is outside the local network.

Example:

```
Your Linux machine: 192.168.1.20
Gateway:            192.168.1.1
Internet server:    142.250.x.x
```

Traffic flow:

```
Linux Machine
192.168.1.20
      |
      v
Gateway
192.168.1.1
      |
      v
Internet
```

### Hinglish

Agar destination same local network mein nahi hai, to Linux packet ko gateway/router ke paas bhejta hai.

## 6.3 Check Route to a Specific IP

Bash

```
ip route get 8.8.8.8
```

Example output:

```
8.8.8.8 via 192.168.1.1 dev eth0 src 192.168.1.20
```

This tells you exactly:

* Gateway

* Interface

* Source IP

This is more useful than simply viewing the entire routing table when debugging one destination.

## 6.4 Add a Route

Example:

Bash

```
sudo ip route add 10.10.0.0/16 via 192.168.1.1 dev eth0
```

Meaning:

> To reach the `10.10.0.0/16` network, use gateway `192.168.1.1` through `eth0`.

Delete route:

Bash

```
sudo ip route del 10.10.0.0/16
```

Replace route:

Bash

```
sudo ip route replace 10.10.0.0/16 via 192.168.1.1 dev eth0
```

### Warning

Manually added routes may be temporary and may disappear after reboot or network restart.

# 7. The `ss` Command

## Technical Definition

`ss` stands for socket statistics. It displays information about network sockets and is used to inspect:

* Listening ports

* Active TCP connections

* UDP sockets

* Process ownership

* Connection states

* Local and remote addresses

It is the modern replacement for many uses of `netstat`.

## Basic Syntax

Bash

```
ss [options]
```

## 7.1 Show Listening TCP and UDP Ports

Bash

```
ss -tuln
```

Meaning:

|
Flag

|

Meaning

|
| --- | --- |
|

`-t`

|

TCP sockets

|
|

`-u`

|

UDP sockets

|
|

`-l`

|

Listening sockets

|
|

`-n`

|

Do not resolve names; show numeric addresses/ports

|

Example:

```
Netid State  Local Address:Port
tcp   LISTEN 0.0.0.0:22
tcp   LISTEN 127.0.0.1:3000
tcp   LISTEN 0.0.0.0:80
```

### Hinglish

Is command se pata chalta hai ki system par kaunse ports open/listening hain.

For example:

* `22` = SSH

* `80` = HTTP

* `443` = HTTPS

* `3000` = Common Node.js development port

* `3306` = MySQL default port

## 7.2 Show Listening Ports with Processes

Bash

```
sudo ss -tulpn
```

Additional flag:

|
Flag

|

Meaning

|
| --- | --- |
|

`-p`

|

Show process using socket

|

Example:

```
tcp LISTEN 0 128 0.0.0.0:3000 0.0.0.0:* users:(("node",pid=1234,fd=21))
```

This tells us:

* Process: `node`

* PID: `1234`

* Port: `3000`

## 7.3 Show All TCP Connections

Bash

```
ss -tan
```

### Important TCP states

|
State

|

Meaning

|
| --- | --- |
|

`LISTEN`

|

Server waiting for connections

|
|

`ESTAB`

|

Connection established

|
|

`SYN-SENT`

|

Connection request sent

|
|

`SYN-RECV`

|

Request received

|
|

`TIME-WAIT`

|

Connection recently closed

|
|

`CLOSE-WAIT`

|

Remote side closed connection, local app has not fully closed

|
|

`FIN-WAIT-1`

|

Local side is closing

|
|

`FIN-WAIT-2`

|

Waiting for remote close

|
|

`CLOSED`

|

No connection

|

## 7.4 Filter by Port

Check port `8080`:

Bash

```
ss -tuln | grep ':8080'
```

Check TCP listening ports:

Bash

```
ss -ltn
```

Check UDP listening ports:

Bash

```
ss -lun
```

Show established connections:

Bash

```
ss -tn state established
```

## 7.5 Professional Usage

When a backend cannot start because a port is already in use:

Bash

```
sudo ss -ltnp | grep ':3000'
```

Then identify the process and decide whether to stop it.

Do not blindly kill processes in production. First inspect:

Bash

```
ps -fp PID
```

# 8. The `ping` Command

## Technical Definition

`ping` tests network reachability by sending ICMP Echo Request packets and waiting for ICMP

# Linux Networking: `ping`, `curl`, `wget`, DNS and `/etc/hosts`

In this lesson, we will focus specifically on:

1. `ping`

2. `curl`

3. `wget`

4. DNS

5. `/etc/hosts`

These commands are very useful for backend development, API testing, server administration, Docker, and troubleshooting.

# 1. `ping`

## Technical Definition

`ping` is a Linux networking utility used to test whether a destination host is reachable over a network.

It sends an ICMP Echo Request packet to the destination and waits for an ICMP Echo Reply.

```
Your Machine
     |
     | ICMP Echo Request
     v
Destination Server
     |
     | ICMP Echo Reply
     v
Your Machine
```

## Simple Hinglish Explanation

`ping` ka matlab hai:

> "Kya doosra computer/server reachable hai?"

Jaise hum kisi person ko call karke check karte hain ki woh available hai ya nahi, waise `ping` network host ko check karta hai.

## Basic Syntax

Bash

```
ping [options] destination
```

Examples:

Bash

```
ping 127.0.0.1
```

Bash

```
ping 8.8.8.8
```

Bash

```
ping google.com
```

## 1.1 Ping Localhost

Bash

```
ping 127.0.0.1
```

or:

Bash

```
ping localhost
```

This tests the local loopback interface.

Example output:

```
PING localhost (127.0.0.1) 56(84) bytes of data.
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.028 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.034 ms
```

### What does this tell us?

It tells us that the local networking stack is working.

It does not prove that the internet is working.

## 1.2 Ping a Specific IP

Bash

```
ping 8.8.8.8
```

`8.8.8.8` is a commonly used public DNS server operated by Google.

To stop continuous pinging:

```
Ctrl + C
```

## 1.3 Send Only a Fixed Number of Packets

By default, Linux `ping` generally continues until interrupted.

Use `-c`:

Bash

```
ping -c 4 google.com
```

Meaning:

```
-c 4 = send 4 packets
```

This is better for scripts and quick tests.

## 1.4 Set the Time Interval

Bash

```
ping -i 2 google.com
```

Meaning:

```
-i 2 = send one packet approximately every 2 seconds
```

Default intervals may vary depending on implementation and privileges.

## 1.5 Set Timeout

Bash

```
ping -W 2 google.com
```

This specifies how long to wait for a response, depending on the Linux `ping` implementation.

## 1.6 Read Ping Output

Example:

```
64 bytes from 142.250.183.14: icmp_seq=1 ttl=117 time=22.5 ms
```

|
Field

|

Meaning

|
| --- | --- |
|

`64 bytes`

|

Size of reply

|
|

`icmp_seq=1`

|

Packet sequence number

|
|

`ttl=117`

|

Time To Live value

|
|

`time=22.5 ms`

|

Round-trip time

|

At the end, you may see:

```
4 packets transmitted, 4 received, 0% packet loss
```

### Important Terms

#### Latency

Latency is the time taken for data to travel to the destination and back.

Example:

```
time=22.5 ms
```

Lower latency generally means faster response time.

#### Packet Loss

Packet loss means some packets did not receive a reply.

Example:

```
4 packets transmitted, 3 received, 25% packet loss
```

Packet loss may indicate:

* Weak network

* Congestion

* Firewall filtering

* Routing problems

* Destination restrictions

## 1.7 Important Warning

If ping fails, it does not always mean the server is down.

A server may block ICMP while still allowing HTTP, HTTPS, or SSH.

For example:

Bash

```
ping example.com
```

may fail, while:

Bash

```
curl https://example.com
```

works successfully.

### Professional Practice

Use `ping` only as one part of troubleshooting.

# 2. `curl`

## Technical Definition

`curl` is a command-line tool used to transfer data to and from servers using URLs and network protocols.

It is especially useful for:

* HTTP/HTTPS requests

* REST API testing

* Backend debugging

* Checking response headers

* Testing authentication

* Sending JSON data

* Downloading files

* Debugging TLS and redirects

## Simple Hinglish Explanation

`curl` ko aap command-line browser ya API testing tool samajh sakte ho.

Browser mein URL open karte ho:

```
https://example.com
```

Terminal mein same kaam:

Bash

```
curl https://example.com
```

Backend developers ke liye `curl` bahut important hai.

## Basic Syntax

Bash

```
curl [options] URL
```

## 2.1 Basic GET Request

Bash

```
curl https://example.com
```

This sends an HTTP GET request and prints the response body.

For an API:

Bash

```
curl https://jsonplaceholder.typicode.com/users
```

If the API returns JSON, the JSON will be printed in the terminal.

## 2.2 Show Only HTTP Headers

Bash

```
curl -I https://example.com
```

`-I` means headers only.

Example:

```
HTTP/2 200
content-type: text/html
content-length: 1256
```

Useful for checking:

* Status code

* Content type

* Redirects

* Cache headers

* Server headers

* Security headers

## 2.3 Show Headers and Body

Bash

```
curl -i https://example.com
```

Difference:

Bash

```
curl URL
```

Shows only response body.

Bash

```
curl -I URL
```

Shows headers only.

Bash

```
curl -i URL
```

Shows headers and body.

## 2.4 Follow Redirects

Bash

```
curl -L http://example.com
```

`-L` follows redirects.

Example:

```
http://example.com
       |
       | Redirect
       v
https://example.com
```

Without `-L`, `curl` may show the redirect response instead of following it.

## 2.5 Save Output to a File

Bash

```
curl -o example.html https://example.com
```

Here:

```
-o = choose output filename
```

Another example:

Bash

```
curl -o response.json https://jsonplaceholder.typicode.com/users
```

## 2.6 Use the Remote Filename

Bash

```
curl -O https://example.com/file.zip
```

Here:

```
-O = use the filename from the URL
```

### Difference Between `-o` and `-O`

|
Command

|

Meaning

|
| --- | --- |
|

`curl -o myfile.zip URL`

|

Save using your chosen filename

|
|

`curl -O URL`

|

Save using remote filename

|

## 2.7 Verbose Mode

Bash

```
curl -v https://example.com
```

Verbose mode displays more information about:

* DNS resolution

* TCP connection

* TLS handshake

* Request headers

* Response headers

* Connection details

This is useful for debugging.

Example:

Bash

```
curl -v https://api.example.com
```

### Security Warning

Verbose output may expose:

* Authorization headers

* Cookies

* API tokens

* Sensitive URLs

Do not share verbose output publicly without reviewing it.

## 2.8 Add Request Headers

Bash

```
curl -H "Content-Type: application/json" https://api.example.com/users
```

`-H` means add a custom HTTP header.

Authorization example:

Bash

```
curl \
  -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/profile
```

## 2.9 Send POST JSON Data

Bash

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Steve","email":"steve@example.com"}' \
  https://api.example.com/users
```

Explanation:

|
Option

|

Meaning

|
| --- | --- |
|

`-X POST`

|

Use POST method

|
|

`-H`

|

Add HTTP header

|
|

`-d`

|

Send request body

|

When `-d` is used, `curl` generally uses POST automatically, but `-X POST` makes the method explicit.

## 2.10 Send Form Data

Bash

```
curl -X POST \
  -d "username=steve&password=12345" \
  https://example.com/login
```

For separate form fields:

Bash

```
curl \
  -d "username=steve" \
  -d "password=12345" \
  https://example.com/login
```

> Do not use real passwords in terminal examples because shell history may save them.

## 2.11 Check HTTP Status Code

Bash

```
curl -o /dev/null -s -w "%{http_code}\n" https://example.com
```

Explanation:

|
Part

|

Purpose

|
| --- | --- |
|

`-o /dev/null`

|

Discard response body

|
|

`-s`

|

Silent mode

|
|

`-w`

|

Print formatted output

|
|

`%{http_code}`

|

Print HTTP status code

|

Example output:

```
200
```

## 2.12 Useful HTTP Status Codes

|
Status

|

Meaning

|
| --- | --- |
|

`200`

|

Request successful

|
|

`201`

|

Resource created

|
|

`301`

|

Permanent redirect

|
|

`302`

|

Temporary redirect

|
|

`400`

|

Bad request

|
|

`401`

|

Authentication required

|
|

`403`

|

Forbidden

|
|

`404`

|

Resource not found

|
|

`500`

|

Server-side error

|
|

`502`

|

Bad gateway

|
|

`503`

|

Service unavailable

|

## 2.13 Test a Local Backend

Suppose your Express server is running on port `3000`.

Bash

```
curl http://localhost:3000
```

Test a route:

Bash

```
curl http://localhost:3000/api/users
```

Send JSON:

Bash

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"coderx"}' \
  http://localhost:3000/api/users
```

This allows you to test the backend without using a frontend.

# 3. `wget`

## Technical Definition

`wget` is a command-line utility mainly used for downloading files over protocols such as:

* HTTP

* HTTPS

* FTP

It is designed for non-interactive downloads and works well on servers.

## Simple Hinglish Explanation

`wget` ka main purpose hai:

> Internet se files download karna.

For example:

* `.zip`

* `.tar.gz`

* `.iso`

* `.pdf`

* Software packages

* Backup files

## Basic Syntax

Bash

```
wget [options] URL
```

## 3.1 Download a File

Bash

```
wget https://example.com/file.zip
```

The file will usually be saved in the current directory.

Check current directory:

Bash

```
pwd
```

List downloaded file:

Bash

```
ls -lh
```

## 3.2 Choose Download Filename

Bash

```
wget -O myfile.zip https://example.com/file.zip
```

Here:

```
-O = output filename
```

## 3.3 Resume an Interrupted Download

Bash

```
wget -c https://example.com/large-file.iso
```

Here:

```
-c = continue/resume download
```

This is useful when downloading large files over an unstable connection.

## 3.4 Download in Background

Bash

```
wget -b https://example.com/large-file.iso
```

`-b` starts the download in the background.

You can inspect the log generated by `wget`.


# Linux Networking — DNS and `/etc/hosts`

DNS and `/etc/hosts` are responsible for hostname resolution.

In simple words:

> When we type a name like `google.com`, Linux needs to find the IP address associated with that name.

# 1. What Is DNS?

## Technical Definition

DNS, or Domain Name System, is a distributed naming system that translates human-readable domain names into IP addresses.

For example:

```
google.com  →  142.250.x.x
```

A computer communicates using IP addresses, but remembering IP addresses for every website would be difficult. DNS allows us to use readable names.

## Simple Hinglish Explanation

DNS internet ka phonebook hai.

Phonebook mein:

```
Steve → Phone Number
```

DNS mein:

```
google.com → IP Address
```

Jab aap browser mein likhte ho:

```
https://google.com
```

system ko pehle pata karna hota hai:

```
google.com ka IP address kya hai?
```

DNS is question ka answer deta hai.

# 2. DNS Resolution Kaise Work Karta Hai?

Suppose you run:

Bash

```
curl https://example.com
```

Simplified process:

```
curl
  |
  v
Linux Resolver
  |
  v
DNS Server
  |
  v
IP Address
  |
  v
Web Server
```

Detailed flow:

```
1. Application hostname request karti hai
2. Linux local hostname sources check karta hai
3. Agar local mapping nahi milti, DNS query bheji ja sakti hai
4. DNS server IP address return karta hai
5. Application us IP address se connection establish karti hai
```

Example:

```
example.com
     |
     v
93.184.216.34
     |
     v
TCP connection
     |
     v
HTTPS request
```

# 3. DNS Record Types

DNS sirf domain ko IP mein convert nahi karta. It also stores different types of records.

|
Record

|

Purpose

|

Example

|
| --- | --- | --- |
|

`A`

|

Domain to IPv4

|

`example.com → 93.184.216.34`

|
|

`AAAA`

|

Domain to IPv6

|

`example.com → 2001:db8::1`

|
|

`CNAME`

|

Alias to another domain

|

`www → example.com`

|
|

`MX`

|

Mail server

|

Email delivery

|
|

`NS`

|

Authoritative name server

|

DNS zone servers

|
|

`TXT`

|

Text information

|

Domain verification, SPF

|
|

`SOA`

|

Zone authority information

|

Zone administration

|
|

`PTR`

|

Reverse lookup: IP to hostname

|

`IP → hostname`

|

## 3.1 A Record

An `A` record maps a domain to an IPv4 address.

```
example.com → 93.184.216.34
```

Command:

Bash

```
dig A example.com
```

## 3.2 AAAA Record

An `AAAA` record maps a domain to an IPv6 address.

Bash

```
dig AAAA example.com
```

## 3.3 CNAME Record

A `CNAME` record creates an alias.

Example:

```
www.example.com → example.com
```

Command:

Bash

```
dig CNAME www.example.com
```

## 3.4 MX Record

An `MX` record identifies mail servers for a domain.

Bash

```
dig MX example.com
```

This is used when email systems need to know where to deliver mail.

# 4. Linux DNS Resolver

Linux applications generally do not directly implement the entire DNS process themselves. They use the system's name-resolution configuration and libraries.

Important files and services may include:

```
/etc/hosts
/etc/resolv.conf
/etc/nsswitch.conf
systemd-resolved
NetworkManager
```

The exact setup depends on the Linux distribution.

# 5. `/etc/hosts`

## Technical Definition

`/etc/hosts` is a local text file that maps hostnames to IP addresses.

Basic format:

```
IP_ADDRESS   HOSTNAME   ALIAS
```

Example:

```
127.0.0.1       localhost
192.168.1.50    devserver
```

## Simple Hinglish Explanation

`/etc/hosts` ek local phonebook hai.

Aap manually define kar sakte ho:

```
devserver → 192.168.1.50
```

Ab Linux ko `devserver` ka IP pata karne ke liye internet DNS par depend karne ki zaroorat nahi ho sakti, because mapping local file mein available hai.

# 6. View `/etc/hosts`

Use:

Bash

```
cat /etc/hosts
```

Example output:

```
127.0.0.1       localhost
127.0.1.1       linux-machine
::1             localhost ip6-localhost ip6-loopback
```

### Meaning

```
127.0.0.1       localhost
```

Means:

```
localhost → 127.0.0.1
```

And:

```
::1             localhost
```

means IPv6 loopback mapping.

# 7. `/etc/hosts` File Structure

Example:

```
192.168.1.50    devserver    server1
```

Breakdown:

|
Part

|

Meaning

|
| --- | --- |
|

`192.168.1.50`

|

IP address

|
|

`devserver`

|

Main hostname

|
|

`server1`

|

Alias

|

All of these names may point to the same IP:

```
devserver
server1
```

# 8. Add a Local Hostname

## Step 1: Open the file

Bash

```
sudo nano /etc/hosts
```

## Step 2: Add an entry

```
127.0.0.1   myapp.local
```

## Step 3: Save the file

In Nano:

```
Ctrl + O
Enter
Ctrl + X
```

## Step 4: Test the hostname

Bash

```
getent hosts myapp.local
```

Expected result:

```
127.0.0.1   myapp.local
```

You can also test:

Bash

```
ping -c 2 myapp.local
```

# 9. Practical Example: Development Server

Suppose your local backend runs on:

```
127.0.0.1:3000
```

Add this entry:

```
127.0.0.1   mybackend.local
```

Now you can access it using:

```
http://mybackend.local:3000
```

Or test with:

Bash

```
curl http://mybackend.local:3000
```

### Important

The hostname only maps to the IP address. It does not automatically start the backend or open the port.

Your backend must already be running.

# 10. Practical Example: Local Network Server

Suppose another machine has this IP:

```
192.168.1.50
```

Add:

```
192.168.1.50   devserver
```

Now these commands may work:

Bash

```
ping devserver
```

Bash

```
ssh user@devserver
```

Bash

```
curl http://devserver
```

This depends on:

* Server being reachable

* Correct IP

* Service running

* Firewall allowing access

* Correct port

# 11. `/etc/hosts` vs DNS

|
Feature

|

`/etc/hosts`

|

DNS

|
| --- | --- | --- |
|

Location

|

Local machine

|

Network/distributed infrastructure

|
|

Configuration

|

Manual

|

Usually centrally managed

|
|

Scope

|

One machine

|

Can serve many machines

|
|

DNS server required?

|

Not for listed entries

|

Usually yes

|
|

Best for

|

Local testing, small mappings

|

Public domains, large networks

|
|

Updates

|

Manually edit file

|

DNS record management

|
|

Example

|

`devserver → 192.168.1.50`

|

`example.com → public IP`

|

### Hinglish

* `/etc/hosts` = apne computer ki local mapping

* DNS = network/internet-level naming system

# 12. How Linux Chooses `/etc/hosts` or DNS

Linux commonly uses:

Bash

```
/etc/nsswitch.conf
```

Check the hostname resolution configuration:

Bash

```
grep '^hosts:' /etc/nsswitch.conf
```

Example output:

```
hosts: files dns
```

This commonly means:

1. `files` → Check local files such as `/etc/hosts`

2. `dns` → Query DNS if needed

So if `/etc/hosts` contains:

```
127.0.0.1 example.com
```

then the system may resolve `example.com` to `127.0.0.1` before checking DNS.

> The exact behavior depends on the configuration and enabled resolver services.

# 13. `getent hosts`

## Technical Definition

`getent` retrieves entries from databases configured through the system's Name Service Switch, or NSS.

For hostname resolution:

Bash

```
getent hosts example.com
```

For a local hosts entry:

Bash

```
getent hosts localhost
```

Example:

```
127.0.0.1       localhost
```

### Why is `getent` Useful?

Because it tests the system's actual configured resolution mechanism.

For example:

Bash

```
getent hosts myapp.local
```

can check whether Linux itself can resolve the hostname, including local `/etc/hosts` entries.

# 14. `nslookup`

`nslookup` is a DNS query utility.

Basic syntax:

Bash

```
nslookup DOMAIN
```

Example:

Bash

```
nslookup example.com
```

Query a specific record:

Bash

```
nslookup -type=MX example.com
```

Use a specific DNS server:

Bash

```
nslookup example.com 8.8.8.8
```

Here:

```
8.8.8.8 = DNS server to query
```

# 15. `dig`

`dig` stands for Domain Information Groper.

It is one of the most useful tools for DNS troubleshooting.

## 15.1 Basic Query

Bash

```
dig example.com
```

This shows detailed DNS information, including:

* Question section

* Answer section

* Authority section

* Additional section

* Query time

* DNS server used

## 15.2 Short Output

Bash

```
dig +short example.com
```

Example:

```
93.184.216.34
```

This is useful in scripts and quick checks.

## 15.3 Query Specific Record Types

IPv4:

Bash

```
dig A example.com
```

IPv6:

Bash

```
dig AAAA example.com
```

Mail servers:

Bash

```
dig MX example.com
```

Name servers:

Bash

```
dig NS example.com
```

Text records:

Bash

```
dig TXT example.com
```

Reverse DNS:

Bash

```
dig -x 8.8.8.8
```

## 15.4 Query a Specific DNS Server

Bash

```
dig @8.8.8.8 example.com
```

This asks the DNS server at `8.8.8
