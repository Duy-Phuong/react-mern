

[TOC]



---



C:\Users\phuong\AppData\Local\Programs\Python\Python37\python.exe F:/programing/language/python/python-docs/readfile.py
======== name dir ========
## 1. Introduction
### 1. Welcome To The Course

MEAN là Mongodb, express, angular, node js

![image-20200427234017128](./react-mern.assets/image-20200427234017128.png)  

 ![image-20200427234144109](./react-mern.assets/image-20200427234144109.png)  

![image-20200427234206349](./react-mern.assets/image-20200427234206349.png)  

![image-20200427234220121](./react-mern.assets/image-20200427234220121.png)

Single page application: no reload page, only remove and add new some element

Angular tutorial

https://www.javatpoint.com/angularjs-tutorial 

https://www.tutorialspoint.com/angular6/index.htm

Install nodejs 10+

Install angular cli

### 2. A Look At The Course Project

https://www.udemy.com/course/mern-stack-front-to-back/

### 3. Environment & Setup

gitbook

### 4. Link To Project Files.html

You can find the course project repository at the link below...

https://github.com/bradtraversy/devconnector_2.0

## 2. Express & MongoDB Setup
### 1. MongoDB Atlas Setup

tranduyphuong18100@gmail.com

duyphuong1020

Create new project

![image-20200428010556017](./react-mern.assets/image-20200428010556017.png)  

Sau đó choose build a cluster

![image-20200428010815820](./react-mern.assets/image-20200428010815820.png)  

![image-20200428010910279](./react-mern.assets/image-20200428010910279.png)  

Đổi tên cluster 0 thành DevConnector rồi ấn create cluster

Result

![image-20200428011223524](./react-mern.assets/image-20200428011223524.png)  

Ấn vào connect sau đó set user và ip

![image-20200428011746463](./react-mern.assets/image-20200428011746463.png)

Hay ấn vào link để create user sau khi tạo r để xem chi tiết:

![image-20200501131252780](./react-mern.assets/image-20200501131252780.png)

  ![image-20200501131818035](./react-mern.assets/image-20200501131818035.png)  

Username and pass là: Abc12345

Edit lại quyền là read and write

![image-20200501132204518](./react-mern.assets/image-20200501132204518.png)  

WhileListIP

![image-20200501132456003](react-mern.assets/image-20200501132456003.png)  

allow access from anywhere rồi confirm

![image-20200501132720464](./react-mern.assets/image-20200501132720464.png)  



---



![image-20200428011911538](./react-mern.assets/image-20200428011911538.png)  

Chọn connect your application rồi copy link

```shell
mongodb+srv://Abc12345:<password>@devconnector-iiww1.mongodb.net/test?retryWrites=true&w=majority

```

![image-20200428012029719](./react-mern.assets/image-20200428012029719.png)  

Back và ấn collection ở màn hình cluster

![image-20200428012107943](./react-mern.assets/image-20200428012107943.png)  

using mongose

### 2. Install Dependencies & Basic Express Setup

.gitignore

```txt
/node_modules
package-lock.json
```

```shell
npm init -y
# nhập entry point là server.js

```

package.json

```js
{
  "name": "devconnector",
  "version": "1.0.0",
  "description": "Social network for developers",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  },
  "author": "Brad Traversy",
  "license": "MIT",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.2",
    "config": "^3.3.1",
    "express": "^4.17.1",
    "express-validator": "^6.4.1",
    "gravatar": "^1.8.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.11",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "request": "^2.88.2",
    "validator": "^9.4.1"
  },
  "devDependencies": {
    "concurrently": "^5.2.0",
    "nodemon": "^1.19.4"
  }
}


```

We're going to **becrypt** J.S. which is used for password encryption.

You never want to store plain plain text passwords in your database.
We're gonna use a package called **config** for global variables.

We're going to use grab a star for profile avatars how that works is if a user signs up they can use an email that's associated with a graviton account and it will automatically show their profile image.

OK we need **jsonwebtoken** because we're using JWT to pass along a token for validation.

We'll be doing that stuff much later but I want to get this stuff installed now.
We're also using **Mongoose** which is a layer that sits on top of the database so we can interact with it.

We need **request** which is just a small module that will allow us to make recall HDP requests to another API.
And the reason wearing stalling this is for get hub repositories.

We want our profiles to be able to have GitHub repositories listed on them.
So we're going to make that request from our backend so that we can hide our API key and stuff like that and we can just return the repositories.

we need **nodemoon** which will constantly watch our server so that we don't have to refresh it every time we make a change.

And then we also want **concurrently** which is going to allow us to run our back end express server and our front end react dev server at the same time with one single command.

```shell
npm install --save bcryptjs config express express-validator gravatar jsonwebtoken mongoose request

npm i -D concurrently nodemon
npm run server
```

server.js

```js
const express = require('express');

const app = express();

// Use Routes
app.use('/', (req, res) => res.send('Api running'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

```





### 3. Connecting To MongoDB With Mongoose

config/default.json

```json
{
  "mongoURI": "mongodb+srv://Abc12345:Abc12345@devconnector-iiww1.mongodb.net/test?retryWrites=true&w=majority"
}

```

config/db.js

```js
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoBD Connected');
  } catch (err) {
    console.error(err.message);

    // Exit wwith failure
    process.exit(1);
  }
};

module.exports = connectDB;

```

server.js

```js
const express = require('express');
const mongoDB = require('./config/db');

const app = express();

// Use Routes
app.use('/', (req, res) => res.send('Api running'));
mongoDB(); // add

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

```

Xuất hiện waring:

![image-20200501153313391](./react-mern.assets/image-20200501153313391.png)  

db.js

```js
// fix 
await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // option
    });
```

https://mongoosejs.com/docs/deprecations.html



### 4. Route Files With Express Router



## 3. User API Routes & JWT Authentication
### 1. Creating The User Model
### 2. Request & Body Validation
### 3. User Registration
### 4. Implementing JWT
### 5. Custom Auth Middleware & JWT Verify
### 6. User Authentication  Login Route
## 4. Profile API Routes
### 1. Creating The Profile Model
### 2. Get Current User Profile
### 3. Create & Update Profile Routes
### 4. Get All Profiles & Profile By User ID
### 5. Delete Profile & User
### 6. Add Profile Experience
### 7. Delete Profile Experience
### 8. Add & Delete Profile Education
### 9. Get Github Repos For Profile
## 5. Post API Routes
### 1. Creating The Post Model
### 2. Add Post Route
### 3. Get & Delete Post Routes
### 4. Post Like & Unlike Routes
### 5. Add & Remove Comment Routes
## 6. Getting Started With React & The Frontend
### 1. A Look At The The UI  Theme
### 2. Link To Theme Building Series On YouTube.html
### 3. React & Concurrently Setup
### 4. Clean Up & Initial Components
### 5. React Router Setup
### 6. Register Form & useState Hook
### 7. Request Example & Login Form
## 7. Redux Setup & Alerts
### 1. The Gist Of Redux
### 2. Creating a Redux Store
### 3. Alert Reducer, Action & Types
### 4. Alert Component & Action Call
## 8. React User Authentication
### 1. Auth Reducer & Register Action
### 2. Load User & Set Auth Token
### 3. User Login
### 4. Logout & Navbar Links
## 9. Dashboard & Profile Management
### 1. Protected Route For Dashboard
### 2. Profile Reducer & Get Current Profile
### 3. Starting On The Dashboard
### 4. CreateProfile Component
### 5. Create Profile Action
### 6. Edit Profile
### 7. Add Education & Experiences
### 8. List Education & Experiences
### 9. Delete Education, Experiences & Account



## 10. Profile DIsplay

### 1. Finish Profile Actions & Reducer

### 2. Display Profiles

### 3. Addressing The Console Warnings

### 4. Starting On The Profile

### 5. ProfileTop & ProfileAbout Components

### 6. Profile Experience & Education Display

### 7. Displaying Github Repos

## 11. Posts & Comments

### 1. Post Reducer, Action & Initial Component

### 2. Post Item Component

### 3. Like & Unlike Functionality

### 4. Deleting Posts

### 5. Adding Posts

### 6. Single Post Display

### 7. Adding Comments

### 8. Comment Display & Delete

## 12. Prepare & Deploy

### 1. Install Heroku CLI

### 2. Prepare For Deployment

### 3. Deploy To Heroku

## 13. Issues, Added Features, etc

### 1. About This Section.html

### 2. Not Found Page & Theme Workaround

======== list file ========

Process finished with exit code 0