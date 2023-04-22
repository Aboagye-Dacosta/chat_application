let errorMessages = {
  required: "{{field}} is required",
  invalid: "{{field}} is invalid",
  match: "{{field}} do not match {{field2}}",
  min: "{{field}} must be at least {{field2}} characters",
  max: "{{field}} must be at most {{field2}} characters",
  number: "{{field}} cannot begin with a number",
};

const getErrorMessage = (msgType, field, field2) => {
  let msg = errorMessages[msgType];
  msg = msg.replace("{{field}}", field);
  if (field2) msg = msg.replace("{{field2}}", field2);
  return msg;
};

export default function validateInput(dataObj) {
  const { username, email, password, confirmPassword } = dataObj;
  const errors = {
    username: [],
    email: [],
    password: [],
    confirmPassword: [],
    hasError: false,
  };

  const handleSetError = (fieldName, type, val) => {
    errors.hasError = true;
    errors[fieldName].push(getErrorMessage(type, fieldName, val));
  };

  const getMinLengthErrorMsg = (fieldName, val) =>
    handleSetError(fieldName, "min", val);
  const getMaxLengthErrorMsg = (fieldName, val) =>
    handleSetError(fieldName, "max", val);

  const getRequiredErrorMsg = (fieldName) =>
    handleSetError(fieldName, "required");

  const getBeginWithNumErrorMsg = (fieldName) =>
    handleSetError(fieldName, "number");

  const getMatchErrorMsg = (fieldOne, fieldTwo) =>
    handleSetError(fieldOne, "match", fieldTwo);

  //username
  if (!username) getRequiredErrorMsg("username");
  if (username?.length < 3) getMinLengthErrorMsg("username", 3);
  if (username.match(/^[0-9]/)) getBeginWithNumErrorMsg("username");

  //  email
  if (!email) getRequiredErrorMsg("email");

  //password
  if (!password) getRequiredErrorMsg("password");
  if (password?.length < 8) getMinLengthErrorMsg("password", 8);
  if (password.length > 16) getMaxLengthErrorMsg("password", 16);

  //confirmPassword
  if (password !== confirmPassword)
    getMatchErrorMsg("confirmPassword", "password");

  return errors;
}
