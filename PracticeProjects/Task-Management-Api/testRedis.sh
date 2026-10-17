#!/bin/bash 

echo "Ping Redis (ping || no)" 

read userinput

echo "$userinput"

if [[ "$userinput" == "ping" ]]; then
  
  docker exec redis-cache redis-cli PING 

else 
  echo "Exiting terminal...."
  sleep 1 
  echo " "
  
fi

