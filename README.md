# Lens View server
Server for the Web UI application.


## Run Locally


Clone the project

```bash
git clone https://github.com/DarkMurky/murky-lens-server.git
```

Go to the project directory

```bash
cd  murky-lens-server
```
Create .env file
```bash
NODE_ENV=PRODUCTION
SERVER_PORT=3001
DATABASE_URL=<postgresql://USERNAME:PASSWORD@postgres:5432/?schema=public>

ACCESS_TOKEN_PRIVATE_KEY=<CUSTOM TOKEN>
ACCESS_TOKEN_PUBLIC_KEY=<TCUSTOM TOKEN>
REFRESH_PRIVATE_KEY=<CUSTOM TOKEN>
REFRESH_PUBLIC_KEY=<CUSTOM TOKEN>
```

Compose using docker:

```bash
docker-compose up -d
```
Follow frontend setup:
https://github.com/DarkMurky/murky-lens-server
<br/>
<br/>

## Kubernetes

Kubernetes infrastructure for project

[infrastructure](https://github.com/DarkMurky/murky-view-infrasturcture)