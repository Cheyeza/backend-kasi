const { authJwt } = require("../middleware");
const controller =require("../controllers/user.controller");

module.exports = (app) =>{
    app.use((req, res,next)=>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })

    const router = require("express").Router()

    router.get("/", controller.findAll)

    router.delete("/:id", controller.delete)
    router.get("/:id", controller.findOne)
    router.put("/:id", controller.update )
//     app.get("/api/test/all", controller.allAccess);

//     app.get( 
//         "/api/test/user", 
//         [authJwt.verifyToken], 
//          controller.userBoard
//     )

//     app.get(
//         "/api/test/mod",
//         [authJwt.verifyToken, authJwt.isModerator],
//         controller.moderatorBoard
//     )
//     app.get(
//         "/api/test/admin",
//         [authJwt.verifyToken, authJwt.isAdmin], 
//         controller.adminBoard
//     )

    app.use("/api/shop", router)
}