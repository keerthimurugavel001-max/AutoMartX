interface AboutProps {
  onBack: () => void;
}

function About({ onBack }: AboutProps) {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>About AutoMartX</h1>
      <p>
        AutoMartX is an AI-powered used vehicle marketplace
        designed to make buying and selling vehicles easier.
      </p>
      <p>
        Our goal is to help buyers discover vehicles with
        transparent pricing and trusted seller information.
      </p>
      <button onClick={onBack}>Back to Home</button>
    </div>
  );
}

export default About;