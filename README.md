<p align="center"><i>This project was created during my time as a student at Code Chrysalis</i></p>
<br>
<br>

<h1 align="center">GGs</h1>

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
    - [Setup](#setup)
    - [How to set up knexfile](#how-to-set-up-knexfile)
- [Contributors](#contributors)

# Features
* Allows users to add games to their game library on GGs
* Users can set rating levels for games in their library to keep track of what they do and don't like
* Users can browse thousands of games and find new games to play

# Getting Started  
### ‼️ Things you will need:
* Install [postgresql](https://www.postgresql.org/)
* Get api key from [IGDB](https://www.igdb.com/api)

# Setup
Begin by running the following command in the root folder to install dependencies  
```
npm install
```  
Next, create a postgresql database  
```
psql
CREATE DATABASE <db_name>
```  
After your database is created and running, run the following commands to create database and add seed data  
```
npm run migrate:latest
npm run seed:data
```  
To start the server, run the following command  
```
npm start
```  
Next run the following commands to change directory to ```./frontend``` and install npm dependencies for react  
```
cd frontend
npm install
```  
Finally, to start the react app run the following command in ```./frontend```  
```
npm start
```  
# How to set up knexfile  
```knexfile.js``` can be find at the following path from the root folder: ```./backend/db```  

You will need to set up a ```.local.env``` file in the root folder which contains the following variables:  
```
API_ACCESS_TOKEN=<your_api_acces_token>
API_CLIENT_ID=<your_api_client_id>
API_AUTH=Bearer <your_api_authentication>
DB_USER=<your_db_username>
DB_NAME=<your_db_name>
DB_PASSWORD=<your_db_password>
NODE_ENV=development
```  
You will also want to add your ```.local.env``` to the ```.gitignore``` file in the root folder to avoid your sensitive data from being pushed to github 😱  


# Contributors
This was my first solo full stack project. Feel free to reach out to me with any questions or comments. I am always looking to improve my skills and love working with others on fun projects!

<a href="https://github.com/brian-walvoord"><img src="https://avatars.githubusercontent.com/u/84251599?v=4" width="200px;" alt=""/><br /></a>
