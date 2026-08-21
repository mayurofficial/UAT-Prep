import { NextRequest, NextResponse } from 'next/server';

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
      followUpQuery,
      chatHistory,
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    // 1. If Gemini API Key is provided, call Gemini 2.0 Flash
    if (apiKey && apiKey.trim().length > 10 && apiKey !== 'your_gemini_api_key_here') {
      try {
        const systemInstruction = `You are "AI Guruji" (एआई गुरुजी), a master pedagogue and expert educator for Uttarakhand UTET-II (Maths & Science) and UKSSSC LT Grade Assistant Teacher examinations.
Your role is to guide Anjali Teacher with crystal-clear, encouraging, bilingual (Hindi + English) conceptual insights.
Maintain a warm, professional, encouraging teacher-mentor tone.
Use clean markdown with bullet points and bold highlights. Avoid robotic jargon.`;

        let userPrompt = '';

        if (followUpQuery) {
          userPrompt = `Context Question #${questionNumber} (${section || 'General'}):
Question: ${questionText?.hindi || questionText?.english}
Options:
A) ${options?.A}
B) ${options?.B}
C) ${options?.C}
D) ${options?.D}
Correct Answer: Option ${correctAnswer}

Candidate's Follow-up Question: "${followUpQuery}"

Please answer the candidate's doubt clearly in bilingual Hindi-English with practical teaching examples.`;
        } else {
          userPrompt = `Please provide a masterclass pedagogical explanation for Question #${questionNumber} (${section || 'Pedagogy / Science / Maths'}):

Question (Hindi): ${questionText?.hindi}
Question (English): ${questionText?.english}

Options:
(A) ${options?.A}
(B) ${options?.B}
(C) ${options?.C}
(D) ${options?.D}

Correct Answer: Option (${correctAnswer})
Candidate Selected: ${userSelected ? `Option (${userSelected})` : 'Not attempted yet'}
${conceptCard ? `Theory / Trap Note: ${conceptCard.corePrinciple || conceptCard.trapAlert || ''}` : ''}

Please format your response into these 4 clear sections:
### 🎯 1. सही उत्तर का गहन विश्लेषण (Why Option ${correctAnswer} is Correct)
Explain the core logic clearly in simple bilingual Hindi-English.

### ⚠️ 2. विकल्पों का विश्लेषण और परीक्षा जाल (Distractor & Trap Analysis)
Explain why options ${['A', 'B', 'C', 'D'].filter(o => o !== correctAnswer).join(', ')} are incorrect and what common misconceptions lead candidates to pick them.

### 💡 3. शिक्षक मेमोरी ट्रिक और नियम (Teacher Mnemonic Hook)
Give a memorable 1-line rule or mnemonic to never forget this concept in the exam.

### 🏫 4. व्यावहारिक कक्षा शिक्षण उदाहरण (Real Classroom Example)
How a teacher applies this pedagogical principle or mathematical/scientific concept in an actual school classroom.`;
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
            temperature: 0.6,
            topP: 0.95,
            maxOutputTokens: 1200,
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
    const fallbackText = generateBuiltInExplanation(
      questionNumber,
      questionText,
      options,
      correctAnswer,
      userSelected,
      section,
      conceptCard
    );

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

function generateBuiltInExplanation(
  qNum: number,
  qText: { hindi?: string; english?: string },
  opts: Record<string, string>,
  correct: string,
  selected: string | null,
  section?: string,
  concept?: { corePrinciple?: string; trapAlert?: string; memoryHook?: string; ncertReference?: string }
): string {
  const correctOptText = opts?.[correct] || '';
  const wrongOpts = ['A', 'B', 'C', 'D'].filter(o => o !== correct);

  return `### 🎯 1. सही उत्तर का गहन विश्लेषण (Why Option ${correct} is Correct)
**विकल्प (${correct}): ${correctOptText}** ही इस प्रश्न का प्रमाणिक और सटीक उत्तर है।
${concept?.corePrinciple ? `\n> 📘 **मुख्य सिद्धांत**: ${concept.corePrinciple}\n` : ''}
यह प्रश्न **${section || 'पाठ्यक्रम विषय'}** के आधारभूत सिद्धांतों पर आधारित है। प्रश्न की मांग के अनुसार, यह विकल्प अवधारणात्मक रूप से पूर्णतः सुसंगत है।

---

### ⚠️ 2. विकल्पों का विश्लेषण और परीक्षा जाल (Distractor & Trap Analysis)
${wrongOpts.map(o => `- **विकल्प (${o}) [${opts?.[o] || ''}]**: यह विकल्प आंशिक रूप से सही लग सकता है, परन्तु मुख्य अवधारणा के संदर्भ में भ्रामक (Distractor) है।`).join('\n')}
${concept?.trapAlert ? `\n> ⚠️ **सामान्य परीक्षा भ्रम (Common Trap)**: ${concept.trapAlert}` : ''}

---

### 💡 3. शिक्षक मेमोरी ट्रिक और नियम (Teacher Mnemonic Hook)
- **गोल्डन नियम**: ${concept?.memoryHook || `हमेशा बाल-केंद्रित शिक्षाशास्त्र (Child-Centered Pedagogy) और प्रत्यक्ष वैज्ञानिक प्रमाणों को प्राथमिकता दें।`}
${concept?.ncertReference ? `- **NCERT / SCERT संदर्भ**: ${concept.ncertReference}` : ''}

---

### 🏫 4. व्यावहारिक कक्षा शिक्षण उदाहरण (Real Classroom Example)
कक्षा में विद्यार्थियों को यह अवधारणा समझाते समय शिक्षक को प्रत्यक्ष प्रयोग, उदाहरणों तथा बालकों के पूर्व-ज्ञान (Prior Knowledge) को जोड़ते हुए समझाना चाहिए जिससे स्थाई अधिगम (Permanent Learning) सुनिश्चित हो सके।

*(💡 सुझाव: लाइव Google Gemini 2.0 Realtime AI मॉडल एक्टिवेट करने के लिए अपनी \`GEMINI_API_KEY\` को \`.env.local\` या Netlify Dashboard में जोड़ें।)*`;
}
