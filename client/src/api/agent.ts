import axios, { AxiosError, AxiosResponse } from "axios";
import { NavigateFunction, Location } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5207/api/'

function hasOwnProperty<X extends {}, Y extends PropertyKey>
    (obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

export function safeGetProp(obj: any, prop: PropertyKey): any {
    return ((typeof obj === 'object')
        && (obj != null)
        && hasOwnProperty(obj, prop))
        ? obj[prop]
        : null;
}

const sleep = () => new Promise(resolve => setTimeout(resolve, 200));

export function setupInterceptors(navigate: NavigateFunction) {
    axios.interceptors.response.use(async response => {
        await sleep();
        return response
    },
        (error: AxiosError) => {
            console.log(`Intercepted ${error} 1`);
            const { data, status } = error.response!;
            console.log(`Intercepted ${error} 2`);
            const title = (
                (typeof data === 'object')
                && (data != null)
                && hasOwnProperty(data, 'title')
                && (typeof data.title === 'string'))
                ? data.title
                : 'Unknown error';
            switch (status) {
                case 400:
                    const errors = safeGetProp(data, 'errors');
                    if (errors) {
                        const modelStateErrors: string[] = [];
                        for (const key in errors) {
                            modelStateErrors.push(errors[key]);
                        }
                        throw modelStateErrors.flat();
                    }
                    toast.error(title);
                    break;
                case 401: toast.error(title);
                    break;
                case 500:
                    toast.error(title);
                    navigate('/server-error', { replace: true, state: { error: data } })
                    break;
                default:
                    break;
            }
            return Promise.reject(error)
        })
};

const responseBody = (response: AxiosResponse) => response?.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`),
}

const TestErrors = {
    get400Error: () => requests.get('Buggy/bad-request'),
    get401Error: () => requests.get('Buggy/unauthorised'),
    get404Error: () => requests.get('Buggy/not-found'),
    get500Error: () => requests.get('Buggy/server-error'),
    getValidationError: () => requests.get('Buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors,
}

export default agent;