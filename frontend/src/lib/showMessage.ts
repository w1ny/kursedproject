import { toast } from "react-toastify";

export const showMessage = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
	toast[type](message, { position: "top-right" });
};
