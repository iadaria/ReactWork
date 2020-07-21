import React from "react";
import './new.scss';
import axios from 'axios';
import BaseLayout from "@/components/layouts/BaseLayout";
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import PortfolioForm from "@/components/forms/PortfolioForm";
import { useCreatePortfolio } from '@/apollo/actions';
import { useRouter } from 'next/router';
//import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

const PortfolioNew = () => {
    const [createPortfolio, { error }] = useCreatePortfolio();
    const router = useRouter();
    const errorMessage = error =>
        (error.graphQLErrors && error.graphQLErrors[0]?.message) ||
        'Oooops somthing went wrong...';

    const handleCreatePortfolio = async (data) => {
        //let portfolioForCreate = {...data};
        const files = data.imgName;
        console.log('new -> handleCretePortfolio -> incoming data', data);
        if (files) {
            console.log('imgName is true', files);
            await upload(files[0]);
        }
        await createPortfolio({ variables: {...data, imgName: files[0]?.name} });
        router.push('/portfolios');
    };

    const upload = async (file) => {
        const data = new FormData();
        data.append('file', file);
        const res = await axios.post("http://localhost:3000/upload", data);
        console.log('res upload', res.statusText);
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <BaseLayout>

            <Grid container className="new" justify="center">
                <Grid item md={4} xs={12}>
                    <h1 className="page-title">Create New Portfolio </h1>
                    <PortfolioForm
                        onSubmit={handleCreatePortfolio}
                    />
                    {error && <Alert severity="error">{errorMessage(error)}</Alert>}
                </Grid>

            </Grid>

        </BaseLayout>
    );
};

export default withApollo(withAuth(PortfolioNew, ['admin', 'instructor']));