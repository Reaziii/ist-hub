import { toast } from "react-toastify";

const handleToast = (resp: { success: boolean, msg?: string }) => {
    if (resp.success) {
        return toast.success(resp.msg ?? "Request successfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    return toast.error(resp.msg ?? "Request successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

export default handleToast;