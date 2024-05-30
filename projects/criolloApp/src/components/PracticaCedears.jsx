// src/App.js
import React, { useState } from 'react';
import '../App.css';
import UserHeaderInvest from './UserHeaderInvest.jsx';
import CEDEARTable from './CEDEARTable.jsx';


function PracticaCedears() {

  return (
    <div className="practica-container">
      <UserHeaderInvest />
      <CEDEARTable />
    </div>
  );
}

export default PracticaCedears;
