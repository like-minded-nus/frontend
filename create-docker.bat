@echo off
REM Set your Docker container and image names
SET CONTAINER_NAME=likeminded
SET IMAGE_NAME=likeminded-frontend:v1

REM Check if the container exists and remove it
docker ps -a | findstr %CONTAINER_NAME%
IF %ERRORLEVEL% == 0 (
    echo Removing existing container %CONTAINER_NAME%
    docker stop %CONTAINER_NAME%
    docker rm %CONTAINER_NAME%
) ELSE (
    echo Container %CONTAINER_NAME% does not exist
)

REM Build the Docker image
docker build -t %IMAGE_NAME% .

REM Run the Docker container
docker run -d -p 3000:3000 --name %CONTAINER_NAME% %IMAGE_NAME%
