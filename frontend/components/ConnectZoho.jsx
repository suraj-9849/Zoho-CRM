
import React from 'react';
import { zohoApi } from '../api/zohoApi';

const ConnectZoho = () => {

  return (
    <button 
    variant="contained" 
    color="primary" 
    size="large"
    onClick={() => zohoApi.connectToZoho()}
    sx={{ mt: 2 }}
  >
    Connect to Zoho CRM
  </button>

  );
};

export default ConnectZoho;
