import React from "react";
interface SignupProps {
  onSignup: () => void;
}

function Signup({ onSignup }: SignupProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignup();
  };

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
            <h1>Create Your Account</h1>
            <p>
              Join AutoMartX and discover smarter vehicle buying.
            </p>
          </div>
        </div>

        {/* Signup Card */}
        <div className="login-card">
          <h2>Create Account</h2>

          <p className="subtitle">
            Create your AutoMartX account
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Create Account
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="signup">
            Already have an account?
            <button
              type="button"
              className="link-button"
              onClick={onSignup}
            >
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;