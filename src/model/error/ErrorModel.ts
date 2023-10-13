import axios, { AxiosError } from "axios";

interface ErrorModelResult {
    errorResponse?: any;
    status?: number;
    request?: any;
    message?: string;
}

export const errorModel =  (error: AxiosError<any>): ErrorModelResult => {
    if (axios.isAxiosError(error)) {
        // 이제 error는 AxiosError 타입으로 간주됩니다.
        // console.error(error); // 에러 출력
        if (error.response) {
            // 서버에서 응답이 왔다면, 여기서 확인 가능합니다.
            const errorResponse = error.response.data["errors"];
            const status: number = error.response.status;

            return {errorResponse, status }
        } else if (error.request) {
            // 요청이 만들어졌지만, 응답을 받지 못했다면 error.request에서 확인 가능합니다.
            // console.log(error.request);
            return {request: error.request}
        } else {
            // // 그 외의 오류를 잡습니다.
            // console.log('Error', error.message);
            return {message: error.message}
        }
    } else {
      // axios 관련 오류가 아닌 경우
    //   console.error('An unexpected error occurred:', error);
      return {message: "An unexpected error occurred"}
    }
}