import commonApi from "./commonApi"
import SERVER_URL from "./serverUrl"

export const addEmployeeApi=async(reqBody)=>{
    return await commonApi('post',`${SERVER_URL}/add-employee`,reqBody)
}
export const viewEmployeeApi=async()=>{
    return await commonApi('get',`${SERVER_URL}/get-allemployee`,"")
}
export const editEmployeeApi=async(reqParams,reqBody)=>{
    return await commonApi('put',`${SERVER_URL}/edit-employee/${reqParams}`,reqBody)
}
export const deleteEmployeeApi=async(reqParams)=>{
    return await commonApi('delete',`${SERVER_URL}/delete-employee/${reqParams}`,"")
}

