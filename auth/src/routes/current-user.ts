import express from 'express';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

// This route is a check to see if user is logged in
// Returns {currentUser: null} if user is not logged in
// else it returns {currentUser: payload} and payload has the email/id/iat
router.get('/api/users/currentUser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
