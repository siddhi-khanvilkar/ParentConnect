const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./.env" });

const app = express();


const session = require('express-session');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Use true only if using HTTPS
}));

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
// Serve uploads folder so files can be accessed directly
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); // <-- Important change
app.use(express.urlencoded({ extended:false })); 




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
