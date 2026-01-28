// HEXACO-PI-R 60-Item Questions with Scoring Keys
// Based on the official HEXACO-PI-R by Lee & Ashton

export const questions = [
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
export const traitDescriptions = {
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

// Trait colors for visualization
export const traitColors = {
    H: { primary: '#3663AD', gradient: 'linear-gradient(90deg, #3663AD, #5a85c9)' },
    E: { primary: '#25BCBD', gradient: 'linear-gradient(90deg, #25BCBD, #4cd8d9)' },
    X: { primary: '#160E44', gradient: 'linear-gradient(90deg, #160E44, #2d1d87)' },
    A: { primary: '#3663AD', gradient: 'linear-gradient(90deg, #3663AD, #25BCBD)' },
    C: { primary: '#25BCBD', gradient: 'linear-gradient(90deg, #25BCBD, #160E44)' },
    O: { primary: '#160E44', gradient: 'linear-gradient(90deg, #160E44, #3663AD)' }
};
