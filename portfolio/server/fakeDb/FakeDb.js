const { portfolios, users, forumCategories, topics, words } = require('./data');
const Portfolio = require('../database/models/portfolio');
const User = require('../database/models/user');
const ForumCategory = require('../database/models/forumCategory');
const Topic = require('../database/models/topic');
const Word = require('../database/models/word');

class FakeDb {
    async clean() {
        //await User.deleteMany({});
        await Portfolio.deleteMany({});
        //await ForumCategory.deleteMany({});
        //await Topic.deleteMany({});
        await Word.deleteMany({});
    }

    async addData() {
        //await User.create(users);
        await Portfolio.create(portfolios);
        //await ForumCategory.create(forumCategories);
        //await Topic.create(topics);
        await Word.create(words);
    }

    async populate() {
        await this.clean();
        await this.addData();
    }
}

module.exports = new FakeDb();