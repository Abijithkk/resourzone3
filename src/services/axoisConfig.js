import axios from "axios";

export const commonApi = async (httprequest, url, reqBody, reqHeader, requiresAuth = true) => {
    let token = null;
    
    // Check if the API requires authentication (token)
    if (requiresAuth) {
        // Retrieve the token directly before making the API call
        token = localStorage.getItem('resourceZone_token');
        
        if (!token) {
            // If token is not available and authentication is required, handle the error
            return Promise.reject("Token not available. Please log in.");
        }
    }

    const reqConfig = {
        method: httprequest,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : {
            'Content-Type': 'application/json',
            ...(requiresAuth && token ? { 'Authorization': `Bearer ${token}` } : {})
        }
    };

    try {
        const result = await axios(reqConfig);
        return result;
    } catch (err) {
        return err;
    }
};
