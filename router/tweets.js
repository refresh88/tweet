import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';

// validation
// sanitization
// Contract Testing: Client-Server

const router = express.Router();

const validateTweet = [
  body('text').trim().isLength({ min: 3 }).withMessage('3글자 이상!'),
  validate,
];

// GET /tweets
// GET /tweets?username=:username
// getTweets()가 아닌 getTweets임. 즉 함수를 호출하는것이 아니라 연결만.
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post('/', validateTweet, tweetController.createTweet);

// PUT /teets/:id
router.put('/:id', validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
