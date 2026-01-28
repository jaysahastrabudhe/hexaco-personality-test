import { useState, useEffect } from 'react';
import './index.css';
import { questions, traitDescriptions, traitColors } from './data/questions';
import {
  traitAnalysis,
  personalityPatterns,
  generatePersonalitySummary,
  generateCounselorFocusAreas,
  getScoreLevel,
  getScoreLabel
} from './data/personalityInsights';
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

// Results Section Component with Enhanced Insights
function ResultsSection({ results, userData, onRetake }) {
  const { percentages } = results;
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedTrait, setExpandedTrait] = useState(null);

  // Generate personality insights
  const patterns = personalityPatterns.analyzePatterns(percentages);
  const personalitySummary = generatePersonalitySummary(percentages);
  const counselorFocusAreas = generateCounselorFocusAreas(percentages);

  // Get trait analysis for each score
  const getTraitInsight = (trait, score) => {
    const level = getScoreLevel(score);
    return traitAnalysis[trait].interpretations[level];
  };

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      const primaryColor = [54, 99, 173];
      const accentColor = [37, 188, 189];
      const darkColor = [22, 14, 68];

      // Helper function to check and add new page
      const checkPageBreak = (yPos, requiredSpace = 20) => {
        if (yPos > pageHeight - margin - requiredSpace) {
          doc.addPage();
          return margin + 5;
        }
        return yPos;
      };

      // Helper to draw section header (compact)
      const drawSectionHeader = (text, yPos, color = primaryColor) => {
        doc.setFillColor(...color);
        doc.rect(margin, yPos, contentWidth, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(text, margin + 3, yPos + 4.5);
        return yPos + 9;
      };

      // ========== PAGE 1: Cover & Overview ==========
      doc.setFillColor(...darkColor);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('HEXACO Personality Profile', pageWidth / 2, 18, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Comprehensive Assessment Report', pageWidth / 2, 28, { align: 'center' });
      doc.setFontSize(9);
      doc.text('Prepared for: ' + userData.name + ' | ' + userData.testDate, pageWidth / 2, 36, { align: 'center' });

      let yPos = 48;

      // Executive Summary
      yPos = drawSectionHeader('Executive Summary', yPos);
      doc.setTextColor(50, 50, 50);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const summaryLines = doc.splitTextToSize(personalitySummary, contentWidth);
      doc.text(summaryLines, margin, yPos);
      yPos += summaryLines.length * 3.5 + 6;

      // Dimension Scores
      yPos = drawSectionHeader('Dimension Scores', yPos, accentColor);
      const traits = ['H', 'E', 'X', 'A', 'C', 'O'];
      const barWidth = 80;
      const barHeight = 5;

      traits.forEach(trait => {
        const score = percentages[trait];
        const analysis = traitAnalysis[trait];
        const level = getScoreLabel(score);

        doc.setTextColor(50, 50, 50);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(analysis.name, margin, yPos);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.text(score + '% (' + level + ')', pageWidth - margin, yPos, { align: 'right' });

        doc.setFillColor(220, 220, 220);
        doc.rect(margin, yPos + 1.5, barWidth, barHeight, 'F');
        doc.setFillColor(...primaryColor);
        doc.rect(margin, yPos + 1.5, (score / 100) * barWidth, barHeight, 'F');
        yPos += 10;
      });

      yPos += 4;

      // Personality Patterns on same page if space
      yPos = checkPageBreak(yPos, 40);
      yPos = drawSectionHeader('Personality Patterns', yPos, darkColor);

      if (patterns.length > 0) {
        patterns.forEach(pattern => {
          yPos = checkPageBreak(yPos, 20);
          doc.setTextColor(...primaryColor);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.text(pattern.name, margin, yPos);
          yPos += 4;
          doc.setTextColor(60, 60, 60);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          const patternLines = doc.splitTextToSize(pattern.description, contentWidth);
          doc.text(patternLines, margin, yPos);
          yPos += patternLines.length * 3 + 5;
        });
      } else {
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.text('No distinct personality patterns identified.', margin, yPos);
        yPos += 8;
      }

      // ========== TRAIT ANALYSIS PAGES ==========
      traits.forEach(trait => {
        doc.addPage();
        const score = percentages[trait];
        const analysis = traitAnalysis[trait];
        const insight = getTraitInsight(trait, score);
        const level = getScoreLabel(score);

        // Compact header
        doc.setFillColor(...darkColor);
        doc.rect(0, 0, pageWidth, 25, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(analysis.name + ' (' + score + '% - ' + level + ')', pageWidth / 2, 16, { align: 'center' });

        yPos = 32;

        // Core description
        doc.setTextColor(70, 70, 70);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        const coreLines = doc.splitTextToSize(analysis.coreDescription, contentWidth);
        doc.text(coreLines, margin, yPos);
        yPos += coreLines.length * 3.5 + 5;

        // Your Profile
        yPos = drawSectionHeader('Your Profile', yPos);
        doc.setTextColor(50, 50, 50);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        const interpLines = doc.splitTextToSize(insight.summary, contentWidth);
        doc.text(interpLines, margin, yPos);
        yPos += interpLines.length * 3.5 + 6;

        // Two-column layout for Strengths and Challenges
        const colWidth = (contentWidth - 5) / 2;
        let leftY = yPos;
        let rightY = yPos;

        // Strengths (left column)
        doc.setFillColor(...accentColor);
        doc.rect(margin, leftY, colWidth, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('Strengths', margin + 2, leftY + 4.5);
        leftY += 8;

        doc.setTextColor(50, 50, 50);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        insight.strengths.slice(0, 4).forEach(strength => {
          const sLines = doc.splitTextToSize('- ' + strength, colWidth - 2);
          doc.text(sLines, margin + 1, leftY);
          leftY += sLines.length * 3 + 1;
        });

        // Challenges (right column)
        doc.setFillColor(180, 100, 100);
        doc.rect(margin + colWidth + 5, rightY, colWidth, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('Challenges', margin + colWidth + 7, rightY + 4.5);
        rightY += 8;

        doc.setTextColor(50, 50, 50);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        insight.challenges.slice(0, 4).forEach(challenge => {
          const cLines = doc.splitTextToSize('- ' + challenge, colWidth - 2);
          doc.text(cLines, margin + colWidth + 6, rightY);
          rightY += cLines.length * 3 + 1;
        });

        yPos = Math.max(leftY, rightY) + 5;

        // Growth Recommendations
        yPos = checkPageBreak(yPos, 30);
        doc.setFillColor(80, 140, 80);
        doc.rect(margin, yPos, contentWidth, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('Growth Recommendations', margin + 2, yPos + 4.5);
        yPos += 8;

        doc.setTextColor(50, 50, 50);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        insight.growthAreas.slice(0, 3).forEach(growth => {
          const gLines = doc.splitTextToSize('- ' + growth, contentWidth - 2);
          doc.text(gLines, margin + 1, yPos);
          yPos += gLines.length * 3 + 1;
        });
        yPos += 4;

        // Facets (compact grid)
        yPos = checkPageBreak(yPos, 40);
        yPos = drawSectionHeader('Component Facets', yPos, darkColor);
        doc.setFontSize(7);
        const facetList = Object.values(analysis.facets);
        facetList.forEach(facet => {
          yPos = checkPageBreak(yPos, 10);
          doc.setTextColor(...primaryColor);
          doc.setFont('helvetica', 'bold');
          doc.text(facet.name + ': ', margin, yPos);
          const nameWidth = doc.getTextWidth(facet.name + ': ');
          doc.setTextColor(60, 60, 60);
          doc.setFont('helvetica', 'normal');
          const facetLines = doc.splitTextToSize(facet.description, contentWidth - nameWidth - 2);
          doc.text(facetLines, margin + nameWidth, yPos);
          yPos += Math.max(facetLines.length * 3, 4) + 2;
        });
      });

      // ========== COUNSELOR NOTES PAGE ==========
      doc.addPage();
      doc.setFillColor(...darkColor);
      doc.rect(0, 0, pageWidth, 20, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Clinical / Counselor Notes (Confidential)', pageWidth / 2, 14, { align: 'center' });

      yPos = 28;

      // Focus Areas
      if (counselorFocusAreas.length > 0) {
        yPos = drawSectionHeader('Priority Focus Areas', yPos);
        counselorFocusAreas.forEach(area => {
          yPos = checkPageBreak(yPos, 20);
          const priorityColor = area.priority === 'HIGH' ? [180, 80, 80] : [180, 140, 80];
          doc.setFillColor(...priorityColor);
          doc.rect(margin, yPos, 3, 12, 'F');

          doc.setTextColor(50, 50, 50);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.text('[' + area.priority + '] ' + area.area, margin + 5, yPos + 3);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          const concernLines = doc.splitTextToSize(area.concern + ' | Explore: ' + area.suggestedExploration, contentWidth - 8);
          doc.text(concernLines, margin + 5, yPos + 8);
          yPos += 8 + concernLines.length * 3 + 4;
        });
      }

      // Clinical Notes
      yPos = checkPageBreak(yPos, 20);
      yPos = drawSectionHeader('Trait-Specific Clinical Notes', yPos, accentColor);

      traits.forEach(trait => {
        yPos = checkPageBreak(yPos, 15);
        const score = percentages[trait];
        const analysis = traitAnalysis[trait];
        const insight = getTraitInsight(trait, score);

        doc.setTextColor(...primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.text(trait + ' - ' + analysis.name + ' (' + score + '%):', margin, yPos);
        yPos += 4;

        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        const noteLines = doc.splitTextToSize(insight.counselorNotes, contentWidth);
        doc.text(noteLines, margin, yPos);
        yPos += noteLines.length * 3 + 5;
      });

      // Footer on all pages
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setTextColor(140, 140, 140);
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.text('HEXACO-PI-R | Lee & Ashton | Confidential', pageWidth / 2, pageHeight - 8, { align: 'center' });
        doc.text('Page ' + i + '/' + totalPages, pageWidth - margin, pageHeight - 8, { align: 'right' });
      }

      // Save
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'HEXACO_Report_' + userData.name.replace(/\s+/g, '_') + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF: ' + error.message);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="results-overview">
            {/* Executive Summary */}
            <div className="summary-card">
              <h3>📊 Personality Profile Summary</h3>
              <p className="summary-text">{personalitySummary}</p>
            </div>

            {/* Score Chart */}
            <div className="results-chart">
              <h3>Dimension Scores</h3>
              <div className="chart-container">
                {Object.entries(percentages).map(([trait, score]) => {
                  const analysis = traitAnalysis[trait];
                  const level = getScoreLabel(score);
                  return (
                    <div key={trait} className="trait-bar enhanced">
                      <div className="bar-label">
                        <span className="trait-icon">{analysis.icon}</span>
                        <span className="trait-name">{analysis.name}</span>
                        <span className="trait-level">{level}</span>
                        <span className="trait-score">{score}%</span>
                      </div>
                      <div className="bar-track">
                        <div className="bar-markers">
                          <span className="marker" style={{ left: '20%' }}>20</span>
                          <span className="marker" style={{ left: '40%' }}>40</span>
                          <span className="marker" style={{ left: '60%' }}>60</span>
                          <span className="marker" style={{ left: '80%' }}>80</span>
                        </div>
                        <div
                          className="bar-fill animated"
                          style={{
                            width: `${score}%`,
                            background: traitColors[trait].gradient
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Insights */}
            <div className="quick-insights">
              <h3>✨ Key Insights</h3>
              <div className="insights-grid">
                {Object.entries(percentages).map(([trait, score]) => {
                  const insight = getTraitInsight(trait, score);
                  const analysis = traitAnalysis[trait];
                  return (
                    <div key={trait} className="insight-card" onClick={() => {
                      setActiveTab('detailed');
                      setExpandedTrait(trait);
                    }}>
                      <div className="insight-header">
                        <span className="insight-icon">{analysis.icon}</span>
                        <span className="insight-title">{trait}</span>
                      </div>
                      <p className="insight-summary">{insight.summary.substring(0, 120)}...</p>
                      <span className="insight-more">Click for details →</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'detailed':
        return (
          <div className="detailed-analysis">
            {Object.entries(percentages).map(([trait, score]) => {
              const insight = getTraitInsight(trait, score);
              const analysis = traitAnalysis[trait];
              const level = getScoreLabel(score);
              const isExpanded = expandedTrait === trait;

              return (
                <div
                  key={trait}
                  className={`trait-analysis-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => setExpandedTrait(isExpanded ? null : trait)}
                >
                  <div className="trait-analysis-header">
                    <div className="trait-title-section">
                      <span className="trait-icon-large">{analysis.icon}</span>
                      <div>
                        <h3>{analysis.name}</h3>
                        <p className="trait-core-desc">{analysis.coreDescription}</p>
                      </div>
                    </div>
                    <div className="trait-score-section">
                      <div className="score-circle" style={{ background: traitColors[trait].gradient }}>
                        <span className="score-value">{score}%</span>
                      </div>
                      <span className="score-level">{level}</span>
                    </div>
                  </div>

                  <div className="trait-analysis-body">
                    <div className="interpretation-section">
                      <h4>Your Profile</h4>
                      <p>{insight.summary}</p>
                    </div>

                    <div className="traits-grid">
                      <div className="trait-column strengths">
                        <h4>💪 Strengths</h4>
                        <ul>
                          {insight.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                      <div className="trait-column challenges">
                        <h4>⚠️ Potential Challenges</h4>
                        <ul>
                          {insight.challenges.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>
                      <div className="trait-column growth">
                        <h4>🌱 Growth Recommendations</h4>
                        <ul>
                          {insight.growthAreas.map((g, i) => <li key={i}>{g}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="facets-section">
                      <h4>Component Facets</h4>
                      <div className="facets-grid">
                        {Object.entries(analysis.facets).map(([key, facet]) => (
                          <div key={key} className="facet-item">
                            <strong>{facet.name}</strong>
                            <p>{facet.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'patterns':
        return (
          <div className="personality-patterns">
            <div className="patterns-intro">
              <h3>🧩 Personality Patterns</h3>
              <p>
                These patterns emerge from the unique combination of your trait scores.
                They represent meaningful configurations that can provide deeper insights
                into your personality style.
              </p>
            </div>

            {patterns.length > 0 ? (
              <div className="patterns-list">
                {patterns.map((pattern, index) => (
                  <div key={index} className="pattern-card">
                    <div className="pattern-header">
                      <span className="pattern-icon">{pattern.icon}</span>
                      <h4>{pattern.name}</h4>
                    </div>
                    <p className="pattern-description">{pattern.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-patterns">
                <p>Your scores are relatively balanced across dimensions, without forming distinct recognizable patterns. This suggests adaptability across various situations.</p>
              </div>
            )}

            <div className="trait-interactions">
              <h3>🔗 How Your Traits Interact</h3>
              <div className="interactions-grid">
                {percentages.H > 60 && percentages.A > 60 && (
                  <div className="interaction-card positive">
                    <h5>H + A Synergy</h5>
                    <p>Your high Honesty-Humility combined with high Agreeableness creates a deeply cooperative and trustworthy interpersonal style.</p>
                  </div>
                )}
                {percentages.C > 60 && percentages.O > 60 && (
                  <div className="interaction-card positive">
                    <h5>C + O Balance</h5>
                    <p>High Conscientiousness with high Openness allows you to be both creative and disciplined—generating ideas and executing them.</p>
                  </div>
                )}
                {percentages.E > 60 && percentages.A > 60 && (
                  <div className="interaction-card positive">
                    <h5>E + A Connection</h5>
                    <p>Your emotional sensitivity paired with agreeableness creates strong empathic connections with others.</p>
                  </div>
                )}
                {percentages.X > 60 && percentages.C < 40 && (
                  <div className="interaction-card caution">
                    <h5>X + Low C Dynamic</h5>
                    <p>High social energy without strong conscientiousness may lead to overcommitting or difficulty following through on social plans.</p>
                  </div>
                )}
                {percentages.E > 60 && percentages.C > 60 && (
                  <div className="interaction-card caution">
                    <h5>E + C Tension</h5>
                    <p>High emotionality combined with high conscientiousness may create perfectionism-driven anxiety. Balance achievement with self-compassion.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'counselor':
        return (
          <div className="counselor-insights">
            <div className="counselor-notice">
              <span className="notice-icon">🔒</span>
              <p>This section contains professional insights intended for counselors, therapists, and mental health professionals. It provides clinical considerations based on the assessment results.</p>
            </div>

            {counselorFocusAreas.length > 0 && (
              <div className="focus-areas-section">
                <h3>🎯 Priority Focus Areas</h3>
                <div className="focus-areas-list">
                  {counselorFocusAreas.map((area, index) => (
                    <div key={index} className={`focus-area-card priority-${area.priority.toLowerCase()}`}>
                      <div className="focus-area-header">
                        <span className={`priority-badge ${area.priority.toLowerCase()}`}>
                          {area.priority}
                        </span>
                        <h4>{area.area}</h4>
                      </div>
                      <div className="focus-area-content">
                        <p><strong>Concern:</strong> {area.concern}</p>
                        <p><strong>Suggested Exploration:</strong> {area.suggestedExploration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="clinical-notes-section">
              <h3>📋 Trait-Specific Clinical Notes</h3>
              {Object.entries(percentages).map(([trait, score]) => {
                const insight = getTraitInsight(trait, score);
                const analysis = traitAnalysis[trait];
                const level = getScoreLabel(score);

                return (
                  <div key={trait} className="clinical-note-card">
                    <div className="clinical-note-header">
                      <span className="trait-badge">{trait}</span>
                      <span className="trait-name">{analysis.name}</span>
                      <span className="trait-score-badge">{score}% ({level})</span>
                    </div>
                    <p className="clinical-note-text">{insight.counselorNotes}</p>
                  </div>
                );
              })}
            </div>

            <div className="assessment-notes">
              <h3>📝 Assessment Considerations</h3>
              <ul>
                <li>This assessment is based on the HEXACO-PI-R 60-item questionnaire developed by Lee & Ashton.</li>
                <li>Scores represent percentile-normalized values comparing the individual's raw scores to possible score ranges.</li>
                <li>Self-report measures are subject to social desirability bias and should be interpreted alongside clinical interview and observation.</li>
                <li>Extreme scores (below 20% or above 80%) warrant additional exploration.</li>
                <li>Consider cultural factors that may influence trait expression and interpretation.</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="section results-section">
      <div className="results-container enhanced">
        <div className="results-header">
          <h2>Your Personality Profile</h2>
          <p className="results-name">Comprehensive Results for <strong>{userData.name}</strong></p>
          <p className="results-date">Assessment Date: {userData.testDate}</p>
        </div>

        <div className="results-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'detailed' ? 'active' : ''}`}
            onClick={() => setActiveTab('detailed')}
          >
            🔍 Detailed Analysis
          </button>
          <button
            className={`tab-btn ${activeTab === 'patterns' ? 'active' : ''}`}
            onClick={() => setActiveTab('patterns')}
          >
            🧩 Patterns
          </button>
          <button
            className={`tab-btn ${activeTab === 'counselor' ? 'active' : ''}`}
            onClick={() => setActiveTab('counselor')}
          >
            🔒 Counselor Insights
          </button>
        </div>

        <div className="results-tab-content">
          {renderTabContent()}
        </div>

        <div className="results-actions">
          <button className="btn btn-primary" onClick={downloadPDF}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span>Download Comprehensive PDF Report</span>
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

  // Debug mode: add ?debug=results to URL to test results page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === 'results') {
      setUserData({
        name: 'Test User',
        email: 'test@example.com',
        dob: '1990-01-01',
        gender: 'other',
        testDate: new Date().toLocaleDateString()
      });
      setResults({
        percentages: { H: 65, E: 45, X: 75, A: 55, C: 80, O: 70 }
      });
      setCurrentSection('results');
    }
  }, []);

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
