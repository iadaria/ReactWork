const slugify = require("slugify");
const uniqueSlug = require("unique-slug");

class Topic {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAll() {
    return this.Model.find({});
  }

  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate("user") //see schema in database/models/topic
      .populate("forumCategory");
  }

  async _create(topicData) {
    const createdTopic = await this.Model.create(topicData);

    return this.Model.findById(createdTopic._id)
      .populate("user")
      .populate("forumCategory");
  }

  async create(topicData) {
    //TopicInput
    if (!this.user) {
      throw new Error("You need to authenticate to create a topic!");
    }

    topicData.user = this.user;
    topicDate.slug = slugify(topicData.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
    });

    let topic;
    try {
      topic = await this._create(topicData);
      return topic;
    } catch(e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
        topicData.slug += `-${uniqueSlug()}`
        topic = await this._create(topicData);
        return topic;
      }
    }
    return null;
  }
}

module.exports = Topic;
