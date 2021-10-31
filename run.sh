#!/bin/sh

echo """1) Development
2) Production

Select mode number:"""

read -p '' MODE

case $MODE in

  1)
	  docker-compose -f development-docker-compose.yaml --env-file=.env.docker up --build -d
	  ;;
  
  2)
	  read -p 'Backend domain name: ' DOMAIN
	  docker-compose -f production-docker-compose.yaml --env-file=.env.docker up --build -d
	  docker exec -it website bash  -c "sed -i '/var API_URL/s/.*/  var API_URL = \"https:\/\/$DOMAIN\/api\/v1\/metrics\";/g' /usr/share/nginx/html/index.js"
	  ;;

  *)
	  echo -n "invalid input"
	  ;;

esac
