const wordRepo = require('./userWord.db.repository');

const getAll = async userId => wordRepo.getAll(userId);
const getAllByPage = async (userId, page, wordsPerPage) =>
  wordRepo.getAllByPage(userId, page, wordsPerPage);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

const save = async (wordId, userId, userWord) =>
  wordRepo.save(wordId, userId, { ...userWord, wordId, userId });

const update = async (wordId, userId, userWord) =>
  wordRepo.update(wordId, userId, { ...userWord, wordId, userId });

const remove = async (wordId, userId) => wordRepo.remove(wordId, userId);

module.exports = { getAll, getAllByPage, get, save, update, remove };
