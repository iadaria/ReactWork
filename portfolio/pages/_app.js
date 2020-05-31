import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import { ApolloProvider } from "@apollo/react-hooks";
import MainMenu from "../components/shared/MainMenu";

// Styless
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <BaseLayout>
      <div className="portfolio-app">
        <MainMenu />
        <div>
          <Component {...pageProps} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default MyApp;
