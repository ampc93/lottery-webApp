import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleList from '../pages/Roles/RoleList';
import Home from '../pages/Home'; 
import PermissionList from '../pages/Permission/PermissionList';

const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roles" element={<RoleList />} />
            <Route path="/permission" element={<PermissionList/>} />
        </Routes>
    );
};

export default AppRoutes;