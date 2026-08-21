import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const products = [
  {
    id: 1,
    brand: "Greenworks",
    model: "Pro 2300 PSI",
    psi: 2300,
    gpm: 2.3,
    power: "Electric",
    price: 249,
    bestFor: ["car", "siding", "deck", "patio", "driveway"],
    value: 94,
    frequency: ["few", "monthly", "weekly"],
    maintenance: "Easy",
    reliability: "High",
    retailer: "Greenworks",
    affiliateUrl: "",
    productUrl: "",
    image: "",
    description:
      "A strong all-around electric pressure washer for homeowners who want substantial cleaning power without gas-engine maintenance.",
  },
  {
    id: 2,
    brand: "Greenworks",
    model: "2500 PSI Brushless",
    psi: 2500,
    gpm: 2.3,
    power: "Electric",
    price: 349,
    bestFor: ["siding", "deck", "patio", "driveway"],
    value: 91,
    frequency: ["monthly", "weekly", "often"],
    maintenance: "Easy",
    reliability: "High",
    retailer: "Greenworks",
    affiliateUrl: "",
    productUrl: "",
    image: "",
    description:
      "A higher-powered electric option suited to tougher homeowner cleaning jobs.",
  },
  {
    id: 3,
    brand: "Westinghouse",
    model: "WPX3000e",
    psi: 3000,
    gpm: 1.76,
    power: "Electric",
    price: 279,
    bestFor: ["siding", "patio", "driveway"],
    value: 89,
    frequency: ["monthly", "weekly"],
    maintenance: "Easy",
    reliability: "Medium",
    retailer: "Westinghouse",
    affiliateUrl: "",
    productUrl: "",
    image: "",
    description:
      "High advertised PSI in an electric package designed for demanding residential cleaning.",
  },
  {
    id: 4,
    brand: "SIMPSON",
    model: "Pro Series 3700 PSI",
    psi: 3700,
    gpm: 2.5,
    power: "Gas",
    price: 679,
    bestFor: ["driveway", "commercial"],
    value: 88,
    frequency: ["weekly", "often"],
    maintenance: "Moderate",
    reliability: "High",
    retailer: "SIMPSON",
    affiliateUrl: "",
    productUrl: "",
    image: "",
    description:
      "A serious gas-powered machine for users who need substantially more cleaning capability.",
  },
  {
    id: 5,
    brand: "Westinghouse",
    model: "ePX3050",
    psi: 2100,
    gpm: 1.76,
    power: "Electric",
    price: 109,
    bestFor: ["car", "siding", "deck", "patio"],
    value: 93,
    frequency: ["few", "monthly"],
    maintenance: "Easy",
    reliability: "Medium",
    retailer: "Westinghouse",
    affiliateUrl: "",
    productUrl: "",
    image: "",
    description:
      "A budget-friendly electric option for lighter homeowner cleaning tasks.",
  },
];

const jobs = [
  ["car", "Car / Vehicle", "🚗"],
  ["siding", "House Siding", "🏠"],
  ["deck", "Deck", "🪵"],
  ["patio", "Patio", "🧱"],
  ["driveway", "Concrete / Driveway", "🚿"],
  ["commercial", "Heavy / Commercial", "🏭"],
];

const questions = [
  {
    id: "job",
    title: "What are you cleaning?",
    subtitle: "Choose the job you need the pressure washer for most.",
    type: "job",
  },
  {
    id: "budget",
    title: "What's your budget?",
    subtitle: "We'll prioritize machines that fit your price range.",
    type: "budget",
    options: [
      ["under150", "Under $150"],
      ["150to250", "$150–$250"],
      ["250to400", "$250–$400"],
      ["400to600", "$400–$600"],
      ["over600", "$600+"],
    ],
  },
  {
    id: "frequency",
    title: "How often will you use it?",
    subtitle: "This helps us balance power, durability, and value.",
    type: "frequency",
    options: [
      ["few", "A few times a year"],
      ["monthly", "About once a month"],
      ["weekly", "Weekly"],
      ["often", "Several times a week"],
    ],
  },
  {
    id: "power",
    title: "Gas or electric?",
    subtitle: "Not sure? Choose no preference.",
    type: "power",
    options: [
      ["electric", "Electric"],
      ["gas", "Gas"],
      ["either", "No preference"],
    ],
  },
  {
    id: "priority",
    title: "What's most important to you?",
    subtitle: "Pick the quality that matters most.",
    type: "priority",
    options: [
      ["price", "Lowest price"],
      ["value", "Best overall value"],
      ["power", "Maximum power"],
      ["maintenance", "Easy maintenance"],
      ["reliability", "Reliability"],
    ],
  },
];

function scoreProduct(product, answers) {
  let score = 50;

  if (answers.job && product.bestFor.includes(answers.job)) {
    score += 20;
  } else if (answers.job) {
    score -= 5;
  }

  const budget = answers.budget;

  if (budget === "under150" && product.price < 150) {
    score += 15;
  }

  if (
    budget === "150to250" &&
    product.price >= 150 &&
    product.price <= 250
  ) {
    score += 15;
  }

  if (
    budget === "250to400" &&
    product.price > 250 &&
    product.price <= 400
  ) {
    score += 15;
  }

  if (
    budget === "400to600" &&
    product.price > 400 &&
    product.price <= 600
  ) {
    score += 15;
  }

  if (budget === "over600" && product.price > 600) {
    score += 15;
  }

  if (answers.power === "electric" && product.power === "Electric") {
    score += 8;
  }

  if (answers.power === "gas" && product.power === "Gas") {
    score += 8;
  }

  if (answers.power === "either") {
    score += 4;
  }

  if (answers.priority === "price") {
    if (product.price < 150) score += 10;
    else if (product.price < 250) score += 6;
  }

  if (answers.priority === "value") {
    score += Math.round(product.value / 10);
  }

  if (answers.priority === "power") {
    score += Math.min(12, Math.round(product.psi / 350));
  }

  if (answers.priority === "maintenance") {
    if (product.maintenance === "Easy") score += 10;
    if (product.power === "Electric") score += 4;
  }

  if (answers.priority === "reliability") {
    if (product.reliability === "High") score += 10;
    if (product.reliability === "Medium") score += 5;
  }

  if (answers.frequency && product.frequency.includes(answers.frequency)) {
    score += 8;
  }

  if (
    (answers.frequency === "weekly" || answers.frequency === "often") &&
    product.psi >= 2500
  ) {
    score += 5;
  }

  if (answers.frequency === "few" && product.price < 300) {
    score += 5;
  }

  return Math.max(1, Math.min(99, score));
}

function Disclosure() {
  return (
    <div className="disclosure">
      <strong>Disclosure:</strong> WasherMatch may earn a commission when you
      purchase products through some links on this website. This does not
      increase the price you pay.
    </div>
  );
}

function Header({ onQuiz }) {
  return (
    <header className="header">
      <div className="nav">
        <div className="logo">
          Washer<span>Match</span>
        </div>

        <nav>
          <button onClick={onQuiz}>Find My Washer</button>
          <a href="#guides">Buying Guides</a>
          <a href="#about">About</a>
        </nav>
      </div>
    </header>
  );
}

function Home({ onQuiz }) {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">SMART PRESSURE WASHER MATCHING</div>

            <h1>
              Find the right
              <br />
              <span>pressure washer.</span>
            </h1>

            <p>
              Tell WasherMatch what you're cleaning, your budget, and what
              matters most. We'll narrow down the choices and show you the
              machines that best fit your needs.
            </p>

            <button className="primary-button" onClick={onQuiz}>
              Find My Pressure Washer →
            </button>

            <div className="hero-note">
              Takes about 60 seconds • No account required
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-icon">💦</div>
            <div className="hero-card-title">Don't shop by PSI alone.</div>
            <p>
              The right pressure washer depends on the job, water flow,
              budget, frequency of use, and the type of power you want.
            </p>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="section-heading">
          <div className="eyebrow">HOW IT WORKS</div>
          <h2>Stop guessing. Start with the job.</h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Tell us what you're cleaning</h3>
            <p>Cars, siding, decks, patios, driveways, or heavier work.</p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Tell us what you need</h3>
            <p>
              Your budget, frequency of use, power preference, and priorities.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Get your matches</h3>
            <p>See which machines best fit your particular situation.</p>
          </div>
        </div>
      </section>

      <section className="jobs-section">
        <div className="section-heading">
          <div className="eyebrow">POPULAR JOBS</div>
          <h2>What are you cleaning?</h2>
        </div>

        <div className="job-grid">
          {jobs.map(([id, label, icon]) => (
            <button
              className="job-card"
              key={id}
              onClick={onQuiz}
            >
              <span>{icon}</span>
              <strong>{label}</strong>
              <small>Find your match →</small>
            </button>
          ))}
        </div>
      </section>

      <section className="guides-section" id="guides">
        <div className="section-heading">
          <div className="eyebrow">PRESSURE WASHER 101</div>
          <h2>Know what you're buying.</h2>
        </div>

        <div className="guide-grid">
          <article>
            <span>01</span>
            <h3>PSI vs. GPM</h3>
            <p>
              Why pressure isn't the only number that matters when comparing
              machines.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Gas vs. Electric</h3>
            <p>
              Understand the practical differences before spending your
              money.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>What PSI do I need?</h3>
            <p>
              Match cleaning power to the surface instead of automatically
              buying the biggest machine.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

function Quiz({ answers, setAnswers, onComplete }) {
  const [step, setStep] = useState(0);
  const question = questions[step];

  const choose = (value) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);

    if (step === questions.length - 1) {
      onComplete(next);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <section className="quiz-section">
      <div className="quiz-container">
        <div className="quiz-progress">
          <span>
            Step {step + 1} of {questions.length}
          </span>

          <div className="progress-track">
            <div
              className="progress-bar"
              style={{
                width: `${((step + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="quiz-question">
          <div className="eyebrow">WASHERMATCH QUIZ</div>
          <h1>{question.title}</h1>
          <p>{question.subtitle}</p>
        </div>

        {question.type === "job" ? (
          <div className="quiz-grid">
            {jobs.map(([id, label, icon]) => (
              <button
                key={id}
                className="quiz-option"
                onClick={() => choose(id)}
              >
                <span className="option-icon">{icon}</span>
                <strong>{label}</strong>
              </button>
            ))}
          </div>
        ) : (
          <div className="quiz-options">
            {question.options.map(([id, label]) => (
              <button
                key={id}
                className="quiz-option-wide"
                onClick={() => choose(id)}
              >
                {label}
                <span>→</span>
              </button>
            ))}
          </div>
        )}

        {step > 0 && (
          <button
            className="back-button"
            onClick={() => setStep(step - 1)}
          >
            ← Back
          </button>
        )}
      </div>
    </section>
  );
}

function Results({ answers, onRestart }) {
  const results = products
    .map((product) => ({
      ...product,
      match: scoreProduct(product, answers),
    }))
    .sort((a, b) => b.match - a.match);

  const winner = results[0];

  const openProduct = (product) => {
    const url = product.affiliateUrl || product.productUrl;

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="results-section">
      <div className="results-container">
        <Disclosure />

        <div className="results-heading">
          <div className="eyebrow">YOUR WASHERMATCH RESULTS</div>
          <h1>We found your best matches.</h1>
          <p>
            Based on the information you provided, these machines are the
            strongest fits for your needs.
          </p>
        </div>

        <div className="winner-card">
          <div className="winner-badge">🏆 BEST MATCH</div>

          <div className="winner-content">
            <div className="match-score">
              <strong>{winner.match}%</strong>
              <span>Match</span>
            </div>

            <div className="winner-info">
              <div className="product-brand">{winner.brand}</div>
              <h2>{winner.model}</h2>

              <p>{winner.description}</p>

              <div className="spec-row">
                <div>
                  <span>PSI</span>
                  <strong>{winner.psi.toLocaleString()}</strong>
                </div>

                <div>
                  <span>GPM</span>
                  <strong>{winner.gpm}</strong>
                </div>

                <div>
                  <span>Power</span>
                  <strong>{winner.power}</strong>
                </div>

                <div>
                  <span>Price</span>
                  <strong>~${winner.price}</strong>
                </div>
              </div>

              <button
                className="primary-button"
                onClick={() => openProduct(winner)}
                disabled={!winner.affiliateUrl && !winner.productUrl}
              >
                Check Current Price →
              </button>
            </div>
          </div>
        </div>

        <h2 className="alternatives-title">Other strong matches</h2>

        <div className="product-grid">
          {results.slice(1, 4).map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-match">
                {product.match}% Match
              </div>

              <div className="product-brand">{product.brand}</div>

              <h3>{product.model}</h3>

              <p>{product.description}</p>

              <div className="mini-specs">
                <span>{product.psi.toLocaleString()} PSI</span>
                <span>{product.gpm} GPM</span>
                <span>{product.power}</span>
              </div>

              <div className="product-bottom">
                <strong>~${product.price}</strong>

                <button
                  onClick={() => openProduct(product)}
                  disabled={!product.affiliateUrl && !product.productUrl}
                >
                  View →
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="restart">
          <button onClick={onRestart}>← Start Over</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="about">
      <div>
        <div className="logo">
          Washer<span>Match</span>
        </div>

        <p>
          Helping you find the right pressure washer for the job.
        </p>
      </div>

      <div className="footer-links">
        <a href="#guides">Buying Guides</a>
        <a href="#about">About</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} WasherMatch. All rights reserved.
      </div>
    </footer>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [answers, setAnswers] = useState({});

  const startQuiz = () => setPage("quiz");

  const completeQuiz = (finalAnswers) => {
    setAnswers(finalAnswers);
    setPage("results");
  };

  const restart = () => {
    setAnswers({});
    setPage("quiz");
  };

  return (
    <div className="app">
      <Header onQuiz={startQuiz} />

      {page === "home" && <Home onQuiz={startQuiz} />}

      {page === "quiz" && (
        <Quiz
          answers={answers}
          setAnswers={setAnswers}
          onComplete={completeQuiz}
        />
      )}

      {page === "results" && (
        <Results answers={answers} onRestart={restart} />
      )}

      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
