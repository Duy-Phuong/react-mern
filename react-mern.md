

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

Create folder routes/api

users.js

```js
const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;

```

server.js

```js
// add
const express = require('express');
const mongoDB = require('./config/db');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');

const app = express();
mongoDB();

// Use Routes
app.get('/', (req, res) => res.send('Api running'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));


```

npm run server

## 3. User API Routes & JWT Authentication
### 1. Creating The User Model

models/User.js

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);

```



### 2. Request & Body Validation

https://express-validator.github.io/docs/

server.js

```js

// Init middleware
app.use(express.json({ extended: false }));
```

user.js

```js
const express = require('express');
const router = express.Router();

// @route   POST api/users
// @desc    Tests users route
// @access  Public
router.post('/test', (req, res) => {
  console.log(req.body); // phải init mới access
  res.json({ msg: 'Users Works' });
});

module.exports = router;

```

Nhớ chọn header

![image-20200502085248151](./react-mern.assets/image-20200502085248151.png)  

Xác định content type là application/json

http://localhost:5000/api/users/test

gọi api post để test

user.js

```js
const express = require('express');
const router = express.Router();
// add
const { check, validationResult } = require('express-validator');

// @route   GET api/users
// @desc    Tests users route
// @access  Public
router.post(
  '/test',
  [
    check('name', 'name is required').not().isEmpty(),
    // username must be an email
    check('email', 'Please input an valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Please enter a password > 6').isLength({ min: 6 }),
  ],
  (req, res) => {
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.json({ msg: 'Users Works' });
  }
);

module.exports = router;

```

![image-20200502091512711](./react-mern.assets/image-20200502091512711.png)

### 3. User Registration

user.js

```js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// add
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load User model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Tests users route
// @access  Public
router.post(
  '/test',
  [
    check('name', 'name is required').not().isEmpty(),
    // username must be an email
    check('email', 'Please input an valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Please enter a password > 6').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // add
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists!' }] });
      } else {
        // Get user gravatar
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm', // Default
        });

        const user = new User({
          name,
          email,
          avatar,
          password,
        });

        // encrypt passwword
        const salt = await bcrypt.genSalt(10);
        // recommend is 10
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // return jwt
        res.json({ msg: 'Users registered' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;




```

db.js

```js
 try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // thêm để xóa warning
    });
    console.log('MongoBD Connected');
```

![image-20200502100731435](./react-mern.assets/image-20200502100731435.png)  

![image-20200502100923787](./react-mern.assets/image-20200502100923787.png)  

Ấn vào collection

![image-20200502101024776](./react-mern.assets/image-20200502101024776.png)  



### 4. Implementing JWT

https://jwt.io/

https://github.com/auth0/node-jsonwebtoken

default.json

```json
{
  "mongoURI": "mongodb+srv://Abc12345:Abc12345@devconnector-iiww1.mongodb.net/test?retryWrites=true&w=majority",
  // add
  "jwtSecret": "mysecrettoken"
}

```

user.js: trước khi test xóa data

```js
// return jwt
        // res.json({ msg: 'Users registered' });
        const payload = {
          user: {
            id: user.id,
          },
        };

        // Sign asynchronously watch in git
        // an hour valid
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            console.log(token);
            res.json({ token });
          }
        );    
```

https://jwt.io/#debugger-io

copy token return vào đây để decode

![image-20200502152803559](./react-mern.assets/image-20200502152803559.png)

### 5. Custom Auth Middleware & JWT Verify

create folder middleware/auth.js

```js
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied ' });
  }

  // Verify token
  try {
    const decode = jwt.verify(token, config.get('jwtSecret'));

    req.user = decode.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

```

auth.js

```js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Tests auth route
// @access  Public
router.get('/test', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

```

![image-20200502162013841](./react-mern.assets/image-20200502162013841.png)

### 6. User Authentication  Login Route

auth.js

```js

// @route   Post api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/test',
  [
    // username must be an email
    check('email', 'Please input an valid email').isEmail(),
    // password must be at least 5 chars long
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials!' }] });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials!' }] });
        }
        // return jwt
        const payload = {
          user: {
            id: user.id,
          },
        };

        // Sign asynchronously watch in git
        // an hour valid
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            console.log(token);
            res.json({ token });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

```



Header: content type: application/json

![image-20200502170950516](./react-mern.assets/image-20200502170950516.png)

## 4. Profile API Routes
### 1. Creating The Profile Model

Profile.js

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

```



### 2. Get Current User Profile

profile.js

```js
const express = require('express');
const router = express.Router();

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   GET api/profile
// @desc    Tests profile route
// @access  Public
router.get('/test', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(404).json({ profile: 'There are no profiles' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server err');
  }
});

module.exports = router;

```

![image-20200502174651322](./react-mern.assets/image-20200502174651322.png)

### 3. Create & Update Profile Routes

#### Add header token in postman

Ấn vào preset/ manage preset

![image-20200502181109334](./react-mern.assets/image-20200502181109334.png)  

profile.js

```js

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/test',
  [
    auth,
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    // if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills
        .split(',')
        .map((skill) => skill.trim());
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    console.log(profileFields.skills);
    res.send('Hello');
  }
);

module.exports = router;

```



![image-20200502182955330](./react-mern.assets/image-20200502182955330.png)  

profile.js thêm

```js
    // console.log(profileFields.skills);
    // res.send('Hello');
    console.log(profileFields);
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        console.log('update profile');
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Save Profile
      profile = new Profile(profileFields);
      console.log('---create profile----');

      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
```

data

```json
{
	"company": "FJN",
	"status": "Developer",
	"website": "abc",
	"skills": "Java, react",
	"location": "Hanoi",
     "bio": "bio",
     "githubusername": "Duy Phuong",
     "youtube": "youtube link",
     "facebook": "facebook link",
     "twitter": "twitter link",
     "instagram": "instagram link",
     "linkedin": "linkedin link"
}
```

![image-20200503104431830](./react-mern.assets/image-20200503104431830.png)  

db.js

```js
await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false, // add
    });
    console.log('MongoBD Connected');
```



### 4. Get All Profiles & Profile By User ID

http://localhost:5000/api/profile/all

```js

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const profile = await Profile.find().populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(404).json({ profile: 'There are no profiles' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
```

http://localhost:5000/api/profile/user/5eae51c5bd9dcf4c9482de46

```js
// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    console.log(err);
    // if (err.kind == 'ObjectId') {
    if (err.name == 'CastError') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});
```



### 5. Delete Profile & User

profile

```js

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
```

thêm vào header token

### 6. Add Profile Experience

Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng. Phương thức sẽ trả về chiều dài của mảng sau khi thêm phần tử.

Phương thức này sẽ làm thay đổi chiều dài ban đầu của mảng.

Nếu bạn muốn thêm phần tử vào cuối mảng, sử dụng phương thức push.

```js

// @route   PUT api/profile
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
```

data

```js
{
      "title": "title 1",
      "company": "rk",
      "location": "Ha noi 1",
      "from": "8-10-2010",
      "current": true,
      "description":"Developer"
	
}
```

![image-20200503140239303](./react-mern.assets/image-20200503140239303.png)

### 7. Delete Profile Experience

```js

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get removed index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
```

http://localhost:5000/api/profile/experience/5eae6d6e1ee9c63ffc1c11de

![image-20200503141318484](./react-mern.assets/image-20200503141318484.png)

### 8. Add & Delete Profile Education

```js

// @route   PUT api/profile
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    auth,
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/profile
// @desc    Delete education
// @access  Private
router.delete('/education/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get removed index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
```

data

```js
{
      "school": "NBK 2",
      "degree": "AB",
      "fieldofstudy": "It",
      "from": "8-10-2010",
      "current": true,
      "description":"Developer"
	
}
```



### 9. Get Github Repos For Profile

https://github.com/settings/developers

Create Oath github

Xem sau

## 5. Post API Routes
### 1. Creating The Post Model

Post.js create model

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', PostSchema);
```



### 2. Add Post Route

post.js

```js

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
```

https://www.lipsum.com/

![image-20200503161012537](./react-mern.assets/image-20200503161012537.png)

### 3. Get & Delete Post Routes

post.js

```js

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

```



![image-20200503162753593](./react-mern.assets/image-20200503162753593.png)  



```js

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    // if (err.kind === 'ObjectId') {
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

```

http://localhost:5000/api/posts/5eae8c47b0e9ed02e8687052

```js

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    // if (err.kind === 'ObjectId') {
    if (err.name == 'CastError') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});
```



### 4. Post Like & Unlike Routes

http://localhost:5000/api/posts/like/5eae8c47b0e9ed02e8687052

```js

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

```



### 5. Add & Remove Comment Routes

```js

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // post.comments = post.comments.filter(
    //   ({ id }) => id !== req.params.comment_id
    // );

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});
```



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