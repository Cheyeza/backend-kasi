const express = require("express")
const cors =require("cors")
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())  // body-parser


//   const db = require("./models");
const db = require("./app/models")
const Role = db.role
  db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initial()
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  function initial() {
    Role.estimatedDocumentCount((err,count) =>{
        if (!err && count ==0){
            new Role({
                name: "user"
            }).save(err => {
                if(err) console.log("error", err)
                console.log("added 'user' to roles collection")
            });
            new Role({
                name: "admin"
            })
            .save(err =>{
                if(err){
                    console.log("error", err)
                }

                console.log("added 'admin' to roles collection")

            })

          
        }
    })
  }


require('./app/routes/products.route')(app)
require("./app/routes/user.routes")(app)
require("./app/routes/auth.routes")(app)
require("./app/routes/cart.routes")(app)

app.get("/" ,(req ,res) =>{
    res.json({message:"Welcome to thulane application"})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
