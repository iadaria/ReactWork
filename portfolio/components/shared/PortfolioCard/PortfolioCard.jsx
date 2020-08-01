import React, { useEffect, useCallback } from 'react';
import './portfolio-card.scss';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LaunchIcon from '@material-ui/icons/Launch';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import { formatDate } from '@/utils/functions';

const PortfolioCard = ({ portfolio, show }) => {
    const [expanded, setExpanded] = React.useState(show);

    const technologyImgs = portfolio.technologyImgs?.split(';');
    const technologies = portfolio.technologies?.split(';');

    const isRepository = portfolio.repository ? true : false;
    const isDeploy = portfolio.deploy ? true : false;

    return (
        <Card className="portfolio-card">  
            <CardHeader
                className="portfolio-card__header"
                avatar={
                    <AvatarGroup max={5}>
                        <Avatar
                            style={{width: 30, height: 30}}
                            src={`/static/images/technology/${technologyImgs && technologyImgs[0]}.svg`}
                            size="small"
                        />
                    </AvatarGroup>
                }
                action={
                    <>
                        <Tooltip title="repository/Исходный код"> 
                            <span>
                                <IconButton href={portfolio.repository} target="_blank" disabled={!isRepository}>
                                    <GitHubIcon 
                                        className="portfolio-card__header_git"
                                        color={portfolio.repository ? "inherit" : "disabled"}
                                        fontSize="small"    
                                    />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title="deploy/Посмотреть в работе">
                            <span>
                                <IconButton href={portfolio.deploy} target="_blank" disabled={!isDeploy}>
                                    <LaunchIcon 
                                        className="portfolio-card__header_deploy"
                                        color={portfolio.deploy ? "primary" : "disabled"}
                                        fontSize="small"    
                                    />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </>
                }
                title={portfolio.title}
                //subheader={`${portfolio.startDate} - ${portfolio.endDate || "Present"}`}
                subheader={`${formatDate(portfolio.startDate)} - ${(portfolio.endDate && formatDate(portfolio.endDate)) || "Present"}`}
            />
            <div
                className="portfolio-card__media_wrapper"
                onMouseOver={() => { setExpanded(true); }}
                onMouseLeave={setExpanded.bind(null, false)}
            />
            <CardMedia
                className="portfolio-card__media"
                image={`../../../static/images/portfolios/${portfolio.imgName || "default.png"}`}
            />
            <Slide direction="up" in={expanded}>
                <CardContent className="portfolio-card__content">
                    <div className="content__wrapper" />                    
                    <div className="content">
                        <Typography 
                            className="content__title"
                            paragraph>{portfolio.title}:</Typography>
                        
                        <Typography 
                            className="content__description" 
                            paragraph
                        >{portfolio.description}</Typography>
                        {/* <ul className="content__lists"> */}
                            {/* <li className="content__list"> */}
                        <div className="test">
                            <b>Технологии:</b>
                            <ul className="technology_list">
                                {technologies?.map((technology, index) => (
                                    <li key={index}>{technology}</li>
                                ))}
                            </ul>
                        </div>
                            {/* </li> */}
                            {/* <li className="content__list content__links">
                                <b>Ссылки:</b>
                                <ul className="links">
                                    <li>
                                        git: {
                                            <a href={portfolio.repository}>{portfolio.repository}</a> || "-"
                                        }
                                    </li>
                                    <li>deploy: {portfolio.deploy || "-"}</li>
                                    { portfolio.taskDocument && 
                                        <li>
                                            <a href={portfolio.taskDocument}>task document</a>
                                        </li>
                                    }
                                </ul>
                            </li> */}
                        {/* </ul> */}
                    </div>
                </CardContent>

            </Slide>

        </Card>
    );
};

export default PortfolioCard;
