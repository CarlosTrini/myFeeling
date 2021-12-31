import React from 'react';

const Alerts = ({msg, type}) => {
   // type has to be 'danger' or 'success'

   return <p className={`msg ${type}`} > {msg}  </p>
}

export default Alerts;
