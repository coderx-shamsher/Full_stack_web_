#!/bin/bash

echo "running"

echo 

echo "   sql server container ->  "

docker ps -a --filter "name=ubuntu-mysql"

echo " "


echo " backend server container ->> " 
docker ps -a --filter "name=backend1"

echo " " 
echo  " " 

echo "Do you want to Start both server ?? "
read input 


#echo $input


start(){
   
  echo -ne "Starting Containers...."
   
  sleep 2

  echo " "
  docker start backend1 ubuntu-mysql

  echo -ne '\r       \r'

}


if [[ "$input" == "yes" || "$input" == 'y' ]]; 
then

  echo "containers starting......."
  
   start  # calling start docker container function without () 

fi

   


