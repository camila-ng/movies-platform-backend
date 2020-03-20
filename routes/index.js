var express = require('express');
var router = express.Router();
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const multer = require('multer')
const bcrypt = require('bcrypt-nodejs')
const multerConfig = multer({ dest: 'uploads/' })

//Movies
const MoviesController = require('../controllers/MoviesController')
const MoviesService = require('../services/MoviesService')
const MoviesInstance = new MoviesController(new MoviesService())


//Users
const UserController = require('../controllers/UserController')
const UserService = require('../services/UserService')
const UserInstance = new UserController(new UserService())

//Passport 
passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, cb) => {
      const user = await new UserService().getUserByName(username)

      if (!user) {
        return cb(null, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return cb(null, false);
      }
      return cb(null, user);

    }
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user.user);
});

passport.deserializeUser(async (username, cb) => {
  const user = await new UserService().getUserByName(username)

  cb(null, user);
});

//IsLogged

async function isLogged(req, res, next) {
  const userData = req.user

  if (!userData) {
    return res.sendStatus(401)
  }
  const user = await new UserService().getUserByName(userData.user)
  if (!user) {
    return res.sendStatus(401)
  }
  next()
}


//IsAdmin
async function isAdmin(req, res, next) {
  const userData = req.user

  if (!userData) {
    return res.sendStatus(401)
  }
  const user = await new UserService().getUserByName(userData.user)

  if (!user || !user.isAdmin) {
    return res.sendStatus(401)
  }
  next()
}


//Ruta Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {

    if (err) {
        return next(err);
    }

    if (!user) {
        return res.status(401).json({
            err: info
        });
    }

    req.logIn(user, function(err) {

        if (err) {
            return res.status(500).json({
                err: 'Could not log in user'
            });
        }

        res.status(200).json(req.user);

    });
  })(req, res, next);
})


// Rutas Movies

router.get('/movies', isLogged, (req, res) => {
  MoviesInstance.getMovies(req, res)
})

router.get('/movies/:id', isLogged, (req, res) => {
  MoviesInstance.getMoviesById(req, res)
})

router.post('/movies', multerConfig.single('movieImage'),isLogged, isAdmin, (req, res) => {
  MoviesInstance.postMovies(req, res)
})


//Rutas User

router.get('/users', (req, res) => {
  UserInstance.getUsers(req, res)
})

router.get('/users/:id', (req, res) => {
  UserInstance.getUsersById(req, res)
})

router.post('/users', (req, res) => {
  UserInstance.postUsers(req, res)
})




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
