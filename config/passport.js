// const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcryptjs");

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // console.log(email);
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: "No User Found" });
        } else if (user) {
          if (user.password == password) {
            console.log("SUCCCESSSS");
            return done(null, user);
          } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                console.log("SUCCCESSSS");
                return done(null, user);
              } else {
                return done(null, false, { message: "Password Incorrect" });
              }
            });
          }
        }
      });
    })
  );

  //GOOGLE OAUTH STRATEGY

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "321473591137-qm63ntbq09bpk3ge42o5f0b9m3ah0as6.apps.googleusercontent.com",
        clientSecret: "gSpLLhMqE9C7RnOf0Mih8gNb",
        callbackURL: "/api/users/google",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log("Access TOKEN :-----" + accessToken + "-----------");
        // console.log(profile);

        const newUser = {
          GoogleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        };

        User.findOne({ email: profile.emails[0].value }).then(users => {
          console.log(users);
          if (users) {
            // console.log(users.GoogleId + " , " + profile.id);

            if (users.GoogleId === profile.id) {
              console.log("User already exists");
              done(null, users);
            } else {
              console.log("EMAIL already exists");
              done(null, false);
            }
          } else {
            new User(newUser).save().then(user => {
              done(null, user);
            });
          }
        });

        // User.findOne({
        //   GoogleId: profile.id
        // }).then(user => {
        //   if (user) {
        //     console.log("User already exists");
        //     done(null, user);
        //   } else {
        //     new User(newUser).save().then(user => {
        //       done(null, user);
        //     });
        //   }
        // });
      }
    )
  );

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function(id, done) {
  //   console.log("ID ------------- " + id);
  //   User.findById(id, function(err, user) {
  //     console.log("USERSS - -- " + user);

  //     done(err, user);
  //   });
  // });

  // passport.deserializeUser((id, done) => {
  //   User.findOne({ GoogleId: id })
  //     .then(user => {
  //       done(null, user);
  //       if (!user) {
  //         User.findOne({ _id: id })
  //           .then(user => {
  //             done(null, user);
  //           })
  //           .catch(err => console.log(err));
  //         // User.findById(id, function(err, user) {
  //         // done(err, user);
  //         //   console.log(user);
  //         // });
  //       }
  //     })
  //     .catch(err => console.log(err));
  // });

  passport.serializeUser((user, done) => {
    if (user.GoogleId) {
      done(null, user.GoogleId);
    } else {
      done(null, user.id);
      // console.log(user.id);
    }

    // console.log(user);
  });

  // passport.deserializeUser(function(id, done) {
  //   console.log("ID ------------- " + id);

  //   User.findById(id, function(err, user) {
  //     console.log("USERSS - -- " + user);
  //     // console.log(typeof id);

  //     if (err) done(err);
  //     if (user) {
  //       done(err, user);
  //     } else {
  //       User.findOne({ GoogleId: id })
  //         .then(user => {
  //           console.log("ID ------------- " + id);

  //           done(null, user);
  //         })
  //         .catch(err => console.log(err));
  //     }
  //   });
  // });

  passport.deserializeUser((id, done) => {
    User.findOne({ GoogleId: id }).then(user => {
      if (user) {
        console.log("ID ------------- " + id);
        done(null, user);
      } else {
        User.findById(id, function(err, user) {
          //     console.log("USERSS - -- " + user);

          if (err) done(err);
          if (user) {
            done(err, user);
          }
        });
      }
    });
  });
};
