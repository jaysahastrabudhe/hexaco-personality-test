// Comprehensive Personality Insights for HEXACO Results
// This data provides in-depth analysis for counselors and detailed feedback for users

// Score Level Thresholds
export const scoreRanges = {
    veryLow: { min: 0, max: 20, label: 'Very Low' },
    low: { min: 21, max: 40, label: 'Low' },
    moderate: { min: 41, max: 60, label: 'Moderate' },
    high: { min: 61, max: 80, label: 'High' },
    veryHigh: { min: 81, max: 100, label: 'Very High' }
};

export const getScoreLevel = (score) => {
    if (score <= 20) return 'veryLow';
    if (score <= 40) return 'low';
    if (score <= 60) return 'moderate';
    if (score <= 80) return 'high';
    return 'veryHigh';
};

export const getScoreLabel = (score) => {
    return scoreRanges[getScoreLevel(score)].label;
};

// Comprehensive Trait Analysis
export const traitAnalysis = {
    H: {
        name: "Honesty-Humility",
        icon: "⚖️",
        coreDescription: "Measures sincerity, fairness, greed-avoidance, and modesty in interpersonal dealings.",
        facets: {
            sincerity: {
                name: "Sincerity",
                description: "The tendency to be genuine in interpersonal relations without manipulating others."
            },
            fairness: {
                name: "Fairness",
                description: "The tendency to avoid fraud and corruption in dealings with others."
            },
            greedAvoidance: {
                name: "Greed Avoidance",
                description: "The tendency to be uninterested in possessing lavish wealth and luxury."
            },
            modesty: {
                name: "Modesty",
                description: "The tendency to be humble and unpretentious about one's worth."
            }
        },
        interpretations: {
            veryLow: {
                summary: "You demonstrate a highly pragmatic approach to interpersonal dealings, often prioritizing personal advancement and material success.",
                strengths: [
                    "Ambitious and driven toward material success",
                    "Comfortable with strategic self-presentation",
                    "Can be persuasive and influential when needed",
                    "Not held back by excessive modesty"
                ],
                challenges: [
                    "May be perceived as manipulative or self-serving by others",
                    "Risk of ethical boundary violations under pressure",
                    "Relationships may feel transactional to partners",
                    "Could struggle with trust-building in close relationships"
                ],
                growthAreas: [
                    "Practice transparency even when it's not advantageous",
                    "Reflect on the long-term costs of short-term gains",
                    "Consider how others' success can benefit you indirectly",
                    "Develop genuine interest in others beyond utility"
                ],
                counselorNotes: "Client may benefit from exploring values clarification exercises. Consider potential for workplace ethics concerns or relationship conflicts stemming from perceived manipulation. Assess for potential narcissistic tendencies if combined with high Extraversion. May need support in developing authentic relationships."
            },
            low: {
                summary: "You tend to be pragmatic in social situations and are comfortable with self-promotion when it serves your goals.",
                strengths: [
                    "Skilled at navigating competitive environments",
                    "Not overly self-deprecating",
                    "Can advocate effectively for oneself",
                    "Appreciates material rewards and status"
                ],
                challenges: [
                    "May overlook ethical nuances in favor of outcomes",
                    "Others might question sincerity of intentions",
                    "Could prioritize appearance over substance",
                    "May struggle with humility in group settings"
                ],
                growthAreas: [
                    "Practice acknowledging others' contributions",
                    "Consider the ethical implications of decisions",
                    "Build relationships without immediate expectations",
                    "Develop comfort with admitting mistakes"
                ],
                counselorNotes: "Explore client's early experiences with achievement and recognition. May benefit from discussions about authentic self-esteem versus external validation. Consider impact on romantic and professional relationships."
            },
            moderate: {
                summary: "You balance practical self-interest with ethical considerations, adapting your approach based on context and relationships.",
                strengths: [
                    "Flexible approach to different situations",
                    "Can be assertive when needed while remaining fair",
                    "Balanced view of material success",
                    "Reasonable level of self-promotion"
                ],
                challenges: [
                    "May feel conflicted about self-advocacy",
                    "Boundary between assertiveness and manipulation unclear",
                    "Could struggle with consistency across contexts",
                    "May need external guidance on ethical gray areas"
                ],
                growthAreas: [
                    "Clarify personal ethical boundaries",
                    "Develop consistent principles for decision-making",
                    "Reflect on when flexibility becomes compromise",
                    "Build awareness of impact on others"
                ],
                counselorNotes: "Client shows adaptive flexibility but may benefit from values clarification work. Explore any areas where ethical ambiguity causes stress or decision-making difficulty."
            },
            high: {
                summary: "You prioritize honesty and fairness in your dealings with others, and prefer genuine relationships over strategic ones.",
                strengths: [
                    "Trusted by others for integrity",
                    "Forms authentic, lasting relationships",
                    "Low risk of ethical violations",
                    "Comfortable with own status and possessions"
                ],
                challenges: [
                    "May be taken advantage of by less scrupulous individuals",
                    "Could undersell accomplishments professionally",
                    "Might struggle in highly competitive environments",
                    "May find it difficult to engage in necessary self-promotion"
                ],
                growthAreas: [
                    "Learn to advocate for yourself appropriately",
                    "Recognize when others aren't reciprocating honesty",
                    "Develop comfort with healthy competition",
                    "Practice articulating your value and achievements"
                ],
                counselorNotes: "Client demonstrates strong ethical foundation. May need support in competitive environments or negotiations. Explore any patterns of being exploited and develop protective boundaries while maintaining values."
            },
            veryHigh: {
                summary: "You strongly value sincerity, fairness, and humility, often putting ethical considerations above personal gain.",
                strengths: [
                    "Highly trustworthy and principled",
                    "Creates deep, genuine connections",
                    "Immune to corruption and manipulation tactics",
                    "Content without excessive material wealth",
                    "Natural ethical leadership"
                ],
                challenges: [
                    "May be naive about others' manipulative behaviors",
                    "Could significantly undersell abilities and achievements",
                    "Might struggle in environments requiring aggressive self-promotion",
                    "May miss opportunities due to excessive humility",
                    "Could be perceived as passive or unambitious"
                ],
                growthAreas: [
                    "Recognize that self-advocacy isn't dishonesty",
                    "Learn to identify when others aren't being genuine",
                    "Practice accepting recognition and praise",
                    "Understand that some competition is healthy"
                ],
                counselorNotes: "Client exhibits exceptionally high integrity which is a significant strength. However, assess for potential exploitation by others or career stagnation due to inadequate self-promotion. May benefit from assertiveness training while maintaining values. Explore family of origin messages about pride, success, and self-worth."
            }
        }
    },
    E: {
        name: "Emotionality",
        icon: "💭",
        coreDescription: "Measures fearfulness, anxiety, dependence, and sentimentality in emotional experiences.",
        facets: {
            fearfulness: {
                name: "Fearfulness",
                description: "The tendency to experience fear and anxiety in response to physical dangers."
            },
            anxiety: {
                name: "Anxiety",
                description: "The tendency to worry about various aspects of life."
            },
            dependence: {
                name: "Dependence",
                description: "The need for emotional support from others during difficult times."
            },
            sentimentality: {
                name: "Sentimentality",
                description: "The tendency to experience strong emotional bonds with others."
            }
        },
        interpretations: {
            veryLow: {
                summary: "You demonstrate exceptional emotional resilience and independence, rarely seeking support from others even in challenging situations.",
                strengths: [
                    "Performs well under pressure and in crisis situations",
                    "Makes decisions without excessive emotional interference",
                    "Highly self-sufficient and autonomous",
                    "Not easily destabilized by fear or worry",
                    "Can remain calm when others panic"
                ],
                challenges: [
                    "May appear cold or unfeeling to others",
                    "Could miss important danger signals",
                    "Might struggle to provide emotional support to others",
                    "Relationships may lack emotional depth",
                    "May underestimate psychological risks"
                ],
                growthAreas: [
                    "Practice recognizing and expressing vulnerable emotions",
                    "Learn to accept support from others occasionally",
                    "Develop empathy through perspective-taking exercises",
                    "Reflect on the value of emotional connections"
                ],
                counselorNotes: "Assess for emotional suppression or alexithymia. Client may have difficulty identifying emotions, which could impact relationships and decision-making. Explore early attachment patterns and any trauma history that may have led to emotional detachment. Consider impact on romantic relationships especially."
            },
            low: {
                summary: "You handle stress and fear with composure and prefer to manage difficulties independently rather than seeking emotional support.",
                strengths: [
                    "Resilient in challenging circumstances",
                    "Independent problem-solver",
                    "Not prone to excessive worry",
                    "Comfortable taking calculated risks",
                    "Stable emotional baseline"
                ],
                challenges: [
                    "May dismiss emotional needs of self and others",
                    "Could struggle with emotional intimacy",
                    "Might not recognize when help is needed",
                    "May be perceived as emotionally unavailable"
                ],
                growthAreas: [
                    "Practice vulnerability in safe relationships",
                    "Develop emotional vocabulary",
                    "Learn to recognize subtle emotional cues in others",
                    "Consider the value of interdependence"
                ],
                counselorNotes: "Client likely presents as composed and self-reliant. Explore relationship satisfaction and whether partners express concerns about emotional availability. May benefit from emotional awareness exercises."
            },
            moderate: {
                summary: "You experience a balanced range of emotions and can adapt your need for support based on the situation.",
                strengths: [
                    "Flexible emotional responses",
                    "Can be self-sufficient or seek support as needed",
                    "Reasonable worry that motivates without overwhelming",
                    "Forms appropriate emotional bonds"
                ],
                challenges: [
                    "May sometimes overreact or underreact to situations",
                    "Could struggle to gauge appropriate emotional response",
                    "Might feel torn between independence and connection"
                ],
                growthAreas: [
                    "Develop awareness of emotional patterns",
                    "Practice emotional regulation strategies",
                    "Learn to communicate emotional needs clearly"
                ],
                counselorNotes: "Client shows adaptive emotional functioning. Explore any specific contexts where emotions feel dysregulated or where they struggle to connect with emotional experience."
            },
            high: {
                summary: "You are emotionally attuned and form strong bonds with others. You may experience worry and seek comfort during stressful times.",
                strengths: [
                    "Deep capacity for emotional connection",
                    "Strong empathy and compassion",
                    "Aware of potential dangers and risks",
                    "Creates meaningful relationships",
                    "Attuned to emotional needs of self and others"
                ],
                challenges: [
                    "May experience excessive worry",
                    "Could become overly dependent on others",
                    "Might avoid situations perceived as dangerous",
                    "Strong emotions could impair decision-making"
                ],
                growthAreas: [
                    "Practice tolerating uncertainty",
                    "Develop independent coping strategies",
                    "Learn to distinguish realistic from excessive worry",
                    "Build confidence in handling challenges alone"
                ],
                counselorNotes: "Client may present with anxiety symptoms or relationship dependency. Assess for anxiety disorders if worry is significantly impairing. Explore attachment style and work on developing secure independence alongside meaningful connection."
            },
            veryHigh: {
                summary: "You experience emotions intensely and deeply, with strong attachments to others and heightened sensitivity to potential dangers.",
                strengths: [
                    "Exceptional capacity for empathy and connection",
                    "Strong intuition about emotional situations",
                    "Deeply loyal and attached to loved ones",
                    "Highly aware of risks and safety concerns"
                ],
                challenges: [
                    "Overwhelming anxiety or fear may be debilitating",
                    "High dependence on others could strain relationships",
                    "May avoid many situations due to perceived risk",
                    "Intense emotions may impair daily functioning",
                    "Vulnerable to separation distress"
                ],
                growthAreas: [
                    "Develop anxiety management and grounding techniques",
                    "Practice gradual exposure to feared situations",
                    "Build self-soothing and independent coping skills",
                    "Work on emotional regulation strategies"
                ],
                counselorNotes: "Client may meet criteria for anxiety disorder—conduct thorough assessment. High dependence suggests possible attachment anxiety. Explore trauma history and early attachment experiences. Consider CBT or ACT interventions for anxiety. May benefit from gradual independence-building while maintaining supportive relationships."
            }
        }
    },
    X: {
        name: "Extraversion",
        icon: "🌟",
        coreDescription: "Measures social self-esteem, social boldness, sociability, and liveliness.",
        facets: {
            socialSelfEsteem: {
                name: "Social Self-Esteem",
                description: "The positive self-regard especially in social contexts."
            },
            socialBoldness: {
                name: "Social Boldness",
                description: "Confidence and comfort in various social situations."
            },
            sociability: {
                name: "Sociability",
                description: "The enjoyment of social interaction and preference for company."
            },
            liveliness: {
                name: "Liveliness",
                description: "The tendency toward enthusiasm, energy, and optimism."
            }
        },
        interpretations: {
            veryLow: {
                summary: "You are deeply introspective and prefer solitude or very small groups. You may struggle with self-confidence in social settings.",
                strengths: [
                    "Excellent at focused, independent work",
                    "Deep thinking and reflection",
                    "Not swayed by social pressure",
                    "Comfortable with solitude",
                    "May excel in writing or solo creative work"
                ],
                challenges: [
                    "May experience social isolation",
                    "Low social self-esteem could impact opportunities",
                    "Might avoid networking crucial for career",
                    "Could be perceived as unfriendly or disinterested",
                    "May miss out on collaborative opportunities"
                ],
                growthAreas: [
                    "Practice low-stakes social interactions",
                    "Challenge negative self-talk about social worth",
                    "Identify one or two meaningful relationships to nurture",
                    "Find communities around specific interests"
                ],
                counselorNotes: "Assess for social anxiety disorder, depression, or avoidant personality features. Explore self-esteem and any history of social rejection or bullying. Consider whether client desires more connection or is content with current social level. If distressed, social skills training and cognitive restructuring may help."
            },
            low: {
                summary: "You prefer quiet environments and deeper one-on-one connections over large social gatherings. You recharge through solitude.",
                strengths: [
                    "Good at deep, focused work",
                    "Thoughtful and observant",
                    "Values quality over quantity in relationships",
                    "Self-sufficient in entertainment and stimulation",
                    "Good listener"
                ],
                challenges: [
                    "May miss opportunities requiring visibility",
                    "Could feel drained by required social events",
                    "Might be overlooked for leadership roles",
                    "May struggle with initiating relationships"
                ],
                growthAreas: [
                    "Develop strategies for necessary social situations",
                    "Practice self-promotion in comfortable ways",
                    "Build a small but supportive social network",
                    "Communicate needs clearly in relationships"
                ],
                counselorNotes: "Introversion itself is not pathological. Explore whether client is satisfied with social life or desires change. If distressed by social limitations, work on gentle exposure and skill-building. Consider occupational fit with current or desired roles."
            },
            moderate: {
                summary: "You can enjoy both social situations and solitude, adapting based on your energy levels and the context.",
                strengths: [
                    "Flexible across social contexts",
                    "Can work independently or collaboratively",
                    "Balanced energy regulation",
                    "Adaptable to different social demands"
                ],
                challenges: [
                    "May feel pulled between different social needs",
                    "Could struggle to identify optimal social level",
                    "Might overextend or under-engage periodically"
                ],
                growthAreas: [
                    "Identify personal optimal social balance",
                    "Communicate needs to others proactively",
                    "Recognize energy patterns and plan accordingly"
                ],
                counselorNotes: "Client shows adaptive social flexibility. Explore any specific contexts where social functioning feels challenging or where there's a disconnect between desired and actual social engagement."
            },
            high: {
                summary: "You are socially confident and energized by interaction with others. You tend to be optimistic and enthusiastic.",
                strengths: [
                    "Natural leader and networker",
                    "Builds rapport easily",
                    "Positive influence on group morale",
                    "Comfortable in spotlight",
                    "Creates energy and momentum in teams"
                ],
                challenges: [
                    "May struggle with prolonged solitude",
                    "Could dominate conversations inadvertently",
                    "Might make decisions too quickly for social approval",
                    "May not understand introverts' needs"
                ],
                growthAreas: [
                    "Practice active listening and making space for others",
                    "Develop comfort with solitude and reflection",
                    "Be mindful of quieter voices in groups",
                    "Consider depth alongside breadth in relationships"
                ],
                counselorNotes: "Client likely presents as engaging and personable. Explore relationship quality and whether connections feel meaningful. Consider impact on more introverted family members or colleagues. May benefit from reflective practices and deeper self-exploration."
            },
            veryHigh: {
                summary: "You are highly energetic, socially bold, and thrive on interaction. You feel most alive when surrounded by others.",
                strengths: [
                    "Exceptional networking and leadership abilities",
                    "High energy and enthusiasm",
                    "Very confident in social situations",
                    "Naturally inspiring and motivating to others",
                    "Comfortable taking social risks"
                ],
                challenges: [
                    "May find solitude very uncomfortable",
                    "Could have difficulty with introspection",
                    "Risk of burnout from over-scheduling socially",
                    "May be impulsive in seeking stimulation",
                    "Might struggle in roles requiring quiet focus"
                ],
                growthAreas: [
                    "Develop comfort with stillness and solitude",
                    "Practice deep listening without planning responses",
                    "Build capacity for focused, independent work",
                    "Reflect on whether activity serves genuine needs"
                ],
                counselorNotes: "Assess for impulsivity or stimulation-seeking that could be problematic. Explore depth of relationships versus quantity. Consider whether high social activity serves genuine connection or avoidance of uncomfortable internal experiences. May benefit from mindfulness practices."
            }
        }
    },
    A: {
        name: "Agreeableness",
        icon: "🤝",
        coreDescription: "Measures forgivingness, gentleness, flexibility, and patience in interpersonal relations.",
        facets: {
            forgivingness: {
                name: "Forgivingness",
                description: "The willingness to feel trust and liking toward those who have caused harm."
            },
            gentleness: {
                name: "Gentleness",
                description: "The tendency to be mild and lenient in dealings with others."
            },
            flexibility: {
                name: "Flexibility",
                description: "The willingness to compromise and cooperate with others."
            },
            patience: {
                name: "Patience",
                description: "The tendency to remain calm rather than getting angry."
            }
        },
        interpretations: {
            veryLow: {
                summary: "You are highly assertive and critical, with strong opinions that you defend vigorously. You may struggle to forgive perceived wrongs.",
                strengths: [
                    "Excellent critical thinker",
                    "Strong advocate for own position",
                    "Not easily manipulated or placated",
                    "Can make tough decisions without popularity concerns",
                    "Direct and honest feedback"
                ],
                challenges: [
                    "May create significant interpersonal conflict",
                    "Holding grudges could impair relationships and wellbeing",
                    "Could be perceived as hostile or aggressive",
                    "Difficulty working collaboratively in teams",
                    "Anger may lead to regrettable actions"
                ],
                growthAreas: [
                    "Practice anger management techniques",
                    "Explore the costs of holding grudges",
                    "Learn to express criticism constructively",
                    "Consider others' perspectives before judging",
                    "Work on forgiveness practices"
                ],
                counselorNotes: "Assess for anger management issues or intermittent explosive features. Explore relationship history and patterns of conflict. Consider impact on occupational functioning if in collaborative roles. May benefit from anger management intervention and exploring underlying hurt or fear. Assess for trauma that may underlie hostility."
            },
            low: {
                summary: "You tend to be critical and may have difficulty letting go of perceived slights. You prefer to stand your ground rather than compromise.",
                strengths: [
                    "Strong standards for self and others",
                    "Good at critical evaluation",
                    "Assertive in conflict",
                    "Not a pushover"
                ],
                challenges: [
                    "May escalate minor conflicts",
                    "Could have trouble maintaining harmonious relationships",
                    "Might be perceived as difficult to work with",
                    "Resentment may accumulate over time"
                ],
                growthAreas: [
                    "Practice picking battles wisely",
                    "Explore what triggers critical responses",
                    "Work on expressing needs without blame",
                    "Consider compassion for others' limitations"
                ],
                counselorNotes: "Explore relationship patterns and workplace conflicts. Consider whether low agreeableness is protective response to past hurt. May benefit from communication skills training and exploration of anger triggers."
            },
            moderate: {
                summary: "You balance your own needs with those of others, being critical when necessary but also able to cooperate and forgive.",
                strengths: [
                    "Adaptive to different relational contexts",
                    "Can advocate for self while considering others",
                    "Reasonable flexibility without being a pushover",
                    "Generally patient but can express displeasure"
                ],
                challenges: [
                    "May feel conflicted in adversarial situations",
                    "Could struggle to find right balance in conflicts",
                    "Might be inconsistent across relationships"
                ],
                growthAreas: [
                    "Clarify personal boundaries and non-negotiables",
                    "Develop clear framework for when to assert vs. accommodate",
                    "Practice consistency across different relationships"
                ],
                counselorNotes: "Client shows adaptive flexibility in relationships. Explore any specific relationships or contexts where balance feels difficult to achieve."
            },
            high: {
                summary: "You are cooperative, forgiving, and patient with others. You prefer harmony and are willing to compromise to maintain peace.",
                strengths: [
                    "Excellent team player",
                    "Creates harmony in relationships and groups",
                    "Forgives easily, promoting healing",
                    "Rarely loses temper",
                    "Good at de-escalating conflicts"
                ],
                challenges: [
                    "May not advocate sufficiently for own needs",
                    "Could tolerate mistreatment too long",
                    "Might avoid necessary conflict",
                    "May be taken advantage of by others"
                ],
                growthAreas: [
                    "Practice asserting needs and boundaries",
                    "Recognize when forgiveness enables harmful behavior",
                    "Learn to engage in healthy conflict",
                    "Develop comfort with others' temporary displeasure"
                ],
                counselorNotes: "Explore whether high agreeableness leads to unmet needs or exploitation. Assess for patterns of staying in unhealthy relationships. May benefit from assertiveness training while maintaining cooperative orientation."
            },
            veryHigh: {
                summary: "You are exceptionally forgiving, gentle, and accommodating. You strongly dislike conflict and go to great lengths to maintain harmony.",
                strengths: [
                    "Creates very harmonious environments",
                    "Exceptional capacity for forgiveness",
                    "Rarely if ever loses temper",
                    "Deeply cooperative and flexible",
                    "Natural peacemaker and mediator"
                ],
                challenges: [
                    "May significantly suppress own needs and feelings",
                    "High risk of being exploited",
                    "Could stay in harmful relationships indefinitely",
                    "Avoiding conflict may allow problems to fester",
                    "May struggle to protect self or dependents"
                ],
                growthAreas: [
                    "Learn that assertiveness isn't aggression",
                    "Practice expressing displeasure safely",
                    "Recognize when forgiveness becomes enabling",
                    "Develop skills for healthy confrontation",
                    "Work on valuing own needs equally"
                ],
                counselorNotes: "Assess carefully for history of exploitation, abuse, or unhealthy relationships. High agreeableness combined with other factors may indicate people-pleasing that harms the client. Explore family of origin dynamics around conflict and assertion. Assertiveness training essential; may need support recognizing and leaving harmful situations."
            }
        }
    },
    C: {
        name: "Conscientiousness",
        icon: "📋",
        coreDescription: "Measures organization, diligence, perfectionism, and prudence in approaching tasks and decisions.",
        facets: {
            organization: {
                name: "Organization",
                description: "The tendency to seek order in one's surroundings and activities."
            },
            diligence: {
                name: "Diligence",
                description: "The tendency to work hard and persist in completing tasks."
            },
            perfectionism: {
                name: "Perfectionism",
                description: "The tendency to be thorough and concerned with details."
            },
            prudence: {
                name: "Prudence",
                description: "The tendency to think carefully before acting or making decisions."
            }
        },
        interpretations: {
            veryLow: {
                summary: "You prefer spontaneity over planning and may struggle with organization and follow-through on tasks.",
                strengths: [
                    "Highly adaptable and spontaneous",
                    "Not paralyzed by perfectionism",
                    "Can act quickly without overthinking",
                    "Flexible and goes with the flow",
                    "May excel in creative or unpredictable environments"
                ],
                challenges: [
                    "May frequently miss deadlines or commitments",
                    "Disorganization could significantly impair functioning",
                    "Impulsive decisions may have negative consequences",
                    "Others may perceive as unreliable",
                    "Long-term goals may be difficult to achieve"
                ],
                growthAreas: [
                    "Develop basic organizational systems",
                    "Practice pausing before major decisions",
                    "Set small, achievable goals to build momentum",
                    "Use external accountability structures"
                ],
                counselorNotes: "Assess for ADHD or other conditions affecting executive function. Explore impact on work, relationships, and life goals. May benefit from concrete skill-building in organization and planning. Consider whether this reflects temperament or a pattern that causes significant impairment requiring intervention."
            },
            low: {
                summary: "You prefer flexibility and spontaneity, and may find it challenging to maintain rigid structures or attend to details.",
                strengths: [
                    "Adaptable and flexible",
                    "Comfortable with ambiguity",
                    "Not overly rigid or perfectionist",
                    "Can improvise effectively"
                ],
                challenges: [
                    "May struggle with detailed or long-term projects",
                    "Could be perceived as careless or unreliable",
                    "Might make impulsive decisions",
                    "May underperform in structured environments"
                ],
                growthAreas: [
                    "Identify minimum necessary structure for success",
                    "Develop habits around key responsibilities",
                    "Practice deliberation on important decisions",
                    "Find roles that value flexibility"
                ],
                counselorNotes: "Explore whether low conscientiousness causes impairment or distress. Consider occupational fit and relationship impacts. May benefit from coaching on organizational skills if this is causing problems."
            },
            moderate: {
                summary: "You balance structure with flexibility, able to be organized when needed while also adapting to changing circumstances.",
                strengths: [
                    "Flexible approach to planning and execution",
                    "Can be thorough or quick depending on need",
                    "Reasonable balance of prudence and action",
                    "Adapts structure to context"
                ],
                challenges: [
                    "May not consistently meet high organizational standards",
                    "Could occasionally miss details or act impulsively",
                    "Might struggle in highly rigid environments"
                ],
                growthAreas: [
                    "Identify contexts where more structure would help",
                    "Develop awareness of when flexibility becomes avoidance",
                    "Build consistent habits for recurring responsibilities"
                ],
                counselorNotes: "Client shows adaptive flexibility. Explore specific contexts where organization or impulse control is challenging and work on targeted strategies."
            },
            high: {
                summary: "You are organized, diligent, and careful in your approach to tasks. You take pride in doing things well and thinking before acting.",
                strengths: [
                    "Highly reliable and dependable",
                    "Excellent at planning and execution",
                    "Strong attention to quality and details",
                    "Makes thoughtful, prudent decisions",
                    "Achieves long-term goals effectively"
                ],
                challenges: [
                    "May struggle with unpredictable situations",
                    "Could be perceived as rigid or inflexible",
                    "Might have difficulty relaxing or being spontaneous",
                    "Could experience distress when things are disorganized"
                ],
                growthAreas: [
                    "Practice flexibility and adapting to change",
                    "Allow some tasks to be 'good enough'",
                    "Develop comfort with spontaneity",
                    "Learn to tolerate others' different approaches"
                ],
                counselorNotes: "High conscientiousness is generally adaptive. Explore whether rigidity or perfectionism causes stress or relationship conflict. May need support accepting imperfection and developing flexibility."
            },
            veryHigh: {
                summary: "You have exceptionally high standards for organization and quality. You are extremely thorough, diligent, and careful in everything you do.",
                strengths: [
                    "Exceptionally reliable and thorough",
                    "Outstanding quality of work",
                    "Very effective at achieving goals",
                    "Rarely makes preventable mistakes",
                    "Highly disciplined and self-controlled"
                ],
                challenges: [
                    "Perfectionism may be debilitating",
                    "Could experience significant distress from disorder",
                    "May struggle to delegate or trust others' work",
                    "Risk of burnout from overwork",
                    "May be perceived as controlling or critical"
                ],
                growthAreas: [
                    "Practice accepting 'good enough'",
                    "Develop tolerance for disorder and imperfection",
                    "Learn to delegate and trust others",
                    "Prioritize self-care and relaxation",
                    "Recognize perfectionism's costs"
                ],
                counselorNotes: "Assess for OCPD features, workaholism, or anxiety-driven perfectionism. Explore impact on relationships, especially with less conscientious family members. Consider stress levels and work-life balance. May benefit from cognitive work on perfectionism and relaxation training."
            }
        }
    },
    O: {
        name: "Openness to Experience",
        icon: "🎨",
        coreDescription: "Measures aesthetic appreciation, inquisitiveness, creativity, and unconventionality.",
        facets: {
            aestheticAppreciation: {
                name: "Aesthetic Appreciation",
                description: "The enjoyment of beauty in art, nature, and other domains."
            },
            inquisitiveness: {
                name: "Inquisitiveness",
                description: "The tendency to seek out and appreciate new knowledge and ideas."
            },
            creativity: {
                name: "Creativity",
                description: "The preference for innovation and imagination."
            },
            unconventionality: {
                name: "Unconventionality",
                description: "The tendency to accept the unusual and think independently."
            }
        },
        interpretations: {
            veryLow: {
                summary: "You prefer the familiar and conventional. You value practical, proven approaches over innovation or abstract thinking.",
                strengths: [
                    "Grounded and practical",
                    "Consistent and predictable",
                    "Not distracted by abstract ideas",
                    "Values tradition and proven methods",
                    "Good at maintaining stable systems"
                ],
                challenges: [
                    "May resist beneficial changes",
                    "Could struggle to understand different perspectives",
                    "Might miss creative solutions to problems",
                    "May be perceived as closed-minded",
                    "Difficulty adapting to changing environments"
                ],
                growthAreas: [
                    "Explore one new interest or hobby",
                    "Practice considering alternative viewpoints",
                    "Engage with art or nature periodically",
                    "Read or learn about unfamiliar topics"
                ],
                counselorNotes: "Very low openness is not pathological but may limit adaptability. Explore whether client's environment requires more flexibility than they can comfortably provide. Consider impact on relationships with highly open partners or family members. May struggle in rapidly changing work environments."
            },
            low: {
                summary: "You tend to prefer conventional approaches and may find abstract or artistic pursuits less engaging.",
                strengths: [
                    "Practical and down-to-earth",
                    "Comfortable with routine",
                    "Reliable and consistent approach",
                    "Values tried-and-true methods"
                ],
                challenges: [
                    "May have narrow range of interests",
                    "Could be resistant to new ideas",
                    "Might struggle in creative roles",
                    "May not appreciate others' creative work"
                ],
                growthAreas: [
                    "Try one new experience each month",
                    "Listen to perspectives different from your own",
                    "Consider what value creativity adds to life",
                    "Explore nature or arts in accessible ways"
                ],
                counselorNotes: "Explore client's satisfaction with their range of experiences. Consider whether low openness creates conflict in relationships or work. May benefit from gentle encouragement to broaden experiences if distressed by limitations."
            },
            moderate: {
                summary: "You balance appreciation for the familiar with openness to new experiences, depending on the domain and context.",
                strengths: [
                    "Flexible approach to novelty and tradition",
                    "Can appreciate both conventional and creative approaches",
                    "Adaptable to different contexts",
                    "Selective curiosity"
                ],
                challenges: [
                    "May feel pulled between stability and exploration",
                    "Could be inconsistent in openness across domains",
                    "Might miss opportunities in highly creative or traditional environments"
                ],
                growthAreas: [
                    "Identify areas where more openness or grounding would help",
                    "Develop self-awareness about preferences across domains",
                    "Communicate needs in relationships and work"
                ],
                counselorNotes: "Client shows adaptive flexibility. Explore whether there are specific domains where openness or conventionality creates challenges."
            },
            high: {
                summary: "You are curious, creative, and appreciate art, nature, and novel ideas. You are drawn to intellectual exploration and unconventional thinking.",
                strengths: [
                    "Rich inner life and imagination",
                    "Appreciates beauty and creativity",
                    "Intellectually curious and engaged",
                    "Open-minded and accepting of diversity",
                    "Creative problem-solver"
                ],
                challenges: [
                    "May struggle with routine or conventional roles",
                    "Could be perceived as impractical or dreamy",
                    "Might have difficulty with highly structured environments",
                    "May overlook practical constraints"
                ],
                growthAreas: [
                    "Balance creativity with practical execution",
                    "Develop tolerance for necessary routines",
                    "Consider others' comfort with conventionality",
                    "Ground abstract ideas in concrete action"
                ],
                counselorNotes: "High openness is generally adaptive and associated with creativity and psychological growth. Explore whether client experiences friction with more conventional contexts. Consider career fit and relationship dynamics with less open partners."
            },
            veryHigh: {
                summary: "You have an exceptionally rich inner life with profound appreciation for art, ideas, and unconventional perspectives. You may struggle with mundane or conventional demands.",
                strengths: [
                    "Exceptional creativity and imagination",
                    "Deep appreciation for beauty and meaning",
                    "Highly intellectually curious",
                    "Comfortable challenging norms and thinking independently",
                    "Natural innovator and visionary"
                ],
                challenges: [
                    "May strongly resist routine and convention",
                    "Could be perceived as eccentric or impractical",
                    "Might struggle significantly in conventional roles",
                    "May overvalue novelty at expense of stability",
                    "Could have difficulty with mundane responsibilities"
                ],
                growthAreas: [
                    "Develop systems to handle practical necessities",
                    "Consider when convention serves valid purposes",
                    "Balance novelty-seeking with commitment",
                    "Ground visionary ideas in achievable steps"
                ],
                counselorNotes: "Very high openness can be associated with artistic and intellectual achievement but also with challenges in conventional settings. Explore career and relationship fit. Consider whether client is content with unconventional lifestyle or if it creates problems. May be associated with interest in altered states of consciousness or spiritual/philosophical exploration—explore any risks in this area."
            }
        }
    }
};

// Personality Pattern Analysis - Combinations of traits
export const personalityPatterns = {
    analyzePatterns: (scores) => {
        const patterns = [];
        const H = scores.H, E = scores.E, X = scores.X, A = scores.A, C = scores.C, O = scores.O;

        // Leadership & Social Influence Patterns
        if (H > 60 && X > 60 && C > 60) {
            patterns.push({
                name: "Ethical Leader",
                icon: "👑",
                description: "Your combination of high Honesty-Humility, Extraversion, and Conscientiousness suggests natural leadership abilities grounded in integrity. You're likely seen as trustworthy, organized, and socially confident.",
                counselorInsight: "Client has strong foundation for ethical leadership roles. May benefit from leadership development opportunities. Worth exploring whether they're currently in roles that utilize these strengths."
            });
        }

        if (X > 70 && H < 40) {
            patterns.push({
                name: "Charismatic Influence-Seeker",
                icon: "🎭",
                description: "Your high social boldness combined with lower concern for humility suggests you may be skilled at influencing others and comfortable with self-promotion, but should be mindful of how this impacts relationships.",
                counselorInsight: "Watch for potential manipulation patterns or superficial relationships. Explore underlying needs for status and recognition. Consider whether influence is used ethically."
            });
        }

        // Emotional & Relationship Patterns
        if (E > 70 && A > 70) {
            patterns.push({
                name: "Empathic Nurturer",
                icon: "💚",
                description: "Your high Emotionality and Agreeableness indicate strong nurturing tendencies with deep emotional attunement to others. You likely create warm, supportive relationships but may need to protect your own emotional boundaries.",
                counselorInsight: "Assess for caregiver burnout or excessive self-sacrifice. Client may benefit from boundary-setting work while maintaining their nurturing strengths. Explore whether they receive adequate support themselves."
            });
        }

        if (E < 30 && A < 30) {
            patterns.push({
                name: "Stoic Critic",
                icon: "🗿",
                description: "Low Emotionality combined with low Agreeableness suggests you're emotionally resilient and not easily swayed, but may come across as critical or hard to connect with. This pattern can be effective in certain roles but challenging for close relationships.",
                counselorInsight: "Explore relationship satisfaction and history. May benefit from emotional awareness work if there is desire or need for deeper connections. Consider whether this pattern is protective or limiting."
            });
        }

        if (X < 30 && E > 70) {
            patterns.push({
                name: "Sensitive Introvert",
                icon: "🌙",
                description: "Your combination of introversion and high emotionality suggests you may experience intense inner emotional life but prefer to process this privately. Close, deep relationships are likely important to you.",
                counselorInsight: "Assess for social anxiety or depression risk. Client may need small but meaningful social connections. Explore whether isolation is preference or avoidance."
            });
        }

        // Work & Achievement Patterns
        if (C > 70 && O > 70) {
            patterns.push({
                name: "Creative Achiever",
                icon: "🚀",
                description: "High Conscientiousness with high Openness is a powerful combination for creative achievement. You can generate innovative ideas AND follow through on executing them—a rare and valuable combination.",
                counselorInsight: "Client has strong potential for creative but disciplined achievement. Explore career satisfaction and whether current role utilizes both strengths."
            });
        }

        if (C < 30 && O > 70) {
            patterns.push({
                name: "Free-Spirited Dreamer",
                icon: "🦋",
                description: "Your high Openness with lower Conscientiousness suggests rich imagination and curiosity but potential challenges with follow-through. Many creative ideas may not reach completion.",
                counselorInsight: "Explore whether client is distressed by difficulty completing projects. May benefit from external structure and accountability. Consider whether creative roles with strong project management support would be ideal."
            });
        }

        if (C > 70 && O < 30) {
            patterns.push({
                name: "Reliable Specialist",
                icon: "⚙️",
                description: "High Conscientiousness with low Openness suggests you excel at following through on established procedures with high quality. You're a valuable stabilizing force but may struggle with change or innovation.",
                counselorInsight: "Client is likely very reliable in structured roles. Explore satisfaction and whether current environment values their stability. May need support during organizational changes."
            });
        }

        // Interpersonal Style Patterns
        if (A > 70 && H > 70) {
            patterns.push({
                name: "Harmonious Collaborator",
                icon: "🕊️",
                description: "Your combination of high Agreeableness and high Honesty-Humility makes you exceptionally cooperative and trustworthy. You're likely the person others turn to for fair mediation and genuine support.",
                counselorInsight: "Client is at risk for exploitation or burnout from over-giving. Assess assertiveness and boundary maintenance. May need support advocating for own needs."
            });
        }

        if (A < 30 && H < 40) {
            patterns.push({
                name: "Competitive Strategist",
                icon: "♟️",
                description: "Lower Agreeableness and lower Honesty-Humility suggest a competitive, strategic approach to life. You're not easily taken advantage of but should be mindful of building trust in close relationships.",
                counselorInsight: "Explore relationship patterns and history. Assess for exploitation concerns. May benefit from understanding long-term relational costs of competitive stance in personal life."
            });
        }

        // Stress & Coping Patterns
        if (E > 70 && C > 70) {
            patterns.push({
                name: "Anxious Achiever",
                icon: "⚡",
                description: "High Emotionality combined with high Conscientiousness can lead to excellent performance driven by worry. However, this pattern may also lead to perfectionism, burnout, and anxiety.",
                counselorInsight: "High priority: Assess for anxiety and perfectionism-related stress. Client may be very productive but at significant psychological cost. Work-life balance and self-compassion work may be beneficial."
            });
        }

        if (E < 30 && X > 70) {
            patterns.push({
                name: "Confident Risk-Taker",
                icon: "🦅",
                description: "Low anxiety combined with high social boldness suggests you're comfortable taking social and physical risks. You likely thrive in high-stakes situations where others might feel overwhelmed.",
                counselorInsight: "Explore decision-making patterns for potential impulsivity. While confidence is adaptive, lack of appropriate fear could lead to overlooking real risks. Consider sensation-seeking behaviors."
            });
        }

        return patterns;
    }
};

// Overall Personality Summary Generator
export const generatePersonalitySummary = (scores) => {
    const getLevel = (score) => {
        if (score <= 20) return 'very low';
        if (score <= 40) return 'low';
        if (score <= 60) return 'moderate';
        if (score <= 80) return 'high';
        return 'very high';
    };

    const H = getLevel(scores.H);
    const E = getLevel(scores.E);
    const X = getLevel(scores.X);
    const A = getLevel(scores.A);
    const C = getLevel(scores.C);
    const O = getLevel(scores.O);

    let summary = `This individual presents a personality profile characterized by `;

    // Build the summary dynamically
    const traits = [];

    if (scores.H >= 70) traits.push("strong integrity and humility");
    else if (scores.H <= 30) traits.push("pragmatic self-interest and ambition");

    if (scores.E >= 70) traits.push("high emotional sensitivity and attachment needs");
    else if (scores.E <= 30) traits.push("emotional resilience and self-sufficiency");

    if (scores.X >= 70) traits.push("social confidence and enthusiasm");
    else if (scores.X <= 30) traits.push("introversion and preference for solitude");

    if (scores.A >= 70) traits.push("cooperative and forgiving nature");
    else if (scores.A <= 30) traits.push("assertive and critical tendencies");

    if (scores.C >= 70) traits.push("disciplined and organized approach to tasks");
    else if (scores.C <= 30) traits.push("flexible and spontaneous style");

    if (scores.O >= 70) traits.push("intellectual curiosity and creativity");
    else if (scores.O <= 30) traits.push("practical and conventional preferences");

    if (traits.length > 0) {
        summary += traits.slice(0, -1).join(", ");
        if (traits.length > 1) summary += ", and " + traits[traits.length - 1];
        else summary += traits[0];
    } else {
        summary += "moderate levels across most dimensions, suggesting adaptability across various situations";
    }

    summary += ".";

    return summary;
};

// Key Areas for Counselor Focus
export const generateCounselorFocusAreas = (scores) => {
    const focusAreas = [];

    // Flag extreme scores
    if (scores.H <= 25) {
        focusAreas.push({
            priority: "HIGH",
            area: "Ethical Decision-Making",
            concern: "Very low Honesty-Humility may indicate risk for manipulative behavior, exploitation of others, or ethical violations.",
            suggestedExploration: "Explore history of ethical dilemmas, relationship quality, and any instances of taking advantage of others."
        });
    }

    if (scores.E >= 75) {
        focusAreas.push({
            priority: "HIGH",
            area: "Anxiety & Dependence",
            concern: "Very high Emotionality suggests possible anxiety disorder features and excessive emotional dependence.",
            suggestedExploration: "Screen for anxiety disorders, explore coping mechanisms, and assess impact on daily functioning and relationships."
        });
    }

    if (scores.X <= 25) {
        focusAreas.push({
            priority: "MODERATE",
            area: "Social Functioning & Self-Esteem",
            concern: "Very low Extraversion may indicate social anxiety, depression, or avoidant features.",
            suggestedExploration: "Assess for social isolation, explore self-esteem, and determine if current social level is desired or avoided."
        });
    }

    if (scores.A <= 25) {
        focusAreas.push({
            priority: "HIGH",
            area: "Anger & Relationship Conflict",
            concern: "Very low Agreeableness suggests potential anger management issues and interpersonal conflict.",
            suggestedExploration: "Explore relationship history, assess anger expression, and consider impact on close relationships and work."
        });
    }

    if (scores.C <= 25) {
        focusAreas.push({
            priority: "MODERATE",
            area: "Executive Function & Impulse Control",
            concern: "Very low Conscientiousness may indicate ADHD features, impulse control issues, or significant functional impairment.",
            suggestedExploration: "Screen for ADHD, explore impact on work and relationships, assess past patterns of impulsive decisions."
        });
    }

    if (scores.C >= 80 && scores.E >= 60) {
        focusAreas.push({
            priority: "MODERATE",
            area: "Perfectionism & Burnout",
            concern: "Very high Conscientiousness with moderate-to-high Emotionality may indicate maladaptive perfectionism.",
            suggestedExploration: "Assess for perfectionism-related anxiety, work-life balance, and signs of burnout."
        });
    }

    if (scores.A >= 80 && scores.H >= 70) {
        focusAreas.push({
            priority: "MODERATE",
            area: "Assertiveness & Boundaries",
            concern: "Very high Agreeableness and Honesty-Humility may indicate being easily exploited.",
            suggestedExploration: "Explore history of exploitation, assess current relationships for unhealthy dynamics, and work on assertiveness."
        });
    }

    return focusAreas.sort((a, b) => {
        const priorityOrder = { HIGH: 0, MODERATE: 1, LOW: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
};
