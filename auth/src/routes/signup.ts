import express from 'express';

const router = express.Router();

router.post('/api/users/signup', (req, res) => {
  res.send('hi there from signup');
});

export { router as signUpRouter };
