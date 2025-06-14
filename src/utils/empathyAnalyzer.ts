
import { AnalysisResult } from '../components/EchoSimulator';

// Language detection utility
const detectLanguage = (text: string): string => {
  // Simple language detection based on common patterns
  const patterns = {
    'Spanish': /\b(el|la|los|las|un|una|de|del|en|con|por|para|que|como|muy|más|sí|no|es|son|está|están)\b/gi,
    'French': /\b(le|la|les|un|une|de|du|des|en|avec|pour|que|comme|très|plus|oui|non|est|sont)\b/gi,
    'German': /\b(der|die|das|ein|eine|und|oder|mit|für|dass|wie|sehr|mehr|ja|nein|ist|sind)\b/gi,
    'Italian': /\b(il|la|lo|gli|le|un|una|di|del|in|con|per|che|come|molto|più|sì|no|è|sono)\b/gi,
    'Portuguese': /\b(o|a|os|as|um|uma|de|do|da|em|com|por|para|que|como|muito|mais|sim|não|é|são)\b/gi,
  };

  for (const [language, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern);
    if (matches && matches.length > 3) {
      return language;
    }
  }
  
  return 'English';
};

// Simulated AI analysis - in a real implementation, this would call an AI service
export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  const detectedLanguage = detectLanguage(conflictDescription);
  
  // This is a simplified simulation. In a real implementation, 
  // this would integrate with Claude or another AI service
  const analysis: AnalysisResult = {
    detectedLanguage,
    otherPerspective: generateOtherPerspective(conflictDescription),
    emotionalBridge: generateEmotionalBridge(conflictDescription),
    translator: generateTranslatorPhrases(conflictDescription)
  };
  
  return analysis;
};

const generateOtherPerspective = (description: string): string => {
  // Simulated perspective generation based on conflict themes
  const themes = [
    {
      keywords: ['interrupt', 'meeting', 'colleague'],
      perspective: `I feel like I need to step in during meetings because time is limited and we need to make decisions quickly. When I see conversations going in circles or moving away from actionable outcomes, my instinct is to redirect us back to what matters most. I've been in this industry for years, and I've seen too many projects fail because we spent too much time deliberating instead of executing. I'm not trying to dismiss anyone's ideas - I genuinely want us to succeed as a team. But I worry that if we don't maintain focus and momentum, we'll miss our deadlines and let down our clients. Maybe I come across as impatient, but it's because I care deeply about our collective success and I feel responsible for keeping us on track.`
    },
    {
      keywords: ['family', 'parent', 'child'],
      perspective: `I know my approach might seem strict, but every decision I make comes from a place of deep love and concern for our family's future. I've lived longer and experienced more of life's challenges, and I can see potential pitfalls that might not be visible from a different vantage point. When I set boundaries or express concerns, it's not because I want to control everything - it's because I desperately want to protect the people I love from making mistakes that could have lasting consequences. I worry constantly about whether I'm doing enough, whether I'm preparing everyone for the realities of the world. Sometimes I feel like I have to be the voice of caution because no one else will, and that's a heavy burden to carry.`
    }
  ];
  
  // Find matching theme or use default
  const matchingTheme = themes.find(theme => 
    theme.keywords.some(keyword => 
      description.toLowerCase().includes(keyword)
    )
  );
  
  return matchingTheme?.perspective || 
    `I understand that my actions might seem unreasonable from the outside, but they come from a place of genuine concern and responsibility. I've been in situations before where hesitation or lack of decisiveness led to negative outcomes, and I'm trying to prevent that from happening again. My experience has taught me that sometimes you have to make difficult choices quickly, even if they're not popular. I care deeply about the outcome of this situation and about the people involved, which is why I feel compelled to take a strong stance. I'm not trying to be difficult or controlling - I'm trying to do what I believe is right based on everything I've learned and experienced.`;
};

const generateEmotionalBridge = (description: string): string => {
  const bridges = [
    "Both parties share a fundamental need for their contributions to be valued and their expertise to be recognized in achieving meaningful outcomes.",
    "At the core, both perspectives stem from a fear of failure and a deep desire to protect something precious - whether it's professional reputation, family wellbeing, or shared goals.",
    "The underlying connection is a shared anxiety about time running out - whether it's missing opportunities, deadlines, or precious moments that can't be reclaimed.",
    "Both viewpoints reveal a profound need for control in an uncertain world, and a fear of being rendered powerless by circumstances beyond their influence.",
    "The common thread is a deep-seated worry about not being enough - not smart enough, not experienced enough, not important enough to make a meaningful difference."
  ];
  
  return bridges[Math.floor(Math.random() * bridges.length)];
};

const generateTranslatorPhrases = (description: string): Array<{dontSay: string; insteadTry: string}> => {
  const translatorSets = [
    [
      {
        dontSay: "You always interrupt me and never listen to my ideas.",
        insteadTry: "I can see you're passionate about moving things forward quickly, and I share that urgency. Could we explore a way to make sure we're capturing all the valuable insights while maintaining our momentum?"
      },
      {
        dontSay: "You think your experience makes you better than everyone else.",
        insteadTry: "Your experience is clearly valuable to our team's success. I'm wondering if there's a way we could create space for different perspectives to contribute to that same goal of excellence you're driving toward?"
      }
    ],
    [
      {
        dontSay: "You're being overprotective and controlling.",
        insteadTry: "I can see how much you care about our family's future, and that means everything to me. Could we talk about how we might work together to balance protecting what we love with allowing room for growth?"
      },
      {
        dontSay: "You don't trust me to make my own decisions.",
        insteadTry: "I recognize that your concerns come from years of experience and deep love. Help me understand what you're most worried about, so we can address those fears together while finding a path forward."
      }
    ]
  ];
  
  return translatorSets[Math.floor(Math.random() * translatorSets.length)];
};
