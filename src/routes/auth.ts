import { Router } from 'express';
import passport from '../middleware/admin';
import { getAuthToken } from '../middleware/auth';

const router = Router();

router.post('/login', passport.authenticate('login'), function (req, res) {
  const user: any = req.user;
  const token = getAuthToken(req.body.email, user._id);
  return res.json({ msg: 'Welcome!', user: req.user, token });
});

router.post('/signup', (req, res, next) => {
  passport.authenticate('signup', function (err, data, info) {
    if (err) {
      return next(err);
    }

    if (data.error) return res.status(401).json({ msg: data.error });

    // if (!user) return res.status(401).json({ msg:"Una" });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});

export default router;
