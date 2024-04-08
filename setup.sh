#!/bin/bash

HEROKU_APP=coquitones

#Build frontend
npm run build

#init script for db
heroku pg:psql -a $HEROKU_APP < init.sql

# run backend
uvicorn src.app:app --host 0.0.0.0 --port $PORT 
