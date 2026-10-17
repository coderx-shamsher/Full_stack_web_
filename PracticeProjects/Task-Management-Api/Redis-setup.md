Bhai Coder X 😎, chalo apne Task Management REST API mein Redis ko Docker container ke through setup karte hain. Abhi sirf Redis run aur verify karenge; Node.js integration next step mein karenge, taaki har cheez properly test ho. 🚀

## Step 1 — Redis container start karo

Tum apna existing backend aur MySQL setup disturb kiye bina ek separate Redis container run kar sakte ho.

Terminal mein ye command execute karo:

```
docker run -d \
  --name redis-cache \
  --restart unless-stopped \
  -p 127.0.0.1:6379:6379 \
  redis:7-alpine
```

Command ka breakdown:

| Option                     | Purpose                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------- |
| `-d`                       | Container background mein run hoga                                                  |
| `--name redis-cache`       | Container ka naam                                                                   |
| `--restart unless-stopped` | Docker restart hone par container automatically start hoga, unless manually stopped |
| `127.0.0.1:6379:6379`      | Redis sirf host machine ke loopback interface par accessible hoga                   |
| `redis:7-alpine`           | Redis 7 ka lightweight image                                                        |

> Security note: Abhi hum Redis ko host par locally expose kar rahe hain. Production mein Redis ko public internet par expose nahi karna chahiye. Docker network aur authentication ki configuration baad mein environment ke hisaab se karenge.

## Step 2 — Container running hai ya nahi?

```
docker ps --filter name=redis-cache
```

Agar container run ho raha hai, toh output mein `redis-cache` aur port `6379` dikhna chahiye.

## Step 3 — Redis connection test karo

```
docker exec redis-cache redis-cli PING
```

Expected output:

```
PONG
```

Ab ek basic read/write test bhi kar lo:

```
docker exec redis-cache redis-cli SET test:key "Redis is working"
```

```
docker exec redis-cache redis-cli GET test:key
```

Expected output:

```
"Redis is working"
```

Ye confirm karta hai ki Redis data store aur retrieve kar raha hai.

## Step 4 — Redis container ke logs check karo

```
docker logs redis-cache
```

Agar issue aaye, toh logs se troubleshooting start kar sakte ho.

## Next step kya hoga?

Redis successful ho jaaye toh hum Node.js ES modules project mein client install karenge:

```
npm install redis
```

Phir ek reusable `Redis_Connection.js` module banayenge, connection errors handle karenge, aur usko Express app ke saath integrate karenge.

Bhai, pehle upar ke commands run karke batao: `PING` ka output `PONG` aaya? 💻
