import React from 'react';
import './services.scss';
import Grid from '@material-ui/core/Grid';

const Services = () => {
    return (
        <Grid className="services" container justify="center" style={{ border: '1px solid black' }}>

            <Grid className="services-header" container item xs={11} justify="center">
                <h1>
                    Services
                </h1>
            </Grid>

            <Grid className="item" container item md={2} xs={11}>
                <section className="service">
                    <h2>Создание мобильных приложений на React Native</h2>
                    <p>
                        Разработка гибридных мобильных приложений под IOS/Android на React Native.
                        Составление ТЗ, прототипа, бэкэнда и развертывание, а также дальнейшая техническая
                        поддержка.
                                </p>
                </section>
            </Grid>

            <Grid className="item" container item md={2} xs={11}>
                <section className="service">
                    <h2>Создание cайтов</h2>
                    <p>
                        Применяемые технологии ASP.NET, React, Node.
                        Регистрация доменов и хостингов, администрирование VPN, также развертывание.
                                </p>
                </section>
            </Grid>

            {/* <Grid className="item" container item md={2} xs={11}>
                            <section className="service">
                                <h2>Разработка ПО</h2>
                                <p>
                                    Боты, парсеры
                                </p>
                            </section>
                        </Grid> */}

            <Grid className="item" container item md={2} xs={11}>
                <section className="service">
                    <h2>Доработка или исправление ошибок готового ПО</h2>
                    <p>
                        Приемущественно React Native, ASP.NET, React
                                </p>
                </section>
            </Grid>


        </Grid>
    );
};
export default Services;
