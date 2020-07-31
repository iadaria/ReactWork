import React from 'react';
import './hero.scss';
import Typed from 'react-typed';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import WelcomSkeleton from './WelcomSkeleton';

import withApollo from "@/hoc/withApollo";
import { useGetPartWords } from "@/apollo/actions";
import languageContext from '../../../contexts/languageContext';

const Hero = () => {
    const languageCode = React.useContext(languageContext);

    const { loading, data: dataWords } = useGetPartWords({ variables: { languageCode, part: "mainPage" } });
    const words = dataWords && dataWords.partWords.reduce((prevWords, currentWord) => (
        { ...prevWords, ...{ [currentWord.key]: currentWord.value } }
    ), {}) || [];
    //const loading = true;
    
    const roles = words.roles?.split(';') || null;
    const test_loading = 1;
    return (
        <Grid className="hero" container justify="center">

            <Grid className="item" container item lg={5} md={6} xs={12} justify="flex-end" alignContent="flex-start">
                {loading ? (
                    <Skeleton variant="rect" className="hero-skeleton">                   
                        <img width={400} height={500}/>
                    </Skeleton>
                ) : (
                    /* <section style={{width: 400, height: 500}} className="hero-section">  */
                    <section className="hero-section">       
                        <div style={{maxWidth: 400}} className="hero-section-content">
                            <h2>Full Stack Developer</h2>
                            <div className="hero-section-content-intro">
                                React Native, React, ASP.NET, C#, hmtl/css/js
                            </div>
                        </div>
                        
                        <img 
                            style={{ width: 'auto', maxWidth: '100%' }}
                            src="/static/images/section-1.png"     
                        />
                        <div className="shadow-custom">
                            <div className="shadow-inner"> </div>
                        </div>
                    </section>
                )}
            </Grid>

            <Grid className="item" container item lg={5} md={6} xs={12}>
                {!loading ? (
                    <section className="welcom-section">
                    <div className="hero-welcome-text" dangerouslySetInnerHTML={{__html: words.welcom}}>
                    </div>
                    {roles && 
                        <Typed
                            //typedRef={typedRef()}
                            className="self-typed"
                            loop
                            typeSpeed={70}
                            backSpeed={70}
                            strings={roles}
                            smartBackspace
                            shuffle={false}
                            backDelay={10000}
                            fadeOut={false}
                            fadeOutDelay={100}
                            loopCount={0}
                            showCursor
                            cursorChar="|"
                        />
                    }
                    <div className="hero-welcome-bio">
                        <h1>
                            {words.look}
                        </h1>
                    </div>
                </section>
                ) : (
                    <WelcomSkeleton />
                )}
                
            </Grid>

        </Grid>
    );
};

export default withApollo(Hero);
