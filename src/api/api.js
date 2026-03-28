import { PROMPTS } from '../prompts';

const buildSystemPrompt = (disability, classLevel, age) => {
  const base = PROMPTS[disability];
  const grade = classLevel === 'UG' || classLevel === 'Skip'
    ? ''
    : ` Simplify for a ${age}-year-old student in Class ${classLevel}. Use vocabulary appropriate for this age group.`;
  return base + grade;
};

export const transformText = async (inputText, disability, classLevel, age, language) => {
  const apiKey = import.meta.env.VITE_GEMINI_KEY;

  if (!apiKey) {
    // Mock Transformation logic if no key is provided
    return new Promise((resolve) => setTimeout(() => {
      let result = `(Mock AI Output - No API Key Found)

Adapted for: ${disability.toUpperCase()} | Class: ${classLevel} | Age: ${age}
Language requested: ${language}

Here is the newly transformed text. It has been simplified, rewritten, and reformatted based on your specific cognitive and demographic requirements.

Key adjustments made:
- Sentences are shortened.
- Complex vocabulary like "utilize" replaced with "use".
- Spacing increased for readability.

Original summary: 
${inputText.substring(0, 50)}...
`;
      resolve({ originalText: inputText, transformedText: result });
    }, 1500));
  }

  // Real API Logic
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: buildSystemPrompt(disability, classLevel, age) }]
          },
          contents: [
            {
              parts: [{ text: `Output language: ${language}\n\nContent:\n${inputText}` }]
            }
          ]
        })
      }
    );

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error processing text.";
    return { originalText: inputText, transformedText: resultText };

  } catch (error) {
    console.error("API Error:", error);
    return { 
      originalText: inputText, 
      transformedText: `API Failed. Ensure your VITE_GEMINI_KEY is correct. Error: ${error.message}` 
    };
  }
};
