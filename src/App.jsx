import { useState, useEffect, useRef } from 'react';
import './index.css';
import { questions, traitDescriptions, traitColors } from './data/questions';
import { personaQuestions, nonVerbalQuestions, verbalQuestions, gamifiedBadges, testTimeLimits } from './data/extraQuestions';
import {
  traitAnalysis,
  personalityPatterns,
  generatePersonalitySummary,
  generateCounselorFocusAreas,
  getScoreLevel,
  getScoreLabel
} from './data/personalityInsights';
import { jsPDF } from 'jspdf';

// --- Components ---

// Global Header with Logo
function Header() {
  return (
    <header className="global-header">
      <img src="/logo.png" alt="LExam" className="header-logo" />
    </header>
  );
}

function BackgroundAnimation() {
  return (
    <div className="bg-animation">
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
    </div>
  );
}

// Timer Component for Timed Tests
function Timer({ totalSeconds, onTimeUp, isRunning = true }) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / totalSeconds) * 100;

  // Warning states
  const isWarning = timeLeft <= 120 && timeLeft > 30; // Yellow: 2 min
  const isCritical = timeLeft <= 30; // Red: 30 sec

  return (
    <div className={`timer-container ${isWarning ? 'warning' : ''} ${isCritical ? 'critical' : ''}`}>
      <div className="timer-circle">
        <svg viewBox="0 0 100 100">
          <circle
            className="timer-bg"
            cx="50" cy="50" r="45"
            fill="none"
            strokeWidth="8"
          />
          <circle
            className="timer-progress"
            cx="50" cy="50" r="45"
            fill="none"
            strokeWidth="8"
            strokeDasharray={`${progress * 2.83} 283`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="timer-text">
          <span className="timer-digits">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="timer-label">remaining</span>
        </div>
      </div>
      {isCritical && <div className="timer-warning-text">⚠️ Time almost up!</div>}
    </div>
  );
}

// 1. Landing Screen
function LandingScreen({ onStart }) {
  return (
    <div className="section landing-section">
      <div className="hero-content centered">
        <img src="/logo.png" alt="LExam" className="landing-logo" />
        <h1 className="hero-title">
          Admission <span className="gradient-text">Testing Battery</span>
        </h1>
        <p className="hero-description medium-text">
          A comprehensive evaluation of your personality, cognitive style, and reasoning abilities.
          Discover your true archetype.
        </p>
        <button className="btn btn-primary pulse-animation" onClick={onStart}>
          <span>Start Assessment</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// 2. Signup Form
function SignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="section">
      <div className="card form-card">
        <h2>Candidate Registration</h2>
        <p className="text-secondary">Please enter your details to begin the battery.</p>
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <input
              type="text"
              required
              placeholder=" "
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <label>Full Name</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              required
              placeholder=" "
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <label>Email Address</label>
          </div>
          <button type="submit" className="btn btn-primary full-width">Continue</button>
        </form>
      </div>
    </div>
  );
}

// 3. Camera Capture
function CameraCapture({ onCapture, onSkip }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(videoStream);
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Could not access camera. Please check permissions.");
      }
    }
    setupCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onCapture(dataUrl);
  };

  return (
    <div className="section">
      <div className="card camera-card">
        <h2>Identity Verification</h2>
        <p className="text-secondary">Please take a quick photo for your candidate profile.</p>

        <div className="camera-view">
          {error ? (
            <div className="camera-error">{error}</div>
          ) : (
            <video ref={videoRef} autoPlay playsInline muted className="video-stream" />
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        <div className="camera-actions">
          {!error && (
            <button className="btn btn-primary" onClick={handleCapture}>
              <span className="camera-icon">📸</span> Capture Photo
            </button>
          )}
          <button className="btn btn-secondary" onClick={onSkip}>
            Skip Verification
          </button>
        </div>
      </div>
    </div>
  );
}

// 4. Greeting
function Greeting({ userData, onNext }) {
  return (
    <div className="section">
      <div className="greeting-container">
        {userData.photo && (
          <div className="profile-photo-glitch">
            <img src={userData.photo} alt="User" />
          </div>
        )}
        <h1 className="fade-in">Hi, {userData.name.split(' ')[0]}</h1>
        <p className="fade-in delay-1">Your Admission Testing Battery is ready.</p>
        <div className="battery-status fade-in delay-2">
          <div className="status-item"><span>Module 1: Personality</span> <span className="status-ready">READY</span></div>
          <div className="status-item"><span>Module 2: Cognitive Style</span> <span className="status-ready">READY</span></div>
          <div className="status-item"><span>Module 3: Non-Verbal</span> <span className="status-ready">READY</span></div>
          <div className="status-item"><span>Module 4: Verbal</span> <span className="status-ready">READY</span></div>
        </div>
        <button className="btn btn-primary fade-in delay-3" onClick={onNext}>Initiate Battery</button>
      </div>
    </div>
  );
}

// 5a. Hexaco Test (Reused but simplified props)
function HexacoTest({ answers, onAnswer, onClose }) {
  const [currentQ, setCurrentQ] = useState(0);

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      onClose(); // Finish section
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const progress = ((currentQ + 1) / questions.length) * 100;
  const question = questions[currentQ];

  return (
    <div className="section test-section">
      <div className="test-header">
        <h3>Module 1: Personality Inventory</h3>
        <div className="progress-bar-thin"><div style={{ width: `${progress}%` }}></div></div>
      </div>
      <div className="question-card large-card">
        <span className="q-num">Q{currentQ + 1}</span>
        <p className="q-text">{question.text}</p>
        <div className="options-scale">
          {[1, 2, 3, 4, 5].map(val => (
            <button
              key={val}
              className={`scale-btn ${answers[currentQ] === val ? 'selected' : ''}`}
              onClick={() => {
                onAnswer(currentQ, val);
                setTimeout(handleNext, 200); // Auto advance for smoothness
              }}
            >
              {val}
            </button>
          ))}
        </div>
        <div className="scale-labels">
          <span>Strongly Disagree</span>
          <span>Strongly Agree</span>
        </div>
      </div>
      <div className="nav-buttons">
        <button onClick={handlePrev} disabled={currentQ === 0} className="btn-text">Back</button>
        <button onClick={onClose} className="btn-text skip-btn">Skip Section (Dev)</button>
      </div>
    </div>
  );
}

// 5b. Persona Test (Binary)
function PersonaTest({ answers, onAnswer, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);

  const handleSelect = (val) => {
    onAnswer(currentQ, val);
    if (currentQ < personaQuestions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      onComplete();
    }
  };

  const q = personaQuestions[currentQ];

  return (
    <div className="section test-section">
      <div className="test-header">
        <h3>Module 2: Cognitive Style</h3>
        <div className="progress-info">{currentQ + 1} / {personaQuestions.length}</div>
      </div>
      <div className="binary-card-container">
        <h2 className="binary-title">{q.description}</h2>
        <div className="binary-options">
          {q.options.map((opt) => (
            <button key={opt.id} className="binary-option-btn pulse-hover" onClick={() => handleSelect(opt.value)}>
              <span className="opt-id">{opt.id}</span>
              <span className="opt-text">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5c. Non-Verbal Test (Shapes) - TIMED: 15 minutes
function NonVerbalTest({ answers, onAnswer, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  // Start timer when component mounts
  useEffect(() => {
    setTimerStarted(true);
  }, []);

  const handleSelect = (val) => {
    onAnswer(currentQ, val);
    if (currentQ < nonVerbalQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      onComplete();
    }
  };

  const handleTimeUp = () => {
    // Auto-submit when time runs out
    onComplete();
  };

  const q = nonVerbalQuestions[currentQ];

  // Helper to render shapes based on type
  const renderShape = (shapeConfig) => {
    if (shapeConfig.type === 'clock-line') {
      return (
        <div className="shape-box clock-box">
          <div className="clock-hand" style={{ transform: `rotate(${shapeConfig.rotation}deg)` }}></div>
        </div>
      );
    }
    if (shapeConfig.type === 'shapes-count') {
      // Limit display to max 10 for visual clarity
      const displayCount = Math.min(shapeConfig.count, 10);
      return (
        <div className="shape-box count-box">
          {Array.from({ length: displayCount }).map((_, i) => (
            <div key={i} className={`mini-shape ${shapeConfig.shape}`}></div>
          ))}
          {shapeConfig.count > 10 && <span className="count-label">×{shapeConfig.count}</span>}
        </div>
      );
    }
    if (shapeConfig.type === 'box-fill') {
      return <div className={`shape-box fill-box ${shapeConfig.fill}`}></div>;
    }
    return <div className="shape-box error">?</div>;
  };

  return (
    <div className="section test-section timed-section">
      <div className="test-header with-timer">
        <div className="header-left">
          <h3>Module 3: Non-Verbal Reasoning</h3>
          <div className="progress-info">{currentQ + 1} / {nonVerbalQuestions.length}</div>
        </div>
        <Timer
          totalSeconds={testTimeLimits.nonVerbal}
          onTimeUp={handleTimeUp}
          isRunning={timerStarted}
        />
      </div>
      <div className="timed-test-notice">
        <span className="notice-icon">⏱️</span>
        <span>This section is timed. Complete all questions before time runs out.</span>
      </div>
      <div className="non-verbal-container">
        <p className="instruction-text">{q.description}</p>
        {q.category && <span className="question-category">{q.category}</span>}
        <div className="sequence-row">
          {q.sequence.map((item, i) => (
            <div key={i} className="sequence-item">
              {renderShape(item)}
            </div>
          ))}
          <div className="sequence-item placeholder">?</div>
        </div>
        <div className="options-row">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              className={`shape-option-btn ${answers[currentQ] === opt.id ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.id)}
            >
              {renderShape(opt)}
              <span className="opt-label">{opt.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5d. Verbal Test - TIMED: 10 minutes
function VerbalTest({ answers, onAnswer, onComplete }) {
  const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  // Start timer when component mounts
  useEffect(() => {
    setTimerStarted(true);
  }, []);

  const passage = verbalQuestions[currentPassageIdx];
  const questionsForPassage = passage.questions;

  // Check if all questions for this passage are answered
  const allAnswered = questionsForPassage.every(q => answers[q.id]);

  const handleTimeUp = () => {
    // Auto-submit when time runs out
    onComplete();
  };

  const handleNext = () => {
    if (currentPassageIdx < verbalQuestions.length - 1) {
      setCurrentPassageIdx(currentPassageIdx + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="section test-section verbal-layout timed-section">
      <div className="test-header with-timer">
        <div className="header-left">
          <h3>Module 4: Verbal Reasoning</h3>
          <div className="progress-info">Passage {currentPassageIdx + 1} / {verbalQuestions.length}</div>
        </div>
        <Timer
          totalSeconds={testTimeLimits.verbal}
          onTimeUp={handleTimeUp}
          isRunning={timerStarted}
        />
      </div>
      <div className="timed-test-notice">
        <span className="notice-icon">⏱️</span>
        <span>This section is timed. Complete all passages before time runs out.</span>
      </div>
      <div className="split-screen">
        <div className="passage-pane">
          <div className="passage-header">
            <h4>Reading Passage {currentPassageIdx + 1}</h4>
            {passage.topic && <span className="topic-badge">{passage.topic}</span>}
          </div>
          <p className="passage-text">{passage.text}</p>
        </div>
        <div className="questions-pane">
          {questionsForPassage.map(q => (
            <div key={q.id} className="verbal-q-card">
              <p className="vq-prompt">{q.prompt}</p>
              <div className="vq-options">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    className={`vq-btn ${answers[q.id] === opt ? 'selected' : ''}`}
                    onClick={() => onAnswer(q.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            className="btn btn-primary full-width"
            disabled={!allAnswered}
            onClick={handleNext}
          >
            {currentPassageIdx === verbalQuestions.length - 1 ? 'Finish Battery' : 'Next Passage'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 6. Completion Popup
function CompletionModal({ onShowResults }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="success-icon">✨</div>
        <h2>Battery Complete</h2>
        <p>Congratulations. Your profile has been analyzed.</p>
        <button className="btn btn-primary pulse-animation" onClick={onShowResults}>
          View Admission Results
        </button>
      </div>
    </div>
  );
}

// 7. Results Dashboard - Comprehensive & Detailed
function GamifiedResults({ hexacoResults, personaResults, nvResults, vResults, userData }) {
  const [expandedTrait, setExpandedTrait] = useState(null);
  const [showCounselorNotes, setShowCounselorNotes] = useState(false);
  const candidateId = useRef(Math.random().toString(36).substr(2, 9).toUpperCase());

  // Calculate Personality Archetype
  const typeCounts = {};
  personaResults.forEach(r => {
    if (r) {
      typeCounts[r.type] = (typeCounts[r.type] || 0) + r.score;
    }
  });
  const dominantType = Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, 'Generalist');
  const badge = gamifiedBadges[dominantType] || gamifiedBadges['Generalist'];

  // Calculate Reasoning Scores
  let nvScore = 0;
  Object.keys(nvResults).forEach(idx => {
    if (nonVerbalQuestions[idx]?.correctAnswer === nvResults[idx]) nvScore++;
  });

  let vScore = 0;
  let totalV = 0;
  verbalQuestions.forEach(p => {
    p.questions.forEach(q => {
      totalV++;
      if (vResults[q.id] === q.correctAnswer) vScore++;
    });
  });

  const nvPercent = nonVerbalQuestions.length > 0 ? Math.round((nvScore / nonVerbalQuestions.length) * 100) : 0;
  const vPercent = totalV > 0 ? Math.round((vScore / totalV) * 100) : 0;
  const cognitiveAvg = Math.round((nvPercent + vPercent) / 2);

  // Get cognitive level description
  const getCognitiveLevel = (percent) => {
    if (percent >= 90) return { label: 'Exceptional', color: '#10b981', desc: 'Outstanding performance indicating superior cognitive abilities' };
    if (percent >= 75) return { label: 'Above Average', color: '#22c55e', desc: 'Strong performance exceeding typical expectations' };
    if (percent >= 60) return { label: 'Average', color: '#f59e0b', desc: 'Solid performance within normal range' };
    if (percent >= 40) return { label: 'Below Average', color: '#f97316', desc: 'Performance indicates areas for potential development' };
    return { label: 'Needs Development', color: '#ef4444', desc: 'Significant room for improvement in this area' };
  };

  const nvLevel = getCognitiveLevel(nvPercent);
  const vLevel = getCognitiveLevel(vPercent);
  const overallLevel = getCognitiveLevel(cognitiveAvg);

  // Generate PDF Report
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(138, 43, 226);
    doc.text('LExam Assessment Results', pageWidth / 2, y, { align: 'center' });
    y += 12;

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Candidate: ${userData.name}`, 20, y);
    doc.text(`ID: ${candidateId.current}`, pageWidth - 60, y);
    y += 8;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);
    y += 15;

    // Archetype
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(`Personality Archetype: ${badge.title}`, 20, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text(badge.desc, 20, y);
    y += 15;

    // HEXACO Scores
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('HEXACO Personality Dimensions', 20, y);
    y += 10;

    doc.setFontSize(11);
    Object.entries(hexacoResults.percentages || {}).forEach(([trait, score]) => {
      const analysis = traitAnalysis[trait];
      const level = getScoreLevel(score);
      const interp = analysis?.interpretations?.[level];

      doc.setTextColor(0);
      doc.text(`${analysis?.name || trait}: ${score}% (${getScoreLabel(score)})`, 20, y);
      y += 6;

      if (interp?.summary) {
        doc.setTextColor(80);
        const lines = doc.splitTextToSize(interp.summary, pageWidth - 40);
        doc.text(lines, 25, y);
        y += lines.length * 5 + 4;
      }

      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    });

    y += 5;

    // Cognitive Performance
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('Cognitive Performance', 20, y);
    y += 10;

    doc.setFontSize(11);
    doc.text(`Non-Verbal Reasoning: ${nvScore}/${nonVerbalQuestions.length} (${nvPercent}%)`, 20, y);
    y += 7;
    doc.text(`Verbal Reasoning: ${vScore}/${totalV} (${vPercent}%)`, 20, y);
    y += 7;
    doc.text(`Overall Cognitive Score: ${cognitiveAvg}%`, 20, y);
    y += 15;

    // Summary
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Profile Summary', 20, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(80);
    const summary = generatePersonalitySummary(hexacoResults.percentages || {});
    const summaryLines = doc.splitTextToSize(summary, pageWidth - 40);
    doc.text(summaryLines, 20, y);

    doc.save(`LExam_Results_${userData.name.replace(/\s+/g, '_')}.pdf`);
  };

  // Radar Chart Data Points
  const radarPoints = Object.entries(hexacoResults.percentages || {}).map(([trait, score], i, arr) => {
    const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
    const radius = (score / 100) * 120;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 150 + radius * Math.sin(angle),
      trait,
      score,
      labelX: 150 + 145 * Math.cos(angle),
      labelY: 150 + 145 * Math.sin(angle)
    };
  });

  const radarPath = radarPoints.length > 0
    ? `M ${radarPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`
    : '';

  return (
    <div className="section results-section detailed-results">
      {/* Results Header with Prominent Photo */}
      <div className="results-header-new">
        <div className="results-title-row">
          <h1>Comprehensive Assessment <span className="gradient-text">Report</span></h1>
          <button className="btn btn-primary download-btn" onClick={downloadPDF}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download PDF Report
          </button>
        </div>

        {/* Enhanced Candidate Card with Larger Photo */}
        <div className="candidate-card-detailed">
          <div className="candidate-photo-section">
            {userData.photo ? (
              <img src={userData.photo} className="can-photo-large" alt="Candidate" />
            ) : (
              <div className="can-photo-placeholder">
                <span>📷</span>
                <p>No Photo</p>
              </div>
            )}
          </div>
          <div className="candidate-info-section">
            <h2>{userData.name || 'Candidate'}</h2>
            <div className="candidate-meta">
              <span className="meta-item"><strong>ID:</strong> {candidateId.current}</span>
              <span className="meta-item"><strong>Email:</strong> {userData.email || 'Not provided'}</span>
              <span className="meta-item"><strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Archetype Section - Enhanced */}
      <div className="archetype-section enhanced">
        <div className="archetype-icon-large">{badge.icon}</div>
        <div className="archetype-content">
          <span className="archetype-label">Your Primary Personality Archetype</span>
          <h2 className="archetype-title">{badge.title}</h2>
          <p className="archetype-desc">{badge.desc}</p>
          <div className="archetype-traits">
            <span className="trait-tag">Cognitive Style</span>
            <span className="trait-tag">Decision Maker</span>
            <span className="trait-tag">Natural Leader</span>
          </div>
        </div>
      </div>

      {/* HEXACO Personality Profile - Detailed */}
      <div className="hexaco-section">
        <h2 className="section-title">HEXACO Personality Profile</h2>
        <p className="section-subtitle">Click on each trait for a comprehensive breakdown of your personality dimensions</p>

        <div className="hexaco-layout">
          <div className="radar-container">
            <svg viewBox="0 0 300 300" className="radar-chart">
              {/* Grid circles */}
              {[20, 40, 60, 80, 100].map(pct => (
                <circle
                  key={pct}
                  cx="150" cy="150"
                  r={pct * 1.2}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              ))}
              {/* Grid lines */}
              {radarPoints.map((p, i) => (
                <line
                  key={i}
                  x1="150" y1="150"
                  x2={p.labelX} y2={p.labelY}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              ))}
              {/* Data polygon */}
              <path
                d={radarPath}
                fill="rgba(138, 43, 226, 0.3)"
                stroke="url(#radarGradient)"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              {/* Data points */}
              {radarPoints.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="6" fill="#a855f7" stroke="#fff" strokeWidth="2" />
                  <text
                    x={p.labelX} y={p.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    fontSize="12"
                    fontWeight="600"
                  >
                    {p.trait}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="trait-cards-grid">
            {Object.entries(hexacoResults.percentages || {}).map(([trait, score]) => {
              const analysis = traitAnalysis[trait];
              const level = getScoreLevel(score);
              const interp = analysis?.interpretations?.[level];
              const isExpanded = expandedTrait === trait;

              return (
                <div
                  key={trait}
                  className={`trait-card detailed ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => setExpandedTrait(isExpanded ? null : trait)}
                >
                  <div className="trait-header">
                    <span className="trait-icon">{analysis?.icon}</span>
                    <div className="trait-info">
                      <h4>{analysis?.name}</h4>
                      <span className={`trait-level level-${level}`}>{getScoreLabel(score)}</span>
                    </div>
                    <div className="trait-score">{score}%</div>
                  </div>
                  <div className="trait-bar">
                    <div
                      className="trait-bar-fill"
                      style={{
                        width: `${score}%`,
                        background: `linear-gradient(90deg, ${traitColors[trait]?.primary || '#a855f7'}, ${traitColors[trait]?.glow || '#06b6d4'})`
                      }}
                    />
                  </div>
                  {isExpanded && interp && (
                    <div className="trait-details-full">
                      <p className="trait-summary">{interp.summary}</p>

                      <div className="trait-lists-detailed">
                        <div className="trait-list strengths">
                          <h5>💪 Key Strengths</h5>
                          <ul>
                            {interp.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>

                        <div className="trait-list challenges">
                          <h5>⚠️ Potential Challenges</h5>
                          <ul>
                            {interp.challenges?.map((c, i) => <li key={i}>{c}</li>)}
                          </ul>
                        </div>

                        <div className="trait-list growth">
                          <h5>🌱 Growth Opportunities</h5>
                          <ul>
                            {interp.growthAreas?.map((g, i) => <li key={i}>{g}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="expand-hint">{isExpanded ? '▼ Click to collapse' : '▶ Click for full analysis'}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cognitive Performance - Detailed */}
      <div className="cognitive-section detailed">
        <h2 className="section-title">Cognitive Performance Analysis</h2>
        <p className="section-subtitle">Detailed breakdown of your reasoning abilities across different domains</p>

        <div className="cognitive-grid detailed">
          <div className="cognitive-card detailed">
            <div className="cog-header">
              <div className="cog-icon">🧩</div>
              <div className="cog-badge" style={{ background: nvLevel.color }}>{nvLevel.label}</div>
            </div>
            <h4>Non-Verbal Reasoning</h4>
            <div className="cog-score-big">{nvPercent}%</div>
            <div className="cog-detail">{nvScore} / {nonVerbalQuestions.length} correct answers</div>
            <div className="cog-bar">
              <div className="cog-bar-fill nv" style={{ width: `${nvPercent}%` }} />
            </div>
            <p className="cog-description">{nvLevel.desc}</p>
            <div className="cog-skills">
              <span>Pattern Recognition</span>
              <span>Spatial Reasoning</span>
              <span>Abstract Thinking</span>
            </div>
          </div>

          <div className="cognitive-card detailed">
            <div className="cog-header">
              <div className="cog-icon">📖</div>
              <div className="cog-badge" style={{ background: vLevel.color }}>{vLevel.label}</div>
            </div>
            <h4>Verbal Reasoning</h4>
            <div className="cog-score-big">{vPercent}%</div>
            <div className="cog-detail">{vScore} / {totalV} correct answers</div>
            <div className="cog-bar">
              <div className="cog-bar-fill v" style={{ width: `${vPercent}%` }} />
            </div>
            <p className="cog-description">{vLevel.desc}</p>
            <div className="cog-skills">
              <span>Reading Comprehension</span>
              <span>Critical Analysis</span>
              <span>Logical Deduction</span>
            </div>
          </div>

          <div className="cognitive-card overall detailed">
            <div className="cog-header">
              <div className="cog-icon">🎯</div>
              <div className="cog-badge" style={{ background: overallLevel.color }}>{overallLevel.label}</div>
            </div>
            <h4>Overall Cognitive Score</h4>
            <div className="cog-score-big gradient-text">{cognitiveAvg}%</div>
            <div className="cog-detail">Combined assessment score</div>
            <p className="cog-description">{overallLevel.desc}</p>
          </div>
        </div>
      </div>

      {/* Comprehensive Summary Section */}
      <div className="summary-section detailed">
        <h2 className="section-title">Comprehensive Profile Summary</h2>
        <div className="summary-card detailed">
          <p>{generatePersonalitySummary(hexacoResults.percentages || {})}</p>
        </div>
      </div>

      {/* Counselor Notes Section (Collapsible) */}
      <div className="counselor-section">
        <button
          className="counselor-toggle"
          onClick={() => setShowCounselorNotes(!showCounselorNotes)}
        >
          <span>🎓 Professional Insights (Counselor Notes)</span>
          <span className="toggle-arrow">{showCounselorNotes ? '▼' : '▶'}</span>
        </button>

        {showCounselorNotes && (
          <div className="counselor-notes">
            <p className="counselor-disclaimer">
              <strong>Note:</strong> These insights are intended for counselors, educators, and mental health professionals
              to better understand the candidate's psychological profile and potential areas for support.
            </p>

            {Object.entries(hexacoResults.percentages || {}).map(([trait, score]) => {
              const analysis = traitAnalysis[trait];
              const level = getScoreLevel(score);
              const interp = analysis?.interpretations?.[level];

              return interp?.counselorNotes ? (
                <div key={trait} className="counselor-note-card">
                  <h5>{analysis?.icon} {analysis?.name} ({getScoreLabel(score)})</h5>
                  <p>{interp.counselorNotes}</p>
                </div>
              ) : null;
            })}

            <div className="counselor-note-card focus-areas">
              <h5>🎯 Focus Areas for Development</h5>
              <p>{generateCounselorFocusAreas(hexacoResults.percentages || {})}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// --- Main App Logic ---

// Mock data for dev mode testing
const mockDevModeData = {
  userData: {
    name: 'Test Candidate',
    email: 'test@example.com',
    photo: null
  },
  hexacoResults: {
    percentages: { H: 72, E: 45, X: 68, A: 55, C: 81, O: 73 }
  },
  personaAnswers: [
    { type: 'Driver', score: 1 },
    { type: 'Generalist', score: 1 },
    { type: 'Innovator', score: 1 },
    { type: 'Achiever', score: 1 },
    { type: 'Adaptor', score: 1 },
    { type: 'RiskTaker', score: 1 },
    { type: 'Analytical', score: 1 },
    { type: 'Visual', score: 1 },
    { type: 'Independent', score: 1 },
    { type: 'FutureFocused', score: 1 },
    { type: 'Confrontational', score: 1 },
    { type: 'Steady', score: 1 }
  ],
  nvAnswers: {
    0: 'B', 1: 'C', 2: 'B', 3: 'B', 4: 'C',
    5: 'B', 6: 'A', 7: 'B', 8: 'C', 9: 'C',
    10: 'B', 11: 'C', 12: 'C', 13: 'A', 14: 'B',
    15: 'B', 16: 'A', 17: 'B', 18: 'C', 19: 'A'
  },
  vAnswers: {
    'v1-q1': 'False', 'v1-q2': 'Cannot Say', 'v1-q3': 'False', 'v1-q4': 'True',
    'v2-q1': 'False', 'v2-q2': 'True', 'v2-q3': 'Cannot Say', 'v2-q4': 'True',
    'v3-q1': 'False', 'v3-q2': 'False', 'v3-q3': 'True',
    'v4-q1': 'False', 'v4-q2': 'True', 'v4-q3': 'False',
    'v5-q1': 'False', 'v5-q2': 'True', 'v5-q3': 'Cannot Say',
    'v6-q1': 'False', 'v6-q2': 'True', 'v6-q3': 'False'
  }
};

// Check for dev mode in URL
function checkDevMode() {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('devmode') === 'true';
  }
  return false;
}

function App() {
  const isDevMode = checkDevMode();
  const [phase, setPhase] = useState(isDevMode ? 'results' : 'landing');
  const [userData, setUserData] = useState(isDevMode ? mockDevModeData.userData : { name: '', email: '', photo: null });

  // Results Storage
  const [hexacoAnswers, setHexacoAnswers] = useState({});
  const [personaAnswers, setPersonaAnswers] = useState(isDevMode ? mockDevModeData.personaAnswers : []);
  const [nvAnswers, setNvAnswers] = useState(isDevMode ? mockDevModeData.nvAnswers : {});
  const [vAnswers, setVAnswers] = useState(isDevMode ? mockDevModeData.vAnswers : {});

  const [hexacoCalculated, setHexacoCalculated] = useState(isDevMode ? mockDevModeData.hexacoResults : { percentages: {} });

  const calculateHexaco = () => {
    // Basic calculation logic reused
    const scores = { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };
    const counts = { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };

    // Default to neutral if answer missing
    questions.forEach((q, idx) => {
      const ans = hexacoAnswers[idx] || 3;
      let scoreVal = ans;
      if (q.reversed) {
        scoreVal = 6 - ans;
      }
      if (scores.hasOwnProperty(q.trait)) {
        scores[q.trait] += scoreVal;
        counts[q.trait] += 1;
      }
    });

    const percentages = {};
    Object.keys(scores).forEach(trait => {
      // Max possible is count * 5. Normalize to 100.
      percentages[trait] = Math.round((scores[trait] / (counts[trait] * 5)) * 100);
    });
    setHexacoCalculated({ percentages });
  };


  return (
    <div className="app-container">
      <BackgroundAnimation />
      {phase !== 'landing' && <Header />}

      {phase === 'landing' && <LandingScreen onStart={() => setPhase('signup')} />}

      {phase === 'signup' && <SignupForm onSubmit={(data) => {
        setUserData({ ...userData, ...data });
        setPhase('camera');
      }} />}

      {phase === 'camera' && <CameraCapture
        onCapture={(img) => {
          setUserData(prev => ({ ...prev, photo: img }));
          setPhase('greeting');
        }}
        onSkip={() => setPhase('greeting')}
      />}

      {phase === 'greeting' && <Greeting userData={userData} onNext={() => setPhase('test-hexaco')} />}

      {phase === 'test-hexaco' && <HexacoTest
        answers={hexacoAnswers}
        onAnswer={(qId, val) => setHexacoAnswers({ ...hexacoAnswers, [qId]: val })}
        onClose={() => {
          calculateHexaco();
          setPhase('test-persona');
        }}
      />}

      {phase === 'test-persona' && <PersonaTest
        answers={personaAnswers}
        onAnswer={(idx, val) => {
          const newAns = [...personaAnswers];
          newAns[idx] = val;
          setPersonaAnswers(newAns);
        }}
        onComplete={() => setPhase('test-nonverbal')}
      />}

      {phase === 'test-nonverbal' && <NonVerbalTest
        answers={nvAnswers}
        onAnswer={(idx, val) => setNvAnswers({ ...nvAnswers, [idx]: val })}
        onComplete={() => setPhase('test-verbal')}
      />}

      {phase === 'test-verbal' && <VerbalTest
        answers={vAnswers}
        onAnswer={(qId, val) => setVAnswers({ ...vAnswers, [qId]: val })}
        onComplete={() => setPhase('completion')}
      />}

      {phase === 'completion' && <CompletionModal onShowResults={() => setPhase('results')} />}

      {phase === 'results' && <GamifiedResults
        hexacoResults={hexacoCalculated}
        personaResults={personaAnswers}
        nvResults={nvAnswers}
        vResults={vAnswers}
        userData={userData}
      />}

    </div>
  );
}

export default App;
