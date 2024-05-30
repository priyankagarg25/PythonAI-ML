# Use the official Python base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install the project dependencies
RUN pip install --no-cache-dir -r requirements.txt

#giving port number
EXPOSE 80

# Copy the rest of the project files to the container
COPY . .

# Set the entrypoint command for the container
CMD ["python", "app.py"]

