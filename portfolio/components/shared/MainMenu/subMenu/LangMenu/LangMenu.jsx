import React, { useState, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//import './lang-menu.scss';


const LangMenu = ({ languageCode, setLanguage }) => {
    const [anchorE1, setAnchorE1] = useState(null);
    const open =  Boolean(anchorE1);

    const handleMenu = (event) => 
        setAnchorE1(event.currentTarget);

    const handleClose = () => setAnchorE1(null);

    return (
        <div className="lang-menu">
            <IconButton
                onClick={handleMenu}
                color="inherit"
            >
                <img
                    className="lang-menu__img"
                    width={50} height={30}
                    src={`../../../static/images/lang/${languageCode}.png`}
                    alt="language" />
            </IconButton>
            <Menu
                className="lang-menu__menu"
                id="menu-lang"
                anchorEl={anchorE1}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} style={{padding: 0}}>
                    <IconButton
                        className="lang-menu__button"
                        onClick={setLanguage.bind(null, "en")}
                        color="inherit"
                    >
                        <img
                            className="lang-menu__img"
                            width={50} height={30}
                            src="../../../static/images/lang/en.png"
                            alt="the English language" />
                    </IconButton>
                </MenuItem>
                <MenuItem onClick={handleClose} style={{padding: 0}}> 
                    <IconButton
                        className="lang-menu__button"
                        onClick={setLanguage.bind(null, "ru")}
                        color="inherit"
                    >
                        <img
                            className="lang-menu__img"
                            width={50} height={30}
                            src="../../../static/images/lang/ru.png"
                            alt="the Russian language" />
                    </IconButton>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default LangMenu;
