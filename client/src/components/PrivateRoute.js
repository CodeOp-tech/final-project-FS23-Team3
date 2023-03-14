import React from 'react';
import { Navigate } from "react-router-dom";
import Local from '../helpers/Local';

export default function PrivateRoute(props) {

    let userId = Local.getUserId();
    if (!userId) {
        return <Navigate to='/login' />;
    }
  return (
    <>
        {props.children}
    </>
  )
}
