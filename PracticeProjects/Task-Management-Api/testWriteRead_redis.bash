#!/bin/bash 


echo "Enter your Message or value !"

read input 

if [[ "$input" ]]; then

  echo "writing message..."
  sleep 1 
  
  docker exec redis-cache redis-cli SET test:key "$input"

  sleep 2

  echo "Writing done !!"
  echo " "

  echo "you want to read your message ?? (yes or no)"

  read input2 

  if [[ "$input2" == "yes" ]]; then 
    echo " "
    sleep 2 
    echo "Here is Your Message ->" 
    echo " "

    docker exec redis-cache redis-cli GET test:key

   else 
       echo " "
       sleep 2 
       echo "Existing..."

  fi 


fi

