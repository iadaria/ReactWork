import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import MainMenu from "../components/shared/MainMenu";

// Styless
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="portfolio-app">
      <MainMenu />
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
