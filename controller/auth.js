const mysql = require ("mysql");
const bcrypt=require("bcryptjs");

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

exports.register=(req,res)=>{
    console.log(req.body);
    const username = req.body.username;
    const controlid=req.body.controlid;
    const pass = req.body.pass;
    const cpass= req.body.cpass;
    

        db.query("SELECT controlid FROM student WHERE controlid = ?", [controlid], (error, studentResults) => {
        if (error) {
            console.log(error);
            return;
        }

        // If no student with this Control ID, block registration
        if (!studentResults || studentResults.length === 0) {
            return res.render("register", {
                message: "Invalid Control ID. Student not found."
                
            });
            
        }


    db.query("SELECT controlid FROM username where controlid =? ",[controlid],async(error,results)=>{
        if(error){
            console.log(error);
            return;
        }

        if(results && results.length>0){
            return res.render("register",{
                message:"Student with this Control_id is already Registered"
            })

        }

        else if(pass!=cpass){
            return res.render("register",{
                message:"Passwords Do not Match"
            });
        }


    let hashedPassword = await bcrypt.hash(pass,8);
    console.log(hashedPassword);

  db.query("INSERT INTO username SET? ",{username:username, controlid:controlid,password:hashedPassword},(error,results)=>{
    if(error){
        console.log(error);
    }
    else{
        return res.render("register",{
                message:"Parent Registered"
            });
    }
  });
});
});
    

   

};



exports.login = (req, res) => {
    const username=req.body.username;
    const pass=req.body.pass;

    db.query("SELECT * FROM username WHERE username = ?", [username], async (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        

        if (results.length == 0) {
            return res.render("login", {
                message: "Username is not registered"
            });
        } 
        const storedHashedPassword=results[0].password;
        bcrypt.compare(pass,storedHashedPassword,(err,isMatch)=>{
            if(err){
            console.log(err);
            return;
        }
        if(!isMatch){
            
            return res.render("login",{
                message:"Incorrect Password"
            });
        }
        else {
    
                return res.redirect("/profile");
            }
        });
    });
}

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
                // ✅ Success
                return res.render("teacherDashboard", { message: "Welcome Teacher!" });
            } else {
                // ❌ Invalid
                return res.render("teacherlogin", { message: "Invalid Username or Password" });
            }
        }
    );
};
