export interface TreeQuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface TreeQuizQuestion {
  id: string;
  prompt: string;
  options: TreeQuizOption[];
}

export interface TreeStage {
  id: string;
  order: number;
  title: string;
  date: string;
  summary: string;
  image: string; // path to asset or URL
  quiz: TreeQuizQuestion[];
}

export const treeStages: TreeStage[] = [
  {
    id: 'stage-1',
    order: 1,
    title: '1946 — Constituent Assembly Elections',
    date: '1946',
    summary: 'The Constituent Assembly of India was elected in 1946 through provincial elections under the Cabinet Mission Plan.',
    image: '/src/assets/vecteezy_old-paper-scroll-vector-retro-document-script-with-copy-space_13409493.svg',
    quiz: [
      {
        id: 'q1',
        prompt: 'In which year was the Constituent Assembly elected?',
        options: [
          { id: 'a', text: '1946', isCorrect: true },
          { id: 'b', text: '1947', isCorrect: false },
          { id: 'c', text: '1950', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-2',
    order: 2,
    title: '9 December 1946 — First Assembly Meeting',
    date: '9 Dec 1946',
    summary: 'The first meeting of the Constituent Assembly took place with Dr. Sachchidananda Sinha as interim President.',
    image: '/src/assets/vecteezy_police-badge-creative-icon-design_16053066.svg',
    quiz: [
      {
        id: 'q2',
        prompt: 'Who was the interim President of the Constituent Assembly?',
        options: [
          { id: 'a', text: 'Dr. Sachchidananda Sinha', isCorrect: true },
          { id: 'b', text: 'Rajendra Prasad', isCorrect: false },
          { id: 'c', text: 'B.R. Ambedkar', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-3',
    order: 3,
    title: '11 December 1946 — Permanent President',
    date: '11 Dec 1946',
    summary: 'Dr. Rajendra Prasad was elected the permanent President of the Assembly.',
    image: '/src/assets/man.svg',
    quiz: [
      {
        id: 'q3',
        prompt: 'Who became the permanent President of the Constituent Assembly?',
        options: [
          { id: 'a', text: 'Dr. Rajendra Prasad', isCorrect: true },
          { id: 'b', text: 'Jawaharlal Nehru', isCorrect: false },
          { id: 'c', text: 'B.R. Ambedkar', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-4',
    order: 4,
    title: '13 December 1946 — Objectives Resolution',
    date: '13 Dec 1946',
    summary: 'Jawaharlal Nehru moved the Objectives Resolution, laying the philosophy and objectives of the Constitution.',
    image: '/src/assets/people.svg',
    quiz: [
      {
        id: 'q4',
        prompt: 'Who moved the Objectives Resolution?',
        options: [
          { id: 'a', text: 'Jawaharlal Nehru', isCorrect: true },
          { id: 'b', text: 'Sardar Patel', isCorrect: false },
          { id: 'c', text: 'Dr. Ambedkar', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-5',
    order: 5,
    title: '29 August 1947 — Drafting Committee',
    date: '29 Aug 1947',
    summary: 'A Drafting Committee chaired by Dr. B.R. Ambedkar was set up to prepare the draft Constitution.',
    image: '/src/assets/vecteezy_vintage-style-label-design_15083044.svg',
    quiz: [
      {
        id: 'q5',
        prompt: 'Who chaired the Drafting Committee?',
        options: [
          { id: 'a', text: 'Dr. B.R. Ambedkar', isCorrect: true },
          { id: 'b', text: 'Rajendra Prasad', isCorrect: false },
          { id: 'c', text: 'C. Rajagopalachari', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-6',
    order: 6,
    title: 'November 1947 — First Draft Submitted',
    date: 'Nov 1947',
    summary: 'The first draft of the Constitution was presented, opening the path for debates and revisions.',
    image: '/src/assets/constitution-hero.jpg',
    quiz: [
      {
        id: 'q6',
        prompt: 'What followed the first draft submission?',
        options: [
          { id: 'a', text: 'Debates and revisions', isCorrect: true },
          { id: 'b', text: 'Immediate adoption', isCorrect: false },
          { id: 'c', text: 'Judicial review', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-7',
    order: 7,
    title: '1948–49 — Debates & Amendments',
    date: '1948–49',
    summary: 'Extensive clause-by-clause debates and amendments refined the draft for national consensus.',
    image: '/src/assets/parliament-building.jpg',
    quiz: [
      {
        id: 'q7',
        prompt: 'What was a key feature of the 1948–49 phase?',
        options: [
          { id: 'a', text: 'Debates & Amendments', isCorrect: true },
          { id: 'b', text: 'Elections to Lok Sabha', isCorrect: false },
          { id: 'c', text: 'Impeachment proceedings', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-8',
    order: 8,
    title: '26 November 1949 — Adoption',
    date: '26 Nov 1949',
    summary: 'The Constitution of India was adopted by the Assembly; 26 Nov is celebrated as Constitution Day.',
    image: '/src/assets/coin.svg',
    quiz: [
      {
        id: 'q8',
        prompt: 'When was the Constitution adopted?',
        options: [
          { id: 'a', text: '26 November 1949', isCorrect: true },
          { id: 'b', text: '26 January 1950', isCorrect: false },
          { id: 'c', text: '15 August 1947', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-9',
    order: 9,
    title: '24 January 1950 — Signatures',
    date: '24 Jan 1950',
    summary: 'Members signed the Constitution in Hindi and English, cementing the nation’s guiding charter.',
    image: '/src/assets/vecteezy_chest-creative-icon-design_16053807.svg',
    quiz: [
      {
        id: 'q9',
        prompt: 'In how many languages was the Constitution signed?',
        options: [
          { id: 'a', text: 'Two (Hindi & English)', isCorrect: true },
          { id: 'b', text: 'Only English', isCorrect: false },
          { id: 'c', text: 'Only Hindi', isCorrect: false }
        ]
      }
    ]
  },
  {
    id: 'stage-10',
    order: 10,
    title: '26 January 1950 — In Effect (Republic Day)',
    date: '26 Jan 1950',
    summary: 'The Constitution came into force; India became a Republic with the President as head of State.',
    image: '/src/assets/police.svg',
    quiz: [
      {
        id: 'q10',
        prompt: 'What happened on 26 January 1950?',
        options: [
          { id: 'a', text: 'Constitution came into effect', isCorrect: true },
          { id: 'b', text: 'Constituent Assembly first met', isCorrect: false },
          { id: 'c', text: 'Objectives Resolution moved', isCorrect: false }
        ]
      }
    ]
  }
];
