const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { registrar, login, perfil } = require('../controllers/authController');
const protegerRuta = require('../middleware/authMiddleware');

// Auth local
router.post('/register', registrar);
router.post('/login', login);
router.get('/perfil', protegerRuta, perfil);

// Auth con Google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // generamos un JWT igual que en el login normal
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, rol: req.user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // redirigimos al frontend con el token en la URL
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);

module.exports = router;
