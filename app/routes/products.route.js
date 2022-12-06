module.exports = app =>{
    const product = require("../controllers/product.controller")
    const { authJwt } = require("../middleware")
    app.use((req, res,next)=>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })

    var router = require("express").Router()

    router.post("/", [ authJwt.verifyToken ], product.create)

    // Find All profolio
    router.get("/" , product.findAll);

    // find menuu
    router.get("/menu/:userId" , product.findMenu)

    // find one
    router.get("/:id" , product.findOne)

    router.put("/:id" ,product.update)

    // Delete profolio
    router.delete("/:id",product.delete)

    // delete Profilio
    router.delete("/all", product.deleteAll)

    // UPDATE
    router.put("/product/:id", product.update)




    app.use("/api/products" , router)
}  