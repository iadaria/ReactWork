import React, { useEffect } from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { bootstrap } from "./src/bootstrap";
import store from './src/store';

export default function App() {
    const [isReady, setIsReady] = React.useState(false);

    if (!isReady) {
        return (
            <AppLoading
                startAsync={bootstrap}
                onError={(err) => console.log(err)}
                onFinish={() => setIsReady(true)}
            />
        );
    }

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}
