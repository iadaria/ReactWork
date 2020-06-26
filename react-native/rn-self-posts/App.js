import React, { useEffect } from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { AppLoading } from "expo";
import { bootstrap } from "./src/bootstrap";

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

    return <AppNavigation />;
}
