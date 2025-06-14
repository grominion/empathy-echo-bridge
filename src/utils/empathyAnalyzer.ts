
import { AnalysisResult } from '../components/EchoSimulator';

// Language detection utility with expanded patterns
const detectLanguage = (text: string): string => {
  const patterns = {
    'Spanish': /\b(el|la|los|las|un|una|de|del|en|con|por|para|que|como|muy|más|sí|no|es|son|está|están|pero|cuando|donde|porque|también|desde|hasta|entre|sobre|durante)\b/gi,
    'French': /\b(le|la|les|un|une|de|du|des|en|avec|pour|que|comme|très|plus|oui|non|est|sont|mais|quand|où|parce|aussi|depuis|jusqu|entre|sur|pendant)\b/gi,
    'German': /\b(der|die|das|ein|eine|und|oder|mit|für|dass|wie|sehr|mehr|ja|nein|ist|sind|aber|wenn|wo|weil|auch|von|bis|zwischen|über|während)\b/gi,
    'Italian': /\b(il|la|lo|gli|le|un|una|di|del|in|con|per|che|come|molto|più|sì|no|è|sono|ma|quando|dove|perché|anche|da|fino|tra|su|durante)\b/gi,
    'Portuguese': /\b(o|a|os|as|um|uma|de|do|da|em|com|por|para|que|como|muito|mais|sim|não|é|são|mas|quando|onde|porque|também|desde|até|entre|sobre|durante)\b/gi,
  };

  for (const [language, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern);
    if (matches && matches.length > 4) {
      return language;
    }
  }
  
  return 'English';
};

// Advanced conflict analysis system
export const analyzeConflict = async (conflictDescription: string): Promise<AnalysisResult> => {
  // Simulate sophisticated AI processing delay
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 3000));
  
  const detectedLanguage = detectLanguage(conflictDescription);
  
  const analysis: AnalysisResult = {
    detectedLanguage,
    otherPerspective: generateDeepPerspective(conflictDescription, detectedLanguage),
    emotionalBridge: generateEmotionalBridge(conflictDescription, detectedLanguage),
    translator: generateAdvancedTranslator(conflictDescription, detectedLanguage)
  };
  
  return analysis;
};

const generateDeepPerspective = (description: string, language: string): string => {
  // Sophisticated perspective generation based on psychological patterns
  const conflictThemes = [
    {
      keywords: ['interrupt', 'meeting', 'colleague', 'work', 'ideas', 'dismiss'],
      perspective: {
        English: `I find myself stepping in during meetings because I genuinely fear we're losing precious time that we can never get back. Every minute we spend circling around ideas without decisive action feels like a betrayal of our collective potential. I've watched too many brilliant concepts die in committee, strangled by endless discussion while competitors race ahead. When I interrupt, it's not because I think others lack intelligence—it's because I'm terrified of mediocrity, of being the team that had everything we needed but couldn't convert knowledge into impact. I carry the weight of every project I've seen fail because we were too polite to be urgent, too diplomatic to be direct. My impatience isn't arrogance; it's the anxiety of someone who has learned that good intentions without swift execution are just elaborate forms of procrastination.`,
        Spanish: `Me encuentro interviniendo en las reuniones porque genuinamente temo que estemos perdiendo tiempo precioso que nunca podremos recuperar. Cada minuto que pasamos dando vueltas a las ideas sin acción decisiva se siente como una traición a nuestro potencial colectivo. He visto demasiados conceptos brillantes morir en comité, estrangulados por discusiones interminables mientras los competidores corren adelante. Cuando interrumpo, no es porque piense que otros carecen de inteligencia—es porque me aterroriza la mediocridad, ser el equipo que tenía todo lo que necesitábamos pero no pudo convertir el conocimiento en impacto.`,
        French: `Je me trouve à intervenir lors des réunions parce que j'ai genuinement peur que nous perdions un temps précieux que nous ne pourrons jamais récupérer. Chaque minute que nous passons à tourner autour des idées sans action décisive me semble être une trahison de notre potentiel collectif. J'ai vu trop de concepts brillants mourir en comité, étranglés par des discussions interminables pendant que les concurrents foncent. Quand j'interromps, ce n'est pas parce que je pense que les autres manquent d'intelligence—c'est parce que j'ai peur de la médiocrité.`
      }
    },
    {
      keywords: ['family', 'parent', 'child', 'protect', 'decision', 'future'],
      perspective: {
        English: `Every protective instinct I have comes from witnessing how quickly life can unravel when we're unprepared. I've seen families destroyed by one poor financial decision, careers ended by a single moment of poor judgment, futures derailed by choices that seemed harmless at the time. When I seem controlling, I'm actually fighting an invisible war against all the potential disasters I can see approaching. I lie awake at night cataloging risks, playing out scenarios where my inability to guide us away from danger leads to irreversible consequences. My love manifests as vigilance because I've learned that the world is full of beautiful traps disguised as opportunities. I'm not trying to steal anyone's agency—I'm trying to be the lighthouse that warns ships away from rocks they can't yet see in the fog.`,
        Spanish: `Cada instinto protector que tengo viene de haber sido testigo de lo rápido que la vida puede desmoronarse cuando no estamos preparados. He visto familias destruidas por una mala decisión financiera, carreras terminadas por un solo momento de mal juicio, futuros descarrilados por decisiones que parecían inofensivas en su momento. Cuando parezco controlador, en realidad estoy luchando una guerra invisible contra todos los desastres potenciales que puedo ver acercándose.`,
        French: `Chaque instinct protecteur que j'ai vient d'avoir été témoin de la rapidité avec laquelle la vie peut se défaire quand nous ne sommes pas préparés. J'ai vu des familles détruites par une mauvaise décision financière, des carrières terminées par un seul moment de mauvais jugement, des avenirs déraillés par des choix qui semblaient inoffensifs à l'époque. Quand je semble contrôlant, je mène en fait une guerre invisible contre tous les désastres potentiels que je peux voir approcher.`
      }
    }
  ];

  // Find matching theme or use default
  const matchingTheme = conflictThemes.find(theme => 
    theme.keywords.some(keyword => 
      description.toLowerCase().includes(keyword)
    )
  );

  const perspectives = matchingTheme?.perspective || {
    English: `My actions, which may appear unreasonable from the outside, spring from a deep well of experience with unintended consequences. I've learned that life rarely offers second chances for crucial decisions, and this knowledge weighs heavily on every choice I make. When I take strong positions, it's because I can see the intricate web of cause and effect that others might miss—not because I'm wiser, but because I've been burned by scenarios that seemed safe until they weren't. I carry the scars of previous failures where my hesitation or deference to others' comfort led to outcomes I still regret. My seemingly rigid stance is actually a form of love, filtered through the lens of someone who has learned that good intentions must be paired with decisive action to protect what matters most.`,
    Spanish: `Mis acciones, que pueden parecer irracionales desde afuera, brotan de un pozo profundo de experiencia con consecuencias no intencionadas. He aprendido que la vida rara vez ofrece segundas oportunidades para decisiones cruciales, y este conocimiento pesa mucho en cada elección que hago. Cuando tomo posiciones fuertes, es porque puedo ver la red intrincada de causa y efecto que otros podrían pasar por alto.`,
    French: `Mes actions, qui peuvent paraître déraisonnables de l'extérieur, jaillissent d'un puits profond d'expérience avec des conséquences non intentionnelles. J'ai appris que la vie offre rarement une seconde chance pour les décisions cruciales, et cette connaissance pèse lourdement sur chaque choix que je fais.`
  };

  return perspectives[language as keyof typeof perspectives] || perspectives.English;
};

const generateEmotionalBridge = (description: string, language: string): string => {
  const bridges = {
    English: [
      "Both parties are haunted by the terror of irreversible failure—one fearing the slow death of missed opportunities, the other fearing the sudden catastrophe of reckless choices.",
      "At their cores, both are fighting against their own sense of powerlessness in a world where their deepest values feel constantly under threat.",
      "The fundamental shared fear is of being the person whose inaction or wrong action becomes the story that explains why everything precious was lost.",
      "Both are desperately trying to earn the right to feel safe in an uncertain world—one through speed and decisiveness, the other through caution and preparation.",
      "The hidden connection is a shared anxiety about their own adequacy—am I smart enough, experienced enough, valuable enough to protect what I love most?"
    ],
    Spanish: [
      "Ambas partes están atormentadas por el terror del fracaso irreversible—uno temiendo la muerte lenta de las oportunidades perdidas, el otro temiendo la catástrofe repentina de las decisiones imprudentes.",
      "En su núcleo, ambos luchan contra su propio sentido de impotencia en un mundo donde sus valores más profundos se sienten constantemente amenazados.",
      "El miedo fundamental compartido es ser la persona cuya inacción o acción incorrecta se convierte en la historia que explica por qué se perdió todo lo precioso."
    ],
    French: [
      "Les deux parties sont hantées par la terreur de l'échec irréversible—l'une craignant la mort lente des opportunités manquées, l'autre craignant la catastrophe soudaine des choix imprudents.",
      "Au fond, tous deux luttent contre leur propre sentiment d'impuissance dans un monde où leurs valeurs les plus profondes se sentent constamment menacées.",
      "La peur fondamentale partagée est d'être la personne dont l'inaction ou la mauvaise action devient l'histoire qui explique pourquoi tout ce qui était précieux a été perdu."
    ]
  };

  const languageBridges = bridges[language as keyof typeof bridges] || bridges.English;
  return languageBridges[Math.floor(Math.random() * languageBridges.length)];
};

const generateAdvancedTranslator = (description: string, language: string): Array<{dontSay: string; insteadTry: string}> => {
  const translatorSets = {
    English: [
      [
        {
          dontSay: "You always interrupt me and never listen to my ideas.",
          insteadTry: "I can feel how urgently you want us to succeed, and that drive is actually something I really admire about you. I'm wondering if we could find a way to harness both your momentum and my need to think things through—maybe we could create a process where we can move quickly while still making sure we don't miss any crucial insights?"
        },
        {
          dontSay: "You think your experience makes you better than everyone else.",
          insteadTry: "Your experience has clearly taught you to recognize patterns that the rest of us might miss, and I don't want us to lose that wisdom. At the same time, I'm feeling like my perspective might not be fully landing—could we explore how to honor both your hard-earned insights and my fresh angle on this challenge?"
        }
      ],
      [
        {
          dontSay: "You're being overprotective and controlling.",
          insteadTry: "I can see how much you care about preventing us from making mistakes that could really hurt, and honestly, that kind of fierce protection means everything to me. I'm feeling like I need a little more space to learn some things for myself—could we talk about how to balance your wisdom with my need to build my own confidence through experience?"
        },
        {
          dontSay: "You don't trust me to make my own decisions.",
          insteadTry: "I know your concerns come from having seen what can go wrong when people aren't careful, and I want to honor that experience. At the same time, I'm feeling ready to take on more responsibility for my choices—could we work together to identify some areas where I can start building that track record while still having your guidance on the bigger risks?"
        }
      ]
    ],
    Spanish: [
      [
        {
          dontSay: "Siempre me interrumpes y nunca escuchas mis ideas.",
          insteadTry: "Puedo sentir lo urgentemente que quieres que tengamos éxito, y esa determinación es algo que realmente admiro de ti. Me pregunto si podríamos encontrar una manera de aprovechar tanto tu impulso como mi necesidad de pensar las cosas—quizás podríamos crear un proceso donde podamos movernos rápidamente mientras nos aseguramos de no perder ninguna percepción crucial?"
        },
        {
          dontSay: "Crees que tu experiencia te hace mejor que todos los demás.",
          insteadTry: "Tu experiencia claramente te ha enseñado a reconocer patrones que el resto de nosotros podríamos pasar por alto, y no quiero que perdamos esa sabiduría. Al mismo tiempo, siento que mi perspectiva podría no estar llegando completamente—¿podríamos explorar cómo honrar tanto tus percepciones ganadas con esfuerzo como mi ángulo fresco sobre este desafío?"
        }
      ]
    ],
    French: [
      [
        {
          dontSay: "Tu m'interromps toujours et n'écoutes jamais mes idées.",
          insteadTry: "Je peux sentir à quel point tu veux urgemment que nous réussissions, et cette détermination est quelque chose que j'admire vraiment chez toi. Je me demande si nous pourrions trouver un moyen d'exploiter à la fois ton élan et mon besoin de réfléchir—peut-être pourrions-nous créer un processus où nous pouvons avancer rapidement tout en nous assurant de ne manquer aucune perspicacité cruciale?"
        },
        {
          dontSay: "Tu penses que ton expérience te rend meilleur que tout le monde.",
          insteadTry: "Ton expérience t'a clairement appris à reconnaître des modèles que le reste d'entre nous pourrait manquer, et je ne veux pas que nous perdions cette sagesse. En même temps, j'ai l'impression que ma perspective pourrait ne pas être entièrement comprise—pourrions-nous explorer comment honorer à la fois tes insights durement gagnés et mon angle frais sur ce défi?"
        }
      ]
    ]
  };

  const languageTranslators = translatorSets[language as keyof typeof translatorSets] || translatorSets.English;
  return languageTranslators[Math.floor(Math.random() * languageTranslators.length)];
};
