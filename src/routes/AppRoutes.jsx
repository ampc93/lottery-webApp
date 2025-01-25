import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleList from '../pages/Roles/RoleList';
import Home from '../pages/Home'; 

const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roles" element={<RoleList />} />
        </Routes>
    );
};

export default AppRoutes;