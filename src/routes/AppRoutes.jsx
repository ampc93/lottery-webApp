import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import RoleList from '../pages/Roles/RoleList';
import Dashboard from '../pages/Dashboard'; 
import PermissionList from '../pages/Permission/PermissionList';
import PermissionManager from '../pages/Permission/PermissionManager';
import UserList from '../pages/Users/UserList';
import Login from '../components/Login';
import UserProfileEdit from '../pages/Users/UserProfileEdit';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

const AppRoutes = () =>{
    return(
        <Routes>
            <Route 
                path="/login" 
                element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                } />

            <Route 
                path="/" 
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }>

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/roles" element={<RoleList />} />
                <Route path="/permission" element={<PermissionList/>} />
                <Route path="/PermissionManager" element={<PermissionManager/>} />
                <Route path="/users" element={<UserList/>} />
                <Route path="/perfil" element={<UserProfileEdit/>} />
            </Route>

        </Routes>
    );
};

export default AppRoutes;