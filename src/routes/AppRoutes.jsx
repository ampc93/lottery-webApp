import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleList from '../pages/Roles/RoleList';
import Home from '../pages/Home'; 
import PermissionList from '../pages/Permission/PermissionList';
import PermissionManager from '../pages/Permission/PermissionManager';
import UserList from '../pages/Users/UserList';

const AppRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roles" element={<RoleList />} />
            <Route path="/permission" element={<PermissionList/>} />
            <Route path="/PermissionManager" element={<PermissionManager/>} />
            <Route path="/users" element={<UserList/>} />
        </Routes>
    );
};

export default AppRoutes;