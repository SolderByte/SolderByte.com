#!/bin/bash

docker kill solderbyte_com &> /dev/null
KILL=$?
if [ $KILL -ne 0 ]; then
  echo "Docker kill failed"
  #exit $KILL
fi

docker rm solderbyte_com &> /dev/null
RM=$?
if [ $RM -ne 0 ]; then
  echo "Docker remove failed"
  #exit $RM
fi

docker build -t solderbyte.com .

echo "Container: docker run -d --name solderbyte_com -p 8080 -p 8443 solderbyte.com"
echo "Service: docker service create --replicas 1 --name solderbyte_com -p 8080 solderbyte.com"
