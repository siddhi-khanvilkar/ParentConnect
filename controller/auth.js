// const mysql = require ("mysql");
// const bcrypt=require("bcryptjs");

// const db = mysql.createConnection({
//     host:process.env.DATABASE_HOST,
//     user:process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASSWORD,
//     database:process.env.DATABASE_NAME
// });

// exports.register=(req,res)=>{
//     console.log(req.body);
//     const username = req.body.username;
//     const controlid=req.body.controlid;
//     const pass = req.body.pass;
//     const cpass= req.body.cpass;
    

//         db.query("SELECT controlid FROM student WHERE controlid = ?", [controlid], (error, studentResults) => {
//         if (error) {
//             console.log(error);
//             return;
//         }

//         // If no student with this Control ID, block registration
//         if (!studentResults || studentResults.length === 0) {
//             return res.render("register", {
//                 message: "Invalid Control ID. Student not found."
                
//             });
            
//         }


//     db.query("SELECT controlid FROM username where controlid =? ",[controlid],async(error,results)=>{
//         if(error){
//             console.log(error);
//             return;
//         }

//         if(results && results.length>0){
//             return res.render("register",{
//                 message:"Student with this Control_id is already Registered"
//             })

//         }

//         else if(pass!=cpass){
//             return res.render("register",{
//                 message:"Passwords Do not Match"
//             });
//         }


//     let hashedPassword = await bcrypt.hash(pass,8);
//     console.log(hashedPassword);

//   db.query("INSERT INTO username SET? ",{username:username, controlid:controlid,password:hashedPassword},(error,results)=>{
//     if(error){
//         console.log(error);
//     }
//     else{
//         return res.render("register",{
//                 message:"Parent Registered"
//             });
//     }
//   });
// });
// });
    

   

// };



// exports.login = (req, res) => {
//     const username=req.body.username;
//     const pass=req.body.pass;

//     db.query("SELECT * FROM username WHERE username = ?", [username], async (error, results) => {
//         if (error) {
//             console.log(error);
//             return;
//         }
        

//         if (results.length == 0) {
//             return res.render("login", {
//                 message: "Username is not registered"
//             });
//         } 
//         const storedHashedPassword=results[0].password;
//         bcrypt.compare(pass,storedHashedPassword,(err,isMatch)=>{
//             if(err){
//             console.log(err);
//             return;
//         }
//         if(!isMatch){
            
//             return res.render("login",{
//                 message:"Incorrect Password"
//             });
//         }
//         else {
    
//                 return res.redirect("/profile");
//             }
//         });
//     });
// }

// exports.teacherlogin = (req, res) => {
//     const { username, password } = req.body;

//     db.query("SELECT * FROM teacher WHERE username = ? AND password = ?", 
//         [username, password], 
//         (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.render("teacherlogin", { message: "Server error" });
//             }

//             if (results.length > 0) {
//                 // ✅ Success
//                 return res.render("teacherDashboard", { message: "Welcome Teacher!" });
//             } else {
//                 // ❌ Invalid
//                 return res.render("teacherlogin", { message: "Invalid Username or Password" });
//             }
//         }
//     );
// };


const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// ==================== REGISTER ====================
// exports.register = (req, res) => {
//     console.log(req.body);
//     const username = req.body.username;
//     const Student_id = req.body.student_id;   // student_id from form
//     const Student_rollno = req.body.student_rollno; // optional
//     const pass = req.body.pass;
//     const cpass = req.body.cpass;

//     // ✅ Check if student exists in students table
//     db.query("SELECT student_id FROM students WHERE student_id = ?", [Student_id], (error, studentResults) => {
//         if (error) {
//             console.log(error);
//             return;
//         }

//         if (!studentResults || studentResults.length === 0) {
//             return res.render("register", {
//                 message: "Invalid Student ID. Student not found."
//             });
//         }

//         // ✅ Check if parent already registered for this student
//         db.query("SELECT * FROM parents p JOIN student_parent sp ON p.parent_id = sp.parent_id WHERE sp.student_id = ?", [Student_id], async (error, results) => {
//             if (error) {
//                 console.log(error);
//                 return;
//             }

//             if (results && results.length > 0) {
//                 return res.render("register", {
//                     message: "A parent for this Student ID is already registered"
//                 });
//             } else if (pass != cpass) {
//                 return res.render("register", {
//                     message: "Passwords do not Match"
//                 });
//             }

//             // ✅ Hash password
//             let hashedPassword = await bcrypt.hash(pass, 8);
//             console.log("Hashed:", hashedPassword);

//             // Insert into parents table
//             db.query("INSERT INTO parents SET ?", { name: username, email: username + "@mail.com", password: hashedPassword }, (error, parentResults) => {
//                 if (error) {
//                     console.log(error);
//                     return res.render("register", {
//                         message: "Error registering parent"
//                     });
//                 }

//                 const parentId = parentResults.insertId;

//                 // ✅ Link parent to student
//                 db.query("INSERT INTO student_parent SET ?", { student_id: Student_id, parent_id: parentId }, (err2) => {
//                     if (err2) {
//                         console.log(err2);
//                         return res.render("register", {
//                             message: "Error linking parent to student"
//                         });
//                     }

//                     return res.render("register", {
//                         message: "Parent Registered Successfully"
//                     });
//                 });
//             });
//         });
//     });
// };

exports.register = (req, res) => {
    console.log("Register request received:", req.body);

    const username = req.body.username;
    const Student_id = req.body.student_id;
    const Student_rollno = req.body.student_rollno;
    const pass = req.body.pass;
    const cpass = req.body.cpass;

    db.query("SELECT student_id FROM students WHERE student_id = ?", [Student_id], (error, studentResults) => {
        if (error) {
            console.log("Error querying student:", error);
            return res.render("register", {
                message: "Database error checking student ID"
            });
        }

        if (!studentResults || studentResults.length === 0) {
            console.log("Student ID not found in DB.");
            return res.render("register", {
                message: "Invalid Student ID. Student not found."
            });
        }

        console.log("Student exists. Checking if parent already registered.");

        db.query("SELECT * FROM parents p JOIN student_parent sp ON p.parent_id = sp.parent_id WHERE sp.student_id = ?", [Student_id], async (error, results) => {
            if (error) {
                console.log("Error checking parent existence:", error);
                return res.render("register", {
                    message: "Error checking parent data"
                });
            }

            if (results && results.length > 0) {
                console.log("Parent already registered for this student.");
                return res.render("register", {
                    message: "A parent for this Student ID is already registered"
                });
            } else if (pass !== cpass) {
                console.log("Password mismatch.");
                return res.render("register", {
                    message: "Passwords do not Match"
                });
            }

            console.log("Registering new parent...");
            let hashedPassword = await bcrypt.hash(pass, 8);
            console.log("Hashed Password:", hashedPassword);

            db.query("INSERT INTO parents SET ?", { name: username, email: username + "@mail.com", password: hashedPassword }, (error, parentResults) => {
                if (error) {
                    console.log("Error inserting into parents:", error);
                    return res.render("register", {
                        message: "Error registering parent"
                    });
                }

                const parentId = parentResults.insertId;
                console.log("Inserted parent with ID:", parentId);

                db.query("INSERT INTO student_parent SET ?", { student_id: Student_id, parent_id: parentId }, (err2) => {
                    if (err2) {
                        console.log("Error linking parent to student:", err2);
                        return res.render("register", {
                            message: "Error linking parent to student"
                        });
                    }

                    console.log("Parent registered successfully!");
                    return res.render("register", {
                        message: "Parent Registered Successfully"
                    });
                });
            });
        });
    });
};

// ==================== PARENT LOGIN ====================
// 
exports.login = (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;

    db.query("SELECT * FROM parents WHERE name = ?", [username], async (error, results) => {
        if (error) {
            console.log("DB error:", error);
            return res.render("login", {
                message: "Server error during login"
            });
        }

        if (results.length === 0) {
            return res.render("login", {
                message: "Parent is not registered"
            });
        }

        const storedHashedPassword = results[0].password;
        bcrypt.compare(pass, storedHashedPassword, (err, isMatch) => {
            if (err) {
                console.log("Password compare error:", err);
                return res.render("login", {
                    message: "Error during password check"
                });
            }

            if (!isMatch) {
                return res.render("login", {
                    message: "Incorrect Password"
                });
            }

            return res.render("profile", {
                parentName: results[0].name
            });
        });
    });
};



// ==================== TEACHER LOGIN ====================
exports.teacherlogin = (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM teacher WHERE username = ? AND password = ?", 
        [username, password], 
        (err, results) => {
            if (err) {
                console.log(err);
                return res.render("teacherlogin", { message: "Server error" });
            }

            if (results.length > 0) {
                return res.render("teacherDashboard", { message: "Welcome Teacher!" });
            } else {
                return res.render("teacherlogin", { message: "Invalid Username or Password" });
            }
        }
    );
};
