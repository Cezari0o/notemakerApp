# NoteMaker App

This repository contains the source code for the NoteMaker App. This is a simple note taking app that allows users to create, edit, and delete notes. The app is built using express, docker and mongodb. 

## Getting Started

To run the project locally, you wil need to have docker and docker composer installed on your machine. You can download docker from [here](https://www.docker.com/products/docker-desktop). Next, you can run the following command to start the project:

```bash
docker-compose up -d --build
```

The project will be runing on port [8010](http://localhost:8010/). See the [`docker-compose.yml`](./docker-compose.yml) file for more details.