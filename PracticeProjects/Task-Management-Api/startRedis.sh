#!/bin/bash 



# creating redis one time 

docker run -d --name redis-cache \
  --restart unless-stopped \
  -p 0.0.0.0:6379:6379 \
  redis:7-alpine


