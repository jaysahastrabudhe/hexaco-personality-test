import { useState, useEffect } from 'react';
import { fetchAllTestResults } from './supabaseClient';
import './admin.css';
import { jsPDF } from 'jspdf';
import { traitAnalysis, getScoreLevel, getScoreLabel, generatePersonalitySummary } from './data/personalityInsights';
import { gamifiedBadges } from './data/extraQuestions';

// Admin Dashboard Component
function Admin() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('desc');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminKey, setAdminKey] = useState('');

    // Check for admin key in URL or prompt
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');
        if (key === 'lexam2024') {
            setIsAuthenticated(true);
        }
    }, []);

    // Fetch results when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadResults();
        }
    }, [isAuthenticated]);

    const loadResults = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchAllTestResults();
            if (response.success) {
                setResults(response.data || []);
            } else {
                setError(response.error || 'Failed to load results');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (adminKey === 'lexam2024') {
            setIsAuthenticated(true);
        } else {
            setError('Invalid admin key');
        }
    };

    // Filter and sort results
    const filteredResults = results
        .filter(r => {
            const term = searchTerm.toLowerCase();
            return (
                r.candidate_name?.toLowerCase().includes(term) ||
                r.candidate_email?.toLowerCase().includes(term) ||
                r.session_id?.toLowerCase().includes(term)
            );
        })
        .sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];
            if (sortField === 'created_at') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }
            if (sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            }
            return aVal < bVal ? 1 : -1;
        });

    // Export to CSV
    const exportCSV = () => {
        const headers = [
            'Session ID', 'Name', 'Email', 'Date',
            'H', 'E', 'X', 'A', 'C', 'O',
            'NV Score', 'NV Total', 'V Score', 'V Total',
            'Cognitive Avg', 'Archetype'
        ];

        const rows = filteredResults.map(r => [
            r.session_id,
            r.candidate_name,
            r.candidate_email,
            new Date(r.created_at).toLocaleDateString(),
            r.hexaco_percentages?.H || '',
            r.hexaco_percentages?.E || '',
            r.hexaco_percentages?.X || '',
            r.hexaco_percentages?.A || '',
            r.hexaco_percentages?.C || '',
            r.hexaco_percentages?.O || '',
            r.nv_score,
            r.nv_total,
            r.v_score,
            r.v_total,
            r.cognitive_average,
            r.primary_archetype
        ]);

        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lexam_results_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    // Generate PDF for a result
    const generatePDF = (result) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFillColor(15, 15, 23);
        doc.rect(0, 0, pageWidth, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('LExam Assessment Report', pageWidth / 2, 20, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });

        let y = 50;

        // Candidate Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Candidate Information', 15, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Name: ${result.candidate_name}`, 15, y);
        y += 6;
        doc.text(`Email: ${result.candidate_email}`, 15, y);
        y += 6;
        doc.text(`Session ID: ${result.session_id}`, 15, y);
        y += 6;
        doc.text(`Date: ${new Date(result.created_at).toLocaleDateString()}`, 15, y);
        y += 15;

        // HEXACO Scores
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('HEXACO Personality Profile', 15, y);
        y += 10;

        const hexaco = result.hexaco_percentages || {};
        const traits = ['H', 'E', 'X', 'A', 'C', 'O'];
        const traitNames = {
            H: 'Honesty-Humility',
            E: 'Emotionality',
            X: 'Extraversion',
            A: 'Agreeableness',
            C: 'Conscientiousness',
            O: 'Openness'
        };

        traits.forEach(t => {
            const score = hexaco[t] || 0;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`${traitNames[t]}: ${score}%`, 15, y);

            // Progress bar
            doc.setFillColor(220, 220, 220);
            doc.rect(80, y - 4, 100, 5, 'F');
            doc.setFillColor(124, 124, 240);
            doc.rect(80, y - 4, score, 5, 'F');
            y += 8;
        });

        y += 10;

        // Cognitive Scores
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Cognitive Performance', 15, y);
        y += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Non-Verbal Reasoning: ${result.nv_score}/${result.nv_total} (${Math.round(result.nv_score / result.nv_total * 100)}%)`, 15, y);
        y += 6;
        doc.text(`Verbal Reasoning: ${result.v_score}/${result.v_total} (${Math.round(result.v_score / result.v_total * 100)}%)`, 15, y);
        y += 6;
        doc.text(`Overall Cognitive Average: ${result.cognitive_average}%`, 15, y);
        y += 15;

        // Archetype
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Primary Archetype', 15, y);
        y += 8;

        const badge = gamifiedBadges[result.primary_archetype] || { title: result.primary_archetype, desc: '' };
        doc.setFontSize(12);
        doc.text(`${badge.icon || '🎯'} ${badge.title}`, 15, y);
        y += 6;
        doc.setFontSize(10);
        doc.text(badge.desc, 15, y);

        doc.save(`LExam_${result.candidate_name.replace(/\s+/g, '_')}_${result.session_id}.pdf`);
    };

    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="login-card">
                    <h1>🔐 Admin Access</h1>
                    <p>Enter admin key to access the dashboard</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Admin Key"
                            value={adminKey}
                            onChange={(e) => setAdminKey(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" className="btn btn-primary">
                            Access Dashboard
                        </button>
                    </form>
                    {error && <p className="error-text">{error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>📊 LExam Admin Dashboard</h1>
                <div className="header-actions">
                    <button onClick={loadResults} className="btn btn-secondary" disabled={loading}>
                        🔄 Refresh
                    </button>
                    <button onClick={exportCSV} className="btn btn-primary" disabled={results.length === 0}>
                        📥 Export CSV
                    </button>
                </div>
            </header>

            <div className="admin-controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by name, email, or session ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="sort-controls">
                    <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
                        <option value="created_at">Date</option>
                        <option value="candidate_name">Name</option>
                        <option value="cognitive_average">Cognitive Score</option>
                    </select>
                    <button
                        className="sort-btn"
                        onClick={() => setSortDirection(d => d === 'asc' ? 'desc' : 'asc')}
                    >
                        {sortDirection === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>

            {loading && <div className="loading">Loading results...</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="results-table-container">
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>HEXACO</th>
                            <th>NV Score</th>
                            <th>V Score</th>
                            <th>Cognitive</th>
                            <th>Archetype</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((result) => (
                            <tr key={result.id || result.session_id}>
                                <td>
                                    {result.photo_url ? (
                                        <img src={result.photo_url} alt="" className="thumbnail" />
                                    ) : (
                                        <span className="no-photo">📷</span>
                                    )}
                                </td>
                                <td>{result.candidate_name}</td>
                                <td>{result.candidate_email}</td>
                                <td>{new Date(result.created_at).toLocaleDateString()}</td>
                                <td>
                                    <div className="hexaco-mini">
                                        {Object.entries(result.hexaco_percentages || {}).map(([k, v]) => (
                                            <span key={k} title={k}>{k}:{v}</span>
                                        ))}
                                    </div>
                                </td>
                                <td>{result.nv_score}/{result.nv_total}</td>
                                <td>{result.v_score}/{result.v_total}</td>
                                <td className={`cognitive-score ${result.cognitive_average >= 70 ? 'high' : result.cognitive_average >= 50 ? 'medium' : 'low'}`}>
                                    {result.cognitive_average}%
                                </td>
                                <td>
                                    <span className="archetype-badge">{gamifiedBadges[result.primary_archetype]?.icon} {result.primary_archetype}</span>
                                </td>
                                <td className="actions">
                                    <button onClick={() => setSelectedResult(result)} className="action-btn view">
                                        👁️
                                    </button>
                                    <button onClick={() => generatePDF(result)} className="action-btn pdf">
                                        📄
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredResults.length === 0 && !loading && (
                    <div className="no-results">No results found</div>
                )}
            </div>

            <div className="stats-summary">
                <div className="stat-card">
                    <span className="stat-value">{results.length}</span>
                    <span className="stat-label">Total Tests</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        {results.length > 0 ? Math.round(results.reduce((a, r) => a + (r.cognitive_average || 0), 0) / results.length) : 0}%
                    </span>
                    <span className="stat-label">Avg Cognitive</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        {results.filter(r => r.photo_url).length}
                    </span>
                    <span className="stat-label">With Photos</span>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedResult && (
                <div className="modal-overlay" onClick={() => setSelectedResult(null)}>
                    <div className="detail-modal" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSelectedResult(null)}>×</button>

                        <div className="modal-header">
                            {selectedResult.photo_url && (
                                <img src={selectedResult.photo_url} alt="" className="modal-photo" />
                            )}
                            <div className="modal-info">
                                <h2>{selectedResult.candidate_name}</h2>
                                <p>{selectedResult.candidate_email}</p>
                                <p className="session-id">ID: {selectedResult.session_id}</p>
                            </div>
                        </div>

                        <div className="modal-body">
                            <section>
                                <h3>HEXACO Profile</h3>
                                <div className="hexaco-bars">
                                    {Object.entries(selectedResult.hexaco_percentages || {}).map(([trait, score]) => (
                                        <div key={trait} className="hexaco-bar-row">
                                            <span className="trait-label">{trait}</span>
                                            <div className="bar-container">
                                                <div className="bar-fill" style={{ width: `${score}%` }}></div>
                                            </div>
                                            <span className="trait-score">{score}%</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3>Cognitive Scores</h3>
                                <div className="cognitive-details">
                                    <div className="cog-item">
                                        <span>Non-Verbal</span>
                                        <strong>{selectedResult.nv_score}/{selectedResult.nv_total}</strong>
                                    </div>
                                    <div className="cog-item">
                                        <span>Verbal</span>
                                        <strong>{selectedResult.v_score}/{selectedResult.v_total}</strong>
                                    </div>
                                    <div className="cog-item overall">
                                        <span>Overall</span>
                                        <strong>{selectedResult.cognitive_average}%</strong>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3>Archetype</h3>
                                <div className="archetype-display">
                                    <span className="archetype-icon">{gamifiedBadges[selectedResult.primary_archetype]?.icon}</span>
                                    <div>
                                        <strong>{gamifiedBadges[selectedResult.primary_archetype]?.title || selectedResult.primary_archetype}</strong>
                                        <p>{gamifiedBadges[selectedResult.primary_archetype]?.desc}</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="modal-footer">
                            <button onClick={() => generatePDF(selectedResult)} className="btn btn-primary">
                                📄 Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
