const path=require("path")
const router = require("express").Router({mergeParams:true});
const methodNotAllowed = require("../errors/methodNotAllowed")
const controller = require("./uses.controller");

router
  .route("/:useId")
  .get(controller.read)
  // .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed)

  router.route("/")
.get(controller.list)
// .post(controller.create)
.all(methodNotAllowed)

module.exports = router;
