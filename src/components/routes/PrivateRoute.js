import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from '../../context/user/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userContext = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userContext.username !== '' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default PrivateRoute;
