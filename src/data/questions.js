// HEXACO-PI-R 100-Item Questions with Scoring Keys
// Based on the official HEXACO-PI-R by Lee & Ashton
// Each trait has 4 facets with ~4 questions each

export const questions = [
    // HONESTY-HUMILITY (H) - 16 Questions
    // Facet: Sincerity
    { id: 1, text: "I wouldn't use flattery to get a raise or promotion at work, even if I thought it would succeed.", trait: "H", facet: "Sincerity", reversed: false },
    { id: 2, text: "If I want something from someone, I will laugh at that person's worst jokes.", trait: "H", facet: "Sincerity", reversed: true },
    { id: 3, text: "I wouldn't pretend to like someone just to get that person to do favors for me.", trait: "H", facet: "Sincerity", reversed: false },
    { id: 4, text: "If I knew that I could never get caught, I would be willing to steal a million dollars.", trait: "H", facet: "Sincerity", reversed: true },
    // Facet: Fairness
    { id: 5, text: "I would never accept a bribe, even if it were very large.", trait: "H", facet: "Fairness", reversed: false },
    { id: 6, text: "I'd be tempted to use counterfeit money, if I were sure I could get away with it.", trait: "H", facet: "Fairness", reversed: true },
    { id: 7, text: "If I knew that I could never get caught, I'd be willing to cheat on my taxes.", trait: "H", facet: "Fairness", reversed: true },
    { id: 8, text: "I would be tempted to buy stolen property if I were financially tight.", trait: "H", facet: "Fairness", reversed: true },
    // Facet: Greed Avoidance
    { id: 9, text: "Having a lot of money is not especially important to me.", trait: "H", facet: "Greed Avoidance", reversed: false },
    { id: 10, text: "I would get a lot of pleasure from owning expensive luxury goods.", trait: "H", facet: "Greed Avoidance", reversed: true },
    { id: 11, text: "I would like to live in a very expensive, high-class neighborhood.", trait: "H", facet: "Greed Avoidance", reversed: true },
    { id: 12, text: "I would like to be seen driving around in a very expensive car.", trait: "H", facet: "Greed Avoidance", reversed: true },
    // Facet: Modesty
    { id: 13, text: "I think that I am entitled to more respect than the average person is.", trait: "H", facet: "Modesty", reversed: true },
    { id: 14, text: "I want people to know that I am an important person of high status.", trait: "H", facet: "Modesty", reversed: true },
    { id: 15, text: "I am an ordinary person who is no better than others.", trait: "H", facet: "Modesty", reversed: false },
    { id: 16, text: "I wouldn't want people to treat me as though I were superior to them.", trait: "H", facet: "Modesty", reversed: false },

    // EMOTIONALITY (E) - 16 Questions
    // Facet: Fearfulness
    { id: 17, text: "I would feel afraid if I had to travel in bad weather conditions.", trait: "E", facet: "Fearfulness", reversed: false },
    { id: 18, text: "When it comes to physical danger, I am very fearful.", trait: "E", facet: "Fearfulness", reversed: false },
    { id: 19, text: "Even in an emergency I wouldn't feel like panicking.", trait: "E", facet: "Fearfulness", reversed: true },
    { id: 20, text: "I am not at all afraid to do risky physical activities.", trait: "E", facet: "Fearfulness", reversed: true },
    // Facet: Anxiety
    { id: 21, text: "I sometimes can't help worrying about little things.", trait: "E", facet: "Anxiety", reversed: false },
    { id: 22, text: "I worry a lot less than most people do.", trait: "E", facet: "Anxiety", reversed: true },
    { id: 23, text: "I often feel stressed about things that may go wrong.", trait: "E", facet: "Anxiety", reversed: false },
    { id: 24, text: "I rarely get stressed even under heavy pressure.", trait: "E", facet: "Anxiety", reversed: true },
    // Facet: Dependence
    { id: 25, text: "When I suffer from a painful experience, I need someone to make me feel comfortable.", trait: "E", facet: "Dependence", reversed: false },
    { id: 26, text: "I can handle difficult situations without needing emotional support from anyone else.", trait: "E", facet: "Dependence", reversed: true },
    { id: 27, text: "Whenever I feel worried about something, I want to share my concern with another person.", trait: "E", facet: "Dependence", reversed: false },
    { id: 28, text: "I don't need other people's reassurance when I am feeling down.", trait: "E", facet: "Dependence", reversed: true },
    // Facet: Sentimentality
    { id: 29, text: "I feel like crying when I see other people crying.", trait: "E", facet: "Sentimentality", reversed: false },
    { id: 30, text: "I feel strong emotions when someone close to me is going away for a long time.", trait: "E", facet: "Sentimentality", reversed: false },
    { id: 31, text: "I remain unemotional even in situations where most people get very sentimental.", trait: "E", facet: "Sentimentality", reversed: true },
    { id: 32, text: "I am rarely touched by emotional movies or songs.", trait: "E", facet: "Sentimentality", reversed: true },

    // EXTRAVERSION (X) - 17 Questions
    // Facet: Social Self-Esteem
    { id: 33, text: "I feel reasonably satisfied with myself overall.", trait: "X", facet: "Social Self-Esteem", reversed: false },
    { id: 34, text: "I feel that I am an unpopular person.", trait: "X", facet: "Social Self-Esteem", reversed: true },
    { id: 35, text: "I sometimes feel that I am a worthless person.", trait: "X", facet: "Social Self-Esteem", reversed: true },
    { id: 36, text: "I have a generally positive view of myself.", trait: "X", facet: "Social Self-Esteem", reversed: false },
    // Facet: Social Boldness
    { id: 37, text: "I rarely express my opinions in group meetings.", trait: "X", facet: "Social Boldness", reversed: true },
    { id: 38, text: "In social situations, I'm usually the one who makes the first move.", trait: "X", facet: "Social Boldness", reversed: false },
    { id: 39, text: "When I'm in a group of people, I'm often the one who speaks on behalf of the group.", trait: "X", facet: "Social Boldness", reversed: false },
    { id: 40, text: "I feel nervous when I have to speak in front of a group.", trait: "X", facet: "Social Boldness", reversed: true },
    { id: 41, text: "I am comfortable giving instructions or directions to others.", trait: "X", facet: "Social Boldness", reversed: false },
    // Facet: Sociability
    { id: 42, text: "I prefer jobs that involve active social interaction to those that involve working alone.", trait: "X", facet: "Sociability", reversed: false },
    { id: 43, text: "The first thing that I always do in a new place is to make friends.", trait: "X", facet: "Sociability", reversed: false },
    { id: 44, text: "I prefer to work on my own rather than with others.", trait: "X", facet: "Sociability", reversed: true },
    { id: 45, text: "I enjoy having lots of people around to talk to.", trait: "X", facet: "Sociability", reversed: false },
    // Facet: Liveliness
    { id: 46, text: "On most days, I feel cheerful and optimistic.", trait: "X", facet: "Liveliness", reversed: false },
    { id: 47, text: "Most people are more upbeat and dynamic than I generally am.", trait: "X", facet: "Liveliness", reversed: true },
    { id: 48, text: "People often describe me as energetic and enthusiastic.", trait: "X", facet: "Liveliness", reversed: false },
    { id: 49, text: "I often feel sluggish and lacking energy.", trait: "X", facet: "Liveliness", reversed: true },

    // AGREEABLENESS (A) - 17 Questions
    // Facet: Forgivingness
    { id: 50, text: "I rarely hold a grudge, even against people who have badly wronged me.", trait: "A", facet: "Forgivingness", reversed: false },
    { id: 51, text: "My attitude toward people who have treated me badly is \"forgive and forget\".", trait: "A", facet: "Forgivingness", reversed: false },
    { id: 52, text: "If someone has cheated me once, I will always feel suspicious of that person.", trait: "A", facet: "Forgivingness", reversed: true },
    { id: 53, text: "I find it hard to forgive those who have hurt me.", trait: "A", facet: "Forgivingness", reversed: true },
    // Facet: Gentleness
    { id: 54, text: "People sometimes tell me that I am too critical of others.", trait: "A", facet: "Gentleness", reversed: true },
    { id: 55, text: "I tend to be lenient in judging other people.", trait: "A", facet: "Gentleness", reversed: false },
    { id: 56, text: "Even when people make a lot of mistakes, I rarely say anything negative.", trait: "A", facet: "Gentleness", reversed: false },
    { id: 57, text: "I am often harsh when pointing out other people's faults.", trait: "A", facet: "Gentleness", reversed: true },
    { id: 58, text: "I try to give people the benefit of the doubt.", trait: "A", facet: "Gentleness", reversed: false },
    // Facet: Flexibility
    { id: 59, text: "People sometimes tell me that I'm too stubborn.", trait: "A", facet: "Flexibility", reversed: true },
    { id: 60, text: "I am usually quite flexible in my opinions when people disagree with me.", trait: "A", facet: "Flexibility", reversed: false },
    { id: 61, text: "When people tell me that I'm wrong, my first reaction is to argue with them.", trait: "A", facet: "Flexibility", reversed: true },
    { id: 62, text: "I am willing to compromise my own views if it leads to agreement.", trait: "A", facet: "Flexibility", reversed: false },
    // Facet: Patience
    { id: 63, text: "People think of me as someone who has a quick temper.", trait: "A", facet: "Patience", reversed: true },
    { id: 64, text: "Most people tend to get angry more quickly than I do.", trait: "A", facet: "Patience", reversed: false },
    { id: 65, text: "I rarely get irritated, even when people are rude to me.", trait: "A", facet: "Patience", reversed: false },
    { id: 66, text: "I tend to lose my temper quickly when things don't go my way.", trait: "A", facet: "Patience", reversed: true },

    // CONSCIENTIOUSNESS (C) - 17 Questions
    // Facet: Organization
    { id: 67, text: "I plan ahead and organize things, to avoid scrambling at the last minute.", trait: "C", facet: "Organization", reversed: false },
    { id: 68, text: "When working, I sometimes have difficulties due to being disorganized.", trait: "C", facet: "Organization", reversed: true },
    { id: 69, text: "I like to keep all my belongings neat and organized.", trait: "C", facet: "Organization", reversed: false },
    { id: 70, text: "My workspace often becomes cluttered and messy.", trait: "C", facet: "Organization", reversed: true },
    // Facet: Diligence
    { id: 71, text: "I often push myself very hard when trying to achieve a goal.", trait: "C", facet: "Diligence", reversed: false },
    { id: 72, text: "I do only the minimum amount of work needed to get by.", trait: "C", facet: "Diligence", reversed: true },
    { id: 73, text: "I am motivated to give 100% effort in everything I do.", trait: "C", facet: "Diligence", reversed: false },
    { id: 74, text: "I often leave tasks unfinished when they become difficult.", trait: "C", facet: "Diligence", reversed: true },
    { id: 75, text: "I push through challenges until I complete what I started.", trait: "C", facet: "Diligence", reversed: false },
    // Facet: Perfectionism
    { id: 76, text: "When working on something, I don't pay much attention to small details.", trait: "C", facet: "Perfectionism", reversed: true },
    { id: 77, text: "I always try to be accurate in my work, even at the expense of time.", trait: "C", facet: "Perfectionism", reversed: false },
    { id: 78, text: "People often call me a perfectionist.", trait: "C", facet: "Perfectionism", reversed: false },
    { id: 79, text: "I am satisfied with work that is \"good enough\" even if it's not perfect.", trait: "C", facet: "Perfectionism", reversed: true },
    // Facet: Prudence
    { id: 80, text: "I make decisions based on the feeling of the moment rather than on careful thought.", trait: "C", facet: "Prudence", reversed: true },
    { id: 81, text: "I make a lot of mistakes because I don't think before I act.", trait: "C", facet: "Prudence", reversed: true },
    { id: 82, text: "I prefer to do whatever comes to mind, rather than stick to a plan.", trait: "C", facet: "Prudence", reversed: true },
    { id: 83, text: "I carefully consider the consequences before making important decisions.", trait: "C", facet: "Prudence", reversed: false },

    // OPENNESS TO EXPERIENCE (O) - 17 Questions
    // Facet: Aesthetic Appreciation
    { id: 84, text: "I would be quite bored by a visit to an art gallery.", trait: "O", facet: "Aesthetic Appreciation", reversed: true },
    { id: 85, text: "If I had the opportunity, I would like to attend a classical music concert.", trait: "O", facet: "Aesthetic Appreciation", reversed: false },
    { id: 86, text: "I am deeply moved by the beauty of nature.", trait: "O", facet: "Aesthetic Appreciation", reversed: false },
    { id: 87, text: "I don't really care about art or beautiful scenery.", trait: "O", facet: "Aesthetic Appreciation", reversed: true },
    // Facet: Inquisitiveness
    { id: 88, text: "I'm interested in learning about the history and politics of other countries.", trait: "O", facet: "Inquisitiveness", reversed: false },
    { id: 89, text: "I've never really enjoyed looking through an encyclopedia.", trait: "O", facet: "Inquisitiveness", reversed: true },
    { id: 90, text: "I am curious about many different topics and subjects.", trait: "O", facet: "Inquisitiveness", reversed: false },
    { id: 91, text: "I prefer familiar topics over learning about new and unknown subjects.", trait: "O", facet: "Inquisitiveness", reversed: true },
    { id: 92, text: "I love exploring new ideas and concepts just for the sake of learning.", trait: "O", facet: "Inquisitiveness", reversed: false },
    // Facet: Creativity
    { id: 93, text: "I would enjoy creating a work of art, such as a novel, a song, or a painting.", trait: "O", facet: "Creativity", reversed: false },
    { id: 94, text: "People have often told me that I have a good imagination.", trait: "O", facet: "Creativity", reversed: false },
    { id: 95, text: "I don't think of myself as the artistic or creative type.", trait: "O", facet: "Creativity", reversed: true },
    { id: 96, text: "I often come up with original or creative solutions to problems.", trait: "O", facet: "Creativity", reversed: false },
    // Facet: Unconventionality
    { id: 97, text: "I think that paying attention to radical ideas is a waste of time.", trait: "O", facet: "Unconventionality", reversed: true },
    { id: 98, text: "I like people who have unconventional views.", trait: "O", facet: "Unconventionality", reversed: false },
    { id: 99, text: "I find it boring to discuss philosophy.", trait: "O", facet: "Unconventionality", reversed: true },
    { id: 100, text: "I enjoy considering unusual or abstract ideas.", trait: "O", facet: "Unconventionality", reversed: false }
];

// Trait Descriptions with Facets
export const traitDescriptions = {
    H: {
        name: "Honesty-Humility",
        icon: "⚖️",
        high: "You tend to be sincere and fair in dealings with others. You're not interested in manipulating others for personal gain and have little desire for lavish wealth or elevated social status.",
        low: "You may be inclined to flatter others to get what you want and may be motivated by material gain. You might feel a strong sense of self-importance.",
        facets: {
            Sincerity: "Being genuine in interpersonal relations",
            Fairness: "Avoiding fraud and corruption",
            "Greed Avoidance": "Lack of interest in wealth and luxury",
            Modesty: "Tendency to be humble and unassuming"
        }
    },
    E: {
        name: "Emotionality",
        icon: "💭",
        high: "You tend to experience fear of physical dangers and anxiety in response to life's stresses. You feel empathy for others and feel strong emotional bonds.",
        low: "You're not easily deterred by physical harm, feel little worry even in stressful situations, and feel emotionally independent from others.",
        facets: {
            Fearfulness: "Tendency to experience fear of physical dangers",
            Anxiety: "Tendency to worry about various stresses",
            Dependence: "Need for emotional support from others",
            Sentimentality: "Tendency to feel strong emotional bonds"
        }
    },
    X: {
        name: "Extraversion",
        icon: "🌟",
        high: "You feel positively about yourself and confident in social situations. You enjoy gatherings and interactions, feeling enthusiastic and energetic.",
        low: "You may consider yourself less popular, feel awkward in social attention, and feel less lively and optimistic than others.",
        facets: {
            "Social Self-Esteem": "Positive self-regard and confidence",
            "Social Boldness": "Comfort in leadership and speaking up",
            Sociability: "Enjoyment of social interaction",
            Liveliness: "Enthusiasm and energy for life"
        }
    },
    A: {
        name: "Agreeableness",
        icon: "🤝",
        high: "You tend to forgive wrongs, are lenient in judging others, willing to compromise, and can easily control your temper.",
        low: "You may hold grudges, be critical of others' shortcomings, defend your views stubbornly, and feel anger readily.",
        facets: {
            Forgivingness: "Willingness to forgive those who have wronged you",
            Gentleness: "Leniency in judging others",
            Flexibility: "Willingness to compromise and cooperate",
            Patience: "Tendency to remain calm under provocation"
        }
    },
    C: {
        name: "Conscientiousness",
        icon: "🎯",
        high: "You organize your time and surroundings well, work disciplined toward goals, strive for accuracy, and deliberate carefully when making decisions.",
        low: "You tend to be unconcerned with orderly surroundings, avoid difficult tasks, are satisfied with work containing errors, and make impulsive decisions.",
        facets: {
            Organization: "Tendency to keep things orderly and planned",
            Diligence: "Working hard toward goals",
            Perfectionism: "Striving for accuracy and quality",
            Prudence: "Careful deliberation before acting"
        }
    },
    O: {
        name: "Openness to Experience",
        icon: "🔮",
        high: "You become absorbed in the beauty of art and nature, are inquisitive about various domains, use imagination freely, and take interest in unusual ideas.",
        low: "You're rather unimpressed by art, feel little intellectual curiosity, avoid creative pursuits, and feel little attraction toward unconventional ideas.",
        facets: {
            "Aesthetic Appreciation": "Appreciation of beauty in art and nature",
            Inquisitiveness: "Curiosity about various topics",
            Creativity: "Preference for innovation and originality",
            Unconventionality: "Receptivity to unusual ideas"
        }
    }
};

// Trait colors for visualization
export const traitColors = {
    H: { primary: '#3663AD', gradient: 'linear-gradient(90deg, #3663AD, #5a85c9)', glow: '#5a85c9' },
    E: { primary: '#25BCBD', gradient: 'linear-gradient(90deg, #25BCBD, #4cd8d9)', glow: '#4cd8d9' },
    X: { primary: '#8B5CF6', gradient: 'linear-gradient(90deg, #8B5CF6, #A78BFA)', glow: '#A78BFA' },
    A: { primary: '#10B981', gradient: 'linear-gradient(90deg, #10B981, #34D399)', glow: '#34D399' },
    C: { primary: '#F59E0B', gradient: 'linear-gradient(90deg, #F59E0B, #FBBF24)', glow: '#FBBF24' },
    O: { primary: '#EC4899', gradient: 'linear-gradient(90deg, #EC4899, #F472B6)', glow: '#F472B6' }
};
