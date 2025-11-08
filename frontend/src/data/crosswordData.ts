/**
 * Crossword game data for Constitution Crossword Challenge
 * Proper crossword layout with intersections
 */

export interface CrosswordWord {
  id: string;
  answer: string;
  clue: string;
  fact: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
  number: number; // Clue number
}

export interface CrosswordLevel {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  gridSize: number;
  words: CrosswordWord[];
  timeLimit?: number;
}

export const crosswordLevels: CrosswordLevel[] = [
  {
    id: 1,
    name: 'Fundamental Rights',
    difficulty: 'easy',
    gridSize: 10,
    words: [
      {
        id: 'w1',
        answer: 'ARTICLE14',
        clue: 'Article guaranteeing equality before law',
        fact: 'Article 14 ensures equality for all citizens regardless of caste, creed, or religion.',
        row: 0,
        col: 0,
        direction: 'across',
        number: 1,
      },
      {
        id: 'w2',
        answer: 'ARTICLE19',
        clue: 'Right to freedom of speech and expression',
        fact: 'Article 19(1)(a) guarantees freedom of speech and expression to all citizens.',
        row: 0,
        col: 0,
        direction: 'down',
        number: 2,
      },
      {
        id: 'w3',
        answer: 'ARTICLE21A',
        clue: 'Right to free and compulsory education',
        fact: 'Article 21A makes education a fundamental right for children aged 6-14 years.',
        row: 2,
        col: 0,
        direction: 'across',
        number: 3,
      },
      {
        id: 'w4',
        answer: 'EQUALITY',
        clue: 'Equality before law',
        fact: 'Article 14 guarantees equality before law and equal protection of laws.',
        row: 4,
        col: 0,
        direction: 'across',
        number: 4,
      },
    ],
    timeLimit: 300,
  },
  {
    id: 2,
    name: 'Fundamental Duties',
    difficulty: 'easy',
    gridSize: 10,
    words: [
      {
        id: 'w5',
        answer: 'RESPECT',
        clue: 'Duty to respect the Constitution and national symbols',
        fact: 'Article 51A(a) makes it a duty to respect the Constitution, the National Flag, and the National Anthem.',
        row: 1,
        col: 0,
        direction: 'across',
        number: 1,
      },
      {
        id: 'w6',
        answer: 'PATRIOTISM',
        clue: 'Duty to promote harmony and spirit of common brotherhood',
        fact: 'Article 51A(e) emphasizes promoting harmony and the spirit of common brotherhood.',
        row: 3,
        col: 0,
        direction: 'across',
        number: 2,
      },
      {
        id: 'w7',
        answer: 'ENVIRONMENT',
        clue: 'Duty to protect and improve the natural environment',
        fact: 'Article 51A(g) makes it a duty to protect and improve the natural environment.',
        row: 5,
        col: 0,
        direction: 'across',
        number: 3,
      },
      {
        id: 'w8',
        answer: 'ELEVEN',
        clue: 'Number of Fundamental Duties in the Constitution',
        fact: 'There are 11 Fundamental Duties listed in Article 51A of the Indian Constitution.',
        row: 0,
        col: 2,
        direction: 'down',
        number: 4,
      },
    ],
    timeLimit: 360,
  },
  {
    id: 3,
    name: 'Directive Principles',
    difficulty: 'medium',
    gridSize: 10,
    words: [
      {
        id: 'w9',
        answer: 'WELFARE',
        clue: 'State shall promote the welfare of the people',
        fact: 'Article 38 directs the state to promote the welfare of the people.',
        row: 0,
        col: 0,
        direction: 'across',
        number: 1,
      },
      {
        id: 'w10',
        answer: 'JUSTICE',
        clue: 'Social, economic, and political justice',
        fact: 'Article 38 aims to secure social, economic, and political justice for all citizens.',
        row: 2,
        col: 0,
        direction: 'across',
        number: 2,
      },
      {
        id: 'w11',
        answer: 'SECULAR',
        clue: 'India is a secular state',
        fact: 'The Preamble declares India as a secular republic, ensuring equal treatment of all religions.',
        row: 4,
        col: 0,
        direction: 'across',
        number: 3,
      },
      {
        id: 'w12',
        answer: 'DEMOCRATIC',
        clue: 'India is a democratic republic',
        fact: 'The Preamble declares India as a sovereign, socialist, secular, democratic republic.',
        row: 6,
        col: 0,
        direction: 'across',
        number: 4,
      },
      {
        id: 'w13',
        answer: 'PREAMBLE',
        clue: 'Document that begins with "We, the People of India"',
        fact: 'The Preamble of the Indian Constitution begins with "We, the People of India" and outlines the basic philosophy of the Constitution.',
        row: 0,
        col: 1,
        direction: 'down',
        number: 5,
      },
    ],
    timeLimit: 420,
  },
  {
    id: 4,
    name: 'Important Articles',
    difficulty: 'medium',
    gridSize: 12,
    words: [
      {
        id: 'w14',
        answer: 'ARTICLE14',
        clue: 'Equality before law',
        fact: 'Article 14 guarantees equality before law and equal protection of laws.',
        row: 0,
        col: 0,
        direction: 'across',
        number: 1,
      },
      {
        id: 'w15',
        answer: 'ARTICLE19',
        clue: 'Six freedoms of citizens',
        fact: 'Article 19 guarantees six fundamental freedoms including speech, assembly, and movement.',
        row: 2,
        col: 0,
        direction: 'across',
        number: 2,
      },
      {
        id: 'w16',
        answer: 'ARTICLE21',
        clue: 'Right to life and personal liberty',
        fact: 'Article 21 protects the right to life and personal liberty, the most fundamental right.',
        row: 4,
        col: 0,
        direction: 'across',
        number: 3,
      },
      {
        id: 'w17',
        answer: 'ARTICLE32',
        clue: 'Right to constitutional remedies',
        fact: 'Article 32 is called the "heart and soul" of the Constitution, providing remedies for rights violations.',
        row: 6,
        col: 0,
        direction: 'across',
        number: 4,
      },
      {
        id: 'w18',
        answer: 'ARTICLE39',
        clue: 'Directive Principle promoting equal justice',
        fact: 'Article 39(b) and (c) direct the state to ensure that ownership and control of material resources are distributed to serve the common good.',
        row: 0,
        col: 2,
        direction: 'down',
        number: 5,
      },
    ],
    timeLimit: 480,
  },
  {
    id: 5,
    name: 'Constitutional Personalities',
    difficulty: 'hard',
    gridSize: 10,
    words: [
      {
        id: 'w19',
        answer: 'AMBEDKAR',
        clue: 'Father of the Indian Constitution',
        fact: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and is known as the Father of the Indian Constitution.',
        row: 1,
        col: 0,
        direction: 'across',
        number: 1,
      },
      {
        id: 'w20',
        answer: 'NEHRU',
        clue: 'First Prime Minister of India',
        fact: 'Jawaharlal Nehru was the first Prime Minister and a key figure in the Constituent Assembly.',
        row: 3,
        col: 0,
        direction: 'across',
        number: 2,
      },
      {
        id: 'w21',
        answer: 'PRASAD',
        clue: 'First President of India and President of Constituent Assembly',
        fact: 'Dr. Rajendra Prasad was the President of the Constituent Assembly and later became the first President of India.',
        row: 5,
        col: 0,
        direction: 'across',
        number: 3,
      },
      {
        id: 'w22',
        answer: 'PATEL',
        clue: 'Sardar Vallabhbhai Patel, Iron Man of India',
        fact: 'Sardar Patel was a key member of the Constituent Assembly and is known as the Iron Man of India.',
        row: 0,
        col: 2,
        direction: 'down',
        number: 4,
      },
    ],
    timeLimit: 600,
  },
  {
    id: 6,
    name: 'Landmark Amendments',
    difficulty: 'hard',
    gridSize: 12,
    words: [
      {
        id: 'w23',
        answer: 'AMENDMENT42',
        clue: 'The most controversial amendment',
        fact: 'The 42nd Amendment (1976) is often called the "Mini Constitution" as it made extensive changes.',
        row: 0,
        col: 0,
        direction: 'across',
        number: 1,
      },
      {
        id: 'w24',
        answer: 'AMENDMENT73',
        clue: 'Panchayati Raj Amendment',
        fact: 'The 73rd Amendment (1992) gave constitutional status to Panchayati Raj institutions.',
        row: 2,
        col: 0,
        direction: 'across',
        number: 2,
      },
      {
        id: 'w25',
        answer: 'AMENDMENT86',
        clue: 'Right to Education Amendment',
        fact: 'The 86th Amendment (2002) made education a fundamental right under Article 21A.',
        row: 4,
        col: 0,
        direction: 'across',
        number: 3,
      },
      {
        id: 'w26',
        answer: 'AMENDMENT101',
        clue: 'Goods and Services Tax Amendment',
        fact: 'The 101st Amendment (2016) introduced the Goods and Services Tax (GST) in India.',
        row: 6,
        col: 0,
        direction: 'across',
        number: 4,
      },
    ],
    timeLimit: 720,
  },
];

/**
 * Create an empty grid for the crossword
 */
export function createEmptyGrid(size: number): (string | null)[][] {
  return Array(size).fill(null).map(() => Array(size).fill(null));
}

/**
 * Check if a word can be placed at the given position
 */
function canPlaceWord(
  grid: (string | null)[][],
  word: CrosswordWord,
  gridSize: number
): boolean {
  const { answer, row, col, direction } = word;
  const letters = answer.split('');

  for (let i = 0; i < letters.length; i++) {
    const currentRow = direction === 'across' ? row : row + i;
    const currentCol = direction === 'across' ? col + i : col;

    // Check bounds
    if (currentRow < 0 || currentRow >= gridSize || currentCol < 0 || currentCol >= gridSize) {
      return false;
    }

    const cell = grid[currentRow][currentCol];
    // If cell is not empty and doesn't match the letter, can't place
    if (cell !== null && cell !== letters[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Place words on the grid with proper intersections
 * This ensures all words are placed and visible
 */
export function placeWordsOnGrid(level: CrosswordLevel): {
  grid: (string | null)[][];
  wordPositions: Map<string, { row: number; col: number; direction: string; answer: string; number: number }>;
  cellToWords: Map<string, string[]>; // Maps "row-col" to array of word IDs
  cellNumbers: Map<string, number>; // Maps "row-col" to clue number
} {
  const grid = createEmptyGrid(level.gridSize);
  const wordPositions = new Map();
  const cellToWords = new Map<string, string[]>();
  const cellNumbers = new Map<string, number>();

  // Place words in the order they're defined to ensure proper numbering
  level.words.forEach((word) => {
    const { answer, row, col, direction, number } = word;
    const letters = answer.split('');

    // Always place the word - the algorithm will handle intersections
    // Mark the starting cell with the clue number
    const startCellKey = `${row}-${col}`;
    // Set number for starting cell (may be overwritten if multiple words start here)
    if (!cellNumbers.has(startCellKey)) {
      cellNumbers.set(startCellKey, number);
    }

    // Place each letter
    letters.forEach((letter, index) => {
      const currentRow = direction === 'across' ? row : row + index;
      const currentCol = direction === 'across' ? col + index : col;

      if (currentRow >= 0 && currentRow < level.gridSize && currentCol >= 0 && currentCol < level.gridSize) {
        // If cell is empty or letter matches (intersection), place it
        if (grid[currentRow][currentCol] === null || grid[currentRow][currentCol] === letter) {
          grid[currentRow][currentCol] = letter;

          // Track which words use this cell
          const cellKey = `${currentRow}-${currentCol}`;
          if (!cellToWords.has(cellKey)) {
            cellToWords.set(cellKey, []);
          }
          if (!cellToWords.get(cellKey)!.includes(word.id)) {
            cellToWords.get(cellKey)!.push(word.id);
          }
        } else {
          // Conflict - log warning but continue
          console.warn(`Letter conflict at (${currentRow}, ${currentCol}): expected ${letter}, found ${grid[currentRow][currentCol]}`);
        }
      }
    });

    wordPositions.set(word.id, { row, col, direction, answer, number });
  });

  return { grid, wordPositions, cellToWords, cellNumbers };
}
