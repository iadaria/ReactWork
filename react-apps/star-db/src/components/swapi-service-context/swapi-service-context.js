import React from 'react';

const {
    Provider : SwapiServiceProvider,
    Consumer : SwapiServiceConsumer //new name
} = React.createContext();

export {
    SwapiServiceProvider,
    SwapiServiceConsumer
};