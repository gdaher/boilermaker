const router = require("express").Router();
const { Puppy } = require("../db/assocations");
const passport = require("passport");
//login
router.put("/login", async (req, res, next) => {
  try {
    const puppy = await Puppy.findOne({
      where: {
        name: req.body.name
      }
    });
    if (!puppy) {
      res.status(401).send();
    }

    if (puppy.correctPassword(req.body.password)) {
      req.login(puppy, err => {
        if (err) next(err);
        else res.json(puppy);
      });
      console.log(req.session.passport, req.user);
    } else {
      res.status(401).send();
    }
  } catch (error) {
    next(error);
  }
});
//sign up
router.post("/signup", async (req, res, next) => {
  try {
    const puppy = await Puppy.create({
      name: req.body.name,
      password: req.body.password
    });
    req.login(puppy, err => {
      if (err) next(err);
      else res.json(puppy);
    });
  } catch (error) {
    next(error);
  }
});

//log out
router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

//get me
router.get("/me", (req, res, next) => {
  console.log(req.session.passport);
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).send();
  }
});

//google  oauth routes

const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      consumerKey: process.env.GOOGLE_CLIENT_ID,
      consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "auth/google/callback"
    },
    function(token, refreshToken, profile, done) {
      const googleId = profile.id;
      const name = profile.displayName;
      const email = profile.emails[0].value;

      User.findOne({ where: { google_Id: googleId } })
        .then(function(user) {
          if (!user) {
            return Puppy.create({ name, googleId }).then(function(user) {
              done(null, user);
            });
          } else {
            done(null, user);
          }
        })
        .catch(done);
    }
  )
);
router.get("/google", passport.authenticate("google", { scope: "email" }));

router.get(
  "google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);
module.exports = {
  router,
  passport
};
