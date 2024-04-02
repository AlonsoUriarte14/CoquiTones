# Use the official postgres image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=secrettest
ENV POSTGRES_HOST=host.docker.internal
ENV POSTGRES_PORT=5432

# Copy SQL file containing statements to execute
COPY init.sql /docker-entrypoint-initdb.d/

# Install Python dependencies
RUN apt-get update && apt-get install -y python3-pip

# Set working directory for the app
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy application files
COPY Backend/src ./src

# Copy static files
COPY Frontend/build/ /app/build/

# Expose uvicorn port
EXPOSE 8080
EXPOSE 5432

# Command to start uvicorn server

CMD ["uvicorn", "--reload", "src.app:app", "--host", "0.0.0.0", "--port", "8080"]

#run with:  docker build -t my_postgres_image .
# and then: docker run --name CoquiTones -it -p 8080:8080 -p 5432:5432 my_postgres_image 
