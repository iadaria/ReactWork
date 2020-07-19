import React, { useState, useEffect } from  'react';
import BaseLayout from "../../components/layouts/BaseLayout";
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { useGetPortfolios } from '@/apollo/actions';
//import { formatDate } from '@/utils/functions';

const Portfolios = () => {
  const { data } = useGetPortfolios();
  const portfolios = data && data.portfolios || [];
  
  return (
    <BaseLayout>
     
        <h1>Portfolios</h1>
        <Row>
          {portfolios.map((portfolio) => (
            <Col style={{marginTop: 10}} key={portfolio._id} lg={4} md={6} xs={12}>
              <Link 
                href='/portfolios/[id]'
                as={`/portfolios/${portfolio._id}`}
              >
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
            </Col>
          ))}
        </Row>
        {/* {JSON.stringify(portfolios)} */}
    </BaseLayout>
  );
};

export default withApollo(Portfolios, {getDataFromTree});