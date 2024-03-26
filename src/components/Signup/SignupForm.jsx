import { useRef, useState } from "react";
import ValidateForm from "../utils/ValidateForm";
import StrongPassword from "../utils/StrongPassword";
import useApi from "../../hooks/useApi";

function SignupForm() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [strongPassError, setStrongPassError] = useState(false);

  const FormValidation = () => {
    ValidateForm(
      passwordRef,
      confirmPasswordRef,
      passwordError,
      setPasswordError,
      usernameRef,
      usernameError,
      setUsernameError
    );
  };

  const handleFormValidationChange = () => {
    FormValidation();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    FormValidation();
    StrongPassword(passwordRef, strongPassError, setStrongPassError);
    if (!passwordError && !usernameError && !strongPassError) {
      const payload = {
        username,
        password,
      };
      const { data, loading, error, sendRequest } = useApi(
        "POST",
        "/account/signup",
        payload
      );
      sendRequest();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mt-6">
        <input
          name="username"
          id="username"
          placeholder="Username"
          ref={usernameRef}
          onChange={handleFormValidationChange}
          className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
          autoComplete="NA"
        />
        <label
          htmlFor="username"
          className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
        >
          Username
        </label>
        {usernameError && (
          <div className="text-red-500 text-sm mt-2">{usernameError}</div>
        )}
      </div>
      <div className="relative mt-6">
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          onChange={handleFormValidationChange}
          placeholder="Password"
          className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
        />
        <label
          htmlFor="password"
          className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
        >
          Password
        </label>
      </div>
      <div className="relative mt-6">
        <input
          type="password"
          name="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          onChange={handleFormValidationChange}
          placeholder="Confirm Password"
          className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
        />
        <label
          htmlFor="confirmPassword"
          className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
        >
          Confirm Password
        </label>
      </div>
      {strongPassError && (
        <div>
          <div className="text-red-500 text-sm mt-2">
            Password must be 6 characters long
          </div>
          <div className="text-red-500 text-sm mt-2">
            Password must have at least 1 uppercase letter, 1 lowercase letter,
            and 1 number
          </div>
          <div className="text-red-500 text-sm mt-2">
            Password must have at least 1 of the following symbols "!@#$%&"
          </div>
        </div>
      )}
      {passwordError && (
        <div className="text-red-500 text-sm mt-2">{passwordError}</div>
      )}
      <div className="my-12 flex justify-center">
        <button
          type="submit"
          className="w-11/12 bg-blue-800 rounded-full p-1.5 text-white hover:bg-blue-900"
        >
          Sign Up
        </button>
      </div>
      <div className="flex text-center text-sm text-gray-500">
        <p>Already have an account?</p>
        <a
          href="/#"
          className="ml-1 font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
        >
          Login here
        </a>
        .
      </div>
    </form>
  );
}

export default SignupForm;
