#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Run npm install in the main folder
echo "Running npm install in the main folder"
npm install

# Run pip install -r requirements.txt in the backend folder
echo "Running pip install -r requirements.txt in the backend folder"
cd backend
pip install -r requirements.txt
cd ..

# Get the IP address
echo "Getting IP address"
if command -v hostname > /dev/null; then
    IP=$(hostname -I 2>/dev/null | awk '{print $1}') || true
fi
if [ -z "$IP" ] && command -v ifconfig > /dev/null; then
    IP=$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | head -n 1) || true
fi
if [ -z "$IP" ] && command -v ip > /dev/null; then
    IP=$(ip addr show | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}' | cut -d'/' -f1 | head -n 1) || true
fi
if [ -z "$IP" ]; then
    echo "Unable to determine IP address"
    exit 1
fi

# Update the IP address of the EXPO_PUBLIC_DEVICEIP variable in the .env file
echo "Updating the IP address of the EXPO_PUBLIC_DEVICEIP variable in the .env file"
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/EXPO_PUBLIC_DEVICEIP=.*/EXPO_PUBLIC_DEVICEIP=$IP/g" .env
else
    sed -i "s/EXPO_PUBLIC_DEVICEIP=.*/EXPO_PUBLIC_DEVICEIP=$IP/g" .env
fi

# Start the backend server
echo "Starting the backend server"
cd backend
python3 api.py 
cd ..

# Open a new terminal window and start the frontend server
# Start the frontend server
echo "Starting the frontend server"
npm start
