import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            required
            minLength={3}
            type="text"
            placeholder="Username"
          />
          <input
            name="email"
            required
            minLength={5}
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            required
            minLength={3}
            type="password"
            placeholder="Password"
          />
          {error && <span>{error}</span>}
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
