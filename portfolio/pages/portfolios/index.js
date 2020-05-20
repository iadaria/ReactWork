import React from  'react';
import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasePage";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
//import { withRouter } from 'next/router';
import axios from "axios";

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

const Portfolios = ({portfolios}) => {
  return (
    <BaseLayout>
      <BasePage>
        <h1>Portfolios</h1>
        <Row>
          {portfolios.map((portfolio) => (
            <Col style={{marginTop: 10}} key={portfolio._id} lg={4} md={6} xs={12}>
              <Link 
                href='/portfolios/[id]'
                as={`/portfolios/${portfolio._id}`}
              >
                <a className="card-link" ><PortfolioCard portfolio={portfolio} /></a>
              </Link>
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
  return { portfolios };
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