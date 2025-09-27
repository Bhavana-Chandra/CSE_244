export interface SpinSlice {
  id: string;
  label: string;
  article: string;
  colorClass: string;
  icon?: string;
}

export interface SpinQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface SpinQuestion {
  id: string;
  article: string;
  prompt: string;
  options: SpinQuestionOption[];
}

export const spinSlices: SpinSlice[] = [
  { id: 'art14', label: 'Art. 14', article: 'Article 14 – Right to Equality', colorClass: 'text-[hsl(var(--secondary))]' },
  { id: 'art19', label: 'Art. 19', article: 'Article 19 – Right to Freedom', colorClass: 'text-[hsl(var(--primary))]' },
  { id: 'art21', label: 'Art. 21', article: 'Article 21 – Right to Life & Liberty', colorClass: 'text-[hsl(var(--accent))]' },
  { id: 'art32', label: 'Art. 32', article: 'Article 32 – Right to Constitutional Remedies', colorClass: 'text-[hsl(var(--secondary))]' },
  { id: 'art39', label: 'Art. 39', article: 'Article 39 – Principles of Policy', colorClass: 'text-[hsl(var(--primary))]' },
  { id: 'art45', label: 'Art. 45', article: 'Article 45 – Early Childhood Care & Education', colorClass: 'text-[hsl(var(--accent))]' },
  { id: 'art51A', label: 'Art. 51A', article: 'Article 51A – Fundamental Duties', colorClass: 'text-[hsl(var(--secondary))]' },
  { id: 'preamble', label: 'Preamble', article: 'Preamble – Justice, Liberty, Equality, Fraternity', colorClass: 'text-[hsl(var(--primary))]' }
];

export const spinQuestions: SpinQuestion[] = [
  {
    id: 'q-art14-1',
    article: 'art14',
    prompt: 'A shop refuses entry to someone due to their caste. Which right is affected?',
    options: [
      { id: 'a', text: 'Right to Equality', isCorrect: true },
      { id: 'b', text: 'Right to Education', isCorrect: false },
      { id: 'c', text: 'Right against Exploitation', isCorrect: false }
    ]
  },
  {
    id: 'q-art19-1',
    article: 'art19',
    prompt: 'A student peacefully protests in a public park. Which freedom applies?',
    options: [
      { id: 'a', text: 'Freedom of Assembly', isCorrect: true },
      { id: 'b', text: 'Freedom of Religion', isCorrect: false },
      { id: 'c', text: 'Freedom to form Co-operatives', isCorrect: false }
    ]
  },
  {
    id: 'q-art21-1',
    article: 'art21',
    prompt: 'Government demolishes homes without notice. Which right is violated?',
    options: [
      { id: 'a', text: 'Right to Life & Personal Liberty (due process)', isCorrect: true },
      { id: 'b', text: 'Right to Property', isCorrect: false },
      { id: 'c', text: 'Right to Education', isCorrect: false }
    ]
  },
  {
    id: 'q-art32-1',
    article: 'art32',
    prompt: 'Your fundamental rights are violated. What can you do?',
    options: [
      { id: 'a', text: 'Approach Supreme Court for writs under Article 32', isCorrect: true },
      { id: 'b', text: 'Only write to District Collector', isCorrect: false },
      { id: 'c', text: 'Wait for Parliament session', isCorrect: false }
    ]
  },
  {
    id: 'q-art39-1',
    article: 'art39',
    prompt: 'A state policy ensures equal pay for men and women. Which DPSP?',
    options: [
      { id: 'a', text: 'Article 39', isCorrect: true },
      { id: 'b', text: 'Article 37', isCorrect: false },
      { id: 'c', text: 'Article 43', isCorrect: false }
    ]
  },
  {
    id: 'q-art45-1',
    article: 'art45',
    prompt: 'Anganwadi provides pre-school education to all children. Which article?',
    options: [
      { id: 'a', text: 'Article 45', isCorrect: true },
      { id: 'b', text: 'Article 21A', isCorrect: false },
      { id: 'c', text: 'Article 47', isCorrect: false }
    ]
  },
  {
    id: 'q-art51A-1',
    article: 'art51A',
    prompt: 'Planting trees and keeping surroundings clean reflects which duty?',
    options: [
      { id: 'a', text: 'Article 51A(g) – Protect the Environment', isCorrect: true },
      { id: 'b', text: 'Article 51A(i) – Safeguard Public Property', isCorrect: false },
      { id: 'c', text: 'Article 51A(j) – Strive for Excellence', isCorrect: false }
    ]
  },
  {
    id: 'q-preamble-1',
    article: 'preamble',
    prompt: 'Helping flood-affected families most in need reflects which value?',
    options: [
      { id: 'a', text: 'Justice', isCorrect: true },
      { id: 'b', text: 'Liberty', isCorrect: false },
      { id: 'c', text: 'Fraternity only', isCorrect: false }
    ]
  }
];
