import React, { Component } from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasePage";
//import { withRouter } from 'next/router';
import axios from "axios";

const fetchPortfolios = () => {
  const query = `
    query Portfolios {
        portfolios {
            _id
            title
            company
            companyWebsite
        }
        }
    `;
  return axios
    .post("http://localhost:3000/graphql", { query }) //{query: query});
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios)
    .then((portfolios) => {
      console.log(portfolios);
      return portfolios;
    });
};

const Portfolios = ({portfolios}) => {
  return (
    <BaseLayout>
      <BasePage>
        <button className="btn btn-primary" onClick={fetchPortfolios}>
          Fetch data
        </button>
        <h1>Portfolios</h1>
        { JSON.stringify(portfolios)}
      </BasePage>
    </BaseLayout>
  );
};

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { portfolios };
};

export default Portfolios;

//export default withRouter(Portfolios);

const apiCall = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({
        post: {
          title: "title",
          body: "body",
          id: 1,
        },
      });
    }, 200);
  });
};
