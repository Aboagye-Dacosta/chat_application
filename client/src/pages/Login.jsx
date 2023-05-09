import ButtonComponent from "../components/ButtonComponent";
import Container from "../components/Container";
import InputComponent from "../components/InputComponent";
import FormComponent from "../components/FormComponent";
import Background from "../components/Background";
import useLogin from "../hooks/useLogin";

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { httpCurrentUser } from "../hooks/fetchData";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { handleForm, formErrors, userData } = useLogin();

  const checkAuthorized = useCallback(async () => {
    const data = await httpCurrentUser();
    if (data.status) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    handleForm(e);
    checkAuthorized();
  };

  useEffect(() => {
    checkAuthorized();
  }, [userData]);

  return (
    <Background>
      <Container>
        <FormComponent formType="login" handleFormSubmit={handleSubmit}>
          <InputComponent
            title="Your username"
            name="username"
            type="text"
            error={formErrors.username}
          />
          <InputComponent
            title="Your password"
            name="password"
            type="password"
            error={formErrors.password}
          />
          <ButtonComponent content="Sign in" type="submit" />
        </FormComponent>
      </Container>
      <ToastContainer />
    </Background>
  );
}

export default Login;
