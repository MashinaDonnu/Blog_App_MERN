import React from 'react'
import {Layout} from "./hoc/Layout";
import {ModalState} from './context/modal/modalState'
import {Modal} from "./components/Modal";
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from "./routes";
import {Navbar} from "./components/Navbar";
import {AlertState} from "./context/alert/alertState";
import {Alert} from "./components/Alert";
import {AuthContext} from "./context/auth/authContext";
import {useAuth} from "./hooks/useAuth";
import {Loader} from "./components/Loader";

function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!ready) {
        return <Loader />
    }

    return (
      <BrowserRouter>
          <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
              <AlertState>
                  <Alert/>
                  <Layout auth={isAuth}>
                    <ModalState>
                        <Navbar isAuth={isAuth} userId={userId} />
                        <div className={isAuth ? 'container' : ''}>
                          {routes}
                        </div>
                        <Modal />
                    </ModalState>
                  </Layout>
              </AlertState>
          </AuthContext.Provider>
      </BrowserRouter>
  );
}

export default App;
