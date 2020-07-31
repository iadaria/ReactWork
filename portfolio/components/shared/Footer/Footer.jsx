import React from 'react';
import './footer.scss';

import IconButton from '@material-ui/core/IconButton';
import TelegramIcon from '@material-ui/icons/Telegram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from "next/link";
//import svgTelegram from '/static/images/contacts/telegram_logo.svg';

const Footer = () => {
    return (
        <div className="footer">
            <ul className="footer-contacts">
                <li><TelegramIcon /> jadarya</li>
                <li><WhatsAppIcon /> +7 (914) 352 8288</li>
                <li><MailOutlineIcon /> iakim.daria@gmail.com</li>
                <li>skype: iakim.daria@gmail.com</li>
            </ul>

            <ul className="icon-contacts">
                <li>
                    <IconButton>
                        <a href="https://t.me/jadarya" target="_blank" title="https://t.me/jadarya">
                            <img
                                width={40} height={40}
                                src='/static/images/contacts/telegram_logo.svg'
                                alt="@jadarya"
                            />
                        </a>
                    </IconButton>
                </li>
                <li>
                    <IconButton>
                        <a href="https://github.com/iadaria" target="_blank" title="https://github.com/iadaria">
                            <GitHubIcon style={{width: 40, height: 40, color: 'white'}}/>
                        </a>
                    </IconButton>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
