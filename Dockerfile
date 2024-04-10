FROM node:14

RUN apt-get update && apt-get install -y python3 && sudo apt-get install python-pip
# Set working directory for the app
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy application files
COPY Backend/src ./src

# copy forntend
COPY Frontend/ ./Frontend

#build frontend to static files
RUN cd Frontend && npm run build



# Command to start uvicorn server

#uncomment for local development and use docker compose up
# CMD ["uvicorn", "--reload", "src.app:app", "--host", "0.0.0.0"]

