// Utility for calculating Flesch-Kincaid Readability Score

const countSyllables = (word) => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
};

export const fleschKincaid = (text) => {
  if (!text) return 0;
  
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  
  if (sentences.length === 0 || words.length === 0) return 0;

  const syllablesCount = words.reduce((acc, word) => acc + countSyllables(word), 0);

  const score = 206.835 - Math.min(100, 1.015 * (words.length / sentences.length)) - Math.min(100, 84.6 * (syllablesCount / words.length));
  
  return Math.max(0, Math.min(100, Math.round(score)));
};
