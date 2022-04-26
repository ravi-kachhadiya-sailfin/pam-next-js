import '../styles/globals.css'
import '../styles/carousel.css'
import { AuthProvider } from "../src/providers/AuthProvider"
import MetaContextProvider from "../src/providers/MetaProvider"
import UserInfoContextProvider from "../src/providers/UserInfo"

function MyApp({ Component, pageProps }) {
  return <MetaContextProvider>
    <AuthProvider>
      <UserInfoContextProvider>
        <Component {...pageProps} />
      </UserInfoContextProvider>
    </AuthProvider>
  </MetaContextProvider>
}

export default MyApp
