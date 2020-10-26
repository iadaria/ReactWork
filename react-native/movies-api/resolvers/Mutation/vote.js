const { User, Vote, sequelize } = require('../../models');
const { getUserId } = require('../utils');

const vote = {
    async addVote(_, { movieId}, context, info) {
        const userId = getUserId(context);
        if(userId) {
            const user = await User.findOne({
                where: { id: userId },
                include: [
                    {
                        model: Vote,
                        as: 'votes'
                    }
                ]
            });

            if (user.votes.find(_vote => _vote.movieId == movieId)) {
                throw new Error('Cannot vote twice');
            }

            const newVote = await Vote.create({ userId, movieId });

            return newVote.id;
        }
    },
    async removeVote(_, {movieId }, context) {
        const userId = getUserId(context);
        const _vote = await Vote.findOne({ where: { userId, movieId }});
        if (userId && _vote && _vote.userId == userId) {
            const deleted = await _vote.destroy();
            if (deleted) {
                return _vote.id;
            }
            throw new Error('Not authorized');
        }
        throw new Error('Vote not found')
    }
};

module.exports = { vote };