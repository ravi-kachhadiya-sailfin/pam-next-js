import { useEffect } from "react"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { setupAxios } from "../src/setupAxios";
import Head from "next/head";
import { Theme } from "../src/common/Theme";
import { AuthProvider } from "../src/providers/AuthProvider"
import MetaContextProvider from "../src/providers/MetaProvider"
import UserInfoContextProvider from "../src/providers/UserInfo"
import AppStoreContextProvider from "../src/providers/AppStoreProvider";
// import bootstrap from "@date-io/date-fns"
// import { Page } from "../src/common/Page";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../styles/styles.css'
import '../styles/carousel.css'
import '../styles/globals.css'
import '../src/components/alert/TAMAlert.css';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    setupAxios();
  }, [])

  return <>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    </Head>

    <MuiThemeProvider theme={Theme}>
      <AppStoreContextProvider>
        <MetaContextProvider>
          <AuthProvider>
            <UserInfoContextProvider>
              {/* <Page> */}
              <Component {...pageProps} />
              {/* </Page> */}
            </UserInfoContextProvider>
          </AuthProvider>
        </MetaContextProvider>
      </AppStoreContextProvider>
    </MuiThemeProvider>
  </>
}

export default MyApp
