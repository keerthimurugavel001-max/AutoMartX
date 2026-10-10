interface SellVehicleProps {
  onBack: () => void;
}

function SellVehicle({ onBack }: SellVehicleProps) {
  return (
    <div className="page-container">
      <button onClick={onBack}>← Back to Home</button>

      <h1>Sell Your Vehicle</h1>
      <p>List your used vehicle on AutoMartX.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Vehicle form submitted!");
        }}
      >
        <input placeholder="Vehicle Brand" required />
        <input placeholder="Vehicle Model" required />
        <input type="number" placeholder="Manufacturing Year" required />
        <input type="number" placeholder="Expected Price (₹)" required />
        <button type="submit">Submit Vehicle</button>
      </form>
    </div>
  );
}

export default SellVehicle;