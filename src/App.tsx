import React from 'react';
import {MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import SignInView from "./view/auth/signIn/SignInView";
import MainView from "./view/main/MainView";
import SignUpView from "./view/auth/signUp/SignUpView";
import Auth from "./view/auth/Auth";
import {PathEnum} from "./type/enum/path/PathEnum";


function App() {


  return (

          <Router>

              <Routes>
                  <Route path={PathEnum.SIGN_IN} element={<SignInView />} />
                  <Route path={PathEnum.SIGN_UP} element={<SignUpView />} />
                  <Route path={PathEnum.ROOT} element={<Auth children={<MainView />} path={PathEnum.ROOT}/>} />
              </Routes>

          </Router>


  );
}

export default App;
