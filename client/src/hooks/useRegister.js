import { useCallback, useState } from "react";
import validateInput from "./validate";
import { httpRegisterUser } from "./fetchData";
import { toast } from "react-toastify";

const options = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
export default function useRegister() {
  const [formErrors, setFormErrors] = useState();
  const [userData, setUserData] = useState({
    message: "unauthorized",
    status: false,
  });

  const handleForm = useCallback(
    (e) => {
      e.preventDefault();

      const form = new FormData(e.target);
      const data = Object.fromEntries(form);

      const errors = validateInput(data);
      setFormErrors(() => errors);

      if (!errors.hasError) {
        httpRegisterUser(data).then((results) => {
          setUserData(() => data);
          if (results.status) {
            toast.error("Registration successful", options);
          }
          if (!results.status) {
            toast.success(results.message, options);
          }
        });
      }
    },
    [userData]
  );

  return {
    handleForm,
    formErrors,
    userData,
  };
}
