import React from 'react';
import './dashboard.scss';

import BaseLayout from "@/components/layouts/BaseLayout";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
//import { useRouter } from "next/router";
import { useGetUserPortfolios, useDeletePortfolio } from "@/apollo/actions";
import { getDataFromTree } from "@apollo/react-ssr";
import Link from "next/link";
import { formatDate } from '@/utils/functions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const InstructorDashboard = () => {
    const { data } = useGetUserPortfolios();
    const [deletePortfolio] = useDeletePortfolio();
    const userPortfolios = (data && data.userPortfolios) || [];

    //console.log(userPortfolios, userPortfolios);

    return (
        <BaseLayout>
            <Container>
                <div className="dashboard">
                    <h1>Instructor Portfolios</h1>
                    {userPortfolios.map(portfolio => (
                        <Card className="portfolio" key={portfolio._id}>
                            <CardHeader
                                title={portfolio.title}
                            />

                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {formatDate(portfolio.startDate)} - {" "} {(portfolio.endDate && formatDate(portfolio.endDate)) || "Present"}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {portfolio.description}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Link
                                    href="/portfolios/[id]/edit"
                                    as={`/portfolios/${portfolio._id}/edit`}
                                >
                                    <Button 
                                        variant="contained"
                                        color="primary"
                                    >
                                        Update
                                    </Button>
                                </Link>

                                <Button
                                    onClick={deletePortfolio.bind(null, { variables: { id: portfolio._id} })}
                                    color="secondary"
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>

            </Container>
        </BaseLayout>
    );
};

export default withApollo(
    withAuth(InstructorDashboard, ["admin", "instructor"], { ssr: true }),
    { getDataFromTree }
);

{/* 
<div className="bwm-form mt-5">
    <div className="row">
        <div className="col-md-12">
        <h1 className="page-title">Instructor Portfolios</h1>
        {userPortfolios.map((p) => (
            <Card key={p._id} className="mb-2">
            <Card.Header>{p.jobTitle}</Card.Header>
            <Card.Body>
                <Card.Title>{p.title}</Card.Title>
                <Card.Text>
                {formatDate(p.startDate)} - {" "} {(p.endDate && formatDate(p.endDate)) || "Present"}
                </Card.Text>

                <Link
                href="/portfolios/[id]/edit"
                as={`/portfolios/${p._id}/edit`}
                >
                <a className="btn btn-warning mr-1">Update</a>
                </Link>

                <Button
                onClick={() => deletePortfolio({ variables: { id: p._id } })}
                variant="danger"
                >
                Delete
                </Button>

            </Card.Body>
            </Card>
        ))}
        </div>
    </div>
</div> */}