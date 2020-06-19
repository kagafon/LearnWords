const { OK, NO_CONTENT } = require('http-status-codes');
const { BAD_REQUEST_ERROR } = require('../../errors/appErrors');
const router = require('express').Router({ mergeParams: true });
const { userWord, wordId } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');
const extractQueryParam = require('../../utils/getQueryNumberParameter');
const userWordService = require('./userWord.service');

router.get('/', async (req, res) => {
  const page = extractQueryParam(req.query.page, 0);
  const wordsPerPage = extractQueryParam(req.query.wordsPerPage, 10);

  if (isNaN(page)) {
    throw new BAD_REQUEST_ERROR(
      'Wrong query parameters, the group, page and words-per-example-sentence numbers should be valid integers'
    );
  }

  const userWords = await userWordService.getAllByPage(
    req.userId,
    page,
    wordsPerPage
  );

  res.status(OK).send(userWords.map(w => w.toResponse()));
});

router.get('/:wordId', validator(wordId, 'params'), async (req, res) => {
  const word = await userWordService.get(req.params.wordId, req.userId);
  res.status(OK).send(word.toResponse());
});

router.post(
  '/:wordId',
  validator(wordId, 'params'),
  validator(userWord, 'body'),
  async (req, res) => {
    const word = await userWordService.save(
      req.params.wordId,
      req.userId,
      req.body
    );
    res.status(OK).send(word.toResponse());
  }
);

router.put(
  '/:wordId',
  validator(wordId, 'params'),
  validator(userWord, 'body'),
  async (req, res) => {
    const word = await userWordService.update(
      req.params.wordId,
      req.userId,
      req.body
    );
    res.status(OK).send(word.toResponse());
  }
);

router.delete('/:wordId', validator(wordId, 'params'), async (req, res) => {
  await userWordService.remove(req.params.wordId, req.userId);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
