import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// This route is a check to see if user is logged in
// Returns {currentUser: null} if user is not logged in
// else it returns {currentUser: payload} and payload has the email/id/iat
router.get('/api/users/currentUser', (req, res) => {
  if (!req.session || !req.session.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
