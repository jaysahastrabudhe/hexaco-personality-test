// ==========================================
// HEXACO Personality Test - Application Logic
// ==========================================

// HEXACO-PI-R 60-Item Questions with Scoring Keys
// Based on the official HEXACO-PI-R by Lee & Ashton
const questions = [
    // Each question has: text, trait (H/E/X/A/C/O), reversed (boolean)
    
    // Questions 1-10
    { id: 1, text: "I would be quite bored by a visit to an art gallery.", trait: "O", reversed: true },
    { id: 2, text: "I plan ahead and organize things, to avoid scrambling at the last minute.", trait: "C", reversed: false },
    { id: 3, text: "I rarely hold a grudge, even against people who have badly wronged me.", trait: "A", reversed: false },
    { id: 4, text: "I feel reasonably satisfied with myself overall.", trait: "X", reversed: false },
    { id: 5, text: "I would feel afraid if I had to travel in bad weather conditions.", trait: "E", reversed: false },
    { id: 6, text: "I wouldn't use flattery to get a raise or promotion at work, even if I thought it would succeed.", trait: "H", reversed: false },
    { id: 7, text: "I'm interested in learning about the history and politics of other countries.", trait: "O", reversed: false },
    { id: 8, text: "I often push myself very hard when trying to achieve a goal.", trait: "C", reversed: false },
    { id: 9, text: "People sometimes tell me that I am too critical of others.", trait: "A", reversed: true },
    { id: 10, text: "I rarely express my opinions in group meetings.", trait: "X", reversed: true },
    
    // Questions 11-20
    { id: 11, text: "I sometimes can't help worrying about little things.", trait: "E", reversed: false },
    { id: 12, text: "If I knew that I could never get caught, I would be willing to steal a million dollars.", trait: "H", reversed: true },
    { id: 13, text: "I would enjoy creating a work of art, such as a novel, a song, or a painting.", trait: "O", reversed: false },
    { id: 14, text: "When working on something, I don't pay much attention to small details.", trait: "C", reversed: true },
    { id: 15, text: "People sometimes tell me that I'm too stubborn.", trait: "A", reversed: true },
    { id: 16, text: "I prefer jobs that involve active social interaction to those that involve working alone.", trait: "X", reversed: false },
    { id: 17, text: "When I suffer from a painful experience, I need someone to make me feel comfortable.", trait: "E", reversed: false },
    { id: 18, text: "Having a lot of money is not especially important to me.", trait: "H", reversed: false },
    { id: 19, text: "I think that paying attention to radical ideas is a waste of time.", trait: "O", reversed: true },
    { id: 20, text: "I make decisions based on the feeling of the moment rather than on careful thought.", trait: "C", reversed: true },
    
    // Questions 21-30
    { id: 21, text: "People think of me as someone who has a quick temper.", trait: "A", reversed: true },
    { id: 22, text: "On most days, I feel cheerful and optimistic.", trait: "X", reversed: false },
    { id: 23, text: "I feel like crying when I see other people crying.", trait: "E", reversed: false },
    { id: 24, text: "I think that I am entitled to more respect than the average person is.", trait: "H", reversed: true },
    { id: 25, text: "If I had the opportunity, I would like to attend a classical music concert.", trait: "O", reversed: false },
    { id: 26, text: "When working, I sometimes have difficulties due to being disorganized.", trait: "C", reversed: true },
    { id: 27, text: "My attitude toward people who have treated me badly is \"forgive and forget\".", trait: "A", reversed: false },
    { id: 28, text: "I feel that I am an unpopular person.", trait: "X", reversed: true },
    { id: 29, text: "When it comes to physical danger, I am very fearful.", trait: "E", reversed: false },
    { id: 30, text: "If I want something from someone, I will laugh at that person's worst jokes.", trait: "H", reversed: true },
    
    // Questions 31-40
    { id: 31, text: "I've never really enjoyed looking through an encyclopedia.", trait: "O", reversed: true },
    { id: 32, text: "I do only the minimum amount of work needed to get by.", trait: "C", reversed: true },
    { id: 33, text: "I tend to be lenient in judging other people.", trait: "A", reversed: false },
    { id: 34, text: "In social situations, I'm usually the one who makes the first move.", trait: "X", reversed: false },
    { id: 35, text: "I worry a lot less than most people do.", trait: "E", reversed: true },
    { id: 36, text: "I would never accept a bribe, even if it were very large.", trait: "H", reversed: false },
    { id: 37, text: "People have often told me that I have a good imagination.", trait: "O", reversed: false },
    { id: 38, text: "I always try to be accurate in my work, even at the expense of time.", trait: "C", reversed: false },
    { id: 39, text: "I am usually quite flexible in my opinions when people disagree with me.", trait: "A", reversed: false },
    { id: 40, text: "The first thing that I always do in a new place is to make friends.", trait: "X", reversed: false },
    
    // Questions 41-50
    { id: 41, text: "I can handle difficult situations without needing emotional support from anyone else.", trait: "E", reversed: true },
    { id: 42, text: "I would get a lot of pleasure from owning expensive luxury goods.", trait: "H", reversed: true },
    { id: 43, text: "I like people who have unconventional views.", trait: "O", reversed: false },
    { id: 44, text: "I make a lot of mistakes because I don't think before I act.", trait: "C", reversed: true },
    { id: 45, text: "Most people tend to get angry more quickly than I do.", trait: "A", reversed: false },
    { id: 46, text: "Most people are more upbeat and dynamic than I generally am.", trait: "X", reversed: true },
    { id: 47, text: "I feel strong emotions when someone close to me is going away for a long time.", trait: "E", reversed: false },
    { id: 48, text: "I want people to know that I am an important person of high status.", trait: "H", reversed: true },
    { id: 49, text: "I don't think of myself as the artistic or creative type.", trait: "O", reversed: true },
    { id: 50, text: "People often call me a perfectionist.", trait: "C", reversed: false },
    
    // Questions 51-60
    { id: 51, text: "Even when people make a lot of mistakes, I rarely say anything negative.", trait: "A", reversed: false },
    { id: 52, text: "I sometimes feel that I am a worthless person.", trait: "X", reversed: true },
    { id: 53, text: "Even in an emergency I wouldn't feel like panicking.", trait: "E", reversed: true },
    { id: 54, text: "I wouldn't pretend to like someone just to get that person to do favors for me.", trait: "H", reversed: false },
    { id: 55, text: "I find it boring to discuss philosophy.", trait: "O", reversed: true },
    { id: 56, text: "I prefer to do whatever comes to mind, rather than stick to a plan.", trait: "C", reversed: true },
    { id: 57, text: "When people tell me that I'm wrong, my first reaction is to argue with them.", trait: "A", reversed: true },
    { id: 58, text: "When I'm in a group of people, I'm often the one who speaks on behalf of the group.", trait: "X", reversed: false },
    { id: 59, text: "I remain unemotional even in situations where most people get very sentimental.", trait: "E", reversed: true },
    { id: 60, text: "I'd be tempted to use counterfeit money, if I were sure I could get away with it.", trait: "H", reversed: true }
];

// Trait Descriptions
const traitDescriptions = {
    H: {
        name: "Honesty-Humility",
        high: "You tend to be sincere and fair in dealings with others. You're not interested in manipulating others for personal gain and have little desire for lavish wealth or elevated social status.",
        low: "You may be inclined to flatter others to get what you want and may be motivated by material gain. You might feel a strong sense of self-importance.",
        facets: "Sincerity, Fairness, Greed Avoidance, Modesty"
    },
    E: {
        name: "Emotionality",
        high: "You tend to experience fear of physical dangers and anxiety in response to life's stresses. You feel empathy for others and feel strong emotional bonds.",
        low: "You're not easily deterred by physical harm, feel little worry even in stressful situations, and feel emotionally independent from others.",
        facets: "Fearfulness, Anxiety, Dependence, Sentimentality"
    },
    X: {
        name: "Extraversion",
        high: "You feel positively about yourself and confident in social situations. You enjoy gatherings and interactions, feeling enthusiastic and energetic.",
        low: "You may consider yourself less popular, feel awkward in social attention, and feel less lively and optimistic than others.",
        facets: "Social Self-Esteem, Social Boldness, Sociability, Liveliness"
    },
    A: {
        name: "Agreeableness",
        high: "You tend to forgive wrongs, are lenient in judging others, willing to compromise, and can easily control your temper.",
        low: "You may hold grudges, be critical of others' shortcomings, defend your views stubbornly, and feel anger readily.",
        facets: "Forgivingness, Gentleness, Flexibility, Patience"
    },
    C: {
        name: "Conscientiousness",
        high: "You organize your time and surroundings well, work disciplined toward goals, strive for accuracy, and deliberate carefully when making decisions.",
        low: "You tend to be unconcerned with orderly surroundings, avoid difficult tasks, are satisfied with work containing errors, and make impulsive decisions.",
        facets: "Organization, Diligence, Perfectionism, Prudence"
    },
    O: {
        name: "Openness to Experience",
        high: "You become absorbed in the beauty of art and nature, are inquisitive about various domains, use imagination freely, and take interest in unusual ideas.",
        low: "You're rather unimpressed by art, feel little intellectual curiosity, avoid creative pursuits, and feel little attraction toward unconventional ideas.",
        facets: "Aesthetic Appreciation, Inquisitiveness, Creativity, Unconventionality"
    }
};

// Application State
let currentQuestion = 0;
let answers = {};
let userData = {};

// DOM Elements
const sections = {
    home: document.getElementById('home'),
    userInfo: document.getElementById('user-info'),
    test: document.getElementById('test'),
    results: document.getElementById('results'),
    about: document.getElementById('about')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initUserForm();
    initAnswerOptions();
    updateQuestion();
});

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateTo(section);
        });
    });
}

function navigateTo(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
    
    Object.values(sections).forEach(section => {
        if (section) section.classList.remove('active');
    });
    
    if (sections[sectionId]) {
        sections[sectionId].classList.add('active');
    }
}

// Start Test
function startTest() {
    navigateTo('userInfo');
    sections.userInfo.classList.add('active');
    sections.home.classList.remove('active');
}

// User Form
function initUserForm() {
    const form = document.getElementById('user-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            testDate: new Date().toLocaleDateString()
        };
        
        sections.userInfo.classList.remove('active');
        sections.test.classList.add('active');
        
        // Reset test state
        currentQuestion = 0;
        answers = {};
        updateQuestion();
    });
}

// Answer Options
function initAnswerOptions() {
    const options = document.querySelectorAll('.answer-option input');
    options.forEach(option => {
        option.addEventListener('change', () => {
            answers[currentQuestion] = parseInt(option.value);
        });
    });
}

// Question Navigation
function updateQuestion() {
    const question = questions[currentQuestion];
    
    // Update question display
    document.getElementById('question-number').textContent = String(currentQuestion + 1).padStart(2, '0');
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = questions.length;
    
    // Update progress
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-percent').textContent = `${Math.round(progress)}%`;
    
    // Clear previous selection
    const options = document.querySelectorAll('.answer-option input');
    options.forEach(option => option.checked = false);
    
    // Restore previous answer if exists
    if (answers[currentQuestion]) {
        const previousAnswer = document.querySelector(`.answer-option input[value="${answers[currentQuestion]}"]`);
        if (previousAnswer) previousAnswer.checked = true;
    }
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    
    const nextBtn = document.getElementById('next-btn');
    if (currentQuestion === questions.length - 1) {
        nextBtn.innerHTML = '<span>Submit</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    } else {
        nextBtn.innerHTML = '<span>Next</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }
    
    // Animate question card
    const card = document.querySelector('.question-card');
    card.style.animation = 'none';
    card.offsetHeight; // Trigger reflow
    card.style.animation = 'slideIn 0.5s ease';
}

function nextQuestion() {
    // Check if answer is selected
    if (!answers[currentQuestion]) {
        showNotification('Please select an answer before continuing.');
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateQuestion();
    } else {
        // Submit test
        calculateResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 100, 100, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-weight: 500;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Calculate Results
function calculateResults() {
    const scores = {
        H: { sum: 0, count: 0 },
        E: { sum: 0, count: 0 },
        X: { sum: 0, count: 0 },
        A: { sum: 0, count: 0 },
        C: { sum: 0, count: 0 },
        O: { sum: 0, count: 0 }
    };
    
    // Calculate raw scores
    questions.forEach((question, index) => {
        let answer = answers[index];
        
        // Reverse score if needed
        if (question.reversed) {
            answer = 6 - answer; // Reverse: 1->5, 2->4, 3->3, 4->2, 5->1
        }
        
        scores[question.trait].sum += answer;
        scores[question.trait].count++;
    });
    
    // Calculate percentages (1-5 scale, so min=10, max=50 per trait with 10 items)
    const percentages = {};
    Object.keys(scores).forEach(trait => {
        const minPossible = scores[trait].count * 1;
        const maxPossible = scores[trait].count * 5;
        const range = maxPossible - minPossible;
        const normalized = ((scores[trait].sum - minPossible) / range) * 100;
        percentages[trait] = Math.round(normalized);
    });
    
    displayResults(percentages);
}

// Display Results
function displayResults(percentages) {
    sections.test.classList.remove('active');
    sections.results.classList.add('active');
    
    // Update name
    document.getElementById('results-name').textContent = `Results for ${userData.name}`;
    
    // Animate bars
    setTimeout(() => {
        Object.keys(percentages).forEach(trait => {
            const bar = document.getElementById(`bar-${trait}`);
            const score = document.getElementById(`score-${trait}`);
            
            bar.style.width = `${percentages[trait]}%`;
            score.textContent = `${percentages[trait]}%`;
        });
    }, 300);
    
    // Generate trait descriptions
    const descriptionsContainer = document.getElementById('trait-descriptions');
    descriptionsContainer.innerHTML = '';
    
    Object.keys(percentages).forEach(trait => {
        const description = traitDescriptions[trait];
        const level = percentages[trait] > 50 ? 'high' : 'low';
        const levelText = percentages[trait] > 50 ? description.high : description.low;
        
        const card = document.createElement('div');
        card.className = 'trait-description';
        card.innerHTML = `
            <h4>
                <span class="trait-badge">${trait}</span>
                ${description.name}
            </h4>
            <p>${levelText}</p>
            <p style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--gray-500);">
                <em>Facets: ${description.facets}</em>
            </p>
        `;
        descriptionsContainer.appendChild(card);
    });
    
    // Store results for PDF
    window.testResults = {
        percentages,
        userData
    };
}

// Download PDF Report
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const results = window.testResults;
    const percentages = results.percentages;
    const user = results.userData;
    
    // Colors
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
    doc.text(`Assessment Report for ${user.name}`, 105, 38, { align: 'center' });
    
    // User Info Section
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(`Date: ${user.testDate}`, 20, 60);
    doc.text(`Email: ${user.email}`, 20, 68);
    
    // Results Section Header
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
        
        // Trait name
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(traitNames[trait], 20, yPos);
        
        // Score percentage
        doc.setFont('helvetica', 'normal');
        doc.text(`${score}%`, 175, yPos, { align: 'right' });
        
        // Background bar
        doc.setFillColor(230, 230, 230);
        doc.rect(20, yPos + 3, barWidth, barHeight, 'F');
        
        // Score bar
        doc.setFillColor(...primaryColor);
        doc.rect(20, yPos + 3, (score / 100) * barWidth, barHeight, 'F');
        
        yPos += 22;
    });
    
    // Trait Descriptions
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
        
        // Check if we need a new page
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
        
        // Word wrap the interpretation
        const lines = doc.splitTextToSize(interpretation, 170);
        doc.text(lines, 20, yPos + 6);
        
        yPos += 10 + (lines.length * 5);
        
        // Facets
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
    
    // Save PDF
    doc.save(`HEXACO_Report_${user.name.replace(/\s+/g, '_')}.pdf`);
}

// Retake Test
function retakeTest() {
    currentQuestion = 0;
    answers = {};
    userData = {};
    
    // Reset form
    document.getElementById('user-form').reset();
    
    navigateTo('home');
}

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);
