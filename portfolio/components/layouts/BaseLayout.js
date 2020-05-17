import React from 'react';

const BaseLayout = (props) => {
    const { className, children } = props;
    return (
        <div className="layout-container" >
            <main className={`cover ${className}`}>
                <div className="wrapper">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default BaseLayout;
