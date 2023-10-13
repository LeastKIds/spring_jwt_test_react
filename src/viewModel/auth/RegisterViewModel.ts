import {RegisterInterface} from "../../type/interface/auth/RegisterInterface";
import {emailTypeCheck, passwordTypeCheck} from "./LoginViewModel";
import {registerModel} from "../../model/auth/RegisterModel";

export const registerViewModel = async (data: RegisterInterface) => {
    if (!data.firstname || data.firstname.length === 0)
        return "firstname is null";
    if (!data.lastname || data.lastname.length === 0)
        return "lastname is null";
    if (!emailTypeCheck(data.email))
        return "This is not a valid email format.";
    if (!passwordTypeCheck(data.password))
        return "this is not a valid password format."



    await registerModel(data);
}