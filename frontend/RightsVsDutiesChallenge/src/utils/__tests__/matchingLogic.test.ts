/**
 * Unit tests for matching logic
 * 
 * Tests the pure function that checks if a right matches a duty
 */

import { isCorrectMatch, getPairExplanation, areAllPairsMatched } from '../matchingLogic';
import { Pair } from '../matchingLogic';

describe('matchingLogic', () => {
  const mockPairs: Pair[] = [
    {
      right: { id: 'r1' },
      duty: { id: 'd1' },
    },
    {
      right: { id: 'r2' },
      duty: { id: 'd2' },
    },
    {
      right: { id: 'r3' },
      duty: { id: 'd3' },
    },
  ];

  describe('isCorrectMatch', () => {
    it('should return true for a correct match', () => {
      expect(isCorrectMatch('r1', 'd1', mockPairs)).toBe(true);
      expect(isCorrectMatch('r2', 'd2', mockPairs)).toBe(true);
      expect(isCorrectMatch('r3', 'd3', mockPairs)).toBe(true);
    });

    it('should return false for an incorrect match', () => {
      expect(isCorrectMatch('r1', 'd2', mockPairs)).toBe(false);
      expect(isCorrectMatch('r2', 'd1', mockPairs)).toBe(false);
      expect(isCorrectMatch('r1', 'd3', mockPairs)).toBe(false);
    });

    it('should return false for non-existent IDs', () => {
      expect(isCorrectMatch('r999', 'd1', mockPairs)).toBe(false);
      expect(isCorrectMatch('r1', 'd999', mockPairs)).toBe(false);
      expect(isCorrectMatch('r999', 'd999', mockPairs)).toBe(false);
    });

    it('should handle empty pairs array', () => {
      expect(isCorrectMatch('r1', 'd1', [])).toBe(false);
    });
  });

  describe('getPairExplanation', () => {
    const pairsWithExplanations = [
      {
        right: { id: 'r1' },
        duty: { id: 'd1' },
        explanation: 'This is the explanation for r1 and d1',
      },
      {
        right: { id: 'r2' },
        duty: { id: 'd2' },
        explanation: 'This is the explanation for r2 and d2',
      },
    ] as any[];

    it('should return explanation for a correct pair', () => {
      expect(getPairExplanation('r1', 'd1', pairsWithExplanations)).toBe(
        'This is the explanation for r1 and d1'
      );
      expect(getPairExplanation('r2', 'd2', pairsWithExplanations)).toBe(
        'This is the explanation for r2 and d2'
      );
    });

    it('should return null for an incorrect pair', () => {
      expect(getPairExplanation('r1', 'd2', pairsWithExplanations)).toBeNull();
      expect(getPairExplanation('r999', 'd1', pairsWithExplanations)).toBeNull();
    });

    it('should return null if explanation is missing', () => {
      const pairsWithoutExplanation = [
        {
          right: { id: 'r1' },
          duty: { id: 'd1' },
        },
      ];
      expect(getPairExplanation('r1', 'd1', pairsWithoutExplanation)).toBeNull();
    });
  });

  describe('areAllPairsMatched', () => {
    it('should return true when all pairs are matched', () => {
      const matches = [
        { rightId: 'r1', dutyId: 'd1' },
        { rightId: 'r2', dutyId: 'd2' },
        { rightId: 'r3', dutyId: 'd3' },
      ];
      expect(areAllPairsMatched(matches, 3)).toBe(true);
    });

    it('should return false when not all pairs are matched', () => {
      const matches = [
        { rightId: 'r1', dutyId: 'd1' },
        { rightId: 'r2', dutyId: 'd2' },
      ];
      expect(areAllPairsMatched(matches, 3)).toBe(false);
    });

    it('should return false when no pairs are matched', () => {
      expect(areAllPairsMatched([], 3)).toBe(false);
    });

    it('should return true when matches exceed total pairs (edge case)', () => {
      const matches = [
        { rightId: 'r1', dutyId: 'd1' },
        { rightId: 'r2', dutyId: 'd2' },
        { rightId: 'r3', dutyId: 'd3' },
        { rightId: 'r4', dutyId: 'd4' },
      ];
      // This is technically true but shouldn't happen in practice
      expect(areAllPairsMatched(matches, 3)).toBe(true);
    });
  });
});

