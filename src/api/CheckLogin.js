import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { axios } from 'axios';

export default function CheckLogin() {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userId, setUserId] = useState(localStorage.getItem("id"));

    return (
        <>
            {(token == null && userId == null) ? <Navigate to="/login" /> : null}
        </>
    )
}