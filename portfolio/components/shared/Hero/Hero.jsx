import React from 'react';
import './hero.scss';
import Typed from 'react-typed';
import Grid from '@material-ui/core/Grid';

const Hero = () => {
    const roles = [
        'Разработка гибридных мобильных приложений под Android/IOS на React Native',
        '',
        'Developer', 
        'Team Player', 
        'React.js', 
        'React Native', 
        'ASP.NET'
    ];
    return (
        <Grid className="hero" container justify="center" style={{ border: '1px solid black' }}>

            <Grid className="item" container item md={5} xs={11} justify="flex-end">
                <section className="hero-section">
                    <div className="hero-section-content">
                        <h2> Full Stack Developer </h2>
                        <div className="hero-section-content-intro">
                            Have a look at my portfolio and job history.
                        </div>
                    </div>
                    <img className="image" src="/static/images/section-1.png" />
                    <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                    </div>
                </section>
            </Grid>

            <Grid className="item" container item md={5} xs={11}>
                <section className="welcom-section">
                    <div className="hero-welcome-text">
                        <p>
                            <b>Welcome</b> to the portfolio website of Iakimova Daria.
                                        Get informed, collaborate and discover projects I was working on through the years!
                            </p>
                        <>
                            <p>
                                Здравствуйте, Вы зашли на сайт Якимовой Дарьи.
                            </p>
                            <p>
                                У меня Вы можете заказать мобильное приложение
                                под Android/Ios, сайт и др. приложение с использованием различных технологий.
                            </p>
                            <p>
                                Я отвественно подхожу к выполнению задач, имею несколько лет опыта коммерческой разработки.
                            </p>
                        </>
                    </div>
                    <Typed
                        //typedRef={typedRef()}
                        className="self-typed"
                        loop
                        typeSpeed={70}
                        backSpeed={70}
                        strings={roles}
                        //strings={["welcome to react-typed", "This is a react component that wraps up the <a hre…", "If you like the project add a star in <a href='htt…"]}
                        smartBackspace
                        shuffle={false}
                        backDelay={10000}
                        fadeOut={false}
                        fadeOutDelay={100}
                        loopCount={0}
                        showCursor
                        cursorChar="|"
                    />
                    <div className="hero-welcome-bio">
                        <h1>
                            Let's take a look on my work.
                        </h1>
                    </div>
                </section>
            </Grid>

        </Grid>
    );
};

export default Hero;
