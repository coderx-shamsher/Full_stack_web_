#!/bin/bash 

echo "Do you wanna stop all running containers ??"

read input 


if [[ "$input" == "yes" || "$input" == "y" ]]; then 
    
    echo -ne " Stop Container..."
    sleep 2 
    echo " "
    echo " " 
    docker stop  ubuntu-mysql backend1
    
    echo " "
    echo "wanna run docker ps ?? "
    read cmd1 

    if [[ "$cmd1" == "yes" ]]; then 
      sleep 2 
    
      echo "  "
      
       docker ps 

       echo " "

    else 
        echo " "
        
    fi 


elif [[  "$input" == "no" || "n" ]]; then

    sleep 2 
    echo "Okk... nothing...."
    echo -ne "      "

fi 


