import { PAPERS_REGISTRY } from './paperRegistry';
import { TargetExam } from '@/types/utet';

export interface ConceptFlashcard {
  id: string;
  sourcePaperId: string;
  sourcePaperYear: string;
  questionNumber: number;
  subject: 'Pedagogy' | 'Mathematics' | 'Science' | 'Language' | 'LT Aptitude';
  topic: string;
  front: {
    title: string;
    questionOrPromptHindi: string;
    questionOrPromptEnglish: string;
    trapAlert?: string;
  };
  back: {
    coreConceptHindi: string;
    coreConceptEnglish: string;
    mnemonicOrTrick?: string;
    correctAnswerText?: string;
    classroomExampleOrFormula?: string;
    keyRule?: string;
  };
  tags: string[];
}

export type FlashcardSubjectFilter = 'All' | 'Pedagogy' | 'Mathematics' | 'Science' | 'Language' | 'LT Aptitude';

// Curated high-yield foundational theorist & formula flashcards
export const FOUNDATIONAL_FLASHCARDS: ConceptFlashcard[] = [
  {
    id: 'f-piaget-stages',
    sourcePaperId: 'foundation',
    sourcePaperYear: 'Master Theory',
    questionNumber: 1,
    subject: 'Pedagogy',
    topic: 'Jean Piaget - Cognitive Development Stages',
    front: {
      title: 'जीन पियाजे: संज्ञानात्मक विकास की 4 अवस्थाएं',
      questionOrPromptHindi: 'पियाजे की 4 अवस्थाओं का सही क्रम क्या है और वस्तु स्थायित्व (Object Permanence) व संरक्षण (Conservation) किस अवस्था में आता है?',
      questionOrPromptEnglish: 'What are Piaget’s 4 stages of cognitive development in order, and in which stages do Object Permanence & Conservation appear?',
      trapAlert: 'परीक्षा भ्रम: कई बार पूर्व-संक्रियात्मक (Pre-operational) और मूर्त-संक्रियात्मक (Concrete) में संरक्षण (Conservation) को लेकर भ्रमित किया जाता है।'
    },
    back: {
      coreConceptHindi: '1. संवेदी-पेशीय (0-2 वर्ष): वस्तु स्थायित्व (Object Permanence)\n2. पूर्व-संक्रियात्मक (2-7 वर्ष): प्रतीकात्मक विचार, अहं-केंद्रितता (Egocentrism), अनुत्क्रमणीयता (Irreversibility)\n3. मूर्त-संक्रियात्मक (7-11 वर्ष): संरक्षण (Conservation), विकेंद्रीकरण (Decentration), वर्गीकरण\n4. औपचारिक संक्रियात्मक (11+ वर्ष): अमूर्त चिंतन (Abstract Reasoning) एवं परिकल्पनात्मक निगमन।',
      coreConceptEnglish: '1. Sensorimotor (0-2y): Object Permanence\n2. Pre-operational (2-7y): Egocentrism, Centration, Irreversibility\n3. Concrete Operational (7-11y): Conservation, Reversibility, Classification\n4. Formal Operational (11+y): Abstract logic & hypothetico-deductive reasoning.',
      mnemonicOrTrick: 'Trick: "SPCF" (Some People Can Fly) = Sensorimotor ➔ Preoperational ➔ Concrete ➔ Formal',
      keyRule: 'संरक्षण (Conservation) = केवल Concrete Operational (7-11 वर्ष) में आता है!'
    },
    tags: ['Piaget', 'Pedagogy', 'CDP', 'High Yield']
  },
  {
    id: 'f-vygotsky-scaffolding',
    sourcePaperId: 'foundation',
    sourcePaperYear: 'Master Theory',
    questionNumber: 2,
    subject: 'Pedagogy',
    topic: 'Lev Vygotsky - Socio-Cultural Theory',
    front: {
      title: 'लेव वायगोत्स्की: सामाजिक-सांस्कृतिक सिद्धांत एवं ZPD',
      questionOrPromptHindi: 'ZPD (Zone of Proximal Development), Scaffolding (पाड़/ढांचा), और MKO (More Knowledgeable Other) का क्या अर्थ है?',
      questionOrPromptEnglish: 'What do ZPD, Scaffolding, and MKO mean according to Lev Vygotsky?',
      trapAlert: 'Scaffolding शब्द का प्रयोग वायगोत्स्की के सिद्धांत में जेरोम ब्रूनर (Jerome Bruner) ने किया था।'
    },
    back: {
      coreConceptHindi: '• ZPD: बालक जो स्वयं कर सकता है और जो किसी कुशल व्यक्ति की मदद से कर सकता है, उनके बीच का अंतर।\n• Scaffolding (पाड़/ढांचा): शिक्षक या व्यस्क द्वारा दी जाने वाली अस्थायी सहायता (Temporary Support) जैसे संकेत, क्लू, आधा हल प्रश्न।\n• Private Speech (निजी वार्ता): बालक द्वारा अपने कार्यों को दिशा देने के लिए स्वयं से की गई बातचीत।',
      coreConceptEnglish: '• ZPD: Distance between actual developmental level and potential level under adult guidance.\n• Scaffolding: Temporary supportive structure provided until the learner gains autonomy.\n• Private Speech: Self-talk used by children for self-regulation and thought guidance.',
      mnemonicOrTrick: 'Trick: "ZPD = Actual + Support" | भाषा विचार से पहले आती है (Language leads Thought)!',
      classroomExampleOrFormula: 'कक्षा में कठिन गणितीय प्रश्न हल करते समय शिक्षक द्वारा पहला स्टेप या हिंट देना = Scaffolding'
    },
    tags: ['Vygotsky', 'ZPD', 'Scaffolding', 'Pedagogy']
  },
  {
    id: 'f-kohlberg-morality',
    sourcePaperId: 'foundation',
    sourcePaperYear: 'Master Theory',
    questionNumber: 3,
    subject: 'Pedagogy',
    topic: 'Lawrence Kohlberg - Moral Development',
    front: {
      title: 'लॉरेंस कोहलबर्ग: नैतिक विकास की अवस्थाएं (Heinz Dilemma)',
      questionOrPromptHindi: '"अच्छा लड़का/अच्छी लड़की" (Good Boy/Nice Girl) और "सामाजिक व्यवस्था बनाए रखना" किस स्तर में आते हैं?',
      questionOrPromptEnglish: 'In which level do "Good Boy/Nice Girl" and "Law & Order" orientations fall in Kohlberg’s theory?',
      trapAlert: 'Carol Gilligan ने कोहलबर्ग के सिद्धांत की आलोचना "जेंडर बायस" (महिलाओं की देखभाल की नैतिकता की अनदेखी) के लिए की थी।'
    },
    back: {
      coreConceptHindi: '1. पूर्व-पारंपरिक स्तर (Pre-Conventional, 4-10y): आज्ञा व दंड उन्मुखता (Stage 1), व्यक्तिगत प्रतिफल/साधनात्मक सापेक्षवादी (Stage 2 - Tit for Tat)\n2. पारंपरिक स्तर (Conventional, 10-13y): अच्छा लड़का/अच्छी लड़की (Stage 3 - सामाजिक अनुमोदन), कानून व व्यवस्था (Stage 4 - सामाजिक नियम)\n3. उत्तर-पारंपरिक स्तर (Post-Conventional, 13+y): सामाजिक अनुबंध (Stage 5), सार्वभौमिक नैतिक सिद्धांत (Stage 6 - Universal Ethics)',
      coreConceptEnglish: '1. Pre-Conventional: Punishment & Obedience, Instrumental/Exchange (Tit-for-Tat)\n2. Conventional: Interpersonal Accord (Good Boy/Girl), Authority & Social Order\n3. Post-Conventional: Social Contract, Universal Ethical Principles',
      mnemonicOrTrick: 'Trick: 3 Levels, 6 Stages. Conventional = Society rules; Post-Conventional = Universal conscience.',
      keyRule: 'Stage 3 (Good Boy/Nice Girl) = सामाजिक स्वीकृति (Social Approval) के लिए कार्य करना।'
    },
    tags: ['Kohlberg', 'Moral Development', 'Pedagogy']
  },
  {
    id: 'f-nep-2020-structure',
    sourcePaperId: 'foundation',
    sourcePaperYear: 'Master Theory',
    questionNumber: 4,
    subject: 'Pedagogy',
    topic: 'National Education Policy 2020 & RTE 2009',
    front: {
      title: 'NEP 2020: नया शैक्षणिक ढांचा एवं RTE 2009',
      questionOrPromptHindi: 'NEP 2020 का नया शैक्षणिक ढांचा क्या है और RTE Act 2009 के तहत प्राथमिक स्तर पर शिक्षक-छात्र अनुपात (PTR) क्या है?',
      questionOrPromptEnglish: 'What is the 5+3+3+4 structure in NEP 2020 and pupil-teacher ratio under RTE Act 2009?',
      trapAlert: 'पुराना ढांचा 10+2 था, नया ढांचा 5+3+3+4 है जिसमें 3 वर्ष की प्री-स्कूलिंग शामिल है।'
    },
    back: {
      coreConceptHindi: '• NEP 2020 ढांचा: 5 (फाउंडेशनल: 3-8 वर्ष) + 3 (प्रिपरेटरी: 8-11 वर्ष, कक्षा 3-5) + 3 (मिडिल: 11-14 वर्ष, कक्षा 6-8) + 4 (सेकेंडरी: 14-18 वर्ष, कक्षा 9-12)\n• RTE 2009 PTR: प्राथमिक (कक्षा 1-5) = 1:30, उच्च प्राथमिक (कक्षा 6-8) = 1:35\n• कार्य घंटे: शिक्षक के लिए न्यूनतम 45 शिक्षण-तैयारी घंटे प्रति सप्ताह।',
      coreConceptEnglish: '• Structure: 5+3+3+4 (Foundational -> Preparatory -> Middle -> Secondary)\n• Primary PTR: 1:30 | Upper Primary PTR: 1:35\n• Minimum 45 working hours/week for teachers including preparation.',
      mnemonicOrTrick: 'Formula: 5 + 3 + 3 + 4 = 15 Years of Schooling (Ages 3 to 18)'
    },
    tags: ['NEP 2020', 'RTE 2009', 'Pedagogy', 'Policy']
  },
  {
    id: 'f-maths-algebra-quad',
    sourcePaperId: 'foundation',
    sourcePaperYear: 'Master Theory',
    questionNumber: 5,
    subject: 'Mathematics',
    topic: 'Quadratic Equations & Discriminant (द्विघात समीकरण)',
    front: {
      title: 'Mathematics: द्विघात समीकरण एवं मूलों की प्रकृति',
      questionOrPromptHindi: '$ax^2 + bx + c = 0$ के मूलों की प्रकृति विविक्तकर $D = b^2 - 4ac$ पर कैसे निर्भर करती है?',
      questionOrPromptEnglish: 'How does the nature of roots of $ax^2 + bx + c = 0$ depend on Discriminant $D = b^2 - 4ac$?',
      trapAlert: 'जब $D < 0$ हो, तब कोई वास्तविक मूल (Real Roots) नहीं होते (काल्पनिक/Complex मूल होते हैं)।'
    },
    back: {
      coreConceptHindi: 'श्रीधराचार्य सूत्र: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n\n• यदि $D > 0$: दो भिन्न वास्तविक मूल (Real and Distinct)\n• यदि $D = 0$: दो समान वास्तविक मूल (Real and Equal, $x = -b/2a$)\n• यदि $D < 0$: कोई वास्तविक मूल नहीं (No Real Roots)',
      coreConceptEnglish: 'Quadratic Formula: $x = \\frac{-b \\pm \\sqrt{D}}{2a}$\n• $D > 0$: Real & Unequal\n• $D = 0$: Real & Equal\n• $D < 0$: Imaginary / Complex Conjugates',
      mnemonicOrTrick: 'Mnemonic: $D=0$ मतलब "समान" (Equal Twins), $D>0$ मतलब "भिन्न" (Two Roads)',
      classroomExampleOrFormula: 'मूलों का योग: $\\alpha + \\beta = -\\frac{b}{a}$ | मूलों का गुणनफल: $\\alpha \\beta = \\frac{c}{a}$'
    },
    tags: ['Mathematics', 'Algebra', 'Quadratic', 'Formulas']
  },
  {
    id: 'f-science-optics-lens',
    sourcePaperId: 'foundation',
    sourcePaperYear: 'Master Theory',
    questionNumber: 6,
    subject: 'Science',
    topic: 'Optics: लेंस व दर्पण सूत्र एवं आवर्धन (Lens & Mirror Formula)',
    front: {
      title: 'Science: दर्पण एवं लेंस सूत्र व चिन्ह परिपाटी (Sign Convention)',
      questionOrPromptHindi: 'गोलीय दर्पण सूत्र, लेंस सूत्र और आवर्धन ($m$) के सूत्रों में चिन्हों का क्या अंतर है?',
      questionOrPromptEnglish: 'What is the sign difference between Mirror Formula, Lens Formula, and Magnification ($m$)?',
      trapAlert: 'दर्पण में $+$, लेंस में $-$: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$ (Mirror) बनाम $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$ (Lens)।'
    },
    back: {
      coreConceptHindi: '1. दर्पण सूत्र (Mirror): $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$ | आवर्धन $m = -\\frac{v}{u} = \\frac{h_i}{h_o}$\n2. लेंस सूत्र (Lens): $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$ | आवर्धन $m = +\\frac{v}{u} = \\frac{h_i}{h_o}$\n3. लेंस क्षमता (Power): $P = \\frac{1}{f\\text{ (in meters)}}$ डायोप्टर ($D$)\n4. अवतल लेंस/दर्पण की फोकस दूरी हमेशा ऋणात्मक ($-$) होती है।',
      coreConceptEnglish: 'Mirror Formula: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$ ($m = -v/u$)\nLens Formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$ ($m = +v/u$)\nPower: $P = 1/f(m)$ in Dioptres ($D$). Concave $f$ is always negative ($-$).',
      mnemonicOrTrick: 'Trick: "LENS has Minus in Formula, Plus in Magnification" | "Concave is always Negative Cave"',
      classroomExampleOrFormula: 'यदि $f = -20\\text{ cm} = -0.2\\text{ m}$, तो क्षमता $P = \\frac{1}{-0.2} = -5\\text{ D}$ (अवतल लेंस)।'
    },
    tags: ['Science', 'Physics', 'Optics', 'Formulas']
  },
  {
    id: 'f-science-archimedes-buoyancy',
    sourcePaperId: 'foundation',
    sourcePaperYear: 'Master Theory',
    questionNumber: 7,
    subject: 'Science',
    topic: 'Archimedes Principle & Floatation (उत्प्लावन बल)',
    front: {
      title: 'Science: आर्किमिडीज का सिद्धांत एवं उत्प्लावकता',
      questionOrPromptHindi: 'जब कोई वस्तु किसी द्रव में डुबोई जाती है तो उस पर लगने वाला उत्प्लावन बल (Upthrust) किसके बराबर होता है?',
      questionOrPromptEnglish: 'What is the upthrust on a body submerged in a fluid equal to according to Archimedes’ Principle?',
      trapAlert: 'उत्प्लावन बल वस्तु के भार पर नहीं, बल्कि विस्थापित द्रव के भार (Weight of Displaced Fluid) पर निर्भर करता है।'
    },
    back: {
      coreConceptHindi: '• आर्किमिडीज सिद्धांत: $F_B = V \\cdot \\rho_{fluid} \\cdot g$ (विस्थापित द्रव का भार)\n• प्लवन का नियम (Law of Floatation): वस्तु तभी तैरेगी जब उसका औसत घनत्व द्रव के घनत्व से कम या बराबर हो ($\\rho_{object} \\le \\rho_{fluid}$)\n• डूबे हुए भाग का अनुपात: $\\frac{V_{submerged}}{V_{total}} = \\frac{\\rho_{object}}{\\rho_{fluid}}$',
      coreConceptEnglish: '• Buoyant Force = Weight of displaced liquid: $F_B = V_{sub} \\cdot \\rho_l \\cdot g$\n• Body floats if $\\rho_{body} < \\rho_{liquid}$.\n• Fraction submerged = $\\frac{\\rho_{body}}{\\rho_{liquid}}$.',
      mnemonicOrTrick: 'Rule: "जितना पानी हटाया, उतना ही ऊपर धक्का पाया!"',
      classroomExampleOrFormula: 'बर्फ का घनत्व $0.9\\text{ g/cm}^3$ तथा जल का $1.0\\text{ g/cm}^3$ होने के कारण बर्फ का $90\\%$ भाग जल में डूबा रहता है।'
    },
    tags: ['Science', 'Physics', 'Fluids', 'High Yield']
  }
];

export function getAllFlashcards(): ConceptFlashcard[] {
  const cards: ConceptFlashcard[] = [...FOUNDATIONAL_FLASHCARDS];

  // Extract from all registered papers
  Object.entries(PAPERS_REGISTRY).forEach(([paperId, examData]) => {
    if (!examData.questions) return;

    examData.questions.forEach(q => {
      if (q.conceptCard && (q.conceptCard.mnemonicOrTrick || q.conceptCard.trapAlert || q.conceptCard.keyConceptHindi)) {
        let subjectCategory: ConceptFlashcard['subject'] = 'Pedagogy';
        const secLower = (q.section || '').toLowerCase();
        if (secLower.includes('math')) subjectCategory = 'Mathematics';
        else if (secLower.includes('science')) subjectCategory = 'Science';
        else if (secLower.includes('lang') || secLower.includes('english') || secLower.includes('hindi')) subjectCategory = 'Language';
        else if (secLower.includes('aptitude') || secLower.includes('teaching')) subjectCategory = 'LT Aptitude';

        const correctOpt = q.options?.find(o => o.id === q.correctAnswer);
        const correctText = correctOpt
          ? (correctOpt.hindi ? `${correctOpt.hindi} / ${correctOpt.english}` : correctOpt.english)
          : `Option (${q.correctAnswer})`;

        cards.push({
          id: `${paperId}-q${q.questionNumber || q.id}`,
          sourcePaperId: paperId,
          sourcePaperYear: examData.year ? String(examData.year) : 'PYQ',
          questionNumber: q.questionNumber || Number(q.id) || 1,
          subject: subjectCategory,
          topic: q.conceptCard.topic || q.topic || q.section || 'Concept',
          front: {
            title: `${q.conceptCard.topic || q.section || 'Exam Question'} (#${q.questionNumber || q.id})`,
            questionOrPromptHindi: q.question?.hindi || '',
            questionOrPromptEnglish: q.question?.english || '',
            trapAlert: q.conceptCard.trapAlert || undefined
          },
          back: {
            coreConceptHindi: q.conceptCard.keyConceptHindi || q.explanation?.hindi || '',
            coreConceptEnglish: q.conceptCard.keyConceptEnglish || q.explanation?.english || '',
            mnemonicOrTrick: q.conceptCard.mnemonicOrTrick || undefined,
            correctAnswerText: `सही उत्तर: विकल्प (${q.correctAnswer}) — ${correctText}`,
            keyRule: q.conceptCard.mnemonicOrTrick ? `स्मार्ट ट्रिक: ${q.conceptCard.mnemonicOrTrick}` : undefined
          },
          tags: [subjectCategory, examData.exam || 'UTET', String(examData.year || 'PYQ')]
        });
      }
    });
  });

  return cards;
}
