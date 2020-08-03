
import './edit.scss';
import axios from 'axios';
import PortfolioForm from '@/components/forms/PortfolioForm';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import BaseLayout from '@/components/layouts/BaseLayout';
import { useRouter } from 'next/router';
import { useGetPortfolio, useUpdatePortfolio } from '@/apollo/actions';
import { toast } from 'react-toastify';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

const PortfolioEdit = () => {
    const router = useRouter();
    const [updatePortfolio, { error }] = useUpdatePortfolio();
    const { id } = router.query;
    const { data } = useGetPortfolio({ variables: { id } });

    const errorMessage = error => {
        return (error.graphQLErrors && error.graphQLErrors[0].message) || 'Ooooops something went wrong...'
    }

    const handlePortfolioUpdate = async (data) => {
        console.log('data', data);
        const portfolioForUpdate = {...data};
        const files = data.files;
        if (files) {
            await upload(files[0]);
            portfolioForUpdate.imgName = files[0]?.name;
        }

        await updatePortfolio({ variables: { id, ...portfolioForUpdate } });
        toast.success('Portfolio has been updated!', { autoClose: 2000 });
    }

    //console.log('edit -> data', data);
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
                    <h1 className="page-title">Edit Portfolio</h1>
                    {data &&
                        <PortfolioForm
                            initialData={data.portfolio}
                            onSubmit={handlePortfolioUpdate} 
                        />
                    }
                    {error && <Alert severity="error">{errorMessage(error)}</Alert>}
                </Grid>
            </Grid>
        </BaseLayout>
    )
}

export default withApollo(withAuth(PortfolioEdit, ['admin', 'instructor']));