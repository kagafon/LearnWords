const Statistics = require('./statistic.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const get = async (userId, game, date) => {
  //  console.log({ userId, game, date });
  const statistic = await Statistics.findOne({ userId, game, date });
  if (!statistic) {
    throw new NOT_FOUND_ERROR('Cannot find statistic', { game });
  }

  return statistic;
};

const upsert = async (userId, game, date, statistic) =>
  Statistics.findOneAndUpdate(
    { userId, game, date },
    { $set: statistic },
    { upsert: true, new: true }
  );

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove };
