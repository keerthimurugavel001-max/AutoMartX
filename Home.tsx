interface HomeProps {
  onLogout: () => void;
  onVehicles: () => void;
}
function Home({ onLogout, onVehicles }: HomeProps) {
  return (
    <div className="home-page">

      {/* Navbar */}
      <header className="navbar">

        <div className="logo-section">
          <div className="logo-box">A</div>
          <span>AutoMartX</span>
        </div>

        <nav>
          <a href="#">Home</a>

          <button
            className="nav-link"
            onClick={onVehicles}
          >
            Vehicles
          </button>

          <a href="#">Sell Vehicle</a>
          <a href="#">About</a>
        </nav>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </header>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <span className="tagline">
            AI POWERED VEHICLE MARKETPLACE
          </span>

          <h1>
            Find Your
            <br />
            Perfect Vehicle
          </h1>

          <p>
            Buy and sell used vehicles with AI-powered
            price prediction, vehicle health analysis
            and trusted seller insights.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={onVehicles}
            >
              Explore Vehicles
            </button>

            <button className="secondary-btn">
              Sell Your Vehicle
            </button>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="features">

        <span className="section-tag">
          SMART TECHNOLOGY
        </span>

        <h2>Powerful Features</h2>

        <p className="section-description">
          Make smarter vehicle buying decisions with AI.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">₹</div>

            <h3>AI Fair Price</h3>

            <p>
              Get an estimated fair market price
              for any vehicle.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✓</div>

            <h3>Vehicle Health Score</h3>

            <p>
              Analyze vehicle condition and get
              a health score.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">★</div>

            <h3>Seller Trust Score</h3>

            <p>
              Know how trustworthy a seller is
              before buying.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⌖</div>

            <h3>Nearby Recommendations</h3>

            <p>
              Discover vehicles available near
              your location.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;