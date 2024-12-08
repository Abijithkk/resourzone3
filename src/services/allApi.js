import axios from "axios";
import { BASE_URL } from "./baseUrl";
import { commonApi } from "./axoisConfig";

export const getAlljobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin-jobs/jobs/`); 
      if (response.status === 200 && response.data) {
        return response.data; 
      } else {
        throw new Error("Failed to fetch jobs data");
      }
    } catch (error) {
      console.error("Error fetching jobs data:", error.message);
      throw error; 
    }
  };
  


  export const Registerapplication = async (formData) => {
    try {
      // Make the API call with formData
      const response = await axios.post(`${BASE_URL}/user-jobs/submit`, formData);
  
      // Log the full response to inspect its structure
      console.log("Full response:", response);
  
      // Check if response status is success (200 or 201)
      if (response.status === 200 || response.status === 201) {
        return response;  // Return the full response instead of just response.data
      } else {
        throw new Error("Failed to register the job");
      }
    } catch (error) {
      console.error("Error registering the job:", error.response ? error.response.data : error.message);
      throw error;  // Rethrow the error to handle it in the calling function
    }
  };
  
  export const Registerenquiry = async (formData) => {
    try {
      // Make the API call with formData
      const response = await axios.post(`${BASE_URL}/user-jobs/enquiry/submit`, formData);
  
      // Log the full response to inspect its structure
      console.log("Full response:", response);
  
      // Check if response status is success (200 or 201)
      if (response.status === 200 || response.status === 201) {
        return response;  // Return the full response instead of just response.data
      } else {
        throw new Error("Failed to register the job");
      }
    } catch (error) {
      console.error("Error registering the job:", error.response ? error.response.data : error.message);
      throw error;  // Rethrow the error to handle it in the calling function
    }
  };








  // admin



  export const Adminlogin = async (user) => {
    return await commonApi('POST', `${BASE_URL}/auth/login`, user, "", false);
}


export const addJobs = async (user) => {
    return await commonApi('POST', `${BASE_URL}/admin-jobs/add`, user)
}

export const getAllJobs = async () => {
    return await commonApi('GET', `${BASE_URL}/admin-jobs/jobs`, "", "",false)
}

export const editJobs=async(reqBody,id)=>{
    return await commonApi('PATCH', `${BASE_URL}/admin-jobs/jobs/edit/${id}`, reqBody )
}

export const deleteJobs=async(id)=>{
    return await commonApi('DELETE', `${BASE_URL}/admin-jobs/jobs/delete/${id}`, {},)
}

export const getAllusers = async () => {
    return await commonApi('GET', `${BASE_URL}/user-jobs/get/usersdts`, "",)
}
export const getAllenquiries = async () => {
    return await commonApi('GET', `${BASE_URL}/user-jobs/get/user/enquiry`, "")
}









