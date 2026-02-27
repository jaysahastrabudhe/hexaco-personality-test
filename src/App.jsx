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
import { supabase, uploadPhoto, submitTestResults } from './supabaseClient';


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

  const isWarning = timeLeft <= 120 && timeLeft > 30;
  const isCritical = timeLeft <= 30;

  return (
    <div className={`timer-badge ${isWarning ? 'warning' : ''} ${isCritical ? 'critical' : ''}`}>
      <span className="timer-icon">⏱</span>
      <span className="timer-digits">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
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

// 5c. Non-Verbal Reasoning Test — Text-Based Series (SHL/Korn Ferry style)
function NonVerbalTest({ answers, onAnswer, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    setTimerStarted(true);
  }, []);

  const handleSelect = (optId) => {
    onAnswer(currentQ, optId);
    if (currentQ < nonVerbalQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      onComplete({ timedOut: false, questionsAnswered: Object.keys(answers).length + 1 });
    }
  };

  const handleTimeUp = () => {
    onComplete({ timedOut: true, questionsAnswered: Object.keys(answers).length });
  };

  const q = nonVerbalQuestions[currentQ];
  const selected = answers[currentQ];

  return (
    <div className="section test-section timed-section">
      <div className="test-header with-timer">
        <div className="header-left">
          <h3>Module 3: Abstract Reasoning</h3>
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

      <div className="series-container">
        {q.category && <span className="question-category">{q.category}</span>}
        <p className="instruction-text">{q.description}</p>

        {/* Sequence row */}
        <div className="series-row">
          {q.sequence.map((term, i) => (
            <div key={i} className={`series-term ${term === '?' ? 'series-placeholder' : ''}`}>
              {term}
            </div>
          ))}
        </div>

        {/* Answer options — 2×2 grid */}
        <div className="series-options">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              className={`series-opt-btn ${selected === opt.id ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.id)}
            >
              <span className="series-opt-label">{opt.id}</span>
              <span className="series-opt-value">{opt.value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


// 5d. Verbal Reasoning Test — Watson-Glaser style: passage + one question at a time
function VerbalTest({ answers, onAnswer, onComplete }) {
  const [timerStarted, setTimerStarted] = useState(false);

  // Flatten all questions with their parent passage
  const allQuestions = verbalQuestions.flatMap(passage =>
    passage.questions.map(q => ({ ...q, passage }))
  );

  // Find first unanswered question index
  const firstUnanswered = allQuestions.findIndex(q => !answers[q.id]);
  const [currentIdx, setCurrentIdx] = useState(firstUnanswered >= 0 ? firstUnanswered : 0);

  useEffect(() => {
    setTimerStarted(true);
  }, []);

  const handleTimeUp = () => {
    onComplete({ timedOut: true, questionsAnswered: Object.keys(answers).length });
  };

  const handleSelect = (qId, opt) => {
    onAnswer(qId, opt);
    setTimeout(() => {
      if (currentIdx < allQuestions.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        onComplete({ timedOut: false, questionsAnswered: Object.keys(answers).length + 1 });
      }
    }, 300);
  };

  const item = allQuestions[currentIdx];
  const passage = item.passage;
  const selected = answers[item.id];

  return (
    <div className="section test-section timed-section">
      <div className="test-header with-timer">
        <div className="header-left">
          <h3>Module 4: Verbal Reasoning</h3>
          <div className="progress-info">Q{currentIdx + 1} / {allQuestions.length}</div>
        </div>
        <Timer
          totalSeconds={testTimeLimits.verbal}
          onTimeUp={handleTimeUp}
          isRunning={timerStarted}
        />
      </div>
      <div className="timed-test-notice">
        <span className="notice-icon">⏱️</span>
        <span>Read the passage, then decide if the statement is True, False, or Cannot Say.</span>
      </div>

      <div className="verbal-single-layout">
        {/* Passage card */}
        <div className="verbal-passage-card">
          <div className="passage-header">
            <span className="passage-label">PASSAGE</span>
            {passage.topic && <span className="topic-badge">{passage.topic}</span>}
          </div>
          <p className="passage-text">{passage.text}</p>
        </div>

        {/* Single question card */}
        <div className="verbal-question-card">
          <p className="vq-prompt">"{item.prompt}"</p>
          <div className="vq-options-row">
            {item.options.map(opt => (
              <button
                key={opt}
                className={`vq-btn-large ${selected === opt ? 'selected' : ''}`}
                onClick={() => handleSelect(item.id, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// 6. Completion Popup
function CompletionModal({ onShowResults, isSubmitting = false }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="success-icon">{isSubmitting ? '⏳' : '🎉'}</div>
        <h2>{isSubmitting ? 'Saving Results...' : 'Assessment Complete!'}</h2>
        <p>
          {isSubmitting
            ? 'Please wait while we save your assessment.'
            : 'Thanks for completing the test. Please download your results and submit them to move ahead in the process.'}
        </p>
        <button
          className="btn btn-primary pulse-animation"
          onClick={onShowResults}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'View & Download Results'}
        </button>
      </div>
    </div>
  );
}


// 7. Results Dashboard - Comprehensive & Detailed
function GamifiedResults({ hexacoResults, personaResults, nvResults, vResults, userData, sessionId, submitError, sectionTimings = {} }) {

  // Helper: format seconds to mm:ss
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${String(s).padStart(2, '0')}s`;
  };

  const totalTestTime = Object.values(sectionTimings).reduce((sum, t) => sum + (t.elapsed || 0), 0);
  const [expandedTrait, setExpandedTrait] = useState(null);
  const [showCounselorNotes, setShowCounselorNotes] = useState(false);
  // Use provided sessionId or generate one for dev mode
  const candidateId = useRef(sessionId || Math.random().toString(36).substr(2, 9).toUpperCase());

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

  // Generate PDF Report - Enhanced with modern styling matching the results page
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Color Palette (matching results page)
    const colors = {
      bgDark: [15, 15, 23],           // Dark surface
      bgCard: [26, 26, 38],           // Card background
      accentPrimary: [124, 124, 240], // Purple #7C7CF0
      accentSecondary: [0, 217, 255], // Cyan #00D9FF
      accentSuccess: [16, 185, 129],  // Green #10B981
      accentWarning: [249, 115, 22],  // Orange
      textPrimary: [255, 255, 255],
      textSecondary: [180, 180, 200],
      textMuted: [120, 120, 140]
    };

    // Helper: Draw rounded rectangle
    const drawRoundedRect = (x, y, w, h, r, fillColor, strokeColor = null) => {
      doc.setFillColor(...fillColor);
      if (strokeColor) {
        doc.setDrawColor(...strokeColor);
        doc.setLineWidth(0.5);
      }
      doc.roundedRect(x, y, w, h, r, r, strokeColor ? 'FD' : 'F');
    };

    // Helper: Draw gradient-like bar (simulated with color progression)
    const drawGradientBar = (x, y, w, h, percent, startColor, endColor) => {
      const barWidth = (w * percent) / 100;
      // Background
      doc.setFillColor(40, 40, 55);
      doc.roundedRect(x, y, w, h, h / 2, h / 2, 'F');
      // Filled portion with accent color
      if (barWidth > 0) {
        doc.setFillColor(...startColor);
        doc.roundedRect(x, y, Math.max(barWidth, h), h, h / 2, h / 2, 'F');
      }
    };

    // Helper: Get level color
    const getLevelColor = (level) => {
      switch (level) {
        case 'veryLow': return [239, 68, 68];
        case 'low': return [249, 115, 22];
        case 'moderate': return [234, 179, 8];
        case 'high': return [34, 197, 94];
        case 'veryHigh': return [6, 182, 212];
        default: return colors.textSecondary;
      }
    };

    // PDF-safe trait labels (emojis don't render in jsPDF default fonts)
    const pdfTraitLabels = {
      H: { name: 'Honesty-Humility', symbol: '[H]' },
      E: { name: 'Emotionality', symbol: '[E]' },
      X: { name: 'Extraversion', symbol: '[X]' },
      A: { name: 'Agreeableness', symbol: '[A]' },
      C: { name: 'Conscientiousness', symbol: '[C]' },
      O: { name: 'Openness to Experience', symbol: '[O]' }
    };

    // Helper: Get PDF-safe trait label
    const getPdfTraitLabel = (trait, analysis) => {
      const pdfLabel = pdfTraitLabels[trait];
      if (pdfLabel) {
        return `${pdfLabel.symbol} ${pdfLabel.name}`;
      }
      // Fallback: strip emojis from analysis name
      const name = analysis?.name || trait;
      return `[${trait}] ${name}`;
    };

    // === PAGE 1: Header & Candidate Info ===

    // Full page dark background
    doc.setFillColor(...colors.bgDark);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Top accent gradient bar
    doc.setFillColor(...colors.accentPrimary);
    doc.rect(0, 0, pageWidth, 6, 'F');
    doc.setFillColor(...colors.accentSecondary);
    doc.rect(pageWidth * 0.6, 0, pageWidth * 0.4, 6, 'F');

    let y = 20;

    // Title
    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('Comprehensive Assessment', pageWidth / 2, y, { align: 'center' });
    y += 10;
    doc.setTextColor(...colors.accentSecondary);
    doc.text('Report', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Candidate Card Background
    const cardY = y;
    drawRoundedRect(15, cardY, pageWidth - 30, 50, 3, colors.bgCard, [60, 60, 80]);

    // Add Photo if available
    const photoSize = 40;
    const photoX = 22;
    const photoY = cardY + 5;

    if (userData.photo) {
      try {
        // Add circular photo
        doc.addImage(userData.photo, 'JPEG', photoX, photoY, photoSize, photoSize);
        // Draw border around photo
        doc.setDrawColor(...colors.accentPrimary);
        doc.setLineWidth(1.5);
        doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 'S');
      } catch (e) {
        // Photo placeholder if image fails
        doc.setFillColor(60, 60, 80);
        doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 'F');
        doc.setTextColor(...colors.textMuted);
        doc.setFontSize(8);
        doc.text('No Photo', photoX + photoSize / 2, photoY + photoSize / 2 + 2, { align: 'center' });
      }
    } else {
      // Photo placeholder
      doc.setFillColor(45, 45, 60);
      doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 'F');
      doc.setDrawColor(80, 80, 100);
      doc.setLineWidth(1);
      doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, 'S');
      doc.setTextColor(...colors.textMuted);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('N/A', photoX + photoSize / 2, photoY + photoSize / 2 + 3, { align: 'center' });
    }

    // Candidate Info
    const infoX = photoX + photoSize + 15;
    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(userData.name || 'Candidate', infoX, cardY + 18);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.textSecondary);
    doc.text(`ID: ${candidateId.current}`, infoX, cardY + 28);
    doc.text(`Email: ${userData.email || 'Not provided'}`, infoX, cardY + 36);
    doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, infoX, cardY + 44);

    y = cardY + 60;

    // Archetype Section
    drawRoundedRect(15, y, pageWidth - 30, 35, 3, [40, 30, 60], [100, 60, 150]);

    doc.setTextColor(...colors.accentPrimary);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('YOUR PRIMARY PERSONALITY ARCHETYPE', 25, y + 10);

    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(20);
    doc.text(badge.title, 25, y + 23);

    // Archetype decorative accent on the right
    doc.setFillColor(...colors.accentPrimary);
    doc.roundedRect(pageWidth - 50, y + 8, 20, 20, 3, 3, 'F');
    doc.setFillColor(...colors.accentSecondary);
    doc.roundedRect(pageWidth - 47, y + 11, 14, 14, 2, 2, 'F');

    y += 45;

    // HEXACO Personality Profile Section
    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('HEXACO Personality Profile', 15, y);
    y += 8;

    // Trait Cards
    Object.entries(hexacoResults.percentages || {}).forEach(([trait, score]) => {
      const analysis = traitAnalysis[trait];
      const level = getScoreLevel(score);
      const levelColor = getLevelColor(level);

      if (y > 260) {
        doc.addPage();
        doc.setFillColor(...colors.bgDark);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        y = 20;
      }

      // Trait row background
      drawRoundedRect(15, y, pageWidth - 30, 18, 2, colors.bgCard);

      // Trait icon and name
      doc.setTextColor(...colors.textPrimary);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(getPdfTraitLabel(trait, analysis), 20, y + 8);

      // Score percentage
      doc.setTextColor(...colors.accentPrimary);
      doc.setFontSize(12);
      doc.text(`${score}%`, pageWidth - 40, y + 8);

      // Level badge
      doc.setFillColor(...levelColor);
      const levelText = getScoreLabel(score);
      const levelWidth = doc.getTextWidth(levelText) + 8;
      doc.roundedRect(pageWidth - 40 - levelWidth - 5, y + 3, levelWidth, 6, 1, 1, 'F');
      doc.setTextColor(...colors.bgDark);
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.text(levelText, pageWidth - 40 - levelWidth / 2 - 2, y + 7.5, { align: 'center' });

      // Progress bar
      drawGradientBar(20, y + 12, 100, 3, score, colors.accentPrimary, colors.accentSecondary);

      y += 22;
    });

    y += 5;

    // === COGNITIVE PERFORMANCE SECTION ===
    if (y > 200) {
      doc.addPage();
      doc.setFillColor(...colors.bgDark);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      y = 20;
    }

    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Cognitive Performance Analysis', 15, y);
    y += 12;

    // Cognitive cards
    const cogData = [
      { label: 'Non-Verbal Reasoning', score: nvPercent, detail: `${nvScore}/${nonVerbalQuestions.length} correct`, level: nvLevel, icon: 'NV' },
      { label: 'Verbal Reasoning', score: vPercent, detail: `${vScore}/${totalV} correct`, level: vLevel, icon: 'VR' },
      { label: 'Overall Cognitive', score: cognitiveAvg, detail: 'Combined score', level: overallLevel, icon: 'OC' }
    ];

    const cardWidth = (pageWidth - 45) / 3;
    cogData.forEach((cog, i) => {
      const cardX = 15 + i * (cardWidth + 7);

      // Card background
      if (i === 2) {
        drawRoundedRect(cardX, y, cardWidth, 45, 3, [45, 30, 70], [100, 60, 150]);
      } else {
        drawRoundedRect(cardX, y, cardWidth, 45, 3, colors.bgCard, [60, 60, 80]);
      }

      // Icon text
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...(i === 2 ? colors.accentSecondary : colors.accentPrimary));
      doc.text(cog.icon, cardX + 8, y + 14);

      // Badge
      doc.setFillColor(...(cog.level.color === '#10b981' ? colors.accentSuccess :
        cog.level.color === '#22c55e' ? [34, 197, 94] :
          cog.level.color === '#f59e0b' ? [245, 158, 11] :
            cog.level.color === '#f97316' ? colors.accentWarning :
              [239, 68, 68]));
      doc.roundedRect(cardX + cardWidth - 35, y + 6, 28, 6, 1, 1, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(5);
      doc.setFont('helvetica', 'bold');
      doc.text(cog.level.label.toUpperCase(), cardX + cardWidth - 21, y + 10.5, { align: 'center' });

      // Score
      doc.setTextColor(...(i === 2 ? colors.accentSecondary : colors.textPrimary));
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(`${cog.score}%`, cardX + cardWidth / 2, y + 30, { align: 'center' });

      // Label
      doc.setTextColor(...colors.textMuted);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text(cog.label, cardX + cardWidth / 2, y + 38, { align: 'center' });
    });

    y += 55;

    // === SECTION TIMING SUMMARY ===
    if (Object.keys(sectionTimings).length > 0) {
      if (y > 200) {
        doc.addPage();
        doc.setFillColor(...colors.bgDark);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        y = 20;
      }

      doc.setTextColor(...colors.textPrimary);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Assessment Timing Summary', 15, y);
      y += 5;

      const totalTime = Object.values(sectionTimings).reduce((sum, t) => sum + (t.elapsed || 0), 0);
      doc.setTextColor(...colors.textMuted);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total assessment time: ${Math.floor(totalTime / 60)}m ${String(totalTime % 60).padStart(2, '0')}s`, 15, y + 4);
      y += 10;

      const timingSections = [
        { key: 'hexaco', label: 'HEXACO Personality', timed: false },
        { key: 'persona', label: 'Cognitive Style', timed: false },
        { key: 'nonVerbal', label: 'Non-Verbal Reasoning', timed: true, limit: testTimeLimits.nonVerbal },
        { key: 'verbal', label: 'Verbal Reasoning', timed: true, limit: testTimeLimits.verbal }
      ];

      const colW = (pageWidth - 35) / 4;
      timingSections.forEach((sec, i) => {
        const t = sectionTimings[sec.key];
        if (!t) return;
        const cx = 15 + i * (colW + 5);

        // Card bg
        if (t.timedOut) {
          drawRoundedRect(cx, y, colW, 30, 2, [60, 20, 20], [200, 60, 60]);
        } else {
          drawRoundedRect(cx, y, colW, 30, 2, colors.bgCard, [60, 60, 80]);
        }

        // Label
        doc.setTextColor(...colors.textMuted);
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.text(sec.label, cx + colW / 2, y + 7, { align: 'center' });

        // Time value
        doc.setTextColor(...colors.textPrimary);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        const mins = Math.floor((t.elapsed || 0) / 60);
        const secs = (t.elapsed || 0) % 60;
        doc.text(`${mins}m ${String(secs).padStart(2, '0')}s`, cx + colW / 2, y + 18, { align: 'center' });

        // Detail
        doc.setTextColor(...colors.textMuted);
        doc.setFontSize(5.5);
        doc.setFont('helvetica', 'normal');
        if (t.timedOut) {
          doc.setTextColor(255, 100, 100);
          doc.text(`TIMED OUT (${t.questionsAnswered}/${t.totalQuestions})`, cx + colW / 2, y + 25, { align: 'center' });
        } else if (t.questionsAnswered !== undefined) {
          doc.text(`${t.questionsAnswered}/${t.totalQuestions} answered`, cx + colW / 2, y + 25, { align: 'center' });
        } else {
          doc.text('Untimed', cx + colW / 2, y + 25, { align: 'center' });
        }
      });

      y += 40;
    }

    // === PROFILE SUMMARY ===
    if (y > 210) {
      doc.addPage();
      doc.setFillColor(...colors.bgDark);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      y = 20;
    }

    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Comprehensive Profile Summary', 15, y);
    y += 10;

    // Summary card
    drawRoundedRect(15, y, pageWidth - 30, 55, 3, colors.bgCard, [60, 60, 80]);

    doc.setTextColor(...colors.textSecondary);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const summary = generatePersonalitySummary(hexacoResults.percentages || {});
    const summaryLines = doc.splitTextToSize(summary, pageWidth - 50);
    doc.text(summaryLines.slice(0, 8), 22, y + 10);

    // === PAGE 3: DETAILED TRAIT ANALYSIS ===
    doc.addPage();
    doc.setFillColor(...colors.bgDark);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    y = 20;

    // Page header
    doc.setFillColor(...colors.accentPrimary);
    doc.rect(0, 0, pageWidth, 6, 'F');

    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Trait Analysis', 15, y);
    y += 12;

    // Add detailed analysis for each trait
    Object.entries(hexacoResults.percentages || {}).forEach(([trait, score]) => {
      const analysis = traitAnalysis[trait];
      const level = getScoreLevel(score);
      const interp = analysis?.interpretations?.[level];
      const levelColor = getLevelColor(level);

      if (y > 240) {
        doc.addPage();
        doc.setFillColor(...colors.bgDark);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        doc.setFillColor(...colors.accentPrimary);
        doc.rect(0, 0, pageWidth, 6, 'F');
        y = 20;
      }

      // Trait header
      drawRoundedRect(15, y, pageWidth - 30, 10, 2, [40, 40, 55]);
      doc.setTextColor(...colors.textPrimary);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${getPdfTraitLabel(trait, analysis)} - ${score}%`, 20, y + 7);

      // Level badge
      doc.setFillColor(...levelColor);
      doc.roundedRect(pageWidth - 55, y + 2, 30, 6, 1, 1, 'F');
      doc.setTextColor(...colors.bgDark);
      doc.setFontSize(6);
      doc.text(getScoreLabel(score), pageWidth - 40, y + 6, { align: 'center' });
      y += 14;

      // Interpretation summary
      if (interp?.summary) {
        doc.setTextColor(...colors.textSecondary);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        const interpLines = doc.splitTextToSize(interp.summary, pageWidth - 35);
        doc.text(interpLines.slice(0, 3), 20, y);
        y += interpLines.slice(0, 3).length * 4 + 4;
      }

      // Strengths
      if (interp?.strengths && interp.strengths.length > 0) {
        doc.setTextColor(...colors.accentSuccess);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.text('Strengths:', 20, y);
        doc.setTextColor(...colors.textSecondary);
        doc.setFont('helvetica', 'normal');
        interp.strengths.slice(0, 2).forEach((s, i) => {
          doc.text(`• ${s}`, 25, y + 4 + i * 4);
        });
        y += 12;
      }

      // Challenges
      if (interp?.challenges && interp.challenges.length > 0) {
        doc.setTextColor(...colors.accentWarning);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.text('Areas of Improvement:', 20, y);
        doc.setTextColor(...colors.textSecondary);
        doc.setFont('helvetica', 'normal');
        interp.challenges.slice(0, 2).forEach((c, i) => {
          doc.text(`• ${c}`, 25, y + 4 + i * 4);
        });
        y += 14;
      }

      // Growth Opportunities (Keywords)
      if (interp?.growthAreas && interp.growthAreas.length > 0) {
        doc.setTextColor(...colors.accentSuccess);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.text('Growth Opportunities:', 20, y);
        doc.setTextColor(...colors.textSecondary);
        doc.setFont('helvetica', 'normal');
        const keywords = interp.growthAreas.join(', ');
        doc.text(keywords, 25, y + 4);
        y += 10;
      }
    });

    // === PAGE 4: COUNSELOR INSIGHTS ===
    doc.addPage();
    doc.setFillColor(...colors.bgDark);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    y = 20;

    // Page header
    doc.setFillColor(...colors.accentSecondary);
    doc.rect(0, 0, pageWidth, 6, 'F');

    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Professional Insights', 15, y);
    y += 8;
    doc.setTextColor(...colors.textMuted);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('For counselors, educators, and mental health professionals', 15, y);
    y += 15;

    // Disclaimer
    drawRoundedRect(15, y, pageWidth - 30, 18, 2, [60, 40, 30], [249, 115, 22]);
    doc.setTextColor(...colors.accentWarning);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Note:', 20, y + 7);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont('helvetica', 'normal');
    doc.text('These insights are intended to support understanding of the candidate\'s profile.', 35, y + 7);
    doc.text('They should be used as one component of a comprehensive assessment approach.', 20, y + 13);
    y += 25;

    // Counselor notes for each trait
    Object.entries(hexacoResults.percentages || {}).forEach(([trait, score]) => {
      const analysis = traitAnalysis[trait];
      const level = getScoreLevel(score);
      const interp = analysis?.interpretations?.[level];

      if (!interp?.counselorNotes) return;

      if (y > 250) {
        doc.addPage();
        doc.setFillColor(...colors.bgDark);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        doc.setFillColor(...colors.accentSecondary);
        doc.rect(0, 0, pageWidth, 6, 'F');
        y = 20;
      }

      doc.setTextColor(...colors.accentPrimary);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`${getPdfTraitLabel(trait, analysis)} (${getScoreLabel(score)})`, 15, y);
      y += 6;

      doc.setTextColor(...colors.textSecondary);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      const noteLines = doc.splitTextToSize(interp.counselorNotes, pageWidth - 35);
      doc.text(noteLines.slice(0, 4), 15, y);
      y += noteLines.slice(0, 4).length * 4 + 8;
    });

    // Focus Areas
    if (y > 240) {
      doc.addPage();
      doc.setFillColor(...colors.bgDark);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      y = 20;
    }

    y += 5;
    drawRoundedRect(15, y, pageWidth - 30, 35, 3, [30, 45, 40], [16, 185, 129]);
    doc.setTextColor(...colors.accentSuccess);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Focus Areas for Development', 20, y + 10);

    doc.setTextColor(...colors.textSecondary);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const focusAreas = generateCounselorFocusAreas(hexacoResults.percentages || {});
    const focusText = focusAreas.length > 0
      ? focusAreas.map(a => `[${a.priority}] ${a.area}: ${a.concern}`).join('\n')
      : 'No significant concerns identified based on this assessment.';
    const focusLines = doc.splitTextToSize(focusText, pageWidth - 45);
    doc.text(focusLines.slice(0, 4), 20, y + 18);

    // Footer on all pages - Add page numbers
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setTextColor(...colors.textMuted);
      doc.setFontSize(8);
      doc.text(`LExam Assessment Battery • Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

      // Bottom accent bar
      doc.setFillColor(...colors.accentSecondary);
      doc.rect(0, pageHeight - 4, pageWidth * 0.4, 4, 'F');
      doc.setFillColor(...colors.accentPrimary);
      doc.rect(pageWidth * 0.4, pageHeight - 4, pageWidth * 0.6, 4, 'F');
    }

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

  // Download results as JSON file
  const downloadResultsData = () => {
    const cogScores = (() => {
      let nvScore = 0;
      Object.keys(nvResults).forEach(idx => {
        if (nonVerbalQuestions[idx]?.correctAnswer === nvResults[idx]) nvScore++;
      });
      let vScore = 0, totalV = 0;
      verbalQuestions.forEach(p => {
        p.questions.forEach(q => {
          totalV++;
          if (vResults[q.id] === q.correctAnswer) vScore++;
        });
      });
      return { nvScore, nvTotal: nonVerbalQuestions.length, vScore, vTotal: totalV };
    })();

    const resultsData = {
      exportDate: new Date().toISOString(),
      sessionId: candidateId.current,
      candidate: {
        name: userData.name || 'N/A',
        email: userData.email || 'N/A'
      },
      hexacoScores: hexacoResults.percentages || {},
      cognitiveScores: cogScores,
      primaryArchetype: archetype,
      sectionTimings: sectionTimings,
      answers: {
        hexaco: 'See percentages above',
        persona: personaResults,
        nonVerbal: nvResults,
        verbal: vResults
      }
    };

    const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `test-results-${candidateId.current}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="section results-section detailed-results">
      {/* Results Header with Prominent Photo */}
      <div className="results-header-new">
        <div className="results-title-row">
          <h1>Comprehensive Assessment <span className="gradient-text">Report</span></h1>
          <div className="download-buttons">
            <button className="btn btn-primary download-btn" onClick={downloadPDF}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download PDF Report
            </button>
            <button className="btn btn-outline download-btn" onClick={downloadResultsData}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Download Data (JSON)
            </button>
          </div>
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
                          <h5>⚠️ Areas of Improvement</h5>
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

      {/* Section Timing Summary */}
      {Object.keys(sectionTimings).length > 0 && (
        <div className="timing-section">
          <h2 className="section-title">Assessment Timing Summary</h2>
          <p className="section-subtitle">Time taken per section — Total: {formatTime(totalTestTime)}</p>
          <div className="timing-grid">
            {[
              { key: 'hexaco', label: 'HEXACO Personality', limit: null },
              { key: 'persona', label: 'Cognitive Style', limit: null },
              { key: 'nonVerbal', label: 'Non-Verbal Reasoning', limit: testTimeLimits.nonVerbal },
              { key: 'verbal', label: 'Verbal Reasoning', limit: testTimeLimits.verbal }
            ].map(sec => {
              const t = sectionTimings[sec.key];
              if (!t) return null;
              return (
                <div key={sec.key} className={`timing-card ${t.timedOut ? 'timed-out' : ''}`}>
                  <div className="timing-card-header">
                    <span className="timing-label">{sec.label}</span>
                    {t.timedOut && <span className="timeout-badge">TIMED OUT</span>}
                  </div>
                  <div className="timing-value">{formatTime(t.elapsed)}</div>
                  {sec.limit && (
                    <div className="timing-detail">
                      {t.questionsAnswered !== undefined
                        ? `${t.questionsAnswered} / ${t.totalQuestions} answered`
                        : `Limit: ${formatTime(sec.limit)}`}
                    </div>
                  )}
                  {!sec.limit && <div className="timing-detail">Untimed section</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

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
              {(() => {
                const areas = generateCounselorFocusAreas(hexacoResults.percentages || {});
                return areas.length > 0 ? (
                  <ul className="focus-areas-list">
                    {areas.map((area, idx) => (
                      <li key={idx} className={`focus-area-item priority-${area.priority.toLowerCase()}`}>
                        <span className="focus-area-badge">{area.priority}</span>
                        <strong>{area.area}</strong>
                        <p>{area.concern}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-focus-areas">No significant concerns identified based on this assessment.</p>
                );
              })()}
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
  },
  sectionTimings: {
    hexaco: { elapsed: 485, timedOut: false },
    persona: { elapsed: 142, timedOut: false },
    nonVerbal: { elapsed: 720, timedOut: false, questionsAnswered: 20, totalQuestions: 20 },
    verbal: { elapsed: 480, timedOut: false, questionsAnswered: 20, totalQuestions: 20 }
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Generate unique session ID
  const sessionId = useRef(Math.random().toString(36).substr(2, 9).toUpperCase());

  // Results Storage
  const [hexacoAnswers, setHexacoAnswers] = useState({});
  const [personaAnswers, setPersonaAnswers] = useState(isDevMode ? mockDevModeData.personaAnswers : []);
  const [nvAnswers, setNvAnswers] = useState(isDevMode ? mockDevModeData.nvAnswers : {});
  const [vAnswers, setVAnswers] = useState(isDevMode ? mockDevModeData.vAnswers : {});

  const [hexacoCalculated, setHexacoCalculated] = useState(isDevMode ? mockDevModeData.hexacoResults : { percentages: {} });

  // Section timing tracking
  const [sectionTimings, setSectionTimings] = useState(isDevMode ? mockDevModeData.sectionTimings : {});
  const phaseStartTime = useRef(null);

  // Record section start time when phase changes
  useEffect(() => {
    if (['test-hexaco', 'test-persona', 'test-nonverbal', 'test-verbal'].includes(phase)) {
      phaseStartTime.current = Date.now();
    }
  }, [phase]);

  const recordSectionTiming = (section, extra = {}) => {
    const elapsed = phaseStartTime.current ? Math.round((Date.now() - phaseStartTime.current) / 1000) : 0;
    setSectionTimings(prev => ({
      ...prev,
      [section]: { elapsed, timedOut: false, ...extra }
    }));
  };

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
    return percentages;
  };

  // Calculate cognitive scores
  const calculateCognitiveScores = () => {
    let nvScore = 0;
    Object.keys(nvAnswers).forEach(idx => {
      if (nonVerbalQuestions[idx]?.correctAnswer === nvAnswers[idx]) nvScore++;
    });

    let vScore = 0;
    let totalV = 0;
    verbalQuestions.forEach(p => {
      p.questions.forEach(q => {
        totalV++;
        if (vAnswers[q.id] === q.correctAnswer) vScore++;
      });
    });

    return {
      nvScore,
      nvTotal: nonVerbalQuestions.length,
      vScore,
      vTotal: totalV,
      cognitiveAvg: Math.round(((nvScore / nonVerbalQuestions.length) + (vScore / totalV)) / 2 * 100)
    };
  };

  // Get primary archetype from persona answers
  const getPrimaryArchetype = () => {
    const typeCounts = {};
    personaAnswers.forEach(r => {
      if (r) {
        typeCounts[r.type] = (typeCounts[r.type] || 0) + r.score;
      }
    });
    return Object.keys(typeCounts).reduce((a, b) => typeCounts[a] > typeCounts[b] ? a : b, 'Generalist');
  };

  // Submit results to Supabase
  const handleSubmitResults = async () => {
    if (isDevMode) return; // Don't submit in dev mode

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload photo if exists
      let photoUrl = null;
      if (userData.photo) {
        photoUrl = await uploadPhoto(userData.photo, sessionId.current);
      }

      // Calculate scores
      const cogScores = calculateCognitiveScores();
      const archetype = getPrimaryArchetype();

      // Prepare test data
      const testData = {
        session_id: sessionId.current,
        candidate_name: userData.name,
        candidate_email: userData.email,
        photo_url: photoUrl,
        hexaco_percentages: hexacoCalculated.percentages,
        persona_answers: personaAnswers,
        nv_score: cogScores.nvScore,
        nv_total: cogScores.nvTotal,
        nv_answers: nvAnswers,
        v_score: cogScores.vScore,
        v_total: cogScores.vTotal,
        v_answers: vAnswers,
        cognitive_average: cogScores.cognitiveAvg,
        primary_archetype: archetype
      };

      const result = await submitTestResults(testData);

      if (!result.success) {
        console.error('Failed to submit results:', result.error);
        setSubmitError('Results saved locally. Online sync pending.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitError('Results saved locally. Online sync pending.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle completion and submit
  const handleTestComplete = async () => {
    await handleSubmitResults();
    setPhase('results');
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
          recordSectionTiming('hexaco');
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
        onComplete={() => {
          recordSectionTiming('persona');
          setPhase('test-nonverbal');
        }}
      />}

      {phase === 'test-nonverbal' && <NonVerbalTest
        answers={nvAnswers}
        onAnswer={(idx, val) => setNvAnswers({ ...nvAnswers, [idx]: val })}
        onComplete={(info = {}) => {
          const elapsed = phaseStartTime.current ? Math.round((Date.now() - phaseStartTime.current) / 1000) : 0;
          setSectionTimings(prev => ({
            ...prev,
            nonVerbal: {
              elapsed,
              timedOut: info.timedOut || false,
              questionsAnswered: info.questionsAnswered || Object.keys(nvAnswers).length,
              totalQuestions: nonVerbalQuestions.length
            }
          }));
          setPhase('test-verbal');
        }}
      />}

      {phase === 'test-verbal' && <VerbalTest
        answers={vAnswers}
        onAnswer={(qId, val) => setVAnswers({ ...vAnswers, [qId]: val })}
        onComplete={(info = {}) => {
          const elapsed = phaseStartTime.current ? Math.round((Date.now() - phaseStartTime.current) / 1000) : 0;
          let totalVQ = 0;
          verbalQuestions.forEach(p => p.questions.forEach(() => totalVQ++));
          setSectionTimings(prev => ({
            ...prev,
            verbal: {
              elapsed,
              timedOut: info.timedOut || false,
              questionsAnswered: info.questionsAnswered || Object.keys(vAnswers).length,
              totalQuestions: totalVQ
            }
          }));
          setPhase('completion');
        }}
      />}

      {phase === 'completion' && <CompletionModal
        onShowResults={handleTestComplete}
        isSubmitting={isSubmitting}
      />}

      {phase === 'results' && <GamifiedResults
        hexacoResults={hexacoCalculated}
        personaResults={personaAnswers}
        nvResults={nvAnswers}
        vResults={vAnswers}
        userData={userData}
        sessionId={sessionId.current}
        submitError={submitError}
        sectionTimings={sectionTimings}
      />}

    </div>
  );
}

export default App;
