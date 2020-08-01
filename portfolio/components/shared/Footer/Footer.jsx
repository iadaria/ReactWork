import React from 'react';
import './footer.scss';

import TelegramIcon from '@material-ui/icons/Telegram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import IconContacts from '@/components/shared/IconContacts';

//import svgTelegram from '/static/images/contacts/telegram_logo.svg';

const Footer = () => {
    return (
        <div className="footer">
            <div className="contacts">

                <ul className="footer-contacts">
                    <li><TelegramIcon /> jadarya</li>
                    <li><WhatsAppIcon /> +7 (914) 352 8288</li>
                    <li><MailOutlineIcon /> iakim.daria@gmail.com</li>
                    <li> 
                        <img
                            style={{color: 'white'}}
                            width={30} height={30}
                            src='/static/images/contacts/icons8-skype.svg'
                            alt="@jadarya"
                        />
                        iakim.daria@gmail.com
                    </li>
                </ul>

                <IconContacts />
            </div>
            <p className="copyright">
                &copy; 2020 Freelancer Iakimova Daria
            </p>
        </div>
    );
};

export default Footer;
