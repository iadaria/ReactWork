import React from 'react';
import './services.scss';
import Grid from '@material-ui/core/Grid';

const Services = ({ words }) => {
    return (
        <Grid className="services" container justify="center">

            <Grid className="services-header" container item xs={11} justify="center">
                <h1>
                    {words.services_title}
                </h1>
            </Grid>

            <Grid className="item" container item md={2} xs={11}>
                <section className="service">
                    <h2>{words.service_mobile_title}</h2>
                    <p>{words.service_mobile_description}</p>
                </section>
            </Grid>

            <Grid className="item" container item md={2} xs={11}>
                <section className="service">
                    <h2>{words.service_site_title}</h2>
                    <p>{words.service_site_description}</p>
                </section>
            </Grid>

            <Grid className="item" container item md={2} xs={11}>
                <section className="service">
                    <h2>{words.service_bug_title}</h2>
                    <p>{words.service_bug_description}</p>
                </section>
            </Grid>


        </Grid>
    );
};
export default Services;

/* <Grid className="item" container item md={2} xs={11}>
        <section className="service">
            <h2>Разработка ПО</h2>
            <p>
                Боты, парсеры
            </p>
        </section>
    </Grid> 
*/