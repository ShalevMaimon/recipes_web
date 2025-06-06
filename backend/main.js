// require("dotenv").config();
// //#region express configures
// var express = require("express");
// var path = require("path");
// var logger = require("morgan");
// // const session = require("client-sessions");
// // const session = require("express-session");
// // const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");


// const DButils = require("./routes/utils/DButils");
// var cors = require('cors')

// var app = express();
// app.set("trust proxy", 1);
// app.use(cookieSession({
//   name: 'session',
//   secret: 'template',
//   maxAge: 24 * 60 * 60 * 1000,
//   sameSite: 'none',
//   secure: true,
// }));
// app.use((req, res, next) => {
//   req.connection.proxySecure = true;
//   next();
// });
// const corsConfig = {
//   origin: "https://recipe-web-front.onrender.com",
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// };
// app.use(cors(corsConfig));
// app.options("*", cors(corsConfig));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://recipe-web-front.onrender.com");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   next();
// });

// app.use(logger("dev")); //logger
// app.use(express.json()); // parse application/json

// // app.use(cookieParser());
// app.use(
//   session({
//     cookieName: "session", // the cookie key name
//     //secret: process.env.COOKIE_SECRET, // the encryption key
//     secret: "template", // the encryption key
//     duration: 24 * 60 * 60 * 1000, // expired after 20 sec
//     activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
//     // cookie: {
//     //   httpOnly: false,
//     // }
//     proxy: true,
//     cookie: {
//       httpOnly: true,
//       secure: true, // חובה ב-HTTPS
//       sameSite: "none", // ← הכי קריטי!
//     }
//     //proxySecure: true
//     //the session will be extended by activeDuration milliseconds
//   })
// );
// app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files
// //local:
// app.use(express.static(path.join(__dirname, "dist")));
// //remote:
// // app.use(express.static(path.join(__dirname, '../assignment-3-3-basic/dist')));
// // app.get("/",function(req,res)
// // { 
// //   //remote: 
// //   // res.sendFile(path.join(__dirname, '../assignment-3-3-basic/dist/index.html'));
// //   //local:
// //   res.sendFile(__dirname+"/index.html");

// // });

// app.get("/", (req, res) => {
//   res.send("Welcome to the Recipe API!");
// });


// // app.use(cors());
// // app.options("*", cors());


// var port = process.env.PORT || "3000"; //local=3000 remote=80
// //#endregion
// const user = require("./routes/user");
// const recipes = require("./routes/recipes");
// const auth = require("./routes/auth");


// //#region cookie middleware
// app.use(function (req, res, next) {
//   if (req.session && req.session.user_id) {
//     DButils.execQuery("SELECT user_id FROM users")
//       .then((users) => {
//         if (users.find((x) => x.user_id === req.session.user_id)) {
//           req.user_id = req.session.user_id;
//         }
//         next();
//       })
//       .catch((error) => next());
//   } else {
//     next();
//   }
// });
// //#endregion

// // ----> For cheking that our server is alive
// app.get("/alive", (req, res) => res.send("I'm alive"));

// // Routings
// app.use("/users", user);
// app.use("/recipes", recipes);
// app.use(auth);

// // Default router
// app.use(function (err, req, res, next) {
//   console.error(err);
//   res.status(err.status || 500).send({ message: err.message, success: false });
// });



// const server = app.listen(port, () => {
//   console.log(`Server listen on port ${port}`);
// });

// process.on("SIGINT", function () {
//   if (server) {
//     server.close(() => console.log("server closed"));
//   }
//   process.exit();
// });

require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const DButils = require("./routes/utils/DButils");
const cors = require("cors");

const app = express();

// חובה ל־Render כדי לאפשר secure cookies
app.set("trust proxy", 1);

// הגדרת session עם cookie-session
app.use(cookieSession({
  name: 'session',
  secret: 'template',
  maxAge: 24 * 60 * 60 * 1000, // 24 שעות
  sameSite: 'none',
  secure: true
}));

// הגדרות CORS
const corsConfig = {
  origin: "https://recipe-web-front.onrender.com",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://recipe-web-front.onrender.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

// מסך ברירת מחדל
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

// middleware שמוסיף req.user_id אם הסשן קיים
app.use(function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});

// Routing
const user = require("./routes/user");
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");

app.use("/users", user);
app.use("/recipes", recipes);
app.use(auth);

// Error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

// יצירת השרת
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});


