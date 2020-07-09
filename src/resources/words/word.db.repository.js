const Word = require('./word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'word';

const getAll = async conditions => {
  const {
    group,
    page,
    skip,
    wordsPerExampleSentenceLTE,
    wordsPerPage
  } = conditions;
  if (wordsPerExampleSentenceLTE) {
    return Word.find({
      group,
      wordsPerExampleSentence: { $lte: wordsPerExampleSentenceLTE }
    })
      .skip(skip >= 0 ? skip : page * wordsPerPage)
      .limit(wordsPerPage);
  }

  return Word.find({ group })
    .skip(skip >= 0 ? skip : page * wordsPerPage)
    .limit(wordsPerPage);
};

const getQuantity = async (group, wordsPerExampleSentenceLTE) => {
  const conditions = wordsPerExampleSentenceLTE
    ? { group, wordsPerExampleSentence: { $lte: wordsPerExampleSentenceLTE } }
    : { group };
  return Word.countDocuments(conditions);
};

const get = async id => {
  const word = await Word.findOne({ _id: id });
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return word;
};

module.exports = { getAll, getQuantity, get };
