const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let usuario = await Usuario.findOne({ googleId: profile.id });

        if (!usuario) {
          // si ya existe un usuario con ese email (registrado por password), lo vinculamos
          usuario = await Usuario.findOne({ email: profile.emails[0].value });

          if (usuario) {
            usuario.googleId = profile.id;
            usuario.avatar = profile.photos?.[0]?.value || null;
            await usuario.save();
          } else {
            usuario = await Usuario.create({
              nombre: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              avatar: profile.photos?.[0]?.value || null,
            });
          }
        }

        return done(null, usuario);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((usuario, done) => done(null, usuario.id));
passport.deserializeUser(async (id, done) => {
  const usuario = await Usuario.findById(id);
  done(null, usuario);
});

module.exports = passport;
