import { NextRequest, NextResponse } from 'next/server';

function cleanTextForSpeech(text: string): string {
  return text
    // Remove markdown formatting, headers, links, and emojis
    .replace(/###/g, '')
    .replace(/##/g, '')
    .replace(/#/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/>/g, '')
    .replace(/[-–—_]/g, ' ')
    .replace(/🎯|⚠️|💡|🏫|📘|✨|🎉|💪|🏛️|⚡|🏆|🔍/g, '')
    .replace(/Option\s+([A-D])/gi, 'विकल्प $1')
    .replace(/\n+/g, '। ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Split into natural sentence segments (< 180 characters) for natural audio phrasing
function splitIntoChunks(text: string, maxLen = 170): string[] {
  const sentences = text.split(/([।!?\n.])/);
  const chunks: string[] = [];
  let current = '';

  for (let i = 0; i < sentences.length; i++) {
    const part = sentences[i];
    if ((current + part).length <= maxLen) {
      current += part;
    } else {
      if (current.trim()) chunks.push(current.trim());
      current = part;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  return chunks.filter(c => c.length > 1);
}

async function fetchAudioChunk(chunk: string, lang = 'hi'): Promise<Buffer | null> {
  try {
    const encoded = encodeURIComponent(chunk);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${lang}&client=tw-ob`;

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://translate.google.com/',
      },
    });

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }
  } catch {
    // Ignore chunk failure
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, lang = 'hi' } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text parameter is required.' }, { status: 400 });
    }

    const cleaned = cleanTextForSpeech(text);
    if (!cleaned) {
      return NextResponse.json({ error: 'Cleaned text is empty.' }, { status: 400 });
    }

    // Limit to reasonable audio explanation length (~700 chars max for fast response)
    const truncated = cleaned.slice(0, 900);
    const chunks = splitIntoChunks(truncated);

    if (chunks.length === 0) {
      return NextResponse.json({ error: 'No readable sentence chunks.' }, { status: 400 });
    }

    // Fetch all audio chunks in parallel
    const audioBuffers = await Promise.all(
      chunks.map(chunk => fetchAudioChunk(chunk, lang))
    );

    const validBuffers = audioBuffers.filter((b): b is Buffer => b !== null && b.length > 0);

    if (validBuffers.length === 0) {
      return NextResponse.json({ error: 'Failed to synthesize audio.' }, { status: 500 });
    }

    // Concatenate MP3 frames into single continuous audio stream
    const combinedBuffer = Buffer.concat(validBuffers);

    return new Response(combinedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(combinedBuffer.length),
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error in voice synthesis.' },
      { status: 500 }
    );
  }
}
