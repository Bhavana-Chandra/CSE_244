export interface MemoryCard {
  id: string;
  content: string;
  type: 'right' | 'duty' | 'directive' | 'example';
  pairId: string;
  icon: string;
  category: string;
}

export const memoryCards: MemoryCard[] = [
  // Pair 1: Right to Equality
  {
    id: 'right-equality',
    content: 'Right to Equality',
    type: 'right',
    pairId: 'pair-1',
    icon: '⚖️',
    category: 'Fundamental Rights'
  },
  {
    id: 'example-equality',
    content: 'Treat Everyone Fairly',
    type: 'example',
    pairId: 'pair-1',
    icon: '🤝',
    category: 'Real Life Example'
  },

  // Pair 2: Right to Education
  {
    id: 'right-education',
    content: 'Right to Education',
    type: 'right',
    pairId: 'pair-2',
    icon: '📚',
    category: 'Fundamental Rights'
  },
  {
    id: 'example-education',
    content: 'Free Primary Education',
    type: 'example',
    pairId: 'pair-2',
    icon: '🎓',
    category: 'Real Life Example'
  },

  // Pair 3: Duty to Protect Environment
  {
    id: 'duty-environment',
    content: 'Duty to Protect Environment',
    type: 'duty',
    pairId: 'pair-3',
    icon: '🌱',
    category: 'Fundamental Duties'
  },
  {
    id: 'example-environment',
    content: 'Plant Trees',
    type: 'example',
    pairId: 'pair-3',
    icon: '🌳',
    category: 'Real Life Example'
  },

  // Pair 4: Directive Principle - Equal Pay
  {
    id: 'directive-equal-pay',
    content: 'Equal Pay for Equal Work',
    type: 'directive',
    pairId: 'pair-4',
    icon: '💰',
    category: 'Directive Principles'
  },
  {
    id: 'example-equal-pay',
    content: 'Men & Women Getting Same Salary',
    type: 'example',
    pairId: 'pair-4',
    icon: '👥',
    category: 'Real Life Example'
  },

  // Pair 5: Right to Freedom of Speech
  {
    id: 'right-speech',
    content: 'Freedom of Speech',
    type: 'right',
    pairId: 'pair-5',
    icon: '🗣️',
    category: 'Fundamental Rights'
  },
  {
    id: 'example-speech',
    content: 'Express Opinions Freely',
    type: 'example',
    pairId: 'pair-5',
    icon: '📢',
    category: 'Real Life Example'
  },

  // Pair 6: Duty to Vote
  {
    id: 'duty-vote',
    content: 'Duty to Vote',
    type: 'duty',
    pairId: 'pair-6',
    icon: '🗳️',
    category: 'Fundamental Duties'
  },
  {
    id: 'example-vote',
    content: 'Participate in Elections',
    type: 'example',
    pairId: 'pair-6',
    icon: '✅',
    category: 'Real Life Example'
  },

  // Pair 7: Directive Principle - Health
  {
    id: 'directive-health',
    content: 'Right to Health',
    type: 'directive',
    pairId: 'pair-7',
    icon: '🏥',
    category: 'Directive Principles'
  },
  {
    id: 'example-health',
    content: 'Access to Medical Care',
    type: 'example',
    pairId: 'pair-7',
    icon: '💊',
    category: 'Real Life Example'
  },

  // Pair 8: Right to Privacy
  {
    id: 'right-privacy',
    content: 'Right to Privacy',
    type: 'right',
    pairId: 'pair-8',
    icon: '🔒',
    category: 'Fundamental Rights'
  },
  {
    id: 'example-privacy',
    content: 'Personal Data Protection',
    type: 'example',
    pairId: 'pair-8',
    icon: '🛡️',
    category: 'Real Life Example'
  }
];

export const getShuffledCards = (): MemoryCard[] => {
  const shuffled = [...memoryCards].sort(() => Math.random() - 0.5);
  return shuffled;
};
