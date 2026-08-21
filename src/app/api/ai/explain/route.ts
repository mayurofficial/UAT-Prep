import { NextRequest, NextResponse } from 'next/server';

interface OptionItem {
  id?: string;
  key?: string;
  hindi?: string;
  english?: string;
  text?: string;
}

interface NormalizedOptions {
  [key: string]: {
    hindi: string;
    english: string;
    display: string;
  };
}

function normalizeOptions(options: unknown): { map: NormalizedOptions; formatted: Record<string, string> } {
  const map: NormalizedOptions = {};
  const formatted: Record<string, string> = {};

  if (!options) return { map, formatted };

  if (Array.isArray(options)) {
    options.forEach((opt: OptionItem | string, index: number) => {
      const defaultKey = ['A', 'B', 'C', 'D'][index] || String(index + 1);
      if (typeof opt === 'object' && opt !== null) {
        const id = (opt.id || opt.key || defaultKey).toUpperCase();
        const hindi = opt.hindi || '';
        const english = opt.english || opt.text || '';
        const display = hindi && english ? `${hindi} / ${english}` : (hindi || english || '');
        map[id] = { hindi, english, display };
        formatted[id] = display;
      } else if (typeof opt === 'string') {
        map[defaultKey] = { hindi: opt, english: opt, display: opt };
        formatted[defaultKey] = opt;
      }
    });
  } else if (typeof options === 'object' && options !== null) {
    Object.entries(options as Record<string, unknown>).forEach(([key, val]) => {
      const id = key.toUpperCase();
      if (typeof val === 'object' && val !== null) {
        const item = val as OptionItem;
        const hindi = item.hindi || '';
        const english = item.english || item.text || '';
        const display = hindi && english ? `${hindi} / ${english}` : (hindi || english || '');
        map[id] = { hindi, english, display };
        formatted[id] = display;
      } else if (typeof val === 'string') {
        map[id] = { hindi: val, english: val, display: val };
        formatted[id] = val;
      }
    });
  }

  return { map, formatted };
}

function normalizeText(text: unknown): { hindi: string; english: string; combined: string } {
  if (!text) return { hindi: '', english: '', combined: '' };
  if (typeof text === 'string') return { hindi: text, english: text, combined: text };
  if (typeof text === 'object' && text !== null) {
    const obj = text as { hindi?: string; english?: string; text?: string };
    const hindi = obj.hindi || '';
    const english = obj.english || obj.text || '';
    const combined = hindi && english ? `${hindi}\n(${english})` : (hindi || english || '');
    return { hindi, english, combined };
  }
  return { hindi: '', english: '', combined: '' };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      questionNumber,
      questionText,
      options,
      correctAnswer,
      userSelected,
      section,
      conceptCard,
      explanation: prebuiltExplanation,
      followUpQuery,
      chatHistory,
    } = body;

    const { formatted: formattedOptions } = normalizeOptions(options);
    const qText = normalizeText(questionText);
    const preExplanation = normalizeText(prebuiltExplanation);
    const correctLetter = (correctAnswer || '').toString().trim().toUpperCase();
    const selectedLetter = userSelected ? userSelected.toString().trim().toUpperCase() : null;

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. If Gemini API Key is provided, call Gemini 2.0 Flash
    if (apiKey && apiKey.trim().length > 10 && apiKey !== 'your_gemini_api_key_here') {
      try {
        const systemInstruction = `You are "AI Guruji" (एआई गुरुजी), a master educator and mentor for Uttarakhand UTET-II (Maths & Science) and UKSSSC LT Assistant Teacher examinations.
Your goal is to guide teachers with direct, clear, engaging conceptual insights in bilingual (Hindi + English).
Rules:
- DO NOT use repetitive boilerplate, hollow filler phrases, or empty brackets.
- Provide real, actionable scientific / mathematical reasoning or pedagogical clarity.
- Write in a warm, motivating, teacher-mentor tone with clean Markdown.`;

        let userPrompt = '';

        const optStr = ['A', 'B', 'C', 'D']
          .filter(k => formattedOptions[k])
          .map(k => `(${k}) ${formattedOptions[k]}`)
          .join('\n');

        if (followUpQuery) {
          userPrompt = `Context: Question #${questionNumber} [${section || 'General'}]
Question: ${qText.combined}
Options:
${optStr}
Correct Answer: Option (${correctLetter})

Candidate Doubt / Question: "${followUpQuery}"

Please resolve this doubt clearly in simple bilingual Hindi-English with a real-life teaching example or step-by-step logic.`;
        } else {
          const coreConceptHint =
            conceptCard?.keyConceptHindi ||
            conceptCard?.keyConceptEnglish ||
            conceptCard?.corePrinciple ||
            '';
          const trapHint = conceptCard?.trapAlert || '';
          const trickHint = conceptCard?.mnemonicOrTrick || conceptCard?.memoryHook || '';

          userPrompt = `Please explain Question #${questionNumber} (${section || 'Subject Concept'}):

Question (Hindi): ${qText.hindi}
Question (English): ${qText.english}

Options:
${optStr}

Correct Answer: Option (${correctLetter}) ${formattedOptions[correctLetter] ? `[${formattedOptions[correctLetter]}]` : ''}
${selectedLetter ? `Candidate Selected: Option (${selectedLetter})` : 'Candidate has not attempted yet'}
${preExplanation.combined ? `Official Explanation Reference: ${preExplanation.combined}` : ''}
${coreConceptHint ? `Core Concept: ${coreConceptHint}` : ''}
${trapHint ? `Common Exam Trap: ${trapHint}` : ''}
${trickHint ? `Mnemonic / Rule: ${trickHint}` : ''}

Structure your explanation clearly with these 3 crisp sections:
### 🎯 1. सही उत्तर और मुख्य संकल्पना (Direct Logic & Solution)
Explain step-by-step why Option (${correctLetter}) is correct with the exact rule, formula, or concept.

### 🔍 2. अन्य विकल्प क्यों सही नहीं हैं (Why Other Options are Incorrect)
Briefly point out the specific mistake in the other options without generic filler.

### 💡 3. परीक्षा टिप और मेमोरी हुक (Exam Trick / Key Takeaway)
A memorable 1-line rule or shortcut to easily remember this in the exam.`;
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const payload = {
          contents: [
            ...(chatHistory || []).map((msg: { role: string; content: string }) => ({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: [{ text: msg.content }],
            })),
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          const generatedText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

          if (generatedText) {
            return NextResponse.json({
              success: true,
              source: 'gemini-2.0-flash',
              explanation: generatedText,
            });
          }
        }
      } catch {
        // Fall back to built-in pedagogical generator
      }
    }

    // 2. High-Quality Built-In Pedagogical Engine Fallback (when API key is unset or offline)
    const fallbackText = generateBuiltInExplanation({
      qNum: questionNumber,
      qText,
      formattedOptions,
      correctLetter,
      selectedLetter,
      section,
      conceptCard,
      prebuiltExplanation: preExplanation,
    });

    return NextResponse.json({
      success: true,
      source: 'built-in-pedagogy-engine',
      isKeyConfigured: Boolean(apiKey && apiKey.length > 10),
      explanation: fallbackText,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate AI explanation.' },
      { status: 500 }
    );
  }
}

interface FallbackParams {
  qNum: number;
  qText: { hindi: string; english: string; combined: string };
  formattedOptions: Record<string, string>;
  correctLetter: string;
  selectedLetter: string | null;
  section?: string;
  conceptCard?: {
    topic?: string;
    keyConceptEnglish?: string;
    keyConceptHindi?: string;
    mnemonicOrTrick?: string;
    trapAlert?: string;
    corePrinciple?: string;
    memoryHook?: string;
  };
  prebuiltExplanation?: { hindi: string; english: string; combined: string };
}

function generateBuiltInExplanation(params: FallbackParams): string {
  const {
    formattedOptions,
    correctLetter,
    selectedLetter,
    section,
    conceptCard,
    prebuiltExplanation,
  } = params;

  const correctText = formattedOptions[correctLetter] || '';
  const wrongLetters = ['A', 'B', 'C', 'D'].filter(
    l => l !== correctLetter && formattedOptions[l]
  );

  const conceptTitle =
    conceptCard?.topic ||
    section ||
    'आधारभूत संकल्पना (Core Concept)';

  const coreConcept =
    conceptCard?.keyConceptHindi ||
    conceptCard?.keyConceptEnglish ||
    conceptCard?.corePrinciple ||
    '';

  const trap = conceptCard?.trapAlert || '';
  const trick = conceptCard?.mnemonicOrTrick || conceptCard?.memoryHook || '';
  const officialExpl = prebuiltExplanation?.hindi || prebuiltExplanation?.english || '';

  const sections: string[] = [];

  // Section 1: Core Analysis
  let section1 = `### 🎯 1. सही उत्तर का विश्लेषण (Why Option ${correctLetter} is Correct)\n`;
  section1 += `**सही विकल्प (${correctLetter})**: ${correctText ? `**${correctText}**` : ''}\n\n`;

  if (officialExpl) {
    section1 += `${officialExpl}\n\n`;
  }

  if (coreConcept) {
    section1 += `> 📘 **मुख्य सिद्धांत (${conceptTitle})**: ${coreConcept}\n`;
  } else if (!officialExpl) {
    section1 += `यह प्रश्न **${section || 'संबंधित विषय'}** के आधारभूत सिद्धांतों पर आधारित है और विकल्प (${correctLetter}) तार्किक रूप से पूर्णतः सही है।\n`;
  }

  sections.push(section1.trim());

  // Section 2: Distractor Analysis (Only if options exist)
  if (wrongLetters.length > 0 || trap) {
    let section2 = `### 🔍 2. विकल्पों का विश्लेषण और परीक्षा जाल (Analysis & Trap Alert)\n`;
    if (selectedLetter && selectedLetter !== correctLetter && formattedOptions[selectedLetter]) {
      section2 += `⚠️ **आपने चुना था (${selectedLetter}) [${formattedOptions[selectedLetter]}]**: यह विकल्प इस संदर्भ में सटीक नहीं है क्योंकि यह मुख्य अवधारणा की प्राथमिक शर्त को पूरा नहीं करता।\n\n`;
    }

    if (trap) {
      section2 += `> ⚠️ **सामान्य परीक्षा भ्रम (Common Exam Trap)**: ${trap}\n\n`;
    }

    const wrongList = wrongLetters
      .map(l => `- **विकल्प (${l})**: *${formattedOptions[l]}* — यह विकल्प इस प्रश्न के संदर्भ में असत्य/अपूर्ण है।`)
      .join('\n');

    section2 += wrongList;
    sections.push(section2.trim());
  }

  // Section 3: Mnemonic / Tip
  let section3 = `### 💡 3. शिक्षक मेमोरी ट्रिक (Teacher Hook)\n`;
  if (trick) {
    section3 += `- 🌟 **स्मार्ट नियम**: ${trick}\n`;
  } else {
    section3 += `- 🌟 **गोल्डन नियम**: प्रश्न की मुख्य शर्त (NOT / EXCEPT / मुख्य उद्देश्य) को ध्यान से पढ़कर सीधे मूल सिद्धांत से जोड़ें।\n`;
  }
  sections.push(section3.trim());

  return sections.join('\n\n---\n\n');
}
