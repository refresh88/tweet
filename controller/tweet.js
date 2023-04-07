import * as tweetRepositroy from '../data/tweet.js';

export function getTweets(req, res, next) {
  // 유저명이 있을때 / 없을때
  const username = req.query.username;
  const data = username
    ? tweetRepositroy.getAllByUsername(username)
    : tweetRepositroy.getAll();
  res.status(200).json(data);
}

export function getTweet(req, res) {
  const id = req.params.id;
  const tweet = tweetRepositroy.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function createTweet(req, res) {
  const { text, name, username } = req.body;
  const tweet = tweetRepositroy.create(text, name, username);
  res.status(201).json(tweet);
}

export function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweetRepositroy.update(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export function deleteTweet(req, res) {
  const id = req.params.id;
  tweetRepositroy.remove(id);
  res.sendStatus(204);
}
