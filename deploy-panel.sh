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

echo "[+] Installing dependencies..."
npm install

echo "[+] Building project..."
npm run build

echo "[+] Restarting PM2 process..."
pm2 restart Panel3002

echo "[✓] Deploy complete."
