import React, { useState, useEffect } from  'react';
import BaseLayout from "../../components/layouts/BaseLayout";
import BasePage from "../../components/BasePage";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { 
  useGetPortfolios,
  useUpdatePortfolio,
  useCreatePortfolio,
  useDeletePortfolio } from '@/apollo/actions';

const Portfolios = () => {
  const { data } = useGetPortfolios();
  const [updatePortfolio] = useUpdatePortfolio();
  const [createPortfolio] = useCreatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();

  const portfolios = data && data.portfolios || [];
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
                onClick={() => updatePortfolio( { variables: {id: portfolio._id} })}
              >
                Update Portfolio
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deletePortfolio( { variables: {id: portfolio._id} }) }
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

export default withApollo(Portfolios, {getDataFromTree});