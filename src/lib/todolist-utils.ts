export function extractTimeFromString(input: string): string | null {
  const timeRegex = /\b\d{1,2}:\d{2}\b/; // Matches a pattern like "10:30" in the input string

  const matches = input.match(timeRegex);
  if (matches && matches.length > 0) {
    return matches[0];
  }

  return null; // If no time is found in the input string
}

export const priorityLevel = {
  3: {
    color: "red",
    text: "🌋 high",
  },
  2: {
    color: "yellow",
    text: "🐂 medium",
  },
  1: {
    color: "green",
    text: "🐇 low",
  },
  0: {
    color: "grey",
    text: "🐌 none",
  },
};
