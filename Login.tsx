import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
  onSignup: () => void;
}

function Login({ onLogin, onSignup }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Side */}
        <div className="login-left">
          <div className="brand">
            <div className="logo">A</div>
            <span>AutoMartX</span>
          </div>

          <div className="welcome">
            <p className="small-title">AI POWERED VEHICLE MARKETPLACE</p>

            <h1>
              Find Your
              <br />
              Perfect Car
            </h1>

            <p>
              Buy, sell and discover your next vehicle
              with AI-powered insights.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <h2>Welcome Back</h2>

          <p className="subtitle">
            Login to your AutoMartX account
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin();
            }}
          >
            {/* Email */}
            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <div className="password-box">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Signup */}
          <p className="signup">
            Don't have an account?

            <button
              type="button"
              className="link-button"
              onClick={onSignup}
            >
              Create Account
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;