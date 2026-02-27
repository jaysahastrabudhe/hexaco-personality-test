// Expanded Cognitive and Intelligence Test Questions

// ============================================
// PERSONA / COGNITIVE STYLE - 12 Questions
// ============================================
export const personaQuestions = [
    {
        id: 'p1',
        type: 'binary',
        dimension: 'Drive',
        description: "Which one sounds more like you?",
        options: [
            { id: 'A', text: "I enjoy taking on challenges with clear momentum.", value: { type: 'Driver', score: 1 } },
            { id: 'B', text: "I enjoy exploring different directions before deciding.", value: { type: 'Explorer', score: 1 } }
        ]
    },
    {
        id: 'p2',
        type: 'binary',
        dimension: 'Focus',
        description: "In a team setting, I prefer to...",
        options: [
            { id: 'A', text: "Focus on one area and master it extensively.", value: { type: 'Specialist', score: 1 } },
            { id: 'B', text: "Sample multiple roles to understand the big picture.", value: { type: 'Generalist', score: 1 } }
        ]
    },
    {
        id: 'p3',
        type: 'binary',
        dimension: 'Approach',
        description: "When solving a problem, I usually...",
        options: [
            { id: 'A', text: "Rely on proven methods and past experience.", value: { type: 'Traditionalist', score: 1 } },
            { id: 'B', text: "Look for a completely new and novel approach.", value: { type: 'Innovator', score: 1 } }
        ]
    },
    {
        id: 'p4',
        type: 'binary',
        dimension: 'Motivation',
        description: "I feel most energized when...",
        options: [
            { id: 'A', text: "I am achieving concrete, measurable goals.", value: { type: 'Achiever', score: 1 } },
            { id: 'B', text: "I am helping others grow and succeed.", value: { type: 'Supporter', score: 1 } }
        ]
    },
    {
        id: 'p5',
        type: 'binary',
        dimension: 'Environment',
        description: "My ideal work environment is...",
        options: [
            { id: 'A', text: "Structured, predictable, and orderly.", value: { type: 'Organizer', score: 1 } },
            { id: 'B', text: "Dynamic, fast-paced, and changing.", value: { type: 'Adaptor', score: 1 } }
        ]
    },
    {
        id: 'p6',
        type: 'binary',
        dimension: 'Risk',
        description: "When facing uncertainty, I tend to...",
        options: [
            { id: 'A', text: "Take calculated risks and embrace new opportunities.", value: { type: 'RiskTaker', score: 1 } },
            { id: 'B', text: "Play it safe and wait for more information.", value: { type: 'Cautious', score: 1 } }
        ]
    },
    {
        id: 'p7',
        type: 'binary',
        dimension: 'DecisionMaking',
        description: "When making important decisions, I rely more on...",
        options: [
            { id: 'A', text: "Logic, data, and careful analysis.", value: { type: 'Analytical', score: 1 } },
            { id: 'B', text: "Gut feelings and intuition.", value: { type: 'Intuitive', score: 1 } }
        ]
    },
    {
        id: 'p8',
        type: 'binary',
        dimension: 'Learning',
        description: "I learn best when I can...",
        options: [
            { id: 'A', text: "See diagrams, charts, and visual representations.", value: { type: 'Visual', score: 1 } },
            { id: 'B', text: "Read explanations or hear them explained.", value: { type: 'Verbal', score: 1 } }
        ]
    },
    {
        id: 'p9',
        type: 'binary',
        dimension: 'Collaboration',
        description: "I do my best work when I...",
        options: [
            { id: 'A', text: "Work independently with full autonomy.", value: { type: 'Independent', score: 1 } },
            { id: 'B', text: "Collaborate closely with a team.", value: { type: 'Collaborative', score: 1 } }
        ]
    },
    {
        id: 'p10',
        type: 'binary',
        dimension: 'TimeOrientation',
        description: "I tend to focus more on...",
        options: [
            { id: 'A', text: "Long-term goals and future outcomes.", value: { type: 'FutureFocused', score: 1 } },
            { id: 'B', text: "Present tasks and immediate results.", value: { type: 'PresentFocused', score: 1 } }
        ]
    },
    {
        id: 'p11',
        type: 'binary',
        dimension: 'Conflict',
        description: "When facing a disagreement, I usually...",
        options: [
            { id: 'A', text: "Address it directly and seek resolution.", value: { type: 'Confrontational', score: 1 } },
            { id: 'B', text: "Avoid conflict and seek harmony.", value: { type: 'Harmonious', score: 1 } }
        ]
    },
    {
        id: 'p12',
        type: 'binary',
        dimension: 'Energy',
        description: "My energy throughout the day is typically...",
        options: [
            { id: 'A', text: "Steady and consistent all day long.", value: { type: 'Steady', score: 1 } },
            { id: 'B', text: "Variable, with bursts of high productivity.", value: { type: 'Burst', score: 1 } }
        ]
    }
];

// ============================================
// NON-VERBAL REASONING - 20 Questions (15 min)
// Text-based logical series — SHL / Korn Ferry style
// ============================================
export const nonVerbalQuestions = [
    // 1. Simple doubling
    {
        id: 'nv1',
        category: 'Number Series',
        description: 'What number comes next in the series?',
        sequence: ['2', '4', '8', '16', '?'],
        options: [{ id: 'A', value: '24' }, { id: 'B', value: '18' }, { id: 'C', value: '32' }, { id: 'D', value: '20' }],
        correctAnswer: 'C'
    },
    // 2. Letter series (+3 each)
    {
        id: 'nv2',
        category: 'Letter Series',
        description: 'Which letter continues the sequence?',
        sequence: ['A', 'D', 'G', 'J', '?'],
        options: [{ id: 'A', value: 'K' }, { id: 'B', value: 'L' }, { id: 'C', value: 'M' }, { id: 'D', value: 'N' }],
        correctAnswer: 'C'
    },
    // 3. Odd-increment series (+1, +2, +3, +4...)
    {
        id: 'nv3',
        category: 'Number Series',
        description: 'What number comes next in the series?',
        sequence: ['1', '2', '4', '7', '11', '?'],
        options: [{ id: 'A', value: '14' }, { id: 'B', value: '15' }, { id: 'C', value: '16' }, { id: 'D', value: '17' }],
        correctAnswer: 'C'
    },
    // 4. Alternating number-letter
    {
        id: 'nv4',
        category: 'Alternating',
        description: 'What comes next in this alternating sequence?',
        sequence: ['1', 'A', '2', 'B', '3', '?'],
        options: [{ id: 'A', value: 'C' }, { id: 'B', value: 'D' }, { id: 'C', value: '4' }, { id: 'D', value: 'E' }],
        correctAnswer: 'A'
    },
    // 5. Fibonacci
    {
        id: 'nv5',
        category: 'Number Series',
        description: 'Each number is the sum of the previous two. What comes next?',
        sequence: ['1', '1', '2', '3', '5', '?'],
        options: [{ id: 'A', value: '7' }, { id: 'B', value: '8' }, { id: 'C', value: '9' }, { id: 'D', value: '10' }],
        correctAnswer: 'B'
    },
    // 6. Mixed code pattern
    {
        id: 'nv6',
        category: 'Mixed Series',
        description: 'Which code continues the pattern?',
        sequence: ['AB1', 'CD2', 'EF3', '?'],
        options: [{ id: 'A', value: 'GH3' }, { id: 'B', value: 'GH4' }, { id: 'C', value: 'IJ4' }, { id: 'D', value: 'HI4' }],
        correctAnswer: 'B'
    },
    // 7. Tripling series
    {
        id: 'nv7',
        category: 'Number Series',
        description: 'What number comes next in the series?',
        sequence: ['2', '6', '18', '54', '?'],
        options: [{ id: 'A', value: '108' }, { id: 'B', value: '144' }, { id: 'C', value: '162' }, { id: 'D', value: '180' }],
        correctAnswer: 'C'
    },
    // 8. Reverse letter series (−2 each)
    {
        id: 'nv8',
        category: 'Letter Series',
        description: 'Which letter continues the sequence?',
        sequence: ['Z', 'X', 'V', 'T', '?'],
        options: [{ id: 'A', value: 'S' }, { id: 'B', value: 'R' }, { id: 'C', value: 'Q' }, { id: 'D', value: 'P' }],
        correctAnswer: 'B'
    },
    // 9. Squares series
    {
        id: 'nv9',
        category: 'Number Series',
        description: 'What number comes next in the series?',
        sequence: ['1', '4', '9', '16', '25', '?'],
        options: [{ id: 'A', value: '30' }, { id: 'B', value: '35' }, { id: 'C', value: '36' }, { id: 'D', value: '49' }],
        correctAnswer: 'C'
    },
    // 10. Alternating +/- pattern
    {
        id: 'nv10',
        category: 'Number Series',
        description: 'What number comes next? (hint: look at the alternating rule)',
        sequence: ['10', '15', '12', '17', '14', '?'],
        options: [{ id: 'A', value: '18' }, { id: 'B', value: '19' }, { id: 'C', value: '20' }, { id: 'D', value: '16' }],
        correctAnswer: 'B'
    },
    // 11. Letter pairs +2 pattern
    {
        id: 'nv11',
        category: 'Letter Series',
        description: 'Which pair of letters continues the sequence?',
        sequence: ['AC', 'CE', 'EG', 'GI', '?'],
        options: [{ id: 'A', value: 'IK' }, { id: 'B', value: 'HJ' }, { id: 'C', value: 'JK' }, { id: 'D', value: 'IJ' }],
        correctAnswer: 'A'
    },
    // 12. Subtracting series
    {
        id: 'nv12',
        category: 'Number Series',
        description: 'What number comes next in the series?',
        sequence: ['100', '90', '81', '73', '66', '?'],
        options: [{ id: 'A', value: '58' }, { id: 'B', value: '59' }, { id: 'C', value: '60' }, { id: 'D', value: '61' }],
        correctAnswer: 'C'
    },
    // 13. Prime numbers
    {
        id: 'nv13',
        category: 'Number Series',
        description: 'What is the next prime number in the series?',
        sequence: ['2', '3', '5', '7', '11', '?'],
        options: [{ id: 'A', value: '12' }, { id: 'B', value: '13' }, { id: 'C', value: '14' }, { id: 'D', value: '15' }],
        correctAnswer: 'B'
    },
    // 14. Shift +1 each step on letter vowel/consonant alternation
    {
        id: 'nv14',
        category: 'Alternating',
        description: 'What comes next in this alternating number-letter sequence?',
        sequence: ['2A', '4B', '6C', '8D', '?'],
        options: [{ id: 'A', value: '9E' }, { id: 'B', value: '10D' }, { id: 'C', value: '10E' }, { id: 'D', value: '12E' }],
        correctAnswer: 'C'
    },
    // 15. Odd-one-out style: powers of 2
    {
        id: 'nv15',
        category: 'Number Series',
        description: 'What number continues this pattern?',
        sequence: ['3', '6', '12', '24', '?'],
        options: [{ id: 'A', value: '36' }, { id: 'B', value: '42' }, { id: 'C', value: '48' }, { id: 'D', value: '30' }],
        correctAnswer: 'C'
    },
    // 16. Mixed: alternating letters and squares
    {
        id: 'nv16',
        category: 'Mixed Series',
        description: 'Which item continues the pattern?',
        sequence: ['A1', 'B4', 'C9', 'D16', '?'],
        options: [{ id: 'A', value: 'E20' }, { id: 'B', value: 'E25' }, { id: 'C', value: 'F25' }, { id: 'D', value: 'E24' }],
        correctAnswer: 'B'
    },
    // 17. Decrement halving
    {
        id: 'nv17',
        category: 'Number Series',
        description: 'What number comes next in the series?',
        sequence: ['128', '64', '32', '16', '?'],
        options: [{ id: 'A', value: '4' }, { id: 'B', value: '6' }, { id: 'C', value: '8' }, { id: 'D', value: '10' }],
        correctAnswer: 'C'
    },
    // 18. Two-step letter: +2 then +3 alternating
    {
        id: 'nv18',
        category: 'Letter Series',
        description: 'Which letter comes next in the sequence?',
        sequence: ['B', 'D', 'G', 'I', 'L', '?'],
        options: [{ id: 'A', value: 'M' }, { id: 'B', value: 'N' }, { id: 'C', value: 'O' }, { id: 'D', value: 'P' }],
        correctAnswer: 'B'
    },
    // 19. Sum rule: each = previous two added
    {
        id: 'nv19',
        category: 'Number Series',
        description: 'Each term is the sum of the two before it. What comes next?',
        sequence: ['3', '5', '8', '13', '21', '?'],
        options: [{ id: 'A', value: '30' }, { id: 'B', value: '32' }, { id: 'C', value: '34' }, { id: 'D', value: '29' }],
        correctAnswer: 'C'
    },
    // 20. Complex: increment doubles each step
    {
        id: 'nv20',
        category: 'Number Series',
        description: 'The increment doubles each step. What comes next?',
        sequence: ['1', '2', '4', '8', '16', '?'],
        options: [{ id: 'A', value: '24' }, { id: 'B', value: '30' }, { id: 'C', value: '32' }, { id: 'D', value: '20' }],
        correctAnswer: 'C'
    }
];

// VERBAL REASONING - 6 Passages with 20 total questions
// ============================================
export const verbalQuestions = [
    {
        id: 'v1',
        topic: 'Biology',
        text: `The "Silver Fox" experiment in Russia demonstrated that selective breeding could change the temperament of wild animals in a relatively short time. By mating only the tamest foxes in each generation, researchers produced foxes that were not only docile but also displayed physical traits common to domestic dogs, such as floppy ears and curly tails. This suggests that behavioral traits and physical characteristics may be genetically linked.`,
        questions: [
            {
                id: 'v1-q1',
                prompt: "The experiment took a very long time to show any results.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            },
            {
                id: 'v1-q2',
                prompt: "Changes in physical appearance were an intended goal of the breeding program.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'Cannot Say'
            },
            {
                id: 'v1-q3',
                prompt: "Selective breeding was based on the physical appearance of the foxes.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            },
            {
                id: 'v1-q4',
                prompt: "The experiment suggests genes controlling behavior may also influence physical traits.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'True'
            }
        ]
    },
    {
        id: 'v2',
        topic: 'Business',
        text: `In corporate environments, "active listening" is often cited as a key leadership skill. Unlike passive hearing, active listening involves fully concentrating, understanding, responding, and then remembering what is being said. It requires the listener to provide feedback, such as nodding or paraphrasing, to confirm understanding. This practice has been shown to improve employee morale and reduce turnover rates.`,
        questions: [
            {
                id: 'v2-q1',
                prompt: "Active listening involves simply remaining silent while others speak.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            },
            {
                id: 'v2-q2',
                prompt: "Improving employee morale is a potential benefit of active listening.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'True'
            },
            {
                id: 'v2-q3',
                prompt: "Active listening skills cannot be learned or developed.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'Cannot Say'
            },
            {
                id: 'v2-q4',
                prompt: "Paraphrasing is one technique used in active listening.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'True'
            }
        ]
    },
    {
        id: 'v3',
        topic: 'Technology',
        text: `Quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously through a property called superposition. Unlike classical computers that process information in binary (0 or 1), quantum computers can perform many calculations at once. However, qubits are extremely sensitive to environmental interference, making quantum computers prone to errors. Current research focuses on error correction methods to make quantum computing practical for everyday use.`,
        questions: [
            {
                id: 'v3-q1',
                prompt: "Classical computers and quantum computers process information in the same way.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            },
            {
                id: 'v3-q2',
                prompt: "Quantum computers are currently error-free and ready for widespread use.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            },
            {
                id: 'v3-q3',
                prompt: "Superposition allows qubits to be in multiple states at the same time.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'True'
            }
        ]
    },
    {
        id: 'v4',
        topic: 'Psychology',
        text: `The bystander effect refers to the phenomenon where individuals are less likely to offer help when other people are present. Research by Darley and Latané in the 1960s showed that the more bystanders present during an emergency, the less likely any one person is to help. This occurs partly due to diffusion of responsibility, where individuals assume someone else will take action. Training programs that raise awareness of this effect have been shown to reduce its impact.`,
        questions: [
            {
                id: 'v4-q1',
                prompt: "More bystanders present increases the likelihood that someone will help.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            },
            {
                id: 'v4-q2',
                prompt: "Diffusion of responsibility is one explanation for the bystander effect.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'True'
            },
            {
                id: 'v4-q3',
                prompt: "The bystander effect cannot be overcome through training.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            }
        ]
    },
    {
        id: 'v5',
        topic: 'Environment',
        text: `The Great Pacific Garbage Patch is a collection of marine debris in the North Pacific Ocean. Contrary to popular belief, it is not a visible island of trash but rather a dispersed soup of microplastics spread across millions of square kilometers. These microplastics enter the food chain when consumed by marine life and can eventually reach humans through seafood consumption. Cleanup efforts are challenging due to the patch's enormous size and the tiny nature of the particles.`,
        questions: [
            {
                id: 'v5-q1',
                prompt: "The Great Pacific Garbage Patch is a solid, visible island of trash.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            },
            {
                id: 'v5-q2',
                prompt: "Microplastics can enter the human food chain through seafood.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'True'
            },
            {
                id: 'v5-q3',
                prompt: "Current cleanup methods have successfully removed most of the debris.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'Cannot Say'
            }
        ]
    },
    {
        id: 'v6',
        topic: 'Economics',
        text: `The gig economy refers to a labor market characterized by short-term, flexible jobs rather than traditional permanent employment. Workers in the gig economy, such as rideshare drivers and freelance designers, often enjoy greater flexibility in their schedules. However, they typically lack benefits such as health insurance and paid leave that traditional employees receive. Debates continue about whether gig work represents freedom and entrepreneurship or exploitation and precarity.`,
        questions: [
            {
                id: 'v6-q1',
                prompt: "Gig workers typically receive the same benefits as traditional employees.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            },
            {
                id: 'v6-q2',
                prompt: "Greater schedule flexibility is one advantage of gig work.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'True'
            },
            {
                id: 'v6-q3',
                prompt: "All experts agree that the gig economy is beneficial for workers.",
                options: ['True', 'False', 'Cannot Say'],
                correctAnswer: 'False'
            }
        ]
    }
];

// ============================================
// GAMIFIED BADGES (Expanded)
// ============================================
export const gamifiedBadges = {
    Explorer: { icon: '🧭', title: 'The Explorer', desc: 'You thrive on new possibilities and directions.' },
    Driver: { icon: '🏎️', title: 'The Driver', desc: 'You focus on momentum and getting things done.' },
    Specialist: { icon: '🔬', title: 'The Specialist', desc: 'Deep knowledge is your superpower.' },
    Generalist: { icon: '🌐', title: 'The Generalist', desc: 'You see the connections between everything.' },
    Innovator: { icon: '💡', title: 'The Innovator', desc: 'Novelty is your fuel.' },
    Traditionalist: { icon: '🏛️', title: 'The Guardian', desc: 'You value proven stability.' },
    Achiever: { icon: '🏆', title: 'The Achiever', desc: 'Goals are made to be crushed.' },
    Supporter: { icon: '🤝', title: 'The Supporter', desc: 'Others rise because of you.' },
    Adaptor: { icon: '🦎', title: 'The Adaptor', desc: 'Change is your natural habitat.' },
    Organizer: { icon: '📋', title: 'The Architect', desc: 'Order brings clarity.' },
    RiskTaker: { icon: '🎲', title: 'The Risk Taker', desc: 'Fortune favors the bold.' },
    Cautious: { icon: '🛡️', title: 'The Strategist', desc: 'Wisdom comes from careful consideration.' },
    Analytical: { icon: '📊', title: 'The Analyst', desc: 'Data drives your decisions.' },
    Intuitive: { icon: '✨', title: 'The Intuitive', desc: 'You trust your inner compass.' },
    Visual: { icon: '👁️', title: 'The Visual Thinker', desc: 'You see patterns others miss.' },
    Verbal: { icon: '📖', title: 'The Wordsmith', desc: 'Language is your domain.' },
    Independent: { icon: '🦅', title: 'The Lone Wolf', desc: 'You carve your own path.' },
    Collaborative: { icon: '🐝', title: 'The Collaborator', desc: 'Together, you achieve more.' },
    FutureFocused: { icon: '🔮', title: 'The Visionary', desc: 'Your eyes are on the horizon.' },
    PresentFocused: { icon: '⚡', title: 'The Pragmatist', desc: 'You make things happen now.' },
    Confrontational: { icon: '⚔️', title: 'The Direct Communicator', desc: 'You face challenges head-on.' },
    Harmonious: { icon: '☮️', title: 'The Peacekeeper', desc: 'Harmony is your strength.' },
    Steady: { icon: '🌊', title: 'The Steady Flow', desc: 'Consistency is your superpower.' },
    Burst: { icon: '🚀', title: 'The Burst Worker', desc: 'You excel in high-energy sprints.' }
};

// Intelligence test time limits in seconds
export const testTimeLimits = {
    nonVerbal: 15 * 60, // 15 minutes
    verbal: 10 * 60     // 10 minutes
};
