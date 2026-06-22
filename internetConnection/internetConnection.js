
import { toast } from "react-toastify"

export const isInternetConnected = (router) => {
    if (!navigator.onLine) {
        toast.dismiss();
        // alert("no internet connection")
        toast.error('Please check your internet connection.', { toastId: "est" }, {
            position: toast.POSITION.TOP_RIGHT
        });
        // localStorage.removeItem('token');
        // history.push('/')
    }
    return navigator.onLine;
}