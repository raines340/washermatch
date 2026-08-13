import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const products = [
  {
    id: "ryobi-2900-gas",
    brand: "RYOBI",
    model: "2900 PSI Gas Pressure Washer",
    price: 259,
    psi: 2900,
    gpm: 2.5,
    power: "gas",
    portability: 3,
    jobs: ["driveway", "house", "deck", "patio", "commercial"],
    duty: "heavy",
    value: 9,
    retailer: "Home Depot",
    url: "https://www.homedepot.com/"
  },
  {
    id: "westinghouse-3000-gas",
    brand: "Westinghouse",
    model: "WPX3000 Gas Pressure Washer",
    price: 299,
    psi: 3000,
    gpm: 2.3,
    power: "gas",
    portability: 3,
    jobs: ["driveway", "house", "deck", "patio", "commercial"],
    duty: "heavy",
    value: 9,
    retailer: "Lowe's",
    url: "https://www.lowes.com/"
  },
  {
    id: "greenworks-3000",
    brand: "Greenworks",
    model: "3000 PSI Pressure Washer",
    price: 399,
    psi: 3000,
    gpm: 2.0,
    power: "electric",
    portability: 4,
    jobs: ["driveway", "house", "deck", "patio"],
    duty: "medium",
    value: 8,
    retailer: "Lowe's",
    url: "https://www.lowes.com/"
  },
  {
    id: "ryobi-3000-electric",
    brand: "RYOBI",
    model: "3000 PSI Electric Pressure Washer",
    price: 429,
    psi: 3000,
    gpm: 1.1,
    power: "electric",
    portability: 3,
    jobs: ["house", "deck", "patio", "car"],
    duty: "medium",
    value: 7,
    retailer: "Home Depot",
    url: "https://www.homedepot.com/"
  },
  {
    id: "greenworks-2300",
    brand: "Greenworks",
    model: "Pro 2300 PSI Pressure Washer",
    price: 249,
    psi: 2300,
    gpm: 2.3,
    power: "electric",
    portability: 4,
    jobs: ["house", "deck", "patio", "car", "driveway"],
    duty: "medium",
    value: 9,
    retailer: "Lowe's",
    url: "https://www.lowes.com/"
  },
  {
    id: "westinghouse-3000e",
    brand: "Westinghouse",
    model: "WPX3000e Electric Pressure Washer",
    price: 279,
    psi: 3000,
    gpm: 1.76,
    power: "electric",
    portability: 4,
    jobs: ["house", "deck", "patio", "car", "driveway"],
    duty: "medium",
    value: 9,
    retailer: "Lowe's",
    url: "https://www.lowes.com/"
  },
  {
    id: "ryobi-2100",
    brand: "RYOBI",
    model: "2100 PSI Electric Pressure Washer",
    price: 199,
    psi: 2100,
    gpm: 1.2,
    power: "electric",
    portability: 5,
    jobs: ["car", "house", "deck", "patio"],
    duty: "light",
    value: 9,
    retailer: "Home Depot",
    url: "https://www.homedepot.com/"
  },
  {
    id: "greenworks-2000",
    brand: "Greenworks",
    model: "2000 PSI Electric Pressure Washer",
    price: 180,
    psi: 2000,
    gpm: 1.2,
    power: "electric",
    portability: 5,
    jobs: ["car", "house", "deck", "patio"],
    duty: "light",
    value: 9,
    retailer: "Lowe's",
    url: "https://www.lowes.com/"
  },
  {
    id: "westinghouse-2100",
    brand: "Westinghouse",
    model: "ePX3050 2100 PSI Electric Pressure Washer",
    price: 109,
    psi: 2100,
    gpm: 1.76,
    power: "electric",
    portability: 5,
    jobs: ["car", "house", "deck", "patio"],
    duty: "light",
    value: 10,
    retailer: "Lowe's",
    url: "https://www.lowes.com/"
  }
];

const jobs = {
  car: {
    label: "Car / vehicle",
    psi: 1800,
    gpm: 1.2,
    duty: "light"
  },
  house: {
    label: "House siding",
    psi: 2200,
    gpm: 1.5,
    duty: "medium"
  },
  deck: {
    label: "Deck",
    psi: 2200,
    gpm: 1.5,
    duty: "medium"
  },
  patio: {
    label: "Patio",
    psi: 2400,
    gpm: 1.7,
    duty: "medium"
  },
  driveway: {
    label: "Concrete driveway",
    psi: 2800,
    gpm: 2.0,
    duty: "heavy"
  },
  commercial: {
    label: "Heavy / commercial work",
    psi: 3000,
    gpm: 2.5,
    duty: "heavy"
  }
};

function scoreProduct(product, answers) {
  const job = jobs[answers.job];

  const budget =
    answers.budget === "under200"
      ? 200
      : answers.budget === "200to350"
      ? 350
      : answers.budget === "350to500"
      ? 500
      : 1000;

  let score = 0;
  const reasons = [];

  const pressureScore = Math.min(12.5, (product.psi / job.psi) * 12.5);
  const flowScore = Math.min(12.5, (product.gpm / job.gpm) * 12.5);

  score += pressureScore + flowScore;

  if (product.psi >= job.psi * 0.9) {
    reasons.push("Meets the pressure target for your job.");
  }

  if (product.gpm >= job.gpm * 0.9) {
    reasons.push("Has strong water flow for efficient cleaning.");
  }

  const budgetScore =
    25 -
    (Math.abs(product.price - budget / 1.2) /
      Math.max(50, budget)) *
      25;

  score += Math.max(0, budgetScore);

  if (product.price <= budget) {
    score += 10;
    reasons.push("Fits within your stated budget.");
  } else {
    score -= 10;
  }

  if (answers.power === "any" || product.power === answers.power) {
    score += 15;

    if (answers.power === "any") {
      reasons.push("Power source is flexible.");
    } else {
      reasons.push(`Matches your ${answers.power} preference.`);
    }
  } else {
    score -= 12;
  }

  score += product.portability * 3;

  if (answers.frequency === "often" && product.duty === "heavy") {
    score += 8;
    reasons.push("Better suited to frequent/heavy use.");
  }

  if (answers.frequency === "rare" && product.duty === "light") {
    score += 6;
    reasons.push("Well suited to occasional use.");
  }

  if (product.jobs.includes(answers.job)) {
    score += 8;
    reasons.push(`Designed to handle ${job.label.toLowerCase()}.`);
  }

  score += product.value;

  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    reasons
  };
}

function App() {
  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({
    job: "driveway",
    budget: "200to350",
    power: "any",
    frequency: "monthly"
  });

  const results = useMemo(() => {
    return products
      .map((product) => ({
        ...product,
        ...scoreProduct(product, answers)
      }))
      .sort((a, b) => b.score - a.score);
  }, [answers]);

  const questions = [
    {
      title: "What are you cleaning?",
      key: "job",
      choices: [
        ["car", "Car / vehicle"],
        ["house", "House siding"],
        ["deck", "Deck"],
        ["patio", "Patio"],
        ["driveway", "Concrete driveway"],
        ["commercial", "Heavy / commercial work"]
      ]
    },
    {
      title: "What is your budget?",
      key: "budget",
      choices: [
        ["under200", "Under $200"],
        ["200to350", "$200–$350"],
        ["350to500", "$350–$500"],
        ["over500", "$500+"]
      ]
    },
    {
      title: "Which power source do you prefer?",
      key: "power",
      choices: [
        ["any", "No preference"],
        ["electric", "Electric"],
        ["gas", "Gas"]
      ]
    },
    {
      title: "How often will you use it?",
      key: "frequency",
      choices: [
        ["rare", "Occasionally"],
        ["monthly", "Monthly"],
        ["often", "Frequently / heavy use"]
      ]
    }
  ];

  if (step < questions.length) {
    const question = questions[step];

    return (
      <div>
        <Header />

        <main>
          <section className="card">
            <div className="progress">
              Step {step + 1} of {questions.length}
            </div>

            <h1>{question.title}</h1>

            <div className="choices">
              {question.choices.map(([value, label]) => (
                <button
                  key={value}
                  className={
                    answers[question.key] === value ? "selected" : ""
                  }
                  onClick={() => {
                    setAnswers({
                      ...answers,
                      [question.key]: value
                    });

                    setStep(step + 1);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  const best = results[0];

  return (
    <div>
      <Header />

      <main>
        <section className="card hero">
          <div className="eyebrow">YOUR WASHERMATCH</div>

          <h1>
            {best.brand} {best.model}
          </h1>

          <div className="match">{best.score}% Match</div>

          <p>
            Based on your job, budget, power preference, and usage.
          </p>

          <a
            className="cta"
            href={best.url}
            target="_blank"
            rel="noreferrer"
          >
            Check Price at {best.retailer} →
          </a>
        </section>

        <h2>Other strong matches</h2>

        <div className="grid">
          {results.slice(1, 5).map((product) => (
            <article className="product" key={product.id}>
              <div className="badge">{product.score}% match</div>

              <h3>{product.brand}</h3>

              <h4>{product.model}</h4>

              <p className="price">${product.price}</p>

              <p>
                {product.psi.toLocaleString()} PSI · {product.gpm} GPM ·{" "}
                {product.power}
              </p>

              <ul>
                {product.reasons.slice(0, 3).map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>

              <a
                href={product.url}
                target="_blank"
                rel="noreferrer"
              >
                Check Price →
              </a>
            </article>
          ))}
        </div>

        <button className="restart" onClick={() => setStep(0)}>
          Start over
        </button>

        <p className="disclosure">
          WasherMatch may earn a commission when you purchase through
          qualifying links.
        </p>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="logo">
        Washer<span>Match</span>
      </div>

      <p>Find the right pressure washer for the job.</p>
    </header>
  );
}

createRoot(document.getElementById("root")).render(<App />);
