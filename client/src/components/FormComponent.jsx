import { Link } from "react-router-dom";
import IconLogo from "./icons/IconLogo";

function FormComponent({ formType, handleFormSubmit, children }) {
  return (
    <form
      onSubmit={handleFormSubmit}
      className='w-full md:w-8/12 lg:w-4/12 bg-white  px-6 pt-4 pb-8 rounded-lg shadow-sm '
    >
      <div className='flex flex-row py-0 px-3 items-center justify-center'>
        <h2 className='text-center text-[2rem]'>Chatify</h2>
        <IconLogo className='text-[2rem] text-slate-200' />
      </div>

      {children}
      <div className='text-center w-full'>
        {formType == "register"
          ? "Already have an account?"
          : "Don't have an account?"}

        <Link
          to={`/${formType == "login" ? "register" : "login"}`}
          className='my-1'
        >
          {" "}
          <span className='text-blue-800 text-sm'>
            {" "}
            {formType == "register" ? "Sign in" : "Register"}
          </span>
        </Link>
      </div>
    </form>
  );
}

export default FormComponent;
