import React from 'react';
import BaseLayout from "../../components/layouts/BaseLayout";
import PortfolioCards from '../../components/shared/PortfolioCards';

//import withApollo from "@/hoc/withApollo";
//import { getDataFromTree } from '@apollo/react-ssr';

const Portfolios = () => {
    return (
        <BaseLayout>
            <PortfolioCards />
        </BaseLayout>
    );
};

export default Portfolios;