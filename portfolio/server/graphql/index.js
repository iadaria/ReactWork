const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const { 
  portfolioQueries, 
  portfolioMutations,
  userQueries,
  userMutations,
  forumQueries,
  forumMutations,
  wordQueries,
  wordMutations } = require("./resolvers");

const { portfolioTypes, userTypes, forumTypes, wordTypes } = require("./types");
const { buildAuthContext } = require('./context');

const Portfolio = require("./models/Portfolio");
const User = require("./models/User");
const ForumCategory = require("./models/ForumCategory");
const Topic = require("./models/Topic");
const Word = require("./models/Word");

exports.createApolloServer = () => {

  const typeDefs = gql`
    ${portfolioTypes}
    ${userTypes}
    ${forumTypes}
    ${wordTypes}

    type Query {
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
      userPortfolios: [Portfolio]
      langPortfolios(languageCode: String): [Portfolio]

      user: User

      forumCategories: [ForumCategory]

      topics: [Topic]
      topicsByCategory(category: String): [Topic]

      word(id: ID): Word
      wordByCodeAndKey(languageCode: String, key: String): Word
      words: [Word]
      partWords(languageCode: String, part: String): [Word]
      codeWords(languageCode: String): [Word]
    }

    type Mutation {
      createPortfolio(input: PortfolioInput): Portfolio
      updatePortfolio(id: ID, input: PortfolioInput): Portfolio
      deletePortfolio(id: ID): ID

      createTopic(input: TopicInput): Topic

      signUp(input: SignUpInput): String
      signIn(input: SignInInput): User
      signOut: String

      createWord(input: WordInput): Word
      deleteWord(id: ID): ID
    }
  `;

  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...portfolioQueries,
      ...userQueries,
      ...forumQueries,
      ...wordQueries,
    },
    Mutation: {
      ...portfolioMutations,
      ...userMutations,
      ...forumMutations,
      ...wordMutations,
    },
  };

  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({
      ...buildAuthContext(req),
      models: {
        Portfolio: new Portfolio(mongoose.model("Portfolio"), req.user),
        User: new User(mongoose.model("User")),
        ForumCategory: new ForumCategory(mongoose.model("ForumCategory")),
        Topic: new Topic(mongoose.model("Topic"), req.user),
        Word: new Word(mongoose.model("Word")),
      },
    }),
  });

}; //end exports
