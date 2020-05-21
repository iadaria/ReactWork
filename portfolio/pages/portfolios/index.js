import React, { useState } from  'react';
import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasePage";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
//import { withRouter } from 'next/router';
import axios from "axios";

const graphDeletePortfolio = (id) => {
  const query = `
    mutation DeletePortfolio {
      deletePortfolio(id: "${id}")
    }
  `;
  return axios
    .post("http://localhost:3000/graphql", { query }) //{query: query});
    .then(({ data: graph }) => graph.data)
    .then((data) => data.deletePortfolio);
}

const graphUpdatePortfolio = (id) => {
  const query = `
    mutation UpdatePortfolio {
      updatePortfolio(id: "${id}", input:{
        title: "Update Work in USA",
        company: "Update WhoKnows",
        companyWebsite: "Update www.google.com",
        location: "Update USA, Montana",
        jobTitle: "Update Housekeeping",
        description: "Update So much responsibility....Overloaaaaaad",
        startDate: "01/01/2010",
        endDate: "01/01/2011",
      }) {
        _id
        title
        jobTitle
        description
        startDate
        endDate
        company
        companyWebsite
      }  
    }
  `;
  return axios
    .post("http://localhost:3000/graphql", { query }) //{query: query});
    .then(({ data: graph }) => graph.data)
    .then((data) => data.updatePortfolio);
};

const graphCreatePortfolio = () => {
  const query = `
    mutation CreatePortfolio {
      createPortfolio(input:{
        title: "Work in USA",
        company: "WhoKnows",
        companyWebsite: "www.google.com",
        location: "USA, Montana",
        jobTitle: "Housekeeping",
        description: "So much responsibility....Overloaaaaaad",
        startDate: "01/01/2010",
        endDate: "01/01/2011",
      }) {
        _id
        title
        jobTitle
        description
        startDate
        endDate
        company
        companyWebsite
      }  
    }
  `;
  return axios
    .post("http://localhost:3000/graphql", { query }) //{query: query});
    .then(({ data: graph }) => graph.data)
    .then((data) => data.createPortfolio);
};

const fetchPortfolios = () => {
  const query = `
    query Portfolios {
        portfolios {
            _id
            title
            jobTitle
            description
            startDate
            endDate
            company
            companyWebsite
        }
      }
    `;
  return axios
    .post("http://localhost:3000/graphql", { query }) //{query: query});
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios);
};

const Portfolios = ({data}) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  };

  const updatePortfolio = async (id) => {
    const updatePortfolio = await graphUpdatePortfolio(id);
    const index = portfolios.findIndex(p => p._id === id);
    const newPortfolios = portfolios.slice();
    newPortfolios[index] = updatePortfolio;
    setPortfolios(newPortfolios);
  };

  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id);
    const index = portfolios.findIndex(p => p._id === deletedId);
    const newPortfolios = portfolios.slice();
    newPortfolios.splice(index, 1);
    setPortfolios(newPortfolios);
  };

  return (
    <BaseLayout>
      <BasePage>
        <h1>Portfolios</h1>
        <button
          onClick={createPortfolio}
          className="btn btn-primary"
        >
          Create Portfolio
        </button>
        <Row>
          {portfolios.map((portfolio) => (
            <Col style={{marginTop: 10}} key={portfolio._id} lg={4} md={6} xs={12}>
              <Link 
                href='/portfolios/[id]'
                as={`/portfolios/${portfolio._id}`}
              >
                <a className="card-link" ><PortfolioCard portfolio={portfolio} /></a>
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => updatePortfolio(portfolio._id)}
              >
                Update Portfolio
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deletePortfolio(portfolio._id)}
              >
                Delete Portfolio
              </button>
            </Col>
          ))}
        </Row>
        {/* <button className="btn btn-primary" onClick={fetchPortfolios}>
          Fetch data
        </button> */}
        {/* {JSON.stringify(portfolios)} */}
      </BasePage>
    </BaseLayout>
  );
};

Portfolios.getInitialProps = async () => {
  //debugger
  const portfolios = await fetchPortfolios();
  return { data: { portfolios } };
};

export default Portfolios;

//export default withRouter(Portfolios);

/* const apiCall = () => {
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
 */