import express from 'express'
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import crypto from 'crypto'
import { db } from '../utils/postgres'
import { queries } from '../utils/postgres'

const router = express.Router()

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(async function verify(username: string, password: string, cb:any) {
    const data = await db.oneOrNone(queries.auth, username)
    if (!data) {
        return cb(null, false, {
            message: 'Incorrect username or password'
        })
    }

    crypto.pbkdf2(password, data.salt, 310000, 32, 'sha256', function(err, hashedpassword) {
        if (err) {
            return cb(err);
        }
        if (!crypto.timingSafeEqual(data.hashed_password, hashedpassword)) {
            return cb(null, false, {
                message: 'Incorrect username or password.' 
            });
        }
        return cb(null, data);
    });
}))

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login'
    })
)

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
  })
})

module.exports = router