export interface StudyTopic {
  id: string;
  title: string;
  titleHindi: string;
  estimatedMinutes: number;
  highYieldWeightage: string; // e.g. "5-7 Marks in LT"
  overviewEn: string;
  overviewHi: string;
  keyPoints: {
    headingEn: string;
    headingHi: string;
    contentEn: string;
    contentHi: string;
    mnemonic?: string;
    trapAlert?: string;
    tableData?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  summaryCheatSheetEn: string[];
  summaryCheatSheetHi: string[];
  practiceCheckpoints: {
    questionEn: string;
    questionHi: string;
    options: { id: string; textEn: string; textHi: string }[];
    correctAnswer: string;
    explanationEn: string;
    explanationHi: string;
  }[];
}

export interface StudyModule {
  id: string;
  moduleNumber: number;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  badge: string;
  totalMarks: string;
  color: string;
  iconName: string;
  topics: StudyTopic[];
}

export const LT_SYLLABUS_MODULES: StudyModule[] = [
  // =========================================================================
  // MODULE 1: EDUCATIONAL APTITUDE & CHILD PEDAGOGY (30 MARKS)
  // =========================================================================
  {
    id: "pedagogy",
    moduleNumber: 1,
    title: "Educational Aptitude & Child Pedagogy",
    titleHindi: "शिक्षण अभिरुचि, बाल मनोविज्ञान एवं शिक्षण शास्त्र",
    description: "Comprehensive coverage of learning theories, child development, intelligence, inclusive education, evaluation, NEP 2020 & RTE.",
    descriptionHindi: "अधिगम सिद्धांत, बाल विकास, बुद्धि, समावेशी शिक्षा, सतत व व्यापक मूल्यांकन, NEP 2020 एवं RTE 2009 का विस्तृत अध्ययन।",
    badge: "Most High-Yield • 30 Marks",
    totalMarks: "30 Marks",
    color: "#1a73e8",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "growth-development",
        title: "Growth & Development: Principles & Stages",
        titleHindi: "वृद्धि एवं विकास: सिद्धांत, अवस्थाएं एवं निर्धारक",
        estimatedMinutes: 25,
        highYieldWeightage: "3-4 Marks",
        overviewEn: "Human development is a lifelong, multidimensional, multidirectional, and plastic process driven by the dynamic interaction of heredity (nature) and environment (nurture).",
        overviewHi: "मानव विकास जीवन-पर्यंत चलने वाली, बहुआयामी एवं लचीली प्रक्रिया है जो आनुवंशिकता (प्रकृति) और वातावरण (पोषण) की अंतःक्रिया से संचालित होती है।",
        keyPoints: [
          {
            headingEn: "1. Difference Between Growth and Development",
            headingHi: "1. वृद्धि (Growth) और विकास (Development) में अंतर",
            contentEn: "Growth is strictly quantitative, somatic/physical, measurable in size, height, and weight, and stops at physical maturity. Development is both quantitative and qualitative, holistic (physical, cognitive, emotional, social), progressive, and continues from conception till death (Womb to Tomb).",
            contentHi: "वृद्धि केवल मात्रात्मक व शारीरिक होती है (लंबाई, भार) जो परिपक्वता पर रुक जाती है। विकास मात्रात्मक एवं गुणात्मक दोनों होता है, जो गर्भावस्था से मृत्यु तक (Womb to Tomb) निरंतर चलता है।",
            tableData: {
              headers: ["Feature / लक्षण", "Growth (वृद्धि)", "Development (विकास)"],
              rows: [
                ["Nature / स्वरूप", "Purely Quantitative (मात्रात्मक)", "Quantitative + Qualitative (मात्रात्मक + गुणात्मक)"],
                ["Scope / क्षेत्र", "Narrow & Physical only (सीमित/शारीरिक)", "Comprehensive & Holistic (व्यापक/सर्वांगीण)"],
                ["Time Span / अवधि", "Stops at biological maturity (परिपक्वता पर समाप्त)", "Continuous throughout life (जीवन पर्यंत निरंतर)"],
                ["Measurement / मापन", "Directly measurable (प्रत्यक्ष मापनीय - kg, cm)", "Observed through behavioral competence (व्यवहार द्वारा अवलोकनीय)"]
              ]
            }
          },
          {
            headingEn: "2. Cardinal Principles of Development",
            headingHi: "2. बाल विकास के मूलभूत सिद्धांत",
            contentEn: "• Principle of Continuity: Development never ceases.\n• Principle of Individual Differences: Each child develops at their own unique developmental pace.\n• Cephalocaudal Trend (मस्तकाधोमुखी): Development proceeds from Head to Toe (brain/head control first, then arms, then legs).\n• Proximodistal Trend (समीप-दूराभिमुख): Development proceeds from the Center of the body outward to extremities (trunk -> shoulders -> arms -> fingers).\n• General to Specific: Child exhibits gross general motor movements before fine motor coordination.",
            contentHi: "• निरंतरता का सिद्धांत: विकास कभी नहीं रुकता।\n• वैयक्तिक भिन्नता का सिद्धांत: प्रत्येक बालक की विकास दर भिन्न होती है।\n• मस्तकाधोमुखी (Cephalocaudal): सिर से पैर की दिशा में विकास।\n• समीप-दूराभिमुख (Proximodistal): केंद्र (रीढ़ की हड्डी) से बाहर की ओर (उंगलियों) विकास।\n• सामान्य से विशिष्ट: बालक पहले पूरे हाथ से पकड़ता है, फिर उंगलियों से।",
            mnemonic: "Mnemonic: 'C-Head to Toe, P-Center to Out' (Cephalo = Head, Proximo = Proximate/Center).",
            trapAlert: "Trap Alert: Exam often confuses Cephalocaudal (Head-to-Toe) with Proximodistal (Center-to-Periphery). Remember Cephalo = Brain/Head."
          },
          {
            headingEn: "3. Developmental Epochs: Infancy to Adolescence",
            headingHi: "3. विकास की प्रमुख अवस्थाएं: शैशवावस्था से किशोरावस्था",
            contentEn: "• Infancy (0-2 yrs): Sensory-motor exploration, rapid somatic growth, emotional attachment.\n• Early Childhood (2-6 yrs): 'Toy Age', pre-gang age, language explosion, egocentrism.\n• Later Childhood (6-12 yrs): 'School Age', 'Gang Age', elementary logical thinking, socialization, Industry vs. Inferiority.\n• Adolescence (12-18 yrs): Period of 'Storm and Stress' (G. Stanley Hall), identity crisis (Erikson), personal fable & imaginary audience (Elkind).",
            contentHi: "• शैशवावस्था (0-2 वर्ष): संवेदी-गामक अन्वेषण, तीव्र शारीरिक विकास, अनुकरण।\n• पूर्व बाल्यावस्था (2-6 वर्ष): 'खिलौनों की आयु' (Toy age), भाषा विकास का संवेदनशील काल, अहंकेंद्रिता।\n• उत्तर बाल्यावस्था (6-12 वर्ष): 'गिरोह/टोली की आयु' (Gang age), प्राथमिक विद्यालयी आयु, मूर्त तार्किक चिंतन।\n• किशोरावस्था (12-18 वर्ष): 'आंधी-तूफान एवं तनाव की अवस्था' (स्टैनली हॉल), पहचान संकट (एरिक्सन)।",
            mnemonic: "Stanley Hall: 'Adolescence is a period of great Storm and Stress (तनाव एवं तूफान)।'"
          }
        ],
        summaryCheatSheetEn: [
          "Development = Heredity (Nature) × Environment (Nurture) [Woodworth].",
          "Cephalocaudal = Head to Toe; Proximodistal = Central axis to extremities.",
          "Adolescence = Storm & Stress (G. Stanley Hall); Identity vs Role Confusion (Erik Erikson).",
          "Fine Motor = Writing, drawing, buttoning; Gross Motor = Running, jumping, swimming."
        ],
        summaryCheatSheetHi: [
          "विकास = वंशानुक्रम × वातावरण (वुडवर्थ सूत्र)।",
          "मस्तकाधोमुखी = सिर से पैर; समीप-दूराभिमुख = केंद्र से परिधि की ओर।",
          "किशोरावस्था = तनाव और तूफान का काल (स्टैनली हॉल); पहचान संकट (एरिक्सन)।",
          "सूक्ष्म गामक कौशल = लिखना, काटना; स्थूल गामक कौशल = दौड़ना, कूदना।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "Which developmental principle explains why a baby gains control of head movements before leg movements?",
            questionHi: "कौन सा विकास सिद्धांत यह स्पष्ट करता है कि शिशु पैरों की तुलना में सिर पर पहले नियंत्रण प्राप्त करता है?",
            options: [
              { id: "A", textEn: "Proximodistal principle", textHi: "समीप-दूराभिमुख सिद्धांत" },
              { id: "B", textEn: "Cephalocaudal principle", textHi: "मस्तकाधोमुखी सिद्धांत" },
              { id: "C", textEn: "Principle of Spiral development", textHi: "वर्तुलाकार विकास सिद्धांत" },
              { id: "D", textEn: "Principle of Interrelation", textHi: "परस्पर संबंध का सिद्धांत" }
            ],
            correctAnswer: "B",
            explanationEn: "The Cephalocaudal developmental progression dictates that control spreads from the head downward toward the feet.",
            explanationHi: "मस्तकाधोमुखी (Cephalocaudal) सिद्धांत के अनुसार शारीरिक नियंत्रण सिर से आरंभ होकर नीचे पैरों की ओर बढ़ता है।"
          },
          {
            questionEn: "Who termed adolescence as a period of 'Storm and Stress'?",
            questionHi: "किशोरावस्था को 'प्रबल दबाव तथा तनाव, तूफान एवं संघर्ष की अवस्था' किसने कहा?",
            options: [
              { id: "A", textEn: "Jean Piaget", textHi: "जीन पियाजे" },
              { id: "B", textEn: "G. Stanley Hall", textHi: "जी. स्टैनली हॉल" },
              { id: "C", textEn: "E.L. Thorndike", textHi: "ई.एल. थार्नडाइक" },
              { id: "D", textEn: "Erik Erikson", textHi: "एरिक एरिक्सन" }
            ],
            correctAnswer: "B",
            explanationEn: "G. Stanley Hall in his 1904 treatise defined adolescence as a turbulent epoch of 'Storm and Stress'.",
            explanationHi: "जी. स्टैनली हॉल ने 1904 में किशोरावस्था को 'तनाव, तूफान और संघर्ष' की अवस्था कहा।"
          }
        ]
      },
      {
        id: "constructivist-theories",
        title: "Constructivism: Piaget, Vygotsky & Bruner",
        titleHindi: "रचनावादी अधिगम सिद्धांत: पियाजे, वाइगोत्स्की एवं ब्रूनर",
        estimatedMinutes: 30,
        highYieldWeightage: "5-6 Marks",
        overviewEn: "Constructivist theories view the learner as an active creator of knowledge rather than a passive recipient. Piaget stresses individual cognitive maturation, Vygotsky emphasizes sociocultural mediation & scaffolding, and Bruner focuses on discovery and representation.",
        overviewHi: "रचनावाद के अनुसार बालक ज्ञान का सक्रिय निर्माता (Active constructor) है। पियाजे संज्ञानात्मक परिपक्वता, वाइगोत्स्की सामाजिक-सांस्कृतिक संवाद व पाड़ (Scaffolding), और ब्रूनर अन्वेषणात्मक अधिगम पर बल देते हैं।",
        keyPoints: [
          {
            headingEn: "1. Jean Piaget's Theory of Cognitive Development",
            headingHi: "1. जीन पियाजे का संज्ञानात्मक विकास सिद्धांत",
            contentEn: "Piaget coined: Schemas (mental frameworks), Assimilation (fitting new info into existing schemas without modification), Accommodation (modifying existing schemas to fit new info), and Equilibration (balancing assimilation & accommodation).\n• 4 Stages:\n1. Sensorimotor (0-2 yrs): Object permanence, deferred imitation, reflex actions.\n2. Pre-Operational (2-7 yrs): Egocentrism, Animism, Centration, Irreversibility, Symbolic play.\n3. Concrete Operational (7-11 yrs): Conservation (volume, mass), Reversibility, Classification, Seriation, Inductive logic.\n4. Formal Operational (11+ yrs): Abstract reasoning, Hypothetico-deductive thinking, Metacognition.",
            contentHi: "पियाजे की प्रमुख अवधारणाएं: स्कीमा (मानसिक संरचना), आत्मसातीकरण (Assimilation - पूर्व ज्ञान में नया जोड़ना), समायोजन (Accommodation - स्कीमा में संशोधन), साम्यधारण (Equilibration)।\n• 4 अवस्थाएं:\n1. संवेदी-गामक (0-2 वर्ष): वस्तु स्थायित्व (Object permanence), अनुकरण।\n2. पूर्व-संक्रियात्मक (2-7 वर्ष): अहंकेंद्रिता (Egocentrism), जीववाद (Animism), अपलटावीपन (Irreversibility)।\n3. मूर्त संक्रियात्मक (7-11 वर्ष): संरक्षण (Conservation), पलटावीपन (Reversibility), वर्गीकरण, मूर्त तर्क।\n4. औपचारिक/अमूर्त संक्रियात्मक (11+ वर्ष): अमूर्त चिंतन, परिकल्पनात्मक-निगमनात्मक तर्क (Hypothetico-deductive)।",
            mnemonic: "Mnemonic: 'Some People Can Fly' -> S (Sensorimotor), P (Pre-operational), C (Concrete), F (Formal).",
            trapAlert: "Conservation & Reversibility develop in Concrete Operational (7-11 yrs), NOT in Pre-operational stage."
          },
          {
            headingEn: "2. Lev Vygotsky's Socio-Cultural Theory",
            headingHi: "2. लेव वाइगोत्स्की का सामाजिक-सांस्कृतिक सिद्धांत",
            contentEn: "Vygotsky argued cognitive development is socially co-constructed through language, culture, and social interaction.\n• Zone of Proximal Development (ZPD): The gap between what a learner can do independently and what they can do with expert guidance.\n• Scaffolding (पाड़/ढांचा): Temporary, dynamic support provided by an MKO (More Knowledgeable Other) tailored to the learner's current competence.\n• Speech Stages: Social Speech (external, ~2 yrs) -> Private Speech (self-regulation, ~3 yrs) -> Inner Speech (silent, ~7 yrs).",
            contentHi: "वाइगोत्स्की के अनुसार संज्ञानात्मक विकास समाज व संस्कृति के माध्यम से होता है। भाषा चिंतन का मुख्य साधन है।\n• ZPD (समीपस्थ विकास का क्षेत्र): स्वतंत्र रूप से कार्य करने की क्षमता और मार्गदर्शन में कार्य करने की क्षमता का अंतर।\n• पाड़/ढांचा (Scaffolding): शिक्षक/व्यस्क द्वारा दी जाने वाली अस्थायी सहायता (Temporary support)।\n• MKO (More Knowledgeable Other): अधिक ज्ञानवान अन्य व्यक्ति।\n• निजी वार्ता (Private Speech): बालक स्वयं के कार्यों को निर्देशित करने हेतु बोलकर बात करता है।",
            mnemonic: "ZPD = Actual Level to Potential Level gap; Scaffolding = Temporary Ladder."
          },
          {
            headingEn: "3. Jerome Bruner's Modes of Representation & Spiral Curriculum",
            headingHi: "3. जेरोम ब्रूनर का संज्ञानात्मक सिद्धांत एवं सर्पिलाकार पाठ्यचर्या",
            contentEn: "Bruner proposed 3 progressive modes of cognitive representation:\n1. Enactive Mode (0-1 yr): Representation through physical motor actions (e.g., riding a bike, shaking a rattle).\n2. Iconic Mode (1-6 yrs): Representation through visual mental images and pictures.\n3. Symbolic Mode (7+ yrs): Representation through abstract symbols, language, and mathematical notation.\n• Spiral Curriculum (सर्पिलाकार पाठ्यचर्या): Complex topics are introduced at a simple level first and revisited repeatedly with increasing depth and rigor.",
            contentHi: "ब्रूनर के ज्ञान निरूपण के 3 चरण:\n1. क्रियात्मक/सक्रिय (Enactive): क्रियाओं व शारीरिक गतिविधियों द्वारा सीखना।\n2. दृश्यात्मक/प्रतिबिम्बात्मक (Iconic): चित्रों, आकृतियों व मानसिक बिम्बों द्वारा।\n3. प्रतीकात्मक (Symbolic): भाषा, प्रतीकों एवं अमूर्त सूत्रों द्वारा।\n• सर्पिलाकार पाठ्यचर्या (Spiral Curriculum): किसी भी विषय को बालक के स्तरानुकूल किसी भी आयु में सिखाया जा सकता है और पुनः गहराई से दोहराया जाता है।",
            mnemonic: "Mnemonic: 'EIS' -> E (Enactive - Actions), I (Iconic - Images), S (Symbolic - Symbols/Language)."
          }
        ],
        summaryCheatSheetEn: [
          "Piaget: Child is a 'Little Scientist' constructing schemas through assimilation/accommodation.",
          "Object Permanence = Sensorimotor (0-2 yrs); Conservation = Concrete Operational (7-11 yrs).",
          "Vygotsky: Language precedes and guides thought via Private Speech; ZPD bridged by Scaffolding.",
          "Bruner: Enactive (Action) -> Iconic (Image) -> Symbolic (Language); Spiral Curriculum."
        ],
        summaryCheatSheetHi: [
          "पियाजे: नन्हे वैज्ञानिक (Little scientists) जो स्कीमा द्वारा ज्ञान की रचना करते हैं।",
          "वस्तु स्थायित्व = संवेदी गामक; संरक्षण = मूर्त संक्रियात्मक; अमूर्त तर्क = औपचारिक संक्रियात्मक।",
          "वाइगोत्स्की: सामाजिक अंतःक्रिया + पाड़ (Scaffolding) + ZPD + निजी वार्ता (Private speech)।",
          "ब्रूनर: सक्रिय (Enactive) -> दृश्य (Iconic) -> प्रतीकात्मक (Symbolic) + सर्पिलाकार पाठ्यचर्या।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "According to Piaget, during which stage does a child develop 'Conservation' and 'Reversibility'?",
            questionHi: "पियाजे के अनुसार, किस अवस्था में बालक में 'संरक्षण' (Conservation) और 'पलटावीपन' (Reversibility) की समझ विकसित होती है?",
            options: [
              { id: "A", textEn: "Sensorimotor stage", textHi: "संवेदी-गामक अवस्था" },
              { id: "B", textEn: "Pre-operational stage", textHi: "पूर्व-संक्रियात्मक अवस्था" },
              { id: "C", textEn: "Concrete operational stage", textHi: "मूर्त संक्रियात्मक अवस्था" },
              { id: "D", textEn: "Formal operational stage", textHi: "औपचारिक संक्रियात्मक अवस्था" }
            ],
            correctAnswer: "C",
            explanationEn: "Conservation (understanding that quantity remains unchanged despite perceptual alterations) develops in the Concrete Operational stage (7-11 years).",
            explanationHi: "संरक्षण और उत्क्रमणीयता (पलटावीपन) की क्षमता 7 से 11 वर्ष की 'मूर्त संक्रियात्मक अवस्था' में विकसित होती है।"
          },
          {
            questionEn: "In Vygotsky's theory, the temporary support provided to a learner to achieve a higher skill level is termed:",
            questionHi: "वाइगोत्स्की के अनुसार, बालक के सीखने में व्यस्कों द्वारा दी जाने वाली अस्थायी सहायता को क्या कहा जाता है?",
            options: [
              { id: "A", textEn: "Conditioning", textHi: "अनुबंधन" },
              { id: "B", textEn: "Scaffolding", textHi: "पाड़ / ढांचा (Scaffolding)" },
              { id: "C", textEn: "Equilibration", textHi: "साम्यधारण" },
              { id: "D", textEn: "Assimilation", textHi: "आत्मसातीकरण" }
            ],
            correctAnswer: "B",
            explanationEn: "Scaffolding is the structured, temporary assistance offered by an MKO within the child's Zone of Proximal Development.",
            explanationHi: "समीपस्थ विकास के क्षेत्र में दी जाने वाली अस्थायी सहायता को पाड़/ढांचा (Scaffolding) कहते हैं।"
          }
        ]
      },
      {
        id: "behaviorist-theories",
        title: "Behaviorist, Insight & Social Learning Theories",
        titleHindi: "व्यवहारवादी, अंतर्दृष्टि एवं सामाजिक अधिगम सिद्धांत",
        estimatedMinutes: 30,
        highYieldWeightage: "4-5 Marks",
        overviewEn: "Exploration of empirical stimulus-response theories (Thorndike, Pavlov, Skinner), Gestalt Insight Theory (Köhler), and Bandura's Social Observational Learning.",
        overviewHi: "थार्नडाइक का प्रयास व त्रुटि, पावलोव का शास्त्रीय अनुबंधन, स्किनर का क्रिया-प्रसूत अनुबंधन, कोहलर का अंतर्दृष्टि सिद्धांत और बंडूरा का सामाजिक अधिगम सिद्धांत।",
        keyPoints: [
          {
            headingEn: "1. Edward Thorndike's Connectionism / Trial & Error",
            headingHi: "1. ई.एल. थार्नडाइक का प्रयास एवं त्रुटि का सिद्धांत (संबंधवाद)",
            contentEn: "Conducted cat-in-puzzle-box experiments. S-R Bond formulation.\n• 3 Primary Laws of Learning:\n1. Law of Readiness (तत्परता का नियम): Mental preparedness precedes effective learning.\n2. Law of Exercise (अभ्यास का नियम): Repetition strengthens S-R bond (Law of Use) and disuse weakens it (Law of Disuse).\n3. Law of Effect (प्रभाव का नियम): Satisfying consequences strengthen behavior; unpleasant consequences weaken it (Precursor to reinforcement).",
            contentHi: "बिल्ली पर प्रयोग। उद्दीपक-अनुक्रिया (S-R) संबंध।\n• अधिगम के 3 प्राथमिक नियम:\n1. तत्परता का नियम (Law of Readiness): सीखने हेतु मानसिक तैयारी अनिवार्य है।\n2. अभ्यास का नियम (Law of Exercise): अभ्यास से संबंध दृढ़ होता है (उपयोग व अनुपयोग का नियम)।\n3. प्रभाव का नियम (Law of Effect): सुखद परिणाम अधिगम को दृढ़ करते हैं (पुरस्कार/संतोष)।",
            mnemonic: "Mnemonic: 'R-E-E' -> Readiness, Exercise, Effect."
          },
          {
            headingEn: "2. Ivan Pavlov (Classical Conditioning) & B.F. Skinner (Operant Conditioning)",
            headingHi: "2. पावलोव का शास्त्रीय अनुबंधन एवं स्किनर का क्रिया-प्रसूत अनुबंधन",
            contentEn: "• Pavlov (Classical / Type S Conditioning): Dogs, bell (CS), meat powder (UCS), salivation (UCR/CR). Extinction, Spontaneous Recovery, Stimulus Generalization.\n• Skinner (Operant / Type R Conditioning): Rats/Pigeons in Skinner Box. Behavior is shaped by consequences (Reinforcement & Punishment).\n- Positive Reinforcement: Adding a pleasant stimulus (e.g. praise, chocolate) to increase behavior.\n- Negative Reinforcement: Removing an aversive stimulus (e.g. turning off loud noise) to increase behavior.\n- Punishment: Administering unpleasant stimulus or removing pleasant stimulus to decrease behavior.\n- Schedules of Reinforcement: Variable Ratio (VR) is the most resistant to extinction (e.g., slot machine, lottery).",
            contentHi: "• पावलोव (शास्त्रीय अनुबंधन / Type S): कुत्ते पर प्रयोग; घंटी (अनुकूलित उद्दीपक) + भोजन (स्वाभाविक उद्दीपक) = लार टपकना। विलोप, सामान्यीकरण।\n• स्किनर (क्रिया-प्रसूत / Type R): चूहे/कबूतर पर प्रयोग; व्यवहार परिणामों द्वारा नियंत्रित होता है।\n- सकारात्मक पुनर्बलन: सुखद उद्दीपक देकर व्यवहार बढ़ाना (पुरस्कार/प्रशंसा)।\n- नकारात्मक पुनर्बलन: अप्रिय उद्दीपक हटाकर वांछित व्यवहार बढ़ाना।\n- दंड (Punishment): अवांछित व्यवहार को कम करना।\n- पुनर्बलन अनुसूची: 'परिवर्तनीय अनुपात' (Variable Ratio) विलोप के प्रति सर्वाधिक प्रतिरोधी है।",
            mnemonic: "Skinner = R-Type (Response first, Reinforcement follows); Pavlov = S-Type (Stimulus first)."
          },
          {
            headingEn: "3. Wolfgang Köhler (Gestalt Insight) & Albert Bandura (Social Learning)",
            headingHi: "3. कोहलर का अंतर्दृष्टि सिद्धांत एवं बंडूरा का सामाजिक अधिगम सिद्धांत",
            contentEn: "• Köhler's Insight Learning (सूझ का सिद्धांत): Experiments on chimpanzee 'Sultan' with boxes and sticks. Learning occurs through sudden cognitive restructuring of the perceptual field ('Aha! Experience'), not blind trial and error.\n• Bandura's Observational / Social Learning: Bobo Doll experiment. Learning occurs vicariously through modeling and observation.\n• 4 Sequential Steps in Modeling: 1. Attention (अवधान) -> 2. Retention (स्मृति/धारण) -> 3. Motor Reproduction (पुनरुत्पादन) -> 4. Motivation/Reinforcement (अभिप्रेरणा).",
            contentHi: "• कोहलर (अंतर्दृष्टि / सूझ का सिद्धांत): सुल्तान नामक वनमानुष पर प्रयोग; समस्या का समाधान अचानक 'आहा! अनुभव' (Aha! experience) के रूप में आता है।\n• बंडूरा (सामाजिक अधिगम / प्रेक्षणात्मक अधिगम): बोबो डॉल प्रयोग; बालक दूसरों के व्यवहार का अवलोकन कर अनुकरण द्वारा सीखते हैं।\n• अनुकरण के 4 क्रमिक चरण: 1. अवधान (Attention) -> 2. धारणा (Retention) -> 3. पुनरुत्पादन (Reproduction) -> 4. अभिप्रेरणा (Motivation)।",
            mnemonic: "Bandura's 4 Steps: 'A-R-R-M' -> Attention, Retention, Reproduction, Motivation."
          }
        ],
        summaryCheatSheetEn: [
          "Thorndike: Trial & Error; Primary Laws = Readiness, Exercise, Effect.",
          "Pavlov: Classical Conditioning (Type S); Stimulus substitution.",
          "Skinner: Operant Conditioning (Type R); Programmed Learning; Reinforcement schedules.",
          "Negative Reinforcement ≠ Punishment. Negative reinforcement INCREASES desirable behavior by removing pain.",
          "Köhler: Insight Learning (Sudden Aha! solution); Bandura: Attention -> Retention -> Reproduction -> Motivation."
        ],
        summaryCheatSheetHi: [
          "थार्नडाइक: प्रयास एवं त्रुटि; प्राथमिक नियम = तत्परता, अभ्यास, प्रभाव।",
          "पावलोव: शास्त्रीय अनुबंधन (Type S); उद्दीपक प्रतिस्थापन।",
          "स्किनर: क्रिया-प्रसूत अनुबंधन (Type R); अभिक्रमित अनुदेशन; पुनर्बलन।",
          "नकारात्मक पुनर्बलन दंड नहीं है! यह अप्रिय उद्दीपक हटाकर व्यवहार को बढ़ाता है।",
          "कोहलर: अंतर्दृष्टि (अचानक सूझ); बंडूरा: अवधान -> धारणा -> पुनरुत्पादन -> अभिप्रेरणा।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "What is the correct sequence of steps in Albert Bandura's Social Observational Learning model?",
            questionHi: "अल्बर्ट बंडूरा के सामाजिक अधिगम सिद्धांत में अनुकरण अधिगम के चरणों का सही क्रम क्या है?",
            options: [
              { id: "A", textEn: "Retention -> Attention -> Motivation -> Reproduction", textHi: "धारणा -> अवधान -> अभिप्रेरणा -> पुनरुत्पादन" },
              { id: "B", textEn: "Attention -> Retention -> Reproduction -> Motivation", textHi: "अवधान -> धारणा -> पुनरुत्पादन -> अभिप्रेरणा" },
              { id: "C", textEn: "Motivation -> Attention -> Reproduction -> Retention", textHi: "अभिप्रेरणा -> अवधान -> पुनरुत्पादन -> धारणा" },
              { id: "D", textEn: "Attention -> Motivation -> Retention -> Reproduction", textHi: "अवधान -> अभिप्रेरणा -> धारणा -> पुनरुत्पादन" }
            ],
            correctAnswer: "B",
            explanationEn: "Bandura defined the four stages as: Attention (focusing on model), Retention (encoding in memory), Motor Reproduction (executing behavior), and Motivation (reinforcement to perform).",
            explanationHi: "बंडूरा के 4 चरण: 1. अवधान (ध्यान देना), 2. धारणा (याद रखना), 3. पुनरुत्पादन (कार्य करना), 4. अभिप्रेरणा (पुनर्बलन)।"
          },
          {
            questionEn: "Negative reinforcement results in:",
            questionHi: "नकारात्मक पुनर्बलन (Negative Reinforcement) का क्या परिणाम होता है?",
            options: [
              { id: "A", textEn: "Decreasing the occurrence of behavior", textHi: "व्यवहार के घटित होने में कमी" },
              { id: "B", textEn: "Terminating an unpleasant stimulus to strengthen behavior", textHi: "अप्रिय उद्दीपक को समाप्त कर वांछित व्यवहार को बढ़ाना" },
              { id: "C", textEn: "Giving severe bodily punishment", textHi: "शारीरिक दंड देना" },
              { id: "D", textEn: "Extinction of all learned responses", textHi: "सभी सीखी गई अनुक्रियाओं का विलोप" }
            ],
            correctAnswer: "B",
            explanationEn: "Reinforcement always strengthens response probability; Negative reinforcement achieves this by terminating or removing an aversive/unpleasant stimulus.",
            explanationHi: "पुनर्बलन व्यवहार को सुदृढ़ करता है। नकारात्मक पुनर्बलन किसी कष्टप्रद/अप्रिय उद्दीपक को हटाकर वांछित व्यवहार को बढ़ाता है।"
          }
        ]
      },
      {
        id: "intelligence-personality",
        title: "Theories of Intelligence & Personality Assessment",
        titleHindi: "बुद्धि के सिद्धांत, व्यक्तित्व के प्रकार एवं मापन विधियां",
        estimatedMinutes: 30,
        highYieldWeightage: "4-5 Marks",
        overviewEn: "In-depth review of Spearman's Two-Factor, Gardner's Multiple Intelligences, Sternberg's Triarchic Theory, Binet's IQ concept, and Personality approaches (Freud, Allport, Cattell, Projective Tests).",
        overviewHi: "स्पीयरमैन का द्वि-कारक सिद्धांत, गार्डनर का बहु-बुद्धि सिद्धांत, स्टर्नबर्ग का त्रि-तत्व सिद्धांत, बुद्धि लब्धि (IQ) सूत्र, फ्रायड का मनोविश्लेषण एवं व्यक्तित्व प्रक्षेपी परीक्षण।",
        keyPoints: [
          {
            headingEn: "1. Intelligence Theories & IQ Measurement",
            headingHi: "1. बुद्धि के प्रमुख सिद्धांत एवं बुद्धि लब्धि (IQ) मापन",
            contentEn: "• Alfred Binet (1905): 1st Intelligence Test; introduced 'Mental Age' (MA) in 1908.\n• William Stern (1912): Coined IQ ratio concept.\n• Lewis Terman (1916): Standardized Stanford-Binet test & finalized IQ formula: IQ = (Mental Age / Chronological Age) × 100.\n• Spearman's Two-Factor: General factor ('g') + Specific factors ('s').\n• Howard Gardner's Multiple Intelligences (8-9 independent frames): Linguistic, Logical-Mathematical, Spatial, Musical, Bodily-Kinesthetic, Interpersonal (social empathy), Intrapersonal (self-awareness), Naturalistic, Existential.\n• Robert Sternberg's Triarchic Theory: Analytical (componential), Creative (experiential), Practical (contextual - 'street smarts').",
            contentHi: "• अल्फ्रेड बिने (1905): पहला बुद्धि परीक्षण; 1908 में 'मानसिक आयु' (MA) की अवधारणा।\n• विलियम स्टर्न (1912): IQ का सूत्र प्रस्तावित किया।\n• लुईस टर्मन (1916): स्टैनफोर्ड-बिने परीक्षण; अंतिम IQ सूत्र: IQ = (मानसिक आयु / वास्तविक आयु) × 100।\n• स्पीयरमैन का द्वि-कारक: सामान्य कारक ('g' factor - जन्मजात) + विशिष्ट कारक ('s' factor - अर्जित)।\n• हॉवर्ड गार्डनर का बहु-बुद्धि सिद्धांत: 8 प्रकार (भाषाई, तार्किक-गणितीय, स्थानिक, संगीतात्मक, शारीरिक-गतिसंवेदी, अंतर्वैयक्तिक-Interpersonal, अंतरावैयक्तिक-Intrapersonal, प्राकृतिक)।\n• स्टर्नबर्ग का त्रि-तत्व सिद्धांत: विश्लेषणात्मक, सृजनात्मक, व्यावहारिक (Practical)।",
            mnemonic: "IQ Formula: (MA / CA) × 100 (MA = Mental Age, CA = Chronological Age)."
          },
          {
            headingEn: "2. Personality Theories & Structure (Freud, Allport, Cattell)",
            headingHi: "2. व्यक्तित्व के सिद्धांत एवं संरचना (फ्रायड, ऑलपोर्ट, कैटेल)",
            contentEn: "• Sigmund Freud (Psychoanalysis):\n- Structure: Id (Pleasure principle, unconscious, primary instincts), Ego (Reality principle, conscious mediator), Superego (Moral/ideal principle, conscience).\n- Defense Mechanisms: Repression (unconscious blocking), Projection (attributing own faults to others), Rationalization (false logical excuses - 'sour grapes'), Sublimation (channeling negative drives into socially productive art/work).\n• Gordon Allport (Trait Theory Pioneer): Cardinal Traits (dominant life passion, e.g. Gandhi's non-violence), Central Traits (core building blocks: honesty, kindness), Secondary Traits (preferences, habits).\n• Raymond Cattell: Identified 16 source traits using factor analysis (16PF Questionnaire); Surface traits vs Source traits.",
            contentHi: "• सिगमंड फ्रायड (मनोविश्लेषण):\n- संरचना: इड/इदम् (सुखवादी सिद्धांत, अचेतन), ईगो/अहम् (वास्तविकता का सिद्धांत), सुपर ईगो/पराहम् (नैतिकता का सिद्धांत)।\n- रक्षात्मक युक्तियां: दमन (Repression), प्रक्षेपण (Projection - अपनी गलती दूसरों पर मढ़ना), युक्तिकरण (Rationalization - अंगूर खट्टे हैं), शोधन/उत्तीरीकरण (Sublimation)।\n• गॉर्डन ऑलपोर्ट (शील-गुण सिद्धांत के जनक): प्रधान शील-गुण (Cardinal), केंद्रीय शील-गुण (Central), गौण शील-गुण (Secondary)।\n• रेमंड कैटेल: 16 व्यक्तित्व कारक प्रश्नावली (16PF); सतही शील-गुण बनाम मूल शील-गुण।",
            tableData: {
              headers: ["Freudian Component", "Operating Principle", "Consciousness Level"],
              rows: [
                ["Id (इदम्)", "Pleasure Principle (सुख का सिद्धांत)", "Completely Unconscious (अचेतन)"],
                ["Ego (अहम्)", "Reality Principle (वास्तविकता का सिद्धांत)", "Conscious & Preconscious (चेतन मध्यस्थ)"],
                ["Superego (पराहम्)", "Moral / Ideal Principle (नैतिकता का सिद्धांत)", "Internalized societal conscience"]
              ]
            }
          },
          {
            headingEn: "3. Personality Assessment & Projective Techniques",
            headingHi: "3. व्यक्तित्व मापन एवं प्रक्षेपी परीक्षण विधियां",
            contentEn: "• Projective Techniques (reveal unconscious dynamics through ambiguous stimuli):\n1. Rorschach Inkblot Test (Hermann Rorschach, 1921): 10 cards (5 black/grey, 2 black/red, 3 polychromatic pastel).\n2. Thematic Apperception Test - TAT (Henry Murray & Christiana Morgan, 1935): 30 picture cards + 1 blank card illustrating interpersonal scenarios.\n3. Children's Apperception Test - CAT (Leopold Bellak, 1948): 10 cards featuring animals in human situations (for 3-10 yr olds).\n4. Word Association Test (WAT - Carl Jung) & Sentence Completion Test (SCT - Rotter).",
            contentHi: "• प्रक्षेपी विधियां (अचेतन मन के प्रकटीकरण हेतु):\n1. रोर्शा स्याही धब्बा परीक्षण (1921): हरमन रोर्शा; कुल 10 कार्ड (5 काले/सफेद, 2 काले/लाल, 3 बहुरंगी)।\n2. प्रासंगिक अंतर्बोध परीक्षण (TAT - 1935): मॉर्गन एवं मरे; 30 सचित्र कार्ड + 1 सादा कार्ड (कुल 31)।\n3. बाल अंतर्बोध परीक्षण (CAT - 1948): लियोपोल्ड बेलाक; 3 से 10 वर्ष के बच्चों हेतु जानवरों के 10 कार्ड।\n4. शब्द साहचर्य परीक्षण (WAT - युंग) तथा वाक्य पूर्ति परीक्षण (SCT)।",
            mnemonic: "Rorschach = 10 Inkblot Cards; TAT = 30+1 Picture Cards; CAT = 10 Animal Cards for Children."
          }
        ],
        summaryCheatSheetEn: [
          "IQ = (Mental Age / Chronological Age) × 100 (Terman 1916). Average IQ = 90-109.",
          "Gardner = 8 Multiple Intelligences (Interpersonal = understanding others; Intrapersonal = understanding self).",
          "Freud: Id = Pleasure, Ego = Reality, Superego = Morality. Defense mechanisms safeguard the Ego.",
          "Rorschach = 10 cards; TAT = 31 cards (Morgan & Murray); CAT = 10 animal cards (Bellak)."
        ],
        summaryCheatSheetHi: [
          "IQ = (मानसिक आयु / वास्तविक आयु) × 100 (टर्मन सूत्र)। सामान्य IQ = 90-109।",
          "गार्डनर = बहु-बुद्धि (अंतर्वैयक्तिक = दूसरों को समझना; अंतरावैयक्तिक = स्वयं को समझना)।",
          "फ्रायड: इदम् = सुख, अहम् = वास्तविकता, पराहम् = नैतिकता।",
          "रोर्शा = 10 स्याही धब्बा कार्ड; TAT = 30+1 कार्ड (मरे व मॉर्गन); CAT = 10 पशु कार्ड (बेलाक)।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "A 10-year-old child has a mental age of 12 years. What is the child's IQ according to Terman's formula?",
            questionHi: "एक 10 वर्ष के बालक की मानसिक आयु 12 वर्ष है। टर्मन के सूत्र के अनुसार बालक की बुद्धि लब्धि (IQ) क्या होगी?",
            options: [
              { id: "A", textEn: "100", textHi: "100" },
              { id: "B", textEn: "120", textHi: "120" },
              { id: "C", textEn: "80", textHi: "80" },
              { id: "D", textEn: "140", textHi: "140" }
            ],
            correctAnswer: "B",
            explanationEn: "IQ = (Mental Age / Chronological Age) × 100 = (12 / 10) × 100 = 120 (Superior Intelligence).",
            explanationHi: "IQ = (MA / CA) × 100 = (12 / 10) × 100 = 120 (श्रेष्ठ बुद्धि)।"
          },
          {
            questionEn: "Thematic Apperception Test (TAT) of personality assessment was developed by:",
            questionHi: "व्यक्तित्व मापन का 'प्रासंगिक अंतर्बोध परीक्षण' (TAT) किसके द्वारा विकसित किया गया था?",
            options: [
              { id: "A", textEn: "Hermann Rorschach", textHi: "हरमन रोर्शा" },
              { id: "B", textEn: "Morgan and Murray", textHi: "मॉर्गन एवं मरे" },
              { id: "C", textEn: "Leopold Bellak", textHi: "लियोपोल्ड बेलाक" },
              { id: "D", textEn: "Sigmund Freud", textHi: "सिगमंड फ्रायड" }
            ],
            correctAnswer: "B",
            explanationEn: "TAT was formulated in 1935 by Christiana Morgan and Henry Murray.",
            explanationHi: "TAT का निर्माण 1935 में हेनरी मरे और क्रिस्टियाना मॉर्गन द्वारा किया गया था।"
          }
        ]
      },
      {
        id: "inclusive-education-cce-nep",
        title: "Inclusive Education, CCE, NEP 2020 & RTE 2009",
        titleHindi: "समावेशी शिक्षा, सतत व व्यापक मूल्यांकन, NEP 2020 एवं RTE 2009",
        estimatedMinutes: 35,
        highYieldWeightage: "6-7 Marks",
        overviewEn: "Comprehensive review of Inclusive Education guidelines, specific learning disabilities, Assessment paradigms (Formative/Summative, CCE, Bloom's Taxonomy), NEP 2020 reforms, and RTE Act 2009 legal mandates.",
        overviewHi: "समावेशी शिक्षा, अधिगम अक्षमताएं (डिस्लेक्सिया, डिस्ग्राफिया आदि), CCE, ब्लूम टैक्सोनॉमी, NEP 2020 की 5+3+3+4 संरचना तथा निःशुल्क एवं अनिवार्य शिक्षा अधिकार अधिनियम (RTE 2009)।",
        keyPoints: [
          {
            headingEn: "1. Inclusive Education & Learning Disabilities",
            headingHi: "1. समावेशी शिक्षा एवं अधिगम अक्षमताएं",
            contentEn: "• Inclusive Education: Educating all children (normal, gifted, disabled, disadvantaged) equitably in the same regular mainstream classrooms by adapting pedagogy.\n• RPwD Act 2016: Recognizes 21 categories of benchmark disabilities (increased from 7 in 1995 Act).\n• Key Learning Disabilities:\n- Dyslexia (डिस्लेक्सिया): Reading and phonological decoding disability (e.g. confusing 'saw' and 'was', 'b' and 'd').\n- Dysgraphia (डिस्ग्राफिया): Impairment in handwriting, fine motor coordination, and written expression.\n- Dyscalculia (डिस्कैल्कुलिया): Mathematical computation and number concept difficulty.\n- Dyspraxia (डिस्प्रेक्सिया): Motor coordination and sensory integration difficulty.\n- ADHD: Attention-Deficit/Hyperactivity Disorder (impulsivity, inattention).\n- ASD: Autism Spectrum Disorder (social communication barriers, repetitive patterns).",
            contentHi: "• समावेशी शिक्षा: सभी बालकों (सामान्य, दिव्यांग, वंचित) को बिना किसी भेदभाव के एक ही नियमित विद्यालय में उनकी आवश्यकताओं के अनुरूप पढ़ाना।\n• RPwD Act 2016: दिव्यांगजनों के अधिकारों हेतु 21 प्रकार की दिव्यांगताओं को मान्यता।\n• प्रमुख अधिगम अक्षमताएं:\n- डिस्लेक्सिया (Dyslexia): पठन विकार (Reading disability - 'was' को 'saw' पढ़ना)।\n- डिस्ग्राफिया (Dysgraphia): लेखन विकार (अस्पष्ट हस्तलेखन, वर्तनी दोष)।\n- डिस्कैल्कुलिया (Dyscalculia): गणितीय गणना व अंक संबंधी विकार।\n- डिस्प्रेक्सिया (Dyspraxia): गामक कौशल व शारीरिक समन्वय संबंधी विकार।\n- ADHD: ध्यान अभाव एवं अति-सक्रियता विकार (अस्थिरता)।\n- ऑटिज्म (ASD): सामाजिक अंतःक्रिया एवं संप्रेषण में कठिनाई।",
            mnemonic: "Lexia = Reading (Lexicon); Graphia = Writing (Graphic); Calculia = Maths (Calculator)."
          },
          {
            headingEn: "2. CCE, Assessment Types & Bloom's Taxonomy",
            headingHi: "2. सतत व व्यापक मूल्यांकन (CCE), आकलन के प्रकार एवं ब्लूम वर्गीकरण",
            contentEn: "• Assessment FOR Learning: Formative assessment conducted during the teaching-learning process for diagnostic feedback.\n• Assessment OF Learning: Summative assessment conducted at the end of a term/unit to grade, certify, or measure achievement.\n• Assessment AS Learning: Self-assessment and peer reflection by students.\n• CCE: Continuous (Formative diagnostic monitoring) and Comprehensive (Scholastic + Co-Scholastic holistic domains).\n• Bloom's Revised Taxonomy (Anderson & Krathwohl 2001 - Cognitive Domain):\n1. Remembering -> 2. Understanding -> 3. Applying -> 4. Analyzing -> 5. Evaluating -> 6. Creating (Apex).",
            contentHi: "• सीखने के लिए आकलन (Assessment FOR Learning): रचनात्मक/निर्माणात्मक आकलन (Formative - शिक्षण के दौरान उपचारात्मक फीडबैक हेतु)।\n• सीखने का आकलन (Assessment OF Learning): संकलनात्मक/योगात्मक आकलन (Summative - सत्रांत में ग्रेड/अंक देने हेतु)।\n• सीखने के रूप में आकलन (Assessment AS Learning): स्व-आकलन एवं सहपाठी आकलन।\n• CCE: सतत (निरंतर निदान) एवं व्यापक (संज्ञानात्मक + सह-शैक्षिक सर्वांगीण विकास)।\n• ब्लूम की संशोधित टैक्सोनॉमी (संज्ञानात्मक पक्ष):\n1. ज्ञान/स्मरण (Remember) -> 2. समझ (Understand) -> 3. अनुप्रयोग (Apply) -> 4. विश्लेषण (Analyze) -> 5. मूल्यांकन (Evaluate) -> 6. सृजन (Create - सर्वोच्च स्तर)।",
            mnemonic: "Bloom's Cognitive Pyramid: RU-AA-EC (Remember, Understand, Apply, Analyze, Evaluate, Create)."
          },
          {
            headingEn: "3. National Education Policy (NEP 2020) & RTE Act 2009",
            headingHi: "3. राष्ट्रीय शिक्षा नीति (NEP 2020) एवं शिक्षा का अधिकार अधिनियम (RTE 2009)",
            contentEn: "• NEP 2020 Key Reforms:\n- Replaced 10+2 structure with 5+3+3+4 Curricular Structure:\n  * Foundational Stage (5 yrs: ages 3-8) -> 3 yrs Anganwadi/Pre-school + Classes 1-2 (Play-based ECCE).\n  * Preparatory Stage (3 yrs: ages 8-11) -> Classes 3-5 (Discovery, activity-based).\n  * Middle Stage (3 yrs: ages 11-14) -> Classes 6-8 (Experiential learning, vocational crafts, coding).\n  * Secondary Stage (4 yrs: ages 14-18) -> Classes 9-12 (Multidisciplinary, critical thinking, semester system).\n- Medium of instruction in Mother Tongue / Home Language at least until Grade 5.\n- PARAKH (Performance Assessment, Review, and Analysis of Knowledge for Holistic Development).\n• RTE Act 2009:\n- Came into effect on 1st April 2010. Free and compulsory education for ages 6-14 (up to 18 for PwD).\n- Section 12(1)(c): 25% mandatory reservation in private unaided schools for economically weaker sections.\n- Pupil-Teacher Ratio (PTR): 30:1 for Primary (up to 200 students); 35:1 for Upper Primary.\n- Working Days & Hours: Primary -> 200 days / 800 hours; Upper Primary -> 220 days / 1000 hours per academic year. Minimum 45 teaching hours per week for teachers.",
            contentHi: "• NEP 2020 (अध्यक्ष: डॉ. के. कस्तूरीरंगन):\n- 10+2 के स्थान पर 5+3+3+4 ढांचा:\n  * फाउंडेशनल (5 वर्ष: आयु 3-8) -> 3 वर्ष प्री-स्कूल + कक्षा 1-2 (खेल-आधारित ECCE)।\n  * प्रिपरेटरी (3 वर्ष: आयु 8-11) -> कक्षा 3-5 (गतिविधि आधारित)।\n  * मिडिल (3 वर्ष: आयु 11-14) -> कक्षा 6-8 (व्यावसायिक कौशल, कोडिंग)।\n  * सेकेंडरी (4 वर्ष: आयु 14-18) -> कक्षा 9-12 (बहु-विषयक, लचीलापन)।\n- कम से कम कक्षा 5 तक मातृभाषा/क्षेत्रीय भाषा में शिक्षण।\n- PARAKH राष्ट्रीय मूल्यांकन केंद्र की स्थापना।\n• RTE Act 2009 (लागू: 1 अप्रैल 2010):\n- 6 से 14 वर्ष तक के बच्चों हेतु निःशुल्क एवं अनिवार्य शिक्षा।\n- धारा 12(1)(c): निजी स्कूलों में 25% सीटें वंचित वर्ग के बच्चों हेतु आरक्षित।\n- छात्र-शिक्षक अनुपात (PTR): प्राथमिक = 30:1; उच्च प्राथमिक = 35:1।\n- कार्य दिवस व घंटे: प्राथमिक = 200 दिन (800 घंटे); उच्च प्राथमिक = 220 दिन (1000 घंटे)। शिक्षक हेतु प्रति सप्ताह न्यूनतम 45 शिक्षण घंटे।",
            tableData: {
              headers: ["Feature / प्रावधान", "Primary Level (प्राथमिक 1-5)", "Upper Primary (उच्च प्राथमिक 6-8)"],
              rows: [
                ["Pupil-Teacher Ratio (PTR)", "30 : 1 (Max 40:1 if >200 students)", "35 : 1"],
                ["School Working Days/Year", "200 Working Days", "220 Working Days"],
                ["Instructional Hours/Year", "800 Instructional Hours", "1000 Instructional Hours"],
                ["Distance of School", "Within 1 km radius", "Within 3 km radius"]
              ]
            }
          }
        ],
        summaryCheatSheetEn: [
          "Dyslexia = Reading; Dysgraphia = Writing; Dyscalculia = Arithmetic.",
          "Formative Assessment = Assessment FOR learning (ongoing diagnostics).",
          "Summative Assessment = Assessment OF learning (term-end certification).",
          "NEP 2020 Structure = 5+3+3+4 (Foundational, Preparatory, Middle, Secondary).",
          "RTE 2009: 25% reservation, PTR 30:1 (Primary) & 35:1 (Upper Primary), 45 hrs/week for teacher."
        ],
        summaryCheatSheetHi: [
          "डिस्लेक्सिया = पठन; डिस्ग्राफिया = लेखन; डिस्कैल्कुलिया = गणितीय गणना।",
          "रचनात्मक आकलन = सीखने के लिए आकलन (सुधार हेतु); योगात्मक = सीखने का आकलन (अंक हेतु)।",
          "NEP 2020 = 5+3+3+4 (बुनियादी, प्रारंभिक, मध्य, माध्यमिक स्तर)।",
          "RTE 2009: 25% निजी आरक्षण, PTR 30:1 (प्राथमिक) व 35:1 (उच्च प्राथमिक), 45 घंटे/सप्ताह शिक्षक कार्य।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "Under the RTE Act 2009, what is the mandated Pupil-Teacher Ratio (PTR) for primary schools (Classes I to V)?",
            questionHi: "RTE Act 2009 के अंतर्गत प्राथमिक विद्यालयों (कक्षा 1 से 5) के लिए निर्धारित छात्र-शिक्षक अनुपात (PTR) क्या है?",
            options: [
              { id: "A", textEn: "25 : 1", textHi: "25 : 1" },
              { id: "B", textEn: "30 : 1", textHi: "30 : 1" },
              { id: "C", textEn: "35 : 1", textHi: "35 : 1" },
              { id: "D", textEn: "40 : 1", textHi: "40 : 1" }
            ],
            correctAnswer: "B",
            explanationEn: "RTE 2009 mandates a standard 30:1 Pupil-Teacher Ratio at the primary level (Classes 1-5).",
            explanationHi: "RTE 2009 के अनुसार प्राथमिक स्तर (कक्षा 1-5) पर मानक छात्र-शिक्षक अनुपात 30:1 निर्धारित है।"
          },
          {
            questionEn: "Which of the following is the highest cognitive objective level in Bloom's Revised Taxonomy (Anderson & Krathwohl 2001)?",
            questionHi: "ब्लूम की संशोधित टैक्सोनॉमी (2001) के अनुसार संज्ञानात्मक क्षेत्र का सर्वोच्च स्तर कौन सा है?",
            options: [
              { id: "A", textEn: "Evaluating", textHi: "मूल्यांकन (Evaluating)" },
              { id: "B", textEn: "Analyzing", textHi: "विश्लेषण (Analyzing)" },
              { id: "C", textEn: "Creating", textHi: "सृजन / निर्माण (Creating)" },
              { id: "D", textEn: "Applying", textHi: "अनुप्रयोग (Applying)" }
            ],
            correctAnswer: "C",
            explanationEn: "In the 2001 revised taxonomy, 'Creating' (producing new or original work) replaced Evaluation at the apex level.",
            explanationHi: "2001 के संशोधित वर्गीकरण में 'Creating' (सृजन/रचना करना) को सर्वोच्च स्थान पर रखा गया है।"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 2: UTTARAKHAND GENERAL KNOWLEDGE & STATE AWARENESS (HIGH-YIELD)
  // =========================================================================
  {
    id: "uttarakhand-gk",
    moduleNumber: 2,
    title: "Uttarakhand General Knowledge & State Capsule",
    titleHindi: "उत्तराखंड राज्य विशेष सामान्य ज्ञान एवं समसामयिकी",
    description: "History of Katyuri, Chand & Panwar dynasties, Geography, 5 Prayags, Rivers, Peaks, National Parks, Fairs, Festivals & Environmental Movements.",
    descriptionHindi: "उत्तराखंड का इतिहास (कत्यूरी, चंद, पंवार वंश), पंच प्रयाग, प्रमुख नदियां, पर्वत शिखर, राष्ट्रीय उद्यान, मेले, लोक कला एवं जन आंदोलन।",
    badge: "State GK Special • High-Yield",
    totalMarks: "Special Capsule",
    color: "#e37400",
    iconName: "Mountain",
    topics: [
      {
        id: "uk-history-dynasties",
        title: "Uttarakhand History: Dynasties & Statehood Movement",
        titleHindi: "उत्तराखंड का इतिहास: प्रमुख राजवंश एवं राज्य आंदोलन",
        estimatedMinutes: 30,
        highYieldWeightage: "4-5 Marks",
        overviewEn: "Chronological study from Kuninda, Katyuri, Chand Dynasty of Kumaon, Panwar Dynasty of Garhwal, Gorkha invasion, British colonial era, to the Uttarakhand Statehood agitation (1994-2000).",
        overviewHi: "कुणिंद, कत्यूरी (कार्तिकेयपुर), कुमाऊं का चंद वंश, गढ़वाल का पंवार वंश, गोरखा शासन, ब्रिटिश कमिश्नरी तथा उत्तराखंड राज्य निर्माण आंदोलन (1994-2000)।",
        keyPoints: [
          {
            headingEn: "1. Ancient & Medieval Dynasties (Katyuri, Chand & Panwar)",
            headingHi: "1. प्राचीन एवं मध्यकालीन राजवंश (कत्यूरी, चंद एवं पंवार)",
            contentEn: "• Kuninda Dynasty: First political power in Uttarakhand (King Amoghbhuti issued silver and copper coins with Brahmi/Kharosthi scripts).\n• Katyuri Dynasty (कार्तिकेयपुर/कत्यूरी): Founded by Basantana Dev (~700-1050 AD); capital Joshimath -> Baijnath (Garur valley). Constructed magnificent stone temples.\n• Chand Dynasty of Kumaon: Founded by Somchand (capital Champawat -> shifted to Almora by Kalyan Chand in 1563). Famous rulers: Rudrachand (contemporary of Akbar, founded Rudrapur), Baz Bahadur Chand (conquered Tibet & Kailash pilgrimage route).\n• Panwar / Parmar Dynasty of Garhwal: Founded by Kanakpal (888 AD at Chandpurgarh). 37th ruler Ajaypal (1500-1519 AD) consolidated 52 Garhs into unified Garhwal (called 'Ashoka of Garhwal', capital shifted to Srinagar).",
            contentHi: "• कुणिंद वंश: प्रथम राजनीतिक शक्ति; राजा अमोघभूति के चांदी व तांबे के सिक्के (ब्राह्मी व खरोष्ठी लिपि)।\n• कत्यूरी वंश (कार्तिकेयपुर): संस्थापक बसंतन देव; राजधानी जोशीमठ, बाद में बैजनाथ (बागेश्वर)। प्रसिद्ध मंदिर निर्माता।\n• कुमाऊं का चंद वंश: संस्थापक सोमचंद; राजधानी चंपावत से अल्मोड़ा (1563 में कल्याण चंद द्वारा)। रुद्रचंद (अकबर के समकालीन), बाज बहादुर चंद (तिब्बत विजय)।\n• गढ़वाल का पंवार/परमार वंश: संस्थापक कनकपाल (888 ई. चांदपुरगढ़)। 37वें राजा अजयपाल ने 52 गढ़ों को जीतकर एकीकृत किया (गढ़वाल का अशोक, राजधानी श्रीनगर)।",
            mnemonic: "Champawat to Almora = Chand (Kumaon); Chandpurgarh to Srinagar = Panwar (Garhwal)."
          },
          {
            headingEn: "2. Gorkha Era, British Rule & Freedom Struggle",
            headingHi: "2. गोरखा शासन, ब्रिटिश कमिश्नरी एवं स्वतंत्रता संग्राम",
            contentEn: "• Gorkha Conquest: Conquered Kumaon in 1790 (Battle of Havalbagh) and Garhwal in 1804 (Battle of Khurbura, Dehradun where King Pradyumna Shah was martyred). Ruled with iron fist ('Gorkhyali').\n• Anglo-Gorkha War & Treaty of Sagauli (1815): British expelled Gorkhas. Kumaon Division created; Tehri Garhwal State restored to Sudarshan Shah.\n• British Commissioners: 1st Commissioner: Edward Gardner; 2nd: G.W. Traill (pioneered revenue settlement); Sir Henry Ramsay ('King of Kumaon' / Ramji Sahib, 1856-1884).\n• Coolie Begar Movement (कुली बेगार प्रथा अंत): 13-14 January 1921 at Uttarayani Mela, Bageshwar (Saryu bank), led by Badridatt Pandey ('Kumaon Kesari'), Hargovind Pant, and Chiranji Lal. Registers thrown into Saryu river. Mahatma Gandhi called it a 'Bloodless Revolution'.\n• Peshawar Incident (23 April 1930): Veer Chandra Singh Garhwali (2/18 Royal Garhwal Rifles) refused to fire upon unarmed Pathan freedom fighters at Kissa Khwani Bazaar.",
            contentHi: "• गोरखा शासन: 1790 में कुमाऊं तथा 1804 में गढ़वाल (खुड़बुड़ा का युद्ध, देहरादून - प्रद्युम्न शाह वीरगति को प्राप्त हुए) पर अधिकार।\n• सुगौली की संधि (1815): गोरखा शासन समाप्त। ब्रिटिश कुमाऊं कमिश्नरी का गठन तथा टिहरी रियासत (सुदर्शन शाह)।\n• प्रमुख ब्रिटिश कमिश्नर: प्रथम कमिश्नर ई. गार्डनर; ट्रेल; हेनरी रैमजे ('कुमाऊं का बेताज बादशाह' / रामजी 1856-1884)।\n• कुली बेगार आंदोलन: 13-14 जनवरी 1921, उत्तरायणी मेला, बागेश्वर (सरयू नदी तट)। बद्रीदत्त पांडे ('कुमाऊं केसरी') के नेतृत्व में कुली बेगार रजिस्टर सरयू में बहाए गए। गांधीजी ने इसे 'रक्तहीन क्रांति' कहा।\n• पेशावर कांड (23 अप्रैल 1930): वीर चंद्र सिंह गढ़वाली ने निहत्थे पठानों पर गोली चलाने से इंकार किया।",
            mnemonic: "Bageshwar 1921 = Coolie Begar Abolition (Badridatt Pandey - Kumaon Kesari)."
          },
          {
            headingEn: "3. Uttarakhand Statehood Movement (1994-2000)",
            headingHi: "3. पृथक उत्तराखंड राज्य निर्माण आंदोलन (1994-2000)",
            contentEn: "• Historic Milestones:\n- 1 Sept 1994: Khatima Firing (खटीमा गोलीकांड - 'Black Day').\n- 2 Sept 1994: Mussoorie Firing (मसूरी गोलीकांड - Jhulaghar incident, Hansa Dhanai & Belmati Chauhan martyred).\n- 2 Oct 1994: Rampur Tiraha Firing (मुजफ्फरनगर रामपुर तिराहा कांड - police atrocities on peaceful statehood demonstrators travelling to Delhi).\n- 15 Aug 1996: PM H.D. Deve Gowda announced the creation of Uttarakhand from Red Fort.\n- 9 November 2000: Uttaranchal created as the 27th State of the Republic of India (Nityanand Swami 1st CM, Surjit Singh Barnala 1st Governor).\n- 1 January 2007: Renamed officially from 'Uttaranchal' to 'Uttarakhand'.",
            contentHi: "• राज्य आंदोलन के प्रमुख घटनाक्रम:\n- 1 सितंबर 1994: खटीमा गोलीकांड (काला दिवस)।\n- 2 सितंबर 1994: मसूरी गोलीकांड (हंसा धनाई व बेलमती चौहान शहीद)।\n- 2 अक्टूबर 1994: रामपुर तिराहा कांड (मुजफ्फरनगर में शांतिपूर्ण आंदोलनकारियों पर अत्याचार)।\n- 15 अगस्त 1996: प्रधानमंत्री एच.डी. देवगौड़ा द्वारा लाल किले से पृथक राज्य की घोषणा।\n- 9 नवंबर 2000: भारत के 27वें राज्य के रूप में 'उत्तरांचल' का गठन (प्रथम मुख्यमंत्री: नित्यानंद स्वामी; प्रथम राज्यपाल: सुरजीत सिंह बरनाला)।\n- 1 जनवरी 2007: राज्य का नाम आधिकारिक रूप से 'उत्तरांचल' से बदलकर 'उत्तराखंड' किया गया।",
            mnemonic: "Statehood: 9 Nov 2000 (27th Indian State); Renamed: 1 Jan 2007."
          }
        ],
        summaryCheatSheetEn: [
          "Amoghbhuti = Famous Kuninda King; Ajaypal = 52 Garhs unifier (Ashoka of Garhwal).",
          "Kalyan Chand shifted Kumaon capital from Champawat to Almora (1563).",
          "Coolie Begar Movement = Jan 1921, Bageshwar (Badridatt Pandey - 'Kumaon Kesari').",
          "State Formation = 9 Nov 2000 (27th State); 1st CM = Nityanand Swami; 1st Governor = Surjit Singh Barnala."
        ],
        summaryCheatSheetHi: [
          "अमोघभूति = कुणिंद राजा; अजयपाल = 52 गढ़ों का विजेता (गढ़वाल का अशोक)।",
          "कल्याण चंद ने 1563 में राजधानी चंपावत से अल्मोड़ा स्थानांतरित की।",
          "कुली बेगार आंदोलन = 13-14 जनवरी 1921, बागेश्वर (बद्रीदत्त पांडे)।",
          "राज्य गठन = 9 नवंबर 2000 (27वां राज्य); प्रथम सीएम = नित्यानंद स्वामी; प्रथम राज्यपाल = सुरजीत सिंह बरनाला।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "On which river's bank and in which year was the historic Coolie Begar abolition movement held under Badridatt Pandey?",
            questionHi: "बद्रीदत्त पांडे के नेतृत्व में ऐतिहासिक कुली बेगार प्रथा अंत आंदोलन किस नदी के तट पर और किस वर्ष हुआ था?",
            options: [
              { id: "A", textEn: "Alaknanda, 1920", textHi: "अलकनंदा, 1920" },
              { id: "B", textEn: "Saryu (Bageshwar), 1921", textHi: "सरयू (बागेश्वर), 1921" },
              { id: "C", textEn: "Bhagirathi, 1930", textHi: "भागीरथी, 1930" },
              { id: "D", textEn: "Ganga (Haridwar), 1919", textHi: "गंगा (हरिद्वार), 1919" }
            ],
            correctAnswer: "B",
            explanationEn: "On 13-14 January 1921 (Uttarayani Mela) at Bageshwar on the banks of Saryu river, thousands of peasants dumped the oppressive Coolie Begar registers.",
            explanationHi: "13-14 जनवरी 1921 को बागेश्वर में सरयू नदी के तट पर कुली बेगार आंदोलन हुआ था।"
          },
          {
            questionEn: "Who was the first Chief Minister of Uttarakhand upon its formation on 9 November 2000?",
            questionHi: "9 नवंबर 2000 को उत्तराखंड राज्य गठन के समय राज्य के प्रथम मुख्यमंत्री कौन थे?",
            options: [
              { id: "A", textEn: "Bhagat Singh Koshyari", textHi: "भगत सिंह कोश्यारी" },
              { id: "B", textEn: "Nityanand Swami", textHi: "नित्यानंद स्वामी" },
              { id: "C", textEn: "N.D. Tiwari", textHi: "एन.डी. तिवारी" },
              { id: "D", textEn: "Major Gen. B.C. Khanduri", textHi: "मेजर जनरल बी.सी. खंडूड़ी" }
            ],
            correctAnswer: "B",
            explanationEn: "Nityanand Swami was sworn in as the first interim Chief Minister of Uttarakhand (then Uttaranchal).",
            explanationHi: "नित्यानंद स्वामी नवगठित उत्तराखंड राज्य के प्रथम मुख्यमंत्री बने थे।"
          }
        ]
      },
      {
        id: "uk-geography-prayags",
        title: "Geography: Panch Prayags, Rivers, Glaciers & Peaks",
        titleHindi: "भूगोल: पंच प्रयाग, प्रमुख नदियां, हिमनद, दर्रे एवं पर्वत शिखर",
        estimatedMinutes: 30,
        highYieldWeightage: "5-6 Marks",
        overviewEn: "Mastery of the Panch Prayags, major river drainage systems (Ganga/Alaknanda, Bhagirathi, Yamuna, Kali), highest Himalayan peaks (Nanda Devi, Kamet), mountain passes, and alpine Bugyals.",
        overviewHi: "पंच प्रयाग (विष्णु, नंद, कर्ण, रुद्र, देवप्रयाग), नदी तंत्र (अलकनंदा, भागीरथी, यमुना, काली), सर्वोच्च पर्वत शिखर (नंदा देवी 7816 मी.), हिमनद, दर्रे एवं बुग्याल।",
        keyPoints: [
          {
            headingEn: "1. The Holy Panch Prayags of Uttarakhand (Downstream Order)",
            headingHi: "1. उत्तराखंड के पवित्र पंच प्रयाग (क्रमशः संगम)",
            contentEn: "Alaknanda originates from Satopanth Glacier and forms the spine of the Panch Prayags:\n1. Vishnuprayag (विष्णुप्रयाग - Chamoli): Alaknanda + Dhauliganga (Western).\n2. Nandaprayag (नंदप्रयाग - Chamoli): Alaknanda + Nandakini.\n3. Karnaprayag (कर्णप्रयाग - Chamoli): Alaknanda + Pindar River (originates from Pindari Glacier).\n4. Rudraprayag (रुद्रप्रयाग): Alaknanda + Mandakini (originates from Chorabari Glacier / Kedarnath).\n5. Devprayag (देवप्रयाग - Tehri): Alaknanda ('Bahu') + Bhagirathi ('Saas' - from Gaumukh/Gangotri). Here the river formally becomes the **GANGA**.",
            contentHi: "अलकनंदा नदी (सतोपंथ हिमनद) पंच प्रयागों की मुख्य धारा है:\n1. विष्णुप्रयाग (चमोली): अलकनंदा + पश्चिमी धौलीगंगा का संगम।\n2. नंदप्रयाग (चमोली): अलकनंदा + नंदाकिनी का संगम।\n3. कर्णप्रयाग (चमोली): अलकनंदा + पिंडर नदी (पिंडारी हिमनद)।\n4. रुद्रप्रयाग: अलकनंदा + मंदाकिनी नदी (चोराबाड़ी/केदारनाथ)।\n5. देवप्रयाग (टिहरी): अलकनंदा (बहू) + भागीरथी (सास - गोमुख)। यहाँ से आगे संयुक्त धारा **गंगा** कहलाती है।",
            mnemonic: "Panch Prayags Order from North to South: 'V-N-K-R-D' (Vishnu, Nanda, Karna, Rudra, Dev).",
            tableData: {
              headers: ["Prayag (प्रयाग)", "District (जिला)", "Rivers Confluence (संगम नदियां)"],
              rows: [
                ["1. Vishnuprayag (विष्णुप्रयाग)", "Chamoli (चमोली)", "Alaknanda + Dhauliganga (अलकनंदा + धौलीगंगा)"],
                ["2. Nandaprayag (नंदप्रयाग)", "Chamoli (चमोली)", "Alaknanda + Nandakini (अलकनंदा + नंदाकिनी)"],
                ["3. Karnaprayag (कर्णप्रयाग)", "Chamoli (चमोली)", "Alaknanda + Pindar (अलकनंदा + पिंडर)"],
                ["4. Rudraprayag (रुद्रप्रयाग)", "Rudraprayag (रुद्रप्रयाग)", "Alaknanda + Mandakini (अलकनंदा + मंदाकिनी)"],
                ["5. Devprayag (देवप्रयाग)", "Tehri (टिहरी)", "Alaknanda + Bhagirathi -> GANGA (अलकनंदा + भागीरथी)"]
              ]
            }
          },
          {
            headingEn: "2. Highest Mountain Peaks & Alpine Bugyals",
            headingHi: "2. सर्वोच्च पर्वत शिखर, हिमनद एवं बुग्याल (Alpine Meadows)",
            contentEn: "• Highest Peaks in Uttarakhand:\n1. Nanda Devi (नंदा देवी): 7,816 meters (Highest peak entirely within India, Chamoli).\n2. Kamet (कामेत): 7,756 meters (Chamoli).\n3. Mana (माणा): 7,272 meters (Chamoli).\n4. Trishul (त्रिशूल): 7,120 meters (Chamoli).\n5. Chaukhamba (चौखंभा): 7,138 meters (Chamoli/Rudraprayag).\n6. Panchachuli (पंचाचूली): 6,904 meters (Pithoragarh - 5 peaks of Pandavas' hearths).\n• Prominent Bugyals (Alpine Pastures):\n- Bedni Bugyal (Chamoli - Largest bugyal of Uttarakhand, en route Nanda Raj Jat).\n- Dayara Bugyal (Uttarkashi - Famous for Butter Festival / Anduri Utsav).\n- Auli Bugyal (Chamoli - International Skiing destination).\n- Panwali Kantha (Tehri/Rudraprayag - rich in herbs and wildflowers).",
            contentHi: "• प्रमुख पर्वत शिखर:\n1. नंदा देवी (पश्चिमी): 7,816 मीटर (उत्तराखंड का सर्वोच्च शिखर, चमोली)।\n2. कामेत: 7,756 मीटर (चमोली)।\n3. माणा: 7,272 मीटर (चमोली)।\n4. त्रिशूल: 7,120 मीटर (चमोली)।\n5. पंचाचूली: 6,904 मीटर (पिथौरागढ़ - 5 चोटियां)।\n• प्रमुख बुग्याल (मखमली घास के मैदान):\n- बेदनी बुग्याल (चमोली): राज्य का सबसे बड़ा बुग्याल (नंदा राजजात मार्ग)।\n- दयारा बुग्याल (उत्तरकाशी): 'बटर फेस्टिवल / अढूंढ़ी उत्सव' हेतु प्रसिद्ध।\n- औली (चमोली): शीतकालीन स्कीइंग केंद्र।\n- बगजी, कल्पनाथ (चमोली), पंवाली कांठा (टिहरी)।",
            mnemonic: "Highest Peak: Nanda Devi (7816m) > Kamet (7756m) > Mana (7272m)."
          },
          {
            headingEn: "3. National Parks, Sanctuaries & Environmental Movements",
            headingHi: "3. राष्ट्रीय उद्यान, वन्यजीव अभयारण्य एवं पर्यावरण आंदोलन",
            contentEn: "• 6 National Parks in Uttarakhand:\n1. Jim Corbett NP (1936 - Nainital/Pauri, 520 sq km): India's 1st NP (formerly Hailey NP), 1st Project Tiger reserve (1973).\n2. Nanda Devi NP (1982 - Chamoli, 624 sq km): UNESCO World Heritage Site (1988).\n3. Valley of Flowers NP (1982 - Chamoli, 87.5 sq km): Discovered by Frank Smythe (1931), UNESCO Site (2005).\n4. Rajaji NP (1983 - Dehradun/Haridwar/Pauri, 820 sq km): Elephant reserve, 2nd Tiger Reserve of UK (2015).\n5. Gangotri NP (1989 - Uttarkashi, 2390 sq km): Largest NP of Uttarakhand.\n6. Govind NP (1990 - Uttarkashi, 472 sq km).\n• Famous Environmental Movements:\n- Chipko Movement (1973): Initiated at Reni village (Chamoli) by Gaura Devi ('Chipko Woman'), Sunderlal Bahuguna ('Ecology is permanent economy'), and Chandi Prasad Bhatt (Ramon Magsaysay awardee).\n- Maiti Movement (1996): Founded by Kalyan Singh Rawat in Gwaldam (bride & groom plant a fruit tree at wedding).\n- Doli-Palki Movement: Initiated by Jayanand Bharati (1930) for Dalit social equality.",
            contentHi: "• 6 राष्ट्रीय उद्यान:\n1. जिम कॉर्बेट (1936, नैनीताल/पौड़ी): भारत का पहला राष्ट्रीय उद्यान (हैली नेशनल पार्क), 1973 में पहला टाइगर रिजर्व।\n2. नंदा देवी (1982, चमोली): यूनेस्को विश्व धरोहर (1988)।\n3. फूलों की घाटी (1982, चमोली, 87.5 वर्ग किमी): फ्रैंक स्माइथ द्वारा 1931 में खोजी गई; यूनेस्को धरोहर (2005)।\n4. राजाजी (1983, देहरादून/हरिद्वार/पौड़ी): एशियाई हाथियों का वास, दूसरा टाइगर रिजर्व (2015)।\n5. गंगोत्री (1989, उत्तरकाशी, 2390 वर्ग किमी): राज्य का सबसे बड़ा राष्ट्रीय उद्यान।\n6. गोविंद (1990, उत्तरकाशी)।\n• पर्यावरण आंदोलन:\n- चिपको आंदोलन (1973): रेणी गांव (चमोली); गौरा देवी (चिपको वूमेन), सुंदरलाल बहुगुणा, चंडी प्रसाद भट्ट।\n- मैती आंदोलन (1996): कल्याण सिंह रावत (ग्वालदम) द्वारा विवाह के अवसर पर पौधा लगाने की अनूठी परंपरा।\n- डोला-पालकी आंदोलन (1930): जयानंद भारती द्वारा शिल्पकारों के सामाजिक सम्मान हेतु।",
            tableData: {
              headers: ["National Park / उद्यान", "Establishment Year", "District (जिला)", "Special Distinction"],
              rows: [
                ["Jim Corbett NP", "1936", "Nainital / Pauri", "1st NP in India & Asia, 1st Project Tiger (1973)"],
                ["Valley of Flowers", "1982", "Chamoli", "UNESCO World Heritage Site (Frank Smythe 1931)"],
                ["Nanda Devi NP", "1982", "Chamoli", "UNESCO World Heritage Site (1988)"],
                ["Gangotri NP", "1989", "Uttarkashi", "Largest NP in Uttarakhand (2,390 sq km)"]
              ]
            }
          }
        ],
        summaryCheatSheetEn: [
          "Panch Prayags: Vishnu (Dhauli), Nanda (Nandakini), Karna (Pindar), Rudra (Mandakini), Dev (Bhagirathi -> GANGA).",
          "Nanda Devi (7816m) is the highest peak in Uttarakhand.",
          "Corbett NP (1936) = 1st in India; Gangotri NP (2390 sq km) = Largest in UK; Valley of Flowers = Smallest.",
          "Chipko Movement = 1973 Reni village (Gaura Devi, Sunderlal Bahuguna, Chandi Prasad Bhatt).",
          "Maiti Movement = Kalyan Singh Rawat (1996 Gwaldam)."
        ],
        summaryCheatSheetHi: [
          "पंच प्रयाग: विष्णु (धौलीगंगा), नंद (नंदाकिनी), कर्ण (पिंडर), रुद्र (मंदाकिनी), देवप्रयाग (भागीरथी + अलकनंदा = गंगा)।",
          "नंदा देवी (7816 मी.) उत्तराखंड का सर्वोच्च पर्वत शिखर है।",
          "कॉर्बेट राष्ट्रीय उद्यान (1936) = भारत का पहला; गंगोत्री = सबसे बड़ा; फूलों की घाटी = सबसे छोटा।",
          "चिपको आंदोलन = 1973 रेणी गांव (गौरा देवी, सुंदरलाल बहुगुणा); मैती आंदोलन = 1996 (कल्याण सिंह रावत)।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "At which Prayag do the Alaknanda and Mandakini rivers meet?",
            questionHi: "अलकनंदा एवं मंदाकिनी नदियों का संगम किस प्रयाग में होता है?",
            options: [
              { id: "A", textEn: "Karnaprayag", textHi: "कर्णप्रयाग" },
              { id: "B", textEn: "Nandaprayag", textHi: "नंदप्रयाग" },
              { id: "C", textEn: "Rudraprayag", textHi: "रुद्रप्रयाग" },
              { id: "D", textEn: "Vishnuprayag", textHi: "विष्णुप्रयाग" }
            ],
            correctAnswer: "C",
            explanationEn: "Rudraprayag marks the sacred confluence of the Alaknanda and Mandakini rivers.",
            explanationHi: "अलकनंदा और मंदाकिनी नदियों का पवित्र संगम रुद्रप्रयाग में होता है।"
          },
          {
            questionEn: "Who is known as the 'Chipko Woman' who led the historic forest conservation movement at Reni village in 1973?",
            questionHi: "1973 में रेणी गांव (चमोली) में चिपको आंदोलन का नेतृत्व करने वाली 'चिपको वूमेन' के नाम से कौन प्रसिद्ध हैं?",
            options: [
              { id: "A", textEn: "Bachendri Pal", textHi: "बछेंद्री पाल" },
              { id: "B", textEn: "Gaura Devi", textHi: "गौरा देवी" },
              { id: "C", textEn: "Tilu Rauteli", textHi: "तीलू रौतेली" },
              { id: "D", textEn: "Kalyan Singh Rawat", textHi: "कल्याण सिंह रावत" }
            ],
            correctAnswer: "B",
            explanationEn: "Gaura Devi led 27 village women to hug the trees in Reni village in 1973, halting commercial deforestation.",
            explanationHi: "गौरा देवी ने 1973 में रेणी गांव में महिलाओं का नेतृत्व कर पेड़ों से चिपककर उनकी रक्षा की थी।"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 3: GENERAL REASONING & MENTAL ABILITY
  // =========================================================================
  {
    id: "reasoning",
    moduleNumber: 3,
    title: "General Mental Ability & Reasoning",
    titleHindi: "सामान्य बुद्धि एवं तर्कशक्ति परीक्षण",
    description: "Series, Coding-Decoding, Blood Relations, Direction Tests, Syllogisms, Clocks & Calendar logic.",
    descriptionHindi: "श्रृंखला, कोडिंग-डिकोडिंग, रक्त संबंध, दिशा परीक्षण, न्याय निगमन, वेन आरेख, घड़ी एवं कैलेंडर।",
    badge: "Scoring & Logical",
    totalMarks: "Special Capsule",
    color: "#1e8e3e",
    iconName: "Binary",
    topics: [
      {
        id: "reasoning-core-rules",
        title: "High-Yield Reasoning Shortcuts & Rules",
        titleHindi: "तर्कशक्ति के महत्वपूर्ण सूत्र, शॉर्टकट ट्रिक्स एवं नियम",
        estimatedMinutes: 25,
        highYieldWeightage: "Scoring Marks",
        overviewEn: "Fast-solving mnemonic rules and structural logic for coding-decoding, blood relations, syllogisms, and calendar problems.",
        overviewHi: "कोडिंग-डिकोडिंग, रक्त संबंध, दिशा ज्ञान, न्याय निगमन एवं कैलेंडर के त्वरित समाधान हेतु शॉर्टकट ट्रिक्स।",
        keyPoints: [
          {
            headingEn: "1. Alphabet Positions & Opposite Letters",
            headingHi: "1. वर्णमाला क्रमांक एवं विपरीत अक्षर (EJOTY Trick)",
            contentEn: "• Standard Alphabet Index: E(5), J(10), O(15), T(20), Y(25).\n• Opposite Letter Pairs (Sum of positional values = 27):\n- A-Z (Azad), B-Y (Boy), C-X (Crux), D-W (Dew), E-V (EVening), F-U (FUll), G-T (GT Road), H-S (High School), I-R (Indian Railway), J-Q (Jungle Queen), K-P (KanPur), L-O (LOve), M-N (MaN).",
            contentHi: "• वर्णमाला स्थिति: E=5, J=10, O=15, T=20, Y=25 (EJOTY)।\n• विपरीत अक्षर (जिनका योग = 27):\n- A-Z (आज), B-Y (बाय), C-X (क्रक्स), D-W (ड्यू), E-V (इवनिंग), F-U (उफ), G-T (जीटी रोड), H-S (हाई स्कूल), I-R (इंडियन रेलवे), J-Q (जंगल क्वीन), K-P (कानपुर), L-O (लव), M-N (मन)।",
            mnemonic: "Remember 'EJOTY' for multiples of 5; Sum of opposite pairs is always 27."
          },
          {
            headingEn: "2. Direction Sense & Blood Relations Symbols",
            headingHi: "2. दिशा परीक्षण एवं रक्त संबंध आरेख निर्माण",
            contentEn: "• Direction: North (Top), South (Bottom), East (Right), West (Left). A 90° right turn is clockwise; a 90° left turn is counter-clockwise.\n• Pythagoras Theorem for Shortest Distance: $d = \\sqrt{x^2 + y^2}$.\n• Blood Relations Family Tree Symbols:\n- Male = $[+]$ or Square; Female = $[-]$ or Circle.\n- Married Couple = $\\Leftrightarrow$ (Double horizontal line).\n- Siblings = $-$ (Single horizontal line).\n- Generation Gap = $\\downarrow$ (Vertical line).",
            contentHi: "• दिशाएं: उत्तर (ऊपर), दक्षिण (नीचे), पूर्व (दाएं), पश्चिम (बाएं)।\n• न्यूनतम दूरी (पाइथागोरस प्रमेय): $d = \\sqrt{लंब^2 + आधार^2}$।\n• रक्त संबंध वंश वृक्ष (Family Tree):\n- पुरुष = [+] या वर्ग; महिला = [-] या वृत्त।\n- पति-पत्नी = $\\Leftrightarrow$ (दोहरी रेखा); भाई-बहन = $-$ (एकल रेखा); पीढ़ी अंतर = $\\downarrow$ (लंबवत रेखा)।",
            mnemonic: "Always draw a quick Family Tree to avoid assumption traps in multi-generation blood relations."
          }
        ],
        summaryCheatSheetEn: [
          "EJOTY = 5, 10, 15, 20, 25. Opposite letter sum = 27 (A1+Z26=27).",
          "Clock Angle: $|30H - 5.5M|$ degrees.",
          "Ordinary Year = 1 Odd day (365 days); Leap Year = 2 Odd days (366 days).",
          "Syllogism: 'All A are B' does NOT automatically mean 'All B are A'."
        ],
        summaryCheatSheetHi: [
          "EJOTY = 5, 10, 15, 20, 25। विपरीत अक्षरों का योग 27 होता है।",
          "घड़ी के दोनों कांटों के बीच कोण = $|30H - 5.5M|$ डिग्री।",
          "साधारण वर्ष = 1 विषम दिन; लीप वर्ष = 2 विषम दिन।",
          "न्याय निगमन: 'सभी A, B हैं' का अर्थ यह नहीं कि 'सभी B, A हैं'।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "What is the angle between the hour hand and minute hand of a clock at 3:30?",
            questionHi: "घड़ी में 3:30 बजे घंटे और मिनट की सुइयों के बीच कितने डिग्री का कोण बनेगा?",
            options: [
              { id: "A", textEn: "90°", textHi: "90°" },
              { id: "B", textEn: "75°", textHi: "75°" },
              { id: "C", textEn: "60°", textHi: "60°" },
              { id: "D", textEn: "85°", textHi: "85°" }
            ],
            correctAnswer: "B",
            explanationEn: "Angle = |30H - 5.5M| = |30(3) - 5.5(30)| = |90 - 165| = 75°.",
            explanationHi: "कोण = |30H - 5.5M| = |30(3) - 5.5(30)| = |90 - 165| = 75°।"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // MODULE 4: SCIENCE & MATHEMATICS SPECIALIZATION
  // =========================================================================
  {
    id: "science-maths",
    moduleNumber: 4,
    title: "LT Science & Mathematics Subject Specialization",
    titleHindi: "विज्ञान एवं गणित विषय विशेषज्ञता (भौतिक, रसायन, जीव एवं गणित)",
    description: "Key laws, formulas and principles across Physics, Chemistry, Biology and Mathematics for LT teacher candidates.",
    descriptionHindi: "भौतिक विज्ञान, रसायन विज्ञान, जीव विज्ञान एवं गणित के मुख्य नियम, सूत्र एवं अवधारणाएं।",
    badge: "Subject Core • High-Yield",
    totalMarks: "Special Capsule",
    color: "#d93025",
    iconName: "Atom",
    topics: [
      {
        id: "physics-chemistry-core",
        title: "Physics & Chemistry High-Yield Concepts",
        titleHindi: "भौतिक विज्ञान एवं रसायन विज्ञान के महत्वपूर्ण सिद्धांत एवं सूत्र",
        estimatedMinutes: 30,
        highYieldWeightage: "Core Subject",
        overviewEn: "Concise summary of Newton's laws, Optics, Electromagnetism, Thermodynamics, Periodic Trends, Chemical Bonding and Metallurgy.",
        overviewHi: "न्यूटन के नियम, प्रकाशिकी, विद्युत चुंबकत्व, ऊष्मागतिकी, आवर्त सारणी के गुण, रासायनिक आबंधन एवं धातु कर्म।",
        keyPoints: [
          {
            headingEn: "1. Core Physics Laws & Formulas",
            headingHi: "1. भौतिक विज्ञान के महत्वपूर्ण नियम एवं सूत्र",
            contentEn: "• Mechanics: $F = ma$, Work $W = Fd\\cos\\theta$, Kinetic Energy $KE = \\frac{1}{2}mv^2$, Potential Energy $PE = mgh$.\n• Centripetal Force: $F_c = \\frac{mv^2}{r}$; Uniform circular motion is ALWAYS accelerated ($a_c = v^2/r$).\n• Optics:\n- Mirror Formula: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$; Lens Formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$.\n- Plane Mirror Image: Virtual, erect, laterally inverted, same size as object ($m = +1$).\n- Total Internal Reflection (TIR): Occurs when light travels from Denser to Rarer medium at angle of incidence $i > i_c$ (Critical angle). Applications: Optical fibers, mirages, sparkling diamond.\n• Electricity: Ohm's Law $V = IR$; Electric Power $P = VI = I^2R = V^2/R$; Fuse wire: High resistivity & low melting point.\n• Transformer: Mutual induction; Step-down transformer decreases AC voltage ($V_s < V_p$).",
            contentHi: "• यांत्रिकी: $F = ma$, कार्य $W = Fd\\cos\\theta$, गतिज ऊर्जा $KE = \\frac{1}{2}mv^2$।\n• अभिकेंद्रीय बल: $F_c = \\frac{mv^2}{r}$; एकसमान वृत्तीय गति सदैव त्वरित गति होती है।\n• प्रकाशिकी:\n- दर्पण सूत्र: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$; लेंस सूत्र: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$।\n- समतल दर्पण: प्रतिबिम्ब आभासी, सीधा, पार्श्व परिवर्तित तथा वस्तु के बराबर आकार का ($m = +1$)।\n- पूर्ण आंतरिक परावर्तन (TIR): सघन से विरल माध्यम में, आपतन कोण > क्रांतिक कोण ($i > i_c$)। अनुप्रयोग: ऑप्टिकल फाइबर, मरीचिका, हीरे की चमक।\n- फ्यूज तार: उच्च प्रतिरोधकता तथा निम्न गलनांक। अपचायी ट्रांसफार्मर (Step-down) वोल्टेज को घटाता है।",
            mnemonic: "TIR condition: Denser -> Rarer medium AND $i > i_c$."
          },
          {
            headingEn: "2. Chemistry: Periodic Trends, Bonding & Common Alloys",
            headingHi: "2. रसायन विज्ञान: आवर्ती गुण, रासायनिक बंध एवं महत्वपूर्ण मिश्रधातुएं",
            contentEn: "• Periodic Trends (Left to Right in a period):\n- Atomic Radius DECREASES (due to increasing effective nuclear charge $Z_{eff}$).\n- Ionization Energy, Electron Affinity & Electronegativity INCREASE (Fluorine is the most electronegative element, EN = 4.0).\n• Chemical vs Physical Changes: Chemical change forms new substances (Rusting of iron, curdling of milk, digestion); Physical change is reversible phase change (Evaporation of water, melting of ice, dissolving sugar).\n• Colligative Properties: Adding non-volatile solute (salt) to water ELEVATES boiling point and DEPRESSES freezing point.\n• Common Alloys:\n- Brass (पीतल): Copper ($60-70\\%$) + Zinc ($30-40\\%$).\n- Bronze (कांसा): Copper ($88\\%$) + Tin ($12\\%$).\n- Solder (टांका): Lead ($50\\%$) + Tin ($50\\%$).\n- Stainless Steel: Iron + Chromium ($18\\%$) + Nickel ($8\\%$) + Carbon.",
            contentHi: "• आवर्त सारणी में बाएं से दाएं जाने पर:\n- परमाणु त्रिज्या घटती है (प्रभावी नाभिकीय आवेश बढ़ने के कारण)।\n- आयनन ऊर्जा, इलेक्ट्रॉन बंधुता एवं विद्युत ऋणात्मकता बढ़ती है (फ्लोरीन सर्वाधिक विद्युत ऋणात्मक तत्व है)।\n• भौतिक बनाम रासायनिक परिवर्तन: जल का वाष्पीकरण, बर्फ का पिघलना = भौतिक परिवर्तन; लोहे पर जंग लगना, दूध से दही बनना = रासायनिक परिवर्तन।\n• अणुसंख्य गुणधर्म: जल में नमक मिलाने पर क्वथनांक बढ़ता है तथा हिमांक घटता है।\n• प्रमुख मिश्रधातुएं:\n- पीतल (Brass) = तांबा (Cu) + जस्ता (Zn)।\n- कांसा (Bronze) = तांबा (Cu) + टिन (Sn)।\n- सोल्डर = सीसा (Pb) + टिन (Sn)।",
            mnemonic: "Brass = Cu + Zn (जस्ता); Bronze = Cu + Sn (टिन)."
          }
        ],
        summaryCheatSheetEn: [
          "Uniform circular motion = constant speed but continuously accelerated due to direction change.",
          "Optical fibers work on Total Internal Reflection (TIR).",
          "Fuse wire = High resistance + Low melting point.",
          "Brass = Copper + Zinc; Bronze = Copper + Tin.",
          "Adding salt to water increases boiling point and decreases freezing point."
        ],
        summaryCheatSheetHi: [
          "एकसमान वृत्तीय गति = त्वरित गति (दिशा निरंतर बदलने के कारण)।",
          "ऑप्टिकल फाइबर पूर्ण आंतरिक परावर्तन (TIR) पर कार्य करता है।",
          "फ्यूज तार = उच्च प्रतिरोध + निम्न गलनांक।",
          "पीतल = तांबा + जस्ता; कांसा = तांबा + टिन।",
          "जल में नमक मिलाने पर क्वथनांक बढ़ता है और हिमांक घटता है।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "What are the essential compositional metals present in Brass and Bronze respectively?",
            questionHi: "पीतल (Brass) और कांसा (Bronze) में तांबे के अतिरिक्त क्रमशः कौन सी धातुएं उपस्थित होती हैं?",
            options: [
              { id: "A", textEn: "Zinc in brass and Tin in bronze", textHi: "पीतल में जस्ता (Zinc) तथा कांस्य में टिन (Tin)" },
              { id: "B", textEn: "Tin in brass and Zinc in bronze", textHi: "पीतल में टिन तथा कांस्य में जस्ता" },
              { id: "C", textEn: "Nickel in brass and Lead in bronze", textHi: "पीतल में निकेल तथा कांस्य में लेड" },
              { id: "D", textEn: "Chromium in brass and Iron in bronze", textHi: "पीतल में क्रोमियम तथा कांस्य में लोहा" }
            ],
            correctAnswer: "A",
            explanationEn: "Brass is an alloy of Copper and Zinc (Cu + Zn), whereas Bronze is an alloy of Copper and Tin (Cu + Sn).",
            explanationHi: "पीतल तांबे व जस्ते (Cu+Zn) की तथा कांसा तांबे व टिन (Cu+Sn) की मिश्रधातु है।"
          }
        ]
      },
      {
        id: "biology-maths-core",
        title: "Biology & Mathematics High-Yield Concepts",
        titleHindi: "जीव विज्ञान एवं गणित के महत्वपूर्ण सिद्धांत एवं सूत्र",
        estimatedMinutes: 30,
        highYieldWeightage: "Core Subject",
        overviewEn: "Cell organelles, Plant & Human Physiology, Ecology, Blood groups, Geometry, Number Theory and Mensuration formulas.",
        overviewHi: "कोशिकांग, पादप व मानव शरीर क्रिया विज्ञान, पारिस्थितिकी, रक्त समूह, ज्यामिति, संख्या पद्धति एवं क्षेत्रमिति सूत्र।",
        keyPoints: [
          {
            headingEn: "1. Core Biology & Ecology Insights",
            headingHi: "1. जीव विज्ञान एवं पारिस्थितिकी के महत्वपूर्ण बिंदु",
            contentEn: "• Cell Biology: Mitochondria = 'Powerhouse of cell' (ATP synthesis); Ribosomes = Protein factory; Chloroplast = Photosynthesis (contains central Magnesium $Mg^{2+}$ ion in chlorophyll).\n• Human Physiology:\n- ABO Blood Groups: Blood Group 'O' = Universal Donor (No antigens on RBCs); Blood Group 'AB' = Universal Recipient (No antibodies in plasma).\n- Minerals: Potassium ($K^+$) controls heart rhythm; Iron ($Fe^{2+}$) in hemoglobin; Calcium & Phosphorus in bones.\n- Vitamins: Vitamin C (Ascorbic acid) is heat-sensitive and water-soluble (most lost during cooking).\n• Botany & Agronomy:\n- Stem Spices: Ginger & Turmeric (modified underground rhizome stems); Clove is dried flower bud.\n- Kharif Crops (Monsoon): Rice, Maize, Jowar, Bajra, Soybean, Cotton, Mung, Urad, Pigeon pea (Arhar).\n- Rabi Crops (Winter): Wheat, Barley, Gram, Mustard, Pea, Linseed.\n• Ecology: 10% Energy Law (Raymond Lindeman 1942 - only 10% energy transfers to next trophic level); Oceans are largest ecosystem.",
            contentHi: "• कोशिका विज्ञान: माइटोकॉन्ड्रिया = 'कोशिका का पावरहाउस' (ATP निर्माण); राइबोसोम = प्रोटीन संश्लेषण; क्लोरोफिल के केंद्र में मैग्नीशियम ($Mg^{2+}$) धातु होती है।\n• मानव शरीर क्रिया:\n- रक्त समूह: रक्त समूह 'O' = सर्वदाता (कोई एंटीजन नहीं); रक्त समूह 'AB' = सर्वग्राही (प्लाज्मा में कोई एंटीबॉडी नहीं)।\n- खनिज: पोटैशियम ($K^+$) हृदय की धड़कन नियंत्रित करता है; हीमोग्लोबिन में आयरन ($Fe^{2+}$)।\n- विटामिन-सी ऊष्मा संवेदी व जल में घुलनशील है जो पकाने पर सर्वाधिक नष्ट होता है।\n• वनस्पति एवं कृषि:\n- तने से प्राप्त मसाले: अदरक एवं हल्दी (प्रकंद / Rhizome); लौंग = शुष्क पुष्प कलिका।\n- खरीफ फसलें (मानसून): धान, मक्का, ज्वार, बाजरा, मूंग, उड़द, अरहर, कपास।\n- रबी फसलें (शीतकाल): गेहूं, जौ, चना, सरसों, मटर, आलू।\n• 10% ऊर्जा नियम: रेमंड लिंडमैन (1942) - एक पोषण स्तर से अगले में केवल 10% ऊर्जा स्थानांतरित होती है।",
            mnemonic: "Stem Spices: Ginger & Turmeric (Rhizomes); Clove = Flower bud."
          },
          {
            headingEn: "2. Key Mathematics Formulas & Geometry Rules",
            headingHi: "2. गणित के आवश्यक सूत्र एवं ज्यामितीय नियम",
            contentEn: "• Number Theory:\n- Sum of first $n$ natural numbers $= \\frac{n(n+1)}{2}$.\n- Sum of cubes of first $n$ numbers $= \\left[\\frac{n(n+1)}{2}\\right]^2$.\n- $\\text{HCF} \\times \\text{LCM} = \\text{First Number} \\times \\text{Second Number}$.\n- Co-Prime Numbers: Two integers with $\\text{HCF} = 1$.\n- Twin Primes: Prime pair differing by 2 (e.g. 3-5, 5-7, 11-13, 17-19, 41-43, 71-73).\n• Geometry & Mensuration:\n- Polygon Diagonals $= \\frac{n(n-3)}{2}$ (Pentagon has $\\frac{5(2)}{2} = 5$ diagonals).\n- Sum of interior angles of $n$-sided polygon $= (n-2) \\times 180^\\circ$.\n- Cube of side $a$: Volume $= a^3$, Total Surface Area $= 6a^2$, Diagonal $= a\\sqrt{3}$.\n- Cone: Volume $= \\frac{1}{3}\\pi r^2 h$, Slant height $l = \\sqrt{r^2 + h^2}$, Curved Area $= \\pi r l$.\n- Sphere: Volume $= \\frac{4}{3}\\pi r^3$, Surface Area $= 4\\pi r^2$.",
            contentHi: "• संख्या पद्धति:\n- प्रथम $n$ प्राकृतिक संख्याओं का योग $= \\frac{n(n+1)}{2}$।\n- प्रथम $n$ संख्याओं के घनों का योग $= \\left[\\frac{n(n+1)}{2}\\right]^2$।\n- म.स. $\\times$ ल.स. $=$ पहली संख्या $\\times$ दूसरी संख्या।\n- सह-अभाज्य संख्याएँ: जिनका म.स. $= 1$ हो।\n- जुड़वां अभाज्य (Twin Primes): 2 के अंतर वाली अभाज्य संख्याएँ (उदा. 41, 43)।\n• ज्यामिति एवं क्षेत्रमिति:\n- $n$-भुजाओं वाले बहुभुज के विकर्ण $= \\frac{n(n-3)}{2}$ (पंचभुज के 5 विकर्ण)।\n- बहुभुज के अंतःकोणों का योग $= (n-2) \\times 180^\\circ$।\n- घन: आयतन $= a^3$, कुल पृष्ठीय क्षेत्रफल $= 6a^2$।\n- शंकु: आयतन $= \\frac{1}{3}\\pi r^2 h$, वक्र पृष्ठ $= \\pi r l$।\n- गोला: आयतन $= \\frac{4}{3}\\pi r^3$, पृष्ठीय क्षेत्रफल $= 4\\pi r^2$।",
            mnemonic: "Diagonals of $n$-gon: $\\frac{n(n-3)}{2}$."
          }
        ],
        summaryCheatSheetEn: [
          "Chlorophyll has central Magnesium (Mg²⁺) ion.",
          "Blood Group AB = Universal Recipient (No antibodies in plasma); O = Universal Donor (No antigens).",
          "Ginger & Turmeric are stems (Rhizomes); Clove is a flower bud.",
          "Sum of cubes = [n(n+1)/2]².",
          "Polygon diagonals = n(n-3)/2."
        ],
        summaryCheatSheetHi: [
          "क्लोरोफिल के केंद्र में मैग्नीशियम ($Mg^{2+}$) उपस्थित होता है।",
          "रक्त समूह AB = सर्वग्राही (एंटीबॉडी अनुपस्थित); O = सर्वदाता (एंटीजन अनुपस्थित)।",
          "अदरक व हल्दी तने (प्रकंद) हैं; लौंग पुष्प कलिका है।",
          "घनों का योग $= [n(n+1)/2]^2$।",
          "बहुभुज के विकर्ण $= n(n-3)/2$।"
        ],
        practiceCheckpoints: [
          {
            questionEn: "What is the total number of diagonals in a regular polygon having 8 sides (Octagon)?",
            questionHi: "8 भुजाओं वाले एक अष्टभुज (Octagon) में कुल विकर्णों की संख्या कितनी होगी?",
            options: [
              { id: "A", textEn: "16", textHi: "16" },
              { id: "B", textEn: "20", textHi: "20" },
              { id: "C", textEn: "24", textHi: "24" },
              { id: "D", textEn: "28", textHi: "28" }
            ],
            correctAnswer: "B",
            explanationEn: "Number of diagonals = n(n-3)/2 = 8(8-3)/2 = 8(5)/2 = 20 diagonals.",
            explanationHi: "विकर्णों की संख्या $= \\frac{n(n-3)}{2} = \\frac{8(5)}{2} = 20$ विकर्ण।"
          }
        ]
      }
    ]
  }
];
