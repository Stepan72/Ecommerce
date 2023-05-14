import React from "react";
import { Layout } from "@/components";
import "../styles/globals.css";
import { StateContext } from "../../context/StateContext";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/store/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </Provider>
  );
}

export default MyApp;
