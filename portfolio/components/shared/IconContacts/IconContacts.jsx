import React from 'react';
import './icon-contacts.scss';

import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import Link from "next/link";

const IconContacts = ({color = 'white'}) => {
    return (
        <ul className="icon-contacts">
            <li>
                <IconButton>
                    <a href="https://t.me/jadarya" target="_blank" title="@jadarya">
                        <img
                            width={33} height={33}
                            src='/static/images/contacts/telegram_logo.svg'
                            alt="@jadarya"
                        />
                    </a>
                </IconButton>
            </li>
            <li>
                <IconButton>
                    <a href="https://github.com/iadaria" target="_blank" title="https://github.com/iadaria">
                        <GitHubIcon style={{ width: 33, height: 33, color: color }} />
                    </a>
                </IconButton>
            </li>
        </ul>
    );
};

export default IconContacts;
