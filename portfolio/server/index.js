const express = require("express");
const next = require("next");
const routes = require("../routes");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const {ApolloServer, gql } = require('apollo-server-express');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
//const handle = app.getRequestHandler();
const handle = routes.getRequestHandler(app);

//resolvers
const { portfolioQueries, portfolioMutations } = require('./graphql/resolvers');
//types
const {portfolioTypes } = require('./graphql/types');

app
  .prepare()
  .then(() => {
    const server = express();

    const typeDefs = gql`
        ${portfolioTypes}

        type Query {
            hello: String
            portfolio(id: ID): Portfolio
            portfolios: [Portfolio]
        }

        type Mutation {
          createPortfolio(input: PortfolioInput): Portfolio
        }
    `;

    // The root provides a resolver for each API endpoint
    const resolvers = {
      Query: {
        ...portfolioQueries
      },
      Mutation: {
        ...portfolioMutations
      }
    };

    const apolloServer = new ApolloServer({typeDefs, resolvers});
    apolloServer.applyMiddleware({app: server})

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });


  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

/* server.get('/portfolio/:id', (req, res) => {
    const actualPage = '/portfolio';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
}); */

  /* server.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  ); */
