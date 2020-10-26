import { IAuthResult, IUserFormValues } from "../models/user";
// @ts-ignore
import FetchInterceptor from 'fetch-interceptor';
//import fetchIntercept from 'fetch-intercept';
import * as Toast from "../common/components/AppToast";
// @ts-ignore
import cpFetch from "cp-fetch"; // npm package

interface IResponse extends Response {
    message?: string;
    data?: any;
    config?: any;
}

export class PWService {
    _apiBase: string = 'http://192.168.1.82:3001';

    constructor() {
       FetchInterceptor.register({
            onBeforeRequest(request: any, controller: AbortController) {
                console.log("[controller/setTimeout]", controller.signal.aborted);
                // 5 second timeout:

            },
            onRequestSuccess(response: IResponse, request: any, controller: any) {

                // Hook on response success
                const test = response;
                const test2 = request;
                console.log("[onRequestSuccess/response]", JSON.stringify(response, null, 4));
                console.log("[onRequestSuccess/request]", JSON.stringify(request, null, 4));
            },
            onRequestFailure(response: IResponse, request: any, controller: any) {
                controller.abort();
                console.log("[onRequestFailure/response]", JSON.stringify(response, null, 4));
                console.log("[onRequestFailure/request]", JSON.stringify(request, null, 4));
                // Hook on response failure
                const { status, data, config,  headers } = response;

                if (response.message === 'Network Error') {
                    Toast.ErrorToast('Network error - make sure API is running!');
                }

                if (status === 401 &&
                    headers.get('www-authenticate') === 'Bearer error="invalid_token", error_description="The token is expired"'
                ) {
                    //window.localStorage.removeItem('jwt');
                    //history.push('/');
                    Toast.InfoToast('Your session has expired, please login again');
                }

                if (status === 500) {
                    Toast.InfoToast('Server error - check the terminal for more info!');
                }
            }
        });
    }

    /* static async onRequestFailure(reponse: any, request, controller): Promise<void> {

    } */

    async get(url: string): Promise<any> {
        const res = await fetch(
            `${this._apiBase}${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
        );
        return await res.json();
    }

    async post(url: string, body: object): Promise<any> {
        
        const res = await fetch(
            `${this._apiBase}${url}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            },
        );
        const json = await res.json();

        console.log("PWService/post/json res", {json})
        
        if (json.error) { throw json }

        return json;
    }

    async postTimeout(url: string, body: object): Promise<any> {
        try {
            const fetchPromise =  await cpFetch(
                `${this._apiBase}${url}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                    timeout: 4000
                },
            );
    
            return await fetchPromise.json();
        } catch (error) {
            console.log("[PWService/postTimeout/cacth", {error});
            if (error.name && error.name === "CanceledError") {
                Toast.ErrorToast("Error SErver");
            }
            throw error;
        }   
       
    }
}

export class UserService extends PWService {
    public login = async (user: IUserFormValues): Promise<IAuthResult> => {
        return this.post(`/sessions/create`, user)
    }
}

/*  const timeoutId = setTimeout(() => {
    console.log("[controller/setTimeout]", controller.signal.aborted);

    if (!controller.signal.aborted) {
        controller.abort();
        //console.log("[onBeforeRequest/request]", JSON.stringify(request, null, 4));

        const response: IResponse = new Response({
            init: { status: 500, statusText: "Network Error" },
            message: "Network error"
        })
        response.message = "Network Error";

        return this.onRequestFailure(response, request, controller);
    }
}, 5000);
*/

// Hook before request
//throw Error("NetworError");