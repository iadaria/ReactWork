import React from 'react';
import Grid from '@material-ui/core/Grid';
import PortfolioCard from '../../components/shared/PortfolioCard';
import BaseLayout from "../../components/layouts/BaseLayout";
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
            <Grid className="portfolio-cards" container justify="center" style={{ border: '1px solid black' }}>
                <Grid className="portfolios-header" container item xs={11} justify="center">
                    <h1>
                        Portfolios
                    </h1>
                </Grid>

                {portfolios.map((portfolio, index) => (
                    <Grid key={index} className="item" container item md={3} xs={11}>
                        <Link
                            href='/portfolios/[id]'
                            as={`/portfolios/${portfolio._id}`}
                        >
                            <a className="card-link">
                                <PortfolioCard portfolio={portfolio} />
                            </a>
                        </Link>
                    </Grid>
                ))}

            </Grid>
        </BaseLayout>
    );
};

export default withApollo(Portfolios, { getDataFromTree });

/* 
import PortfolioCard from "../../components/portfolios/PortfolioCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    {JSON.stringify(portfolios)}
</BaseLayout> */