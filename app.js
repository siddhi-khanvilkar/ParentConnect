// const express = require ("express");
// const mysql = require("mysql");
// const dotenv =require('dotenv');
// const path=require ("path");

// dotenv.config ({path:"./.env"});

// const app = express();

// const db = mysql.createConnection({
//     host:process.env.DATABASE_HOST,
//     user:process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASSWORD,
//     database:process.env.DATABASE_NAME,
//     port:process.env.DATABASE_PORT
// });

// const publicDirectory = path.join(__dirname,"./public");
// app.use(express.static(publicDirectory));
// app.use(express.urlencoded({extended:false}));
// app.set("view engine","hbs");
// db.connect((error)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("MYSQL Connected...")
//     }
// })
// app.use("/",require("./routes/pages"));
// app.use("/auth",require("./routes/auth"));



// const PORT = process.env.PORT || 5001;
// app.get("/",(req,res) =>{
//     res.send("Hello from render")
// })
// app.listen(PORT,() =>{
//     console.log('Server running on port ${PORT}');
// });


//new code

// const express = require("express");
// const mysql = require("mysql");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config({ path: "./.env" });

// const app = express();

// // MySQL Connection
// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   port: process.env.DATABASE_PORT
// });

// // Middleware
// const publicDirectory = path.join(__dirname, "./public");
// app.use(express.static(publicDirectory));
// app.use(express.urlencoded({ extended: false }));
// app.set("view engine", "hbs");

// // MySQL Connect
// db.connect((error) => {
//   if (error) {
//     console.error("MySQL Connection Error:", error);
//   } else {
//     console.log(`MySQL Connected to database: ${process.env.DATABASE_NAME}`);
//   }
// });

// // Routes
// app.use("/", require("./routes/pages"));
// app.use("/auth", require("./routes/auth"));

// const PORT = process.env.PORT || 5001;
// app.get("/", (req, res) => {
//   res.send("Hello from Render");
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

//new app.js

const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./.env" });

const app = express();

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT
});

// Middleware
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); // <-- Important change

// MySQL Connect
db.connect((error) => {
  if (error) {
    console.error("MySQL Connection Error:", error);
  } else {
    console.log(`MySQL Connected to database: ${process.env.DATABASE_NAME}`);
  }
});

// Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
