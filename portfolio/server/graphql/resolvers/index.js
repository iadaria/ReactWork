exports.portfolioQueries = {
  portfolio: (root, { id }, ctx) => {
    return ctx.models.Portfolio.getById(id);
  },
  portfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  },
  userPortfolios: (root, args, ctx) => {
    return ctx.models.Portfolio.getAllByUser();
  },
};

exports.portfolioMutations = {
  createPortfolio: async (root, { input }, ctx) => {
    return await ctx.models.Portfolio.create(input);
  },
  updatePortfolio: async (root, {id, input}, ctx) => {
    return await ctx.models.Portfolio.findAndUpdate(id, input);
  },
  deletePortfolio: async (root, {id}, ctx) => {
    const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(id);
    return deletedPortfolio._id;
  },
};

exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  },
};

exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
  signIn: async (root, /*args*/{ input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
};

exports.forumQueries = {
  forumCategories: (root, args, ctx) => {
    return ctx.models.ForumCategory.getAll();
  },
  topicsByCategory: async (root, { category }, ctx) => {
    const forumCategory = await ctx.models.ForumCategory.getBySlug(category);
    if (!forumCategory) { return null; }
    
    return ctx.models.Topic.getAllByCategory(forumCategory._id);
  },
  topics: (root, args, ctx) => {
    return ctx.models.Topic.getAll();
  }
};

exports.forumMutations = {
  createTopic: async (root, { input }, ctx) => {
    const category = await ctx.models.ForumCategory.getBySlug(input.forumCategory); 
    input.forumCategory = category._id;
    const topic = await ctx.models.Topic.create(input);
    return topic;
  }
};

exports.wordQueries = {
    word: (root, { id }, ctx) => {
        return ctx.models.Word.getById(id);
    },
    wordByCodeAndKey: (root, { languageCode, key}, ctx) => {
        return ctx.models.Word.getWordByCodeAndKey(languageCode, key);
    },
    words: (root, args, ctx) => {
        return ctx.models.Word.getAll();
    },
    partWords: (root, { languageCode, part }, ctx) => {
        return ctx.models.Word.getAllByPart(languageCode, part);
    },
    codeWords: (root, { languageCode }, ctx) => {
        return ctx.models.Word.getAllByCode(languageCode);
    },
};

exports.wordMutations = {
    createWord: async (root, { input }, ctx) => {
        return await ctx.models.Word.create(input);
    },
    /* updateWord: async (root, {id, input}, ctx) => {
        return await ctx.models.Word.findAndUpdate(id, input);
    }, */
    deleteWord: async (root, { id }, ctx) => {
        const deletedWord = await ctx.models.Word.findAndDelete(id);
        return deletedWord._id;
    }
}