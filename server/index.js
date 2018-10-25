// this means that we need to make sure our local NODE_ENV variable is in fact set to 'development'
// Node may have actually done this for you when you installed it! If not though, be sure to do that.
if (process.env.NODE_ENV === "development") {
  require("./localSecrets"); // this will mutate the process.env object with your secrets.
}

const app = require("./app");
const { db } = require("./db/assocations");

const port = process.env.PORT || 3000;

db.sync() // sync our database
  .then(function() {
    app.listen(port); // then start listening with our express server once we have synced
    console.log(`Listening at port ${port}`);
    console.log(
      "process.env.GOOGLE_CLIENT_SECRET",
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NODE_ENV
    );
  });
