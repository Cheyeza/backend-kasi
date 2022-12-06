module.exports = app =>{
    const cart = require("../controllers/cart.controller")
    const { authJwt } = require("../middleware")
    app.use((req, res,next)=>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })

    var router = require("express").Router()

    router.post("/", cart.create)

    // Find All profolio
    router.get("/" , cart.findAll);


    // find one
    router.get("/:id" , cart.findOne)

    //update
    router.put("/:id" , cart.update)

    // Delete profolio
    router.delete("/:id", cart.delete)

    // // delete Profilio
    router.delete("/all/products", cart.deleteAll)

    // // UPDATE
    // router.put("/product/:id", product.update)




    app.use("/api/cart" , router)
}  