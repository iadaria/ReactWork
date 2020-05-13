import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import { withRouter } from 'next/router';
import axios from 'axios';

class Test extends Component {

    static async getInitialProps({query}) {
        const { id } = query;//context.query;
        return { testId: id };
    }

    render() {
        const { testId } = this.props;

        return (
            <BaseLayout>
                <h1> I am Test Page with id of {testId}</h1>
            </BaseLayout>
        );
    }
};

export default withRouter(Test);
