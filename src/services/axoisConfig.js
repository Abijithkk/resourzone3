import axios from "axios"


const token=localStorage.getItem('resourceZone_token')
export const commonApi=async(httprequest,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httprequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })

}