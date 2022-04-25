const router = require("express").Router();
const usersRoute = require("./userRoute");
const thoughtsRoute = require("./thoughtRoute");

router.use("/users", usersRoute);
router.use("/thoughts", thoughtsRoute);

module.exports = router;