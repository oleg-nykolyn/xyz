#!/bin/bash

echo "👀 Deploying contracts..."

npx hardhat run scripts/deploy.js --network localhost

echo "🚀 Contracts deployed"