import React from 'react';
import './services.scss';
import Grid from '@material-ui/core/Grid';
import ServicesSkeleton from './ServicesSkeleton';

import withApollo from "@/hoc/withApollo";
import { useGetPartWords } from "@/apollo/actions";
import languageContext from '../../../contexts/languageContext';

const Services = () => {
    const languageCode = React.useContext(languageContext);

    const { loading, data: dataWords } = useGetPartWords({ variables: { languageCode, part: "mainPage" } });
    /* Create one object with many keys */
    const words = dataWords && dataWords.partWords.reduce((prevWords, currentWord) => (
        { ...prevWords, ...{ [currentWord.key]: currentWord.value } }
    ), {}) || [];

    return (
        <Grid className="services" container justify="center">

            <Grid className="services-header" container item xs={11} justify="center">
                <h1>
                    {words.services_title}
                </h1>
            </Grid>

            <Grid container item lg={8} md={10} sm={11} xs={10} justify="center">
                { loading ? (
                    <ServicesSkeleton />
                ) : (
                    <ul className="services-list">
                    <li className="service">
                        <h2>{words.service_mobile_title}</h2>
                        <p>{words.service_mobile_description}</p>
                    </li>
                    <li className="service">
                        <h2>{words.service_site_title}</h2>
                        <p>{words.service_site_description}</p>
                    </li>
                    <li className="service">
                        <h2>{words.service_bug_title}</h2>
                        <p>{words.service_bug_description}</p>
                    </li>
                </ul>
                )}
            </Grid>

        </Grid>
    );
};
export default withApollo(Services);

/* <Grid className="item" container item md={2} xs={11}>
        <section className="service">
            <h2>Разработка ПО</h2>
            <p>
                Боты, парсеры
            </p>
        </section>
    </Grid> 
*/