#!/bin/bash

HEROKU_APP=coquitones

# Add your setup commands here
echo "Running setup script..."

pip install --no-cache-dir --upgrade -r requirements.txt

#Build frontend
npm run build

# init script for db
heroku pg:psql -a $HEROKU_APP < init.sql


# run backend
uvicorn Backend.src.app:app --host 0.0.0.0 --port $PORT 
