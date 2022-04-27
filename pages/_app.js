import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { setupAxios } from "../src/setupAxios";
import { Theme } from "../src/common/Theme";
import { AuthProvider } from "../src/providers/AuthProvider"
import MetaContextProvider from "../src/providers/MetaProvider"
import UserInfoContextProvider from "../src/providers/UserInfo"
import AppStoreContextProvider from "../src/providers/AppStoreProvider";
// import { Page } from "../src/common/Page";

import '../styles/globals.css'
import '../styles/carousel.css'

function MyApp({ Component, pageProps }) {
  return <MuiThemeProvider theme={Theme}>
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
}

export default MyApp
