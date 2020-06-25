const statisticRepo = require('./statistic.db.repository');

const getNow = () => {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1);
};

const get = async (userId, game) => statisticRepo.get(userId, game, getNow());

/* const getAggregation = async (userId, game) =>
  statisticRepo.get(userId, game, getNow());
 */
const upsert = async (userId, game, statistic) => {
  return statisticRepo.upsert(userId, game, getNow(), {
    ...statistic,
    userId,
    game,
    date: getNow()
  });
};

const remove = async userId => statisticRepo.remove(userId);

module.exports = { get, upsert, remove };
