import {RegisterInterface} from "../../type/interface/auth/RegisterInterface";
import {customAxios} from "../AxiosViewModel";
import {ApiEnum} from "../../type/enum/api/ApiEnum";
import { errorModel } from "../error/ErrorModel";

interface RegisterModelInterface {
    firstname: string;
    lastname: string;
    email: string;
    sessionToken: string;
}

export const registerModel = async (data: RegisterInterface) => {
    try {
        const response = await customAxios().post(ApiEnum.register, data);
        const responseData: RegisterModelInterface = response.data;
        // console.log(responseData.sessionToken);
        sessionStorage.setItem("sessionToken", responseData.sessionToken)
    } catch(error: any) {
        const {errorResponse, status} = errorModel(error);
        console.log("this");
        console.log(errorResponse);
        if(errorResponse === undefined) {
            console.log("network error");
        } else if(errorResponse["email_duplicate"].length != 0) {
            console.log(errorResponse["email_duplicate"])
        }

    }
    
}