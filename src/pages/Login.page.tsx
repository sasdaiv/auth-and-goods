import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { login } from "../api/api";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({
        username: email,
        password,
        expiresInMins: 30,
      });
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <MDBContainer className="my-5 justify-content-center align-items-center d-flex">
      <MDBCard style={{ width: "400px", borderRadius: "20px" }}>
        <MDBCardBody className="d-flex flex-column">
          <div className="d-flex flex-row mt-2">
            <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: "#ff6219" }} />
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>
          <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: "1px" }}>
            Sign into your account
          </h5>

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="email"
            type="email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            type="password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="text-danger mb-4">{error}</div>}

          <MDBBtn
            className="mb-4 px-5"
            color="dark"
            size="lg"
            onClick={handleLogin}
          >
            Login
          </MDBBtn>
          <a className="small text-muted" href="#!">
            Forgot password?
          </a>
          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
            Don't have an account?{" "}
            <a href="#!" style={{ color: "#393f81" }}>
              Register here
            </a>
          </p>

          <div className="d-flex flex-row justify-content-start">
            <a href="#!" className="small text-muted me-1">
              Terms of use.
            </a>
            <a href="#!" className="small text-muted">
              Privacy policy
            </a>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoginPage;
