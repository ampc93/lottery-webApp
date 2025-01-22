import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import Button from '../../components/Table';
import Input from '../../components/Table';
import { getRole, removeRole } from '../../services/roleServices';
import { useNavigate } from 'react-router-dom';

const RoleList = () =>{
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
        loadRoles();
    }, []);

    const loadRoles = async () =>{
        const data = await getRole();
        setRoles(data);
    };

};