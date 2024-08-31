# Kafka Buslines Event Streaming

1. [Prerequisites](#prerequisites)
2. [Folder Structure](#folder-structure)
3. [Docker Compose Configuration](#docker-compose-configuration)
4. [Executing Docker Compose](#executing-docker-compose)
5. [Checking Running Containers](#checking-running-containers)
6. [Starting the Producers](#starting-the-producers)
7. [Starting the Consumer](#starting-the-consumer)
8. [Showing the Web Application](#showing-the-web-application)

## Prerequisites

You need a GitHub account and a fork of the GitHub repository: https://github.com/mario-gellrich-zhaw/kafka_buslines_zuerich.

Based on the fork, create a new GitHub Codespaces environment.

## Folder Structure

The Folder 'Kafka_Buslines_Zuerich' contains:
  
```bash
Kafka_Buslines_Zuerich
├── data
│   ├── bus1.json
│   ├── bus2.json
│   └── bus3.json
├── Kafka
├── static
│   └── leaf.js
├── templates
│   └── index.html
├── app.py
├── busdata1.py
├── busdata2.py
├── busdata3.py
├── docker-compose.yml
├── README.md
└── requirements.txt
```

## Docker Compose Configuration

The file 'docker-compose.yml' contains:  

```bash
# Define custom networks
networks:
  myNetwork:

services:

  # Zookeeper service configuration
  zookeeper:
    image: 'bitnami/zookeeper:latest'
    ports:
      - '2181:2181'
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
    networks:
      - myNetwork

  # Kafka service configuration
  kafka:
    image: 'bitnami/kafka:latest'
    user: root
    ports:
      - '9092:9092'
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_LISTENERS=PLAINTEXT://:9092
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
      - KAFKA_CREATE_TOPICS=busdata001:1:1
    volumes:
      - ./Kafka:/bitnami/kafka
    networks:
      - myNetwork
    depends_on:
      - zookeeper
```

## Executing Docker Compose

```bash
Visual Studio Code -> Activity Bar -> Explorer -> right click on docker-compose.yml -> Compose up
```
## Checking Running Containers

```bash
# Open a new Terminal
docker ps

# It should show two running containers:
# - kafka_busline_zuerich-zookeeper-1
# - kafka_busline_zuerich-kafka-1
```

## Starting the Producers

```bash
# Open a new Terminal to start the 1st producer (busline_01) ...
python busdata1.py

# Open a new Terminal to start the 2nd producer (busline_02) ...
python busdata2.py

# Open a new Terminal to start the 3rd producer (busline_03) ...
python busdata3.py
```

## Starting the Consumer

```bash
# Open a new Terminal to start the consumer ...
python app.py
```
## Showing the Web Application

```bash
# To open the app in the browser, follow the link shown in the terminal, for example:
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5001
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 301-459-861
```
