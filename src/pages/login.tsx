import { api } from "@/api/axios";
import { useAuthContext } from "@/contexts/auth";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthSession } = useAuthContext();

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/login", { email, password });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      setAuthSession({
        token: data.token,
        role: data.role,
        name: data.name,
      });

      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data.role === "NURSE") {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Backend Error Data:", error.response?.data);
        console.error("Backend Status Code:", error.response?.status);
      }
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary font-inter">
      <form
        onSubmit={handleLoginSubmit}
        className="w-full max-w-md bg-primary p-10 rounded-md shadow-md text-white"
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-4 text-center">
            School Clinic Management System
          </h2>
        </div>
        <div className="p-5">
          <label className="text-base font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@gmail.com"
            className="w-full border p-2 mb-3 rounded mt-1"
            required
          />
          <label className="text-base font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full border p-2 mb-4 rounded mt-1"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-900 text-white py-2 rounded font-semibold mt-4"
          >
            Log In
          </button>
        </div>
        <div className="text-center text-sm">
          <h6>Admin email: admin@gmail.com</h6>
          <h6>Admin password: admin123</h6>
        </div>
      </form>
    </div>
  );
};

export default Login;
