import { ApiEnum } from "../../type/enum/api/ApiEnum";
import { customAxios } from "../AxiosViewModel";

export const demoModel = async () => {
    try {
        const response = await customAxios().get(ApiEnum.demoController);
        console.log(response.data);
    } catch(error) {
        console.log(error);
    }
}