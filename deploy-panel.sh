#!/bin/bash

cd /home/frontend/tekera21-frontend

echo "[+] Resetting any local changes..."
git reset --hard

echo "[+] Fetching auth branch..."
git fetch origin auth:auth

echo "[+] Checking out auth branch..."
git checkout auth

echo "[+] Pulling latest changes from auth..."
git pull origin auth

if [ $? -ne 0 ]; then
    echo "[✗] Failed to pull latest changes. Exiting."
    exit 1
fi

rm -rf .next
rm -rf .node_modules

echo "[+] Installing dependencies..."
npm install

echo "[+] Building project..."
npm run build

echo "[+] Restarting PM2 process..."
pm2 restart Panel3002

echo "[✓] Deploy complete."
