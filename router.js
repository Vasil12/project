
module.exports = (app) => {
    const expansecontroller = require("./controllers/expense.controller")
    const router = require("express").Router();
    
    router.route("/")
    .post(expansecontroller.add);
    
    router.route("/")
    .get(expansecontroller.get);

    router.route("/:id")
    .delete(expansecontroller.remove);

    router.route("/:id")
    .patch(expansecontroller.updateInstance);
  
    app.use("/", router);
  };