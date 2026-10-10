interface VehiclesProps {
  onBack: () => void;
}

function Vehicles({ onBack }: VehiclesProps) {
  return (
    <div className="vehicles-page">

      {/* Back Button */}
      <button className="back-btn" onClick={onBack}>
        ← Back to Home
      </button>

      {/* Header */}
      <div className="vehicles-header">
        <span className="section-tag">EXPLORE VEHICLES</span>

        <h1>Find Your Perfect Vehicle</h1>

        <p>
          Search and discover vehicles that match your needs.
        </p>
      </div>

      {/* Search Section */}
      <div className="vehicle-search">

        <input
          type="text"
          placeholder="Search by brand or model..."
        />

        <select defaultValue="">
          <option value="" disabled>
            Fuel Type
          </option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>

        <select defaultValue="">
          <option value="" disabled>
            Budget
          </option>
          <option value="under10">Under ₹10 Lakh</option>
          <option value="10-25">₹10–25 Lakh</option>
          <option value="25-50">₹25–50 Lakh</option>
          <option value="50+">Above ₹50 Lakh</option>
        </select>

        <button className="primary-btn">
          Search
        </button>

      </div>

      {/* Vehicle Cards */}
      <div className="vehicle-grid">

        {/* BMW */}
        <div className="vehicle-card">
          <div className="vehicle-image">
            🚗
          </div>

          <div className="vehicle-info">
            <span>FEATURED</span>

            <h2>BMW 3 Series</h2>

            <p>2023 • Petrol • Automatic</p>

            <h3>₹42.5 Lakh</h3>

            <button className="secondary-btn">
              View Details
            </button>
          </div>
        </div>

        {/* Hyundai */}
        <div className="vehicle-card">
          <div className="vehicle-image">
            🚙
          </div>

          <div className="vehicle-info">
            <span>POPULAR</span>

            <h2>Hyundai Creta</h2>

            <p>2022 • Petrol • Automatic</p>

            <h3>₹18.5 Lakh</h3>

            <button className="secondary-btn">
              View Details
            </button>
          </div>
        </div>

        {/* Tata */}
        <div className="vehicle-card">
          <div className="vehicle-image">
            🚘
          </div>

          <div className="vehicle-info">
            <span>NEW LISTING</span>

            <h2>Tata Nexon EV</h2>

            <p>2024 • Electric • Automatic</p>

            <h3>₹16.8 Lakh</h3>

            <button className="secondary-btn">
              View Details
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Vehicles;