import { useState } from 'react';
import './index.css';
import { questions, traitDescriptions, traitColors } from './data/questions';
import { jsPDF } from 'jspdf';

// Background Animation Component
function BackgroundAnimation() {
  return (
    <div className="bg-animation">
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
    </div>
  );
}

// Header Component
function Header({ currentSection, onNavigate }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="HEXACO Logo" className="logo" />
      </div>
      <nav className="nav">
        <button
          className={`nav-link ${currentSection === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          Home
        </button>
        <button
          className={`nav-link ${currentSection === 'test' || currentSection === 'userInfo' ? 'active' : ''}`}
          onClick={() => onNavigate('userInfo')}
        >
          Take Test
        </button>
        <button
          className={`nav-link ${currentSection === 'about' ? 'active' : ''}`}
          onClick={() => onNavigate('about')}
        >
          About
        </button>
      </nav>
    </header>
  );
}

// Personality Wheel Component
function PersonalityWheel() {
  const segments = [
    { letter: 'H', color: '#3663AD', rotation: 0 },
    { letter: 'E', color: '#25BCBD', rotation: 60 },
    { letter: 'X', color: '#160E44', rotation: 120 },
    { letter: 'A', color: '#3663AD', rotation: 180 },
    { letter: 'C', color: '#25BCBD', rotation: 240 },
    { letter: 'O', color: '#160E44', rotation: 300 },
  ];

  return (
    <div className="personality-wheel">
      {segments.map((seg) => (
        <div
          key={seg.letter}
          className="wheel-segment"
          style={{
            '--rotation': `${seg.rotation}deg`,
            background: seg.color,
            transform: `translate(-50%, -50%) rotate(${seg.rotation}deg) translateY(-140px)`,
          }}
        >
          <span>{seg.letter}</span>
        </div>
      ))}
      <div className="wheel-center">
        <span>HEXACO</span>
      </div>
    </div>
  );
}

// Home Section Component
function HomeSection({ onStartTest }) {
  const traits = [
    { letter: 'H', name: 'Honesty-Humility', desc: 'Sincerity, fairness, greed avoidance, and modesty in interpersonal relations.' },
    { letter: 'E', name: 'Emotionality', desc: 'Fearfulness, anxiety, dependence, and sentimentality in emotional responses.' },
    { letter: 'X', name: 'Extraversion', desc: 'Social self-esteem, social boldness, sociability, and liveliness.' },
    { letter: 'A', name: 'Agreeableness', desc: 'Forgivingness, gentleness, flexibility, and patience with others.' },
    { letter: 'C', name: 'Conscientiousness', desc: 'Organization, diligence, perfectionism, and prudence in actions.' },
    { letter: 'O', name: 'Openness', desc: 'Aesthetic appreciation, inquisitiveness, creativity, and unconventionality.' },
  ];

  return (
    <div className="section">
      <div className="hero">
        <div className="hero-content">
          <span className="hero-badge">HEXACO-PI-R Assessment</span>
          <h1 className="hero-title">
            Discover Your <span className="gradient-text">True Personality</span>
          </h1>
          <p className="hero-description">
            Take the scientifically validated HEXACO personality test to explore six fundamental
            dimensions of your personality. Gain insights into your Honesty-Humility, Emotionality,
            Extraversion, Agreeableness, Conscientiousness, and Openness to Experience.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">60</span>
              <span className="stat-label">Questions</span>
            </div>
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">Dimensions</span>
            </div>
            <div className="stat">
              <span className="stat-number">15</span>
              <span className="stat-label">Minutes</span>
            </div>
          </div>
          <button className="btn btn-primary pulse-animation" onClick={onStartTest}>
            <span>Begin Your Journey</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="hero-visual">
          <PersonalityWheel />
        </div>
      </div>

      <div className="traits-section">
        <h2 className="section-title">The Six Dimensions</h2>
        <div className="traits-grid">
          {traits.map((trait) => (
            <div key={trait.letter} className="trait-card">
              <div className="trait-icon">{trait.letter}</div>
              <h3>{trait.name}</h3>
              <p>{trait.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// User Info Form Component
function UserInfoSection({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, testDate: new Date().toLocaleDateString() });
  };

  return (
    <div className="section">
      <div className="user-info-container">
        <div className="form-header">
          <h2>Let's Get Started</h2>
          <p>Please provide some basic information before beginning the test</p>
        </div>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              required
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select your gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
              <option value="prefer-not">Prefer not to say</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            <span>Continue to Test</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

// Test Section Component
function TestSection({ answers, onAnswer, currentQuestion, onNext, onPrev }) {
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const answerOptions = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' },
  ];

  return (
    <div className="section">
      <div className="test-container">
        <div className="progress-container">
          <div className="progress-info">
            <span className="progress-text">
              Question <strong>{currentQuestion + 1}</strong> of <strong>{questions.length}</strong>
            </span>
            <span className="progress-percentage">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="question-card" key={currentQuestion}>
          <div className="question-number">{String(currentQuestion + 1).padStart(2, '0')}</div>
          <p className="question-text">{question.text}</p>

          <div className="answer-options">
            {answerOptions.map((option) => (
              <label
                key={option.value}
                className={`answer-option ${answers[currentQuestion] === option.value ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option.value}
                  checked={answers[currentQuestion] === option.value}
                  onChange={() => onAnswer(currentQuestion, option.value)}
                />
                <span className="option-label">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="test-navigation">
          <button
            className="btn btn-secondary"
            onClick={onPrev}
            disabled={currentQuestion === 0}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={onNext}
          >
            <span>{currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Results Section Component
function ResultsSection({ results, userData, onRetake }) {
  const { percentages } = results;

  const downloadPDF = () => {
    const doc = new jsPDF();
    const primaryColor = [54, 99, 173];
    const accentColor = [37, 188, 189];
    const darkColor = [22, 14, 68];

    // Header
    doc.setFillColor(...darkColor);
    doc.rect(0, 0, 210, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('HEXACO Personality Profile', 105, 25, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Assessment Report for ${userData.name}`, 105, 38, { align: 'center' });

    // User Info
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(`Date: ${userData.testDate}`, 20, 60);
    doc.text(`Email: ${userData.email}`, 20, 68);

    // Results Header
    doc.setFillColor(...primaryColor);
    doc.rect(20, 78, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Personality Dimension Scores', 105, 84, { align: 'center' });

    // Score Bars
    let yPos = 100;
    const barWidth = 120;
    const barHeight = 10;
    const traits = ['H', 'E', 'X', 'A', 'C', 'O'];
    const traitNames = {
      H: 'Honesty-Humility',
      E: 'Emotionality',
      X: 'Extraversion',
      A: 'Agreeableness',
      C: 'Conscientiousness',
      O: 'Openness to Experience'
    };

    traits.forEach(trait => {
      const score = percentages[trait];
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(traitNames[trait], 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(`${score}%`, 175, yPos, { align: 'right' });
      doc.setFillColor(230, 230, 230);
      doc.rect(20, yPos + 3, barWidth, barHeight, 'F');
      doc.setFillColor(...primaryColor);
      doc.rect(20, yPos + 3, (score / 100) * barWidth, barHeight, 'F');
      yPos += 22;
    });

    // Descriptions Header
    yPos += 10;
    doc.setFillColor(...accentColor);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Personality Profile Interpretation', 105, yPos + 6, { align: 'center' });

    yPos += 18;
    traits.forEach(trait => {
      const score = percentages[trait];
      const desc = traitDescriptions[trait];
      const interpretation = score > 50 ? desc.high : desc.low;

      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      doc.setTextColor(...primaryColor);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`${trait} - ${desc.name} (${score}%)`, 20, yPos);

      doc.setTextColor(80, 80, 80);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const lines = doc.splitTextToSize(interpretation, 170);
      doc.text(lines, 20, yPos + 6);
      yPos += 10 + (lines.length * 5);

      doc.setTextColor(120, 120, 120);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text(`Facets: ${desc.facets}`, 20, yPos);
      yPos += 12;
    });

    // Footer
    doc.setFillColor(...darkColor);
    doc.rect(0, 285, 210, 12, 'F');
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(8);
    doc.text('HEXACO-PI-R Assessment based on research by Lee & Ashton', 105, 292, { align: 'center' });

    doc.save(`HEXACO_Report_${userData.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="section">
      <div className="results-container">
        <div className="results-header">
          <h2>Your Personality Profile</h2>
          <p className="results-name">Results for {userData.name}</p>
        </div>

        <div className="results-chart">
          <div className="chart-container">
            {Object.entries(percentages).map(([trait, score]) => (
              <div key={trait} className="trait-bar">
                <div className="bar-label">
                  <span className="trait-name">{traitDescriptions[trait].name}</span>
                  <span className="trait-score">{score}%</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${score}%`,
                      background: traitColors[trait].gradient
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trait-descriptions">
          {Object.entries(percentages).map(([trait, score]) => (
            <div key={trait} className="trait-description">
              <h4>
                <span className="trait-badge">{trait}</span>
                {traitDescriptions[trait].name}
              </h4>
              <p>{score > 50 ? traitDescriptions[trait].high : traitDescriptions[trait].low}</p>
              <p className="facets">Facets: {traitDescriptions[trait].facets}</p>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <button className="btn btn-primary" onClick={downloadPDF}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span>Download PDF Report</span>
          </button>
          <button className="btn btn-secondary" onClick={onRetake}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
            <span>Retake Test</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// About Section Component
function AboutSection() {
  return (
    <div className="section">
      <div className="about-container">
        <h2>About the HEXACO Model</h2>
        <div className="about-content">
          <p>
            The HEXACO model of personality structure is a six-dimensional model of human personality
            that was created by Ashton and Lee and explained in their book, <em>The H Factor of Personality</em>.
          </p>
          <p>The six factors, or dimensions, include:</p>
          <ul>
            <li><strong>Honesty-Humility (H)</strong>: Sincerity, fairness, greed avoidance, modesty</li>
            <li><strong>Emotionality (E)</strong>: Fearfulness, anxiety, dependence, sentimentality</li>
            <li><strong>Extraversion (X)</strong>: Social self-esteem, social boldness, sociability, liveliness</li>
            <li><strong>Agreeableness (A)</strong>: Forgivingness, gentleness, flexibility, patience</li>
            <li><strong>Conscientiousness (C)</strong>: Organization, diligence, perfectionism, prudence</li>
            <li><strong>Openness to Experience (O)</strong>: Aesthetic appreciation, inquisitiveness, creativity, unconventionality</li>
          </ul>
          <p>
            This test uses the HEXACO-PI-R (HEXACO Personality Inventory - Revised) 60-item version
            developed by Dr. Kibeom Lee and Dr. Michael C. Ashton.
          </p>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 HEXACO Personality Assessment. Based on research by Lee & Ashton.</p>
    </footer>
  );
}

// Notification Component
function Notification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="notification" onClick={onClose}>
      {message}
    </div>
  );
}

// Main App Component
function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [userData, setUserData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState(null);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleNavigate = (section) => {
    setCurrentSection(section);
  };

  const handleStartTest = () => {
    setCurrentSection('userInfo');
  };

  const handleUserInfoSubmit = (data) => {
    setUserData(data);
    setAnswers({});
    setCurrentQuestion(0);
    setCurrentSection('test');
  };

  const handleAnswer = (questionIndex, value) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      showNotification('Please select an answer before continuing.');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const scores = {
      H: { sum: 0, count: 0 },
      E: { sum: 0, count: 0 },
      X: { sum: 0, count: 0 },
      A: { sum: 0, count: 0 },
      C: { sum: 0, count: 0 },
      O: { sum: 0, count: 0 },
    };

    questions.forEach((question, index) => {
      let answer = answers[index];
      if (question.reversed) {
        answer = 6 - answer;
      }
      scores[question.trait].sum += answer;
      scores[question.trait].count++;
    });

    const percentages = {};
    Object.keys(scores).forEach((trait) => {
      const minPossible = scores[trait].count * 1;
      const maxPossible = scores[trait].count * 5;
      const range = maxPossible - minPossible;
      const normalized = ((scores[trait].sum - minPossible) / range) * 100;
      percentages[trait] = Math.round(normalized);
    });

    setResults({ percentages });
    setCurrentSection('results');
  };

  const handleRetake = () => {
    setUserData(null);
    setAnswers({});
    setCurrentQuestion(0);
    setResults(null);
    setCurrentSection('home');
  };

  return (
    <div className="app-container">
      <BackgroundAnimation />
      <Header currentSection={currentSection} onNavigate={handleNavigate} />

      <main className="main-content">
        {currentSection === 'home' && (
          <HomeSection onStartTest={handleStartTest} />
        )}
        {currentSection === 'userInfo' && (
          <UserInfoSection onSubmit={handleUserInfoSubmit} />
        )}
        {currentSection === 'test' && (
          <TestSection
            answers={answers}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        {currentSection === 'results' && results && (
          <ResultsSection
            results={results}
            userData={userData}
            onRetake={handleRetake}
          />
        )}
        {currentSection === 'about' && <AboutSection />}
      </main>

      <Footer />
      <Notification message={notification} onClose={() => setNotification('')} />
    </div>
  );
}

export default App;
