import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();

const UserInfoContextProvider = (props) => {

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      name: (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user'))?.name) ? JSON.parse(localStorage.getItem('user')).name : "Login",
    })
  }, [])

  return <UserContext.Provider value={{ userInfo: user, setUser: setUser }}>
    {props.children}
  </UserContext.Provider>
}

export default UserInfoContextProvider;