import { useCallback, useRef, useState } from "react";
import { httpLoginUser } from "./fetchData";
import { toast } from "react-toastify";

export default function useLogin() {
  let hasErrors = useRef(false);
  const [formErrors, setFormErrors] = useState({
    username: null,
    password: null,
  });
  const [userData, setUserData] = useState({
    message: "unauthorized",
    status: false,
  });

  const handleForm = useCallback(
    (e) => {
      e.preventDefault();
      hasErrors = false;
      setFormErrors({
        username: null,
        password: null,
      });

      const form = new FormData(e.target);
      const data = Object.fromEntries(form);

      if (!data["username"]) {
        hasErrors = true;
        setFormErrors((formError) => ({
          ...formError,
          username: "User name is required",
        }));
      }

      if (!data["password"]) {
        hasErrors = true;
        setFormErrors((formError) => ({
          ...formError,
          password: "User password is required",
        }));
      }

      if (!hasErrors) {
        httpLoginUser(data).then((results) => {
          setUserData(results);

          if (!results.status) {
            toast.error(
              "Authentication failed. Incorrect username or password",
              {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }
        });
      }
    },
    [userData, formErrors]
  );

  return {
    handleForm,
    formErrors,
    userData,
  };
}
