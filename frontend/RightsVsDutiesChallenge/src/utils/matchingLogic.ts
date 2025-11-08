/**
 * Pure function to check if a right matches a duty
 * 
 * This function is unit-testable and contains the core matching logic.
 * It checks if a right-duty pair is correct based on their IDs.
 * 
 * @param rightId - The ID of the right card
 * @param dutyId - The ID of the duty card
 * @param correctPairs - Array of correct right-duty pairs from level data
 * @returns true if the match is correct, false otherwise
 */
export interface Pair {
  right: { id: string };
  duty: { id: string };
}

export function isCorrectMatch(
  rightId: string,
  dutyId: string,
  correctPairs: Pair[]
): boolean {
  // Find if there's a pair where both right and duty IDs match
  return correctPairs.some(
    (pair) => pair.right.id === rightId && pair.duty.id === dutyId
  );
}

/**
 * Get the explanation for a matched pair
 * 
 * @param rightId - The ID of the right card
 * @param dutyId - The ID of the duty card
 * @param correctPairs - Array of correct pairs with explanations
 * @returns The explanation string, or null if pair not found
 */
export function getPairExplanation(
  rightId: string,
  dutyId: string,
  correctPairs: Pair[]
): string | null {
  const pair = correctPairs.find(
    (p) => p.right.id === rightId && p.duty.id === dutyId
  );
  return (pair as any)?.explanation || null;
}

/**
 * Check if all pairs in a level have been matched
 * 
 * @param matches - Array of current matches { rightId, dutyId }
 * @param totalPairs - Total number of pairs in the level
 * @returns true if all pairs are matched
 */
export function areAllPairsMatched(
  matches: Array<{ rightId: string; dutyId: string }>,
  totalPairs: number
): boolean {
  return matches.length === totalPairs;
}

