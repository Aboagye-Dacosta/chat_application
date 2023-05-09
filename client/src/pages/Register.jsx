import ButtonComponent from "../components/ButtonComponent";
import Container from "../components/Container";
import FormComponent from "../components/FormComponent";
import InputComponent from "../components/InputComponent";
import Background from "../components/Background";

import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { httpCurrentUser } from "../hooks/fetchData";
import { ToastContainer } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const { handleForm, formErrors } = useRegister();

  const checkedAuthorized = useCallback(async () => {
    const data = await httpCurrentUser();

    const timer = setTimeout(() => {
      if (data.status && data?.user?.hasAvatar == false) {
        navigate("/profile");
      }
      clearTimeout(timer);
    }, 2000);

    if (data.status && data?.user?.hasAvatar) {
      navigate("/");
    }
  });

  const handleFormSubmit = (e) => {
    handleForm(e);
    checkedAuthorized();
  };

  useEffect(() => {
    checkedAuthorized();
  }, [checkedAuthorized]);

  return (
    <Background>
      <Container>
        <FormComponent formType="register" handleFormSubmit={handleFormSubmit}>
          <InputComponent
            title="Your username"
            name="username"
            error={formErrors?.username[0]}
          />
          <InputComponent
            title="Your email"
            type="email"
            name="email"
            error={formErrors?.email[0]}
          />
          <InputComponent
            title="Your password"
            type="password"
            name="password"
            error={formErrors?.password[0]}
          />
          <InputComponent
            title="Confirm password"
            type="password"
            name="confirmPassword"
            error={formErrors?.confirmPassword[0]}
          />
          <ButtonComponent type="submit" content="Register" />
        </FormComponent>
      </Container>
      <ToastContainer />
    </Background>
  );
}

export default Register;
