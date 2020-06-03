import React from 'react';
import './base-layout.scss';
import Container from "react-bootstrap/Container";
import MainMenu from "@/components/shared/MainMenu";

const BaseLayout = (props) => {
    const { className, children } = props;
    return (
        <div className="layout-container base-layout">
            <MainMenu />
            <main className={`cover ${className}`}>
                <Container className="wrapper">
                    {children}
                </Container>
            </main>
        </div>
    );
};

export default BaseLayout;