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
// NON-VERBAL REASONING - 12 Questions (15 min)
// ============================================
export const nonVerbalQuestions = [
    // Pattern 1: Rotation (45° clockwise)
    {
        id: 'nv1',
        description: "Select the figure that logically completes the series.",
        category: 'Rotation',
        sequence: [
            { type: 'clock-line', rotation: 0 },
            { type: 'clock-line', rotation: 45 },
            { type: 'clock-line', rotation: 90 },
            { type: 'clock-line', rotation: 135 }
        ],
        options: [
            { id: 'A', type: 'clock-line', rotation: 135 },
            { id: 'B', type: 'clock-line', rotation: 180 },
            { id: 'C', type: 'clock-line', rotation: 225 },
            { id: 'D', type: 'clock-line', rotation: 270 }
        ],
        correctAnswer: 'B'
    },
    // Pattern 2: Addition (count increases by 1)
    {
        id: 'nv2',
        description: "Which shape comes next in the sequence?",
        category: 'Counting',
        sequence: [
            { type: 'shapes-count', count: 1, shape: 'circle' },
            { type: 'shapes-count', count: 2, shape: 'circle' },
            { type: 'shapes-count', count: 3, shape: 'circle' },
            { type: 'shapes-count', count: 4, shape: 'circle' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 4, shape: 'circle' },
            { id: 'B', type: 'shapes-count', count: 5, shape: 'square' },
            { id: 'C', type: 'shapes-count', count: 5, shape: 'circle' },
            { id: 'D', type: 'shapes-count', count: 3, shape: 'circle' }
        ],
        correctAnswer: 'C'
    },
    // Pattern 3: Alternation
    {
        id: 'nv3',
        description: "Identify the pattern and choose the next figure.",
        category: 'Alternation',
        sequence: [
            { type: 'box-fill', fill: 'start' },
            { type: 'box-fill', fill: 'end' },
            { type: 'box-fill', fill: 'start' },
            { type: 'box-fill', fill: 'end' }
        ],
        options: [
            { id: 'A', type: 'box-fill', fill: 'end' },
            { id: 'B', type: 'box-fill', fill: 'start' },
            { id: 'C', type: 'box-fill', fill: 'none' },
            { id: 'D', type: 'box-fill', fill: 'center' }
        ],
        correctAnswer: 'B'
    },
    // Pattern 4: Rotation (90° counter-clockwise)
    {
        id: 'nv4',
        description: "What comes next in this rotation sequence?",
        category: 'Rotation',
        sequence: [
            { type: 'clock-line', rotation: 0 },
            { type: 'clock-line', rotation: 270 },
            { type: 'clock-line', rotation: 180 },
            { type: 'clock-line', rotation: 90 }
        ],
        options: [
            { id: 'A', type: 'clock-line', rotation: 45 },
            { id: 'B', type: 'clock-line', rotation: 0 },
            { id: 'C', type: 'clock-line', rotation: 315 },
            { id: 'D', type: 'clock-line', rotation: 270 }
        ],
        correctAnswer: 'B'
    },
    // Pattern 5: Decreasing count
    {
        id: 'nv5',
        description: "Complete the decreasing pattern.",
        category: 'Counting',
        sequence: [
            { type: 'shapes-count', count: 5, shape: 'square' },
            { type: 'shapes-count', count: 4, shape: 'square' },
            { type: 'shapes-count', count: 3, shape: 'square' },
            { type: 'shapes-count', count: 2, shape: 'square' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 2, shape: 'square' },
            { id: 'B', type: 'shapes-count', count: 0, shape: 'square' },
            { id: 'C', type: 'shapes-count', count: 1, shape: 'square' },
            { id: 'D', type: 'shapes-count', count: 3, shape: 'square' }
        ],
        correctAnswer: 'C'
    },
    // Pattern 6: Shape transformation
    {
        id: 'nv6',
        description: "What pattern do you see? Select the next item.",
        category: 'Transformation',
        sequence: [
            { type: 'shapes-count', count: 1, shape: 'circle' },
            { type: 'shapes-count', count: 1, shape: 'square' },
            { type: 'shapes-count', count: 1, shape: 'triangle' },
            { type: 'shapes-count', count: 1, shape: 'circle' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 1, shape: 'circle' },
            { id: 'B', type: 'shapes-count', count: 1, shape: 'square' },
            { id: 'C', type: 'shapes-count', count: 1, shape: 'triangle' },
            { id: 'D', type: 'shapes-count', count: 2, shape: 'circle' }
        ],
        correctAnswer: 'B'
    },
    // Pattern 7: Fill progression
    {
        id: 'nv7',
        description: "Identify the fill pattern completion.",
        category: 'Progression',
        sequence: [
            { type: 'box-fill', fill: 'none' },
            { type: 'box-fill', fill: 'start' },
            { type: 'box-fill', fill: 'center' },
            { type: 'box-fill', fill: 'end' }
        ],
        options: [
            { id: 'A', type: 'box-fill', fill: 'full' },
            { id: 'B', type: 'box-fill', fill: 'none' },
            { id: 'C', type: 'box-fill', fill: 'start' },
            { id: 'D', type: 'box-fill', fill: 'center' }
        ],
        correctAnswer: 'A'
    },
    // Pattern 8: Rotation with increment
    {
        id: 'nv8',
        description: "The angle increases each step. What comes next?",
        category: 'Rotation',
        sequence: [
            { type: 'clock-line', rotation: 0 },
            { type: 'clock-line', rotation: 30 },
            { type: 'clock-line', rotation: 60 },
            { type: 'clock-line', rotation: 90 }
        ],
        options: [
            { id: 'A', type: 'clock-line', rotation: 100 },
            { id: 'B', type: 'clock-line', rotation: 120 },
            { id: 'C', type: 'clock-line', rotation: 90 },
            { id: 'D', type: 'clock-line', rotation: 150 }
        ],
        correctAnswer: 'B'
    },
    // Pattern 9: Double count increase
    {
        id: 'nv9',
        description: "The count doubles each time. What's next?",
        category: 'Counting',
        sequence: [
            { type: 'shapes-count', count: 1, shape: 'triangle' },
            { type: 'shapes-count', count: 2, shape: 'triangle' },
            { type: 'shapes-count', count: 4, shape: 'triangle' },
            { type: 'shapes-count', count: 8, shape: 'triangle' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 10, shape: 'triangle' },
            { id: 'B', type: 'shapes-count', count: 12, shape: 'triangle' },
            { id: 'C', type: 'shapes-count', count: 16, shape: 'triangle' },
            { id: 'D', type: 'shapes-count', count: 9, shape: 'triangle' }
        ],
        correctAnswer: 'C'
    },
    // Pattern 10: Alternating with progression
    {
        id: 'nv10',
        description: "Find the pattern in this alternating sequence.",
        category: 'Alternation',
        sequence: [
            { type: 'box-fill', fill: 'start' },
            { type: 'box-fill', fill: 'none' },
            { type: 'box-fill', fill: 'end' },
            { type: 'box-fill', fill: 'none' }
        ],
        options: [
            { id: 'A', type: 'box-fill', fill: 'start' },
            { id: 'B', type: 'box-fill', fill: 'end' },
            { id: 'C', type: 'box-fill', fill: 'full' },
            { id: 'D', type: 'box-fill', fill: 'center' }
        ],
        correctAnswer: 'C'
    },
    // Pattern 11: Mixed shape count
    {
        id: 'nv11',
        description: "Continue the shape and count pattern.",
        category: 'Combined',
        sequence: [
            { type: 'shapes-count', count: 2, shape: 'circle' },
            { type: 'shapes-count', count: 3, shape: 'square' },
            { type: 'shapes-count', count: 4, shape: 'circle' },
            { type: 'shapes-count', count: 5, shape: 'square' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 6, shape: 'square' },
            { id: 'B', type: 'shapes-count', count: 6, shape: 'circle' },
            { id: 'C', type: 'shapes-count', count: 5, shape: 'circle' },
            { id: 'D', type: 'shapes-count', count: 7, shape: 'triangle' }
        ],
        correctAnswer: 'B'
    },
    // Pattern 12: Complex rotation
    {
        id: 'nv12',
        description: "The rotation increases by 15° more each step.",
        category: 'Rotation',
        sequence: [
            { type: 'clock-line', rotation: 0 },
            { type: 'clock-line', rotation: 15 },
            { type: 'clock-line', rotation: 45 },
            { type: 'clock-line', rotation: 90 }
        ],
        options: [
            { id: 'A', type: 'clock-line', rotation: 120 },
            { id: 'B', type: 'clock-line', rotation: 135 },
            { id: 'C', type: 'clock-line', rotation: 150 },
            { id: 'D', type: 'clock-line', rotation: 105 }
        ],
        correctAnswer: 'C'
    },
    // Pattern 13: Triple count increase
    {
        id: 'nv13',
        description: "The count triples each step. What's next?",
        category: 'Counting',
        sequence: [
            { type: 'shapes-count', count: 1, shape: 'circle' },
            { type: 'shapes-count', count: 3, shape: 'circle' },
            { type: 'shapes-count', count: 9, shape: 'circle' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 12, shape: 'circle' },
            { id: 'B', type: 'shapes-count', count: 18, shape: 'circle' },
            { id: 'C', type: 'shapes-count', count: 27, shape: 'circle' },
            { id: 'D', type: 'shapes-count', count: 36, shape: 'circle' }
        ],
        correctAnswer: 'C'
    },
    // Pattern 14: Reverse rotation
    {
        id: 'nv14',
        description: "Find the rotation pattern.",
        category: 'Rotation',
        sequence: [
            { type: 'clock-line', rotation: 180 },
            { type: 'clock-line', rotation: 150 },
            { type: 'clock-line', rotation: 120 },
            { type: 'clock-line', rotation: 90 }
        ],
        options: [
            { id: 'A', type: 'clock-line', rotation: 60 },
            { id: 'B', type: 'clock-line', rotation: 75 },
            { id: 'C', type: 'clock-line', rotation: 45 },
            { id: 'D', type: 'clock-line', rotation: 30 }
        ],
        correctAnswer: 'A'
    },
    // Pattern 15: Fibonacci-like count
    {
        id: 'nv15',
        description: "Each count is the sum of the previous two.",
        category: 'Counting',
        sequence: [
            { type: 'shapes-count', count: 1, shape: 'square' },
            { type: 'shapes-count', count: 1, shape: 'square' },
            { type: 'shapes-count', count: 2, shape: 'square' },
            { type: 'shapes-count', count: 3, shape: 'square' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 4, shape: 'square' },
            { id: 'B', type: 'shapes-count', count: 5, shape: 'square' },
            { id: 'C', type: 'shapes-count', count: 6, shape: 'square' },
            { id: 'D', type: 'shapes-count', count: 7, shape: 'square' }
        ],
        correctAnswer: 'B'
    },
    // Pattern 16: Shape cycling with count
    {
        id: 'nv16',
        description: "Shapes cycle while count increases by 2.",
        category: 'Combined',
        sequence: [
            { type: 'shapes-count', count: 1, shape: 'triangle' },
            { type: 'shapes-count', count: 3, shape: 'circle' },
            { type: 'shapes-count', count: 5, shape: 'square' },
            { type: 'shapes-count', count: 7, shape: 'triangle' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 9, shape: 'square' },
            { id: 'B', type: 'shapes-count', count: 9, shape: 'circle' },
            { id: 'C', type: 'shapes-count', count: 8, shape: 'circle' },
            { id: 'D', type: 'shapes-count', count: 10, shape: 'triangle' }
        ],
        correctAnswer: 'B'
    },
    // Pattern 17: Fill reversal pattern
    {
        id: 'nv17',
        description: "Identify the fill reversal pattern.",
        category: 'Alternation',
        sequence: [
            { type: 'box-fill', fill: 'full' },
            { type: 'box-fill', fill: 'end' },
            { type: 'box-fill', fill: 'center' },
            { type: 'box-fill', fill: 'start' }
        ],
        options: [
            { id: 'A', type: 'box-fill', fill: 'none' },
            { id: 'B', type: 'box-fill', fill: 'full' },
            { id: 'C', type: 'box-fill', fill: 'center' },
            { id: 'D', type: 'box-fill', fill: 'start' }
        ],
        correctAnswer: 'A'
    },
    // Pattern 18: Skip count pattern
    {
        id: 'nv18',
        description: "Count increases: +1, +2, +3, +4...",
        category: 'Counting',
        sequence: [
            { type: 'shapes-count', count: 1, shape: 'circle' },
            { type: 'shapes-count', count: 2, shape: 'circle' },
            { type: 'shapes-count', count: 4, shape: 'circle' },
            { type: 'shapes-count', count: 7, shape: 'circle' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 10, shape: 'circle' },
            { id: 'B', type: 'shapes-count', count: 11, shape: 'circle' },
            { id: 'C', type: 'shapes-count', count: 12, shape: 'circle' },
            { id: 'D', type: 'shapes-count', count: 9, shape: 'circle' }
        ],
        correctAnswer: 'B'
    },
    // Pattern 19: Double rotation increment
    {
        id: 'nv19',
        description: "Rotation increment doubles each time.",
        category: 'Rotation',
        sequence: [
            { type: 'clock-line', rotation: 0 },
            { type: 'clock-line', rotation: 10 },
            { type: 'clock-line', rotation: 30 },
            { type: 'clock-line', rotation: 70 }
        ],
        options: [
            { id: 'A', type: 'clock-line', rotation: 110 },
            { id: 'B', type: 'clock-line', rotation: 130 },
            { id: 'C', type: 'clock-line', rotation: 150 },
            { id: 'D', type: 'clock-line', rotation: 140 }
        ],
        correctAnswer: 'C'
    },
    // Pattern 20: Complex alternation with shapes
    {
        id: 'nv20',
        description: "Shapes alternate while count follows pattern.",
        category: 'Combined',
        sequence: [
            { type: 'shapes-count', count: 2, shape: 'square' },
            { type: 'shapes-count', count: 4, shape: 'triangle' },
            { type: 'shapes-count', count: 6, shape: 'square' },
            { type: 'shapes-count', count: 8, shape: 'triangle' }
        ],
        options: [
            { id: 'A', type: 'shapes-count', count: 10, shape: 'square' },
            { id: 'B', type: 'shapes-count', count: 10, shape: 'triangle' },
            { id: 'C', type: 'shapes-count', count: 12, shape: 'square' },
            { id: 'D', type: 'shapes-count', count: 9, shape: 'circle' }
        ],
        correctAnswer: 'A'
    }
];

// ============================================
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
