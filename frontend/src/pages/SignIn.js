import React, { useState } from "react"
import axios from "axios";

export default function SignIn() {

  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleLoginMethod = () => {
    setShowLogin((prev) => !prev);
    setFormData({
      email: "", phone: "", password: ""
    })
    setError("");
    setSuccess("");
  }

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const endPoint = showLogin
        ? "http://localhost:8000/api/user/login/email"
        : "http://localhost:8000/api/user/login/phone"
        ;

      const payload = showLogin
        ? { email: formData.email, password: formData.password }
        : { phone: formData.phone, password: formData.password }
        ;

      const response = await axios.post(endPoint, payload);
      setSuccess("Login Successfull!!!");

    } catch (err) {
      setError(err.response?.data?.message || 'Error during Login');
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {showLogin ? "Login With Email" : "Login with Phone Number"}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
            {showLogin ? (
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChnage}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    required
                    autoComplete="number"
                    value={formData.phone}
                    onChange={handleChnage}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            )}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <button className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChnage}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login in
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p> }
          {success && <p className="mt-4 text-center text-sm text-green-600">{success}</p> }

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {showLogin ? (
              <>
                login with Phone?{' '}
                <button onClick={toggleLoginMethod} type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  try now
                </button>
              </>
            ) : (
              <>
                login with Email?{' '}
                <button onClick={toggleLoginMethod} type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  try now
                </button>
              </>
            )}
          </p>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Dont have account?{' '}
            <a href="/signUp" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create new account
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
