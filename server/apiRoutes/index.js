// apiRoutes/index.js
const router = require("express").Router();

router.use("/puppies", require("./puppies")); // matches all requests to  /api/puppies/

module.exports = router;
