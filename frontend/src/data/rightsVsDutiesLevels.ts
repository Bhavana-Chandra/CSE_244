/**
 * Levels data for Rights vs. Duties Challenge
 * Copied from Expo project for web compatibility
 */

export interface Right {
  id: string;
  title: string;
  article?: string;
  icon?: string;
}

export interface Duty {
  id: string;
  title: string;
  icon?: string;
}

export interface Pair {
  right: Right;
  duty: Duty;
  explanation: string;
}

export interface Distractor {
  id: string;
  title: string;
  icon?: string;
}

export interface Level {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pairs: Pair[];
  distractors?: Distractor[];
  timeLimit: number | null;
  hints: number;
}

export interface LevelsData {
  levels: Level[];
}

const levels: Level[] = [
  {
    id: 1,
    name: 'Easy Level',
    difficulty: 'easy',
    pairs: [
      {
        right: {
          id: 'r1',
          title: 'Freedom of Speech',
          article: 'Article 19(1)(a)',
        },
        duty: {
          id: 'd1',
          title: 'Use words responsibly',
        },
        explanation: 'The right to freedom of speech comes with the duty to use words responsibly and not spread hate or violence.',
      },
      {
        right: {
          id: 'r2',
          title: 'Right to Vote',
          article: 'Article 326',
        },
        duty: {
          id: 'd2',
          title: 'Vote sincerely and avoid bribery',
        },
        explanation: 'Citizens have the right to vote, but they must exercise this right sincerely and resist any attempts at vote-buying or coercion.',
      },
      {
        right: {
          id: 'r3',
          title: 'Right to Education',
          article: 'Article 21A',
        },
        duty: {
          id: 'd3',
          title: 'Support school attendance',
        },
        explanation: 'While children have the right to free and compulsory education, parents and society have a duty to ensure children attend school regularly.',
      },
    ],
    distractors: [
      {
        id: 'd4',
        title: 'Pay taxes on time',
      },
    ],
    timeLimit: 180,
    hints: 2,
  },
  {
    id: 2,
    name: 'Medium Level',
    difficulty: 'medium',
    pairs: [
      {
        right: {
          id: 'r4',
          title: 'Right to Equality',
          article: 'Article 14',
        },
        duty: {
          id: 'd5',
          title: 'Treat all citizens with respect',
        },
        explanation: 'Equality before the law means we must treat all citizens with equal respect, regardless of their background.',
      },
      {
        right: {
          id: 'r5',
          title: 'Freedom of Religion',
          article: 'Article 25',
        },
        duty: {
          id: 'd6',
          title: 'Respect other religions',
        },
        explanation: 'The freedom to practice one\'s religion includes the duty to respect others\' religious beliefs and practices.',
      },
      {
        right: {
          id: 'r6',
          title: 'Right to Property',
          article: 'Article 300A',
        },
        duty: {
          id: 'd7',
          title: 'Respect others\' property',
        },
        explanation: 'The right to own property comes with the duty to respect others\' property rights and not engage in theft or damage.',
      },
      {
        right: {
          id: 'r7',
          title: 'Right to Assembly',
          article: 'Article 19(1)(b)',
        },
        duty: {
          id: 'd8',
          title: 'Assemble peacefully',
        },
        explanation: 'Citizens can assemble, but assemblies must be peaceful and not disturb public order.',
      },
      {
        right: {
          id: 'r8',
          title: 'Right to Information',
          article: 'RTI Act 2005',
        },
        duty: {
          id: 'd9',
          title: 'Use information responsibly',
        },
        explanation: 'The right to information must be exercised responsibly, without misusing it or causing harm to others.',
      },
    ],
    distractors: [
      {
        id: 'd10',
        title: 'Protect wildlife',
      },
      {
        id: 'd11',
        title: 'Preserve cultural heritage',
      },
    ],
    timeLimit: 90,
    hints: 2,
  },
  {
    id: 3,
    name: 'Hard Level',
    difficulty: 'hard',
    pairs: [
      {
        right: {
          id: 'r9',
          title: 'Right to Life and Liberty',
          article: 'Article 21',
        },
        duty: {
          id: 'd12',
          title: 'Respect others\' life and liberty',
        },
        explanation: 'The fundamental right to life and personal liberty requires us to respect the same rights of others.',
      },
      {
        right: {
          id: 'r10',
          title: 'Right to Constitutional Remedies',
          article: 'Article 32',
        },
        duty: {
          id: 'd13',
          title: 'Respect court orders',
        },
        explanation: 'While citizens can seek constitutional remedies, they must respect and follow court orders and judgments.',
      },
      {
        right: {
          id: 'r11',
          title: 'Right to Work',
          article: 'Article 41',
        },
        duty: {
          id: 'd14',
          title: 'Work with integrity',
        },
        explanation: 'The right to work comes with the duty to work with integrity and contribute to society.',
      },
      {
        right: {
          id: 'r12',
          title: 'Right to Clean Environment',
          article: 'Article 21',
        },
        duty: {
          id: 'd15',
          title: 'Protect the environment',
        },
        explanation: 'The right to a clean environment is linked to the fundamental duty to protect and improve the natural environment.',
      },
      {
        right: {
          id: 'r13',
          title: 'Right to Privacy',
          article: 'Article 21',
        },
        duty: {
          id: 'd16',
          title: 'Respect others\' privacy',
        },
        explanation: 'The right to privacy requires us to respect the privacy of others and not intrude into their personal lives.',
      },
      {
        right: {
          id: 'r14',
          title: 'Right to Health',
          article: 'Article 21',
        },
        duty: {
          id: 'd17',
          title: 'Maintain public health',
        },
        explanation: 'The right to health includes the duty to maintain public health and follow health guidelines.',
      },
    ],
    distractors: [
      {
        id: 'd18',
        title: 'Serve in the armed forces',
      },
      {
        id: 'd19',
        title: 'Participate in local governance',
      },
    ],
    timeLimit: 60,
    hints: 1,
  },
];

const levelsData: LevelsData = {
  levels: levels,
};

export default levelsData;

