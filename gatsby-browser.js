import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './src/assets/css/main.css';

export const wrapRootElement = ({ element }) => {
    return <Router>{element}</Router>;
};
