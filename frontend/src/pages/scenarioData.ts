export type DialogueLine = {
  id: string;
  speaker: "Kedar" | "Police" | "Narrator" | "Villager" | "Lawyer";
  text: string;
};

export type Choice = {
  id: string;
  label: string;
  outcomeTitle: string;
  outcomeDescription: string;
  isCorrect?: boolean;
};

export type Scenario = {
  id: string;
  title: string;
  theme: string;
  realCase: string;
  summary: string;
  scene: {
    setting: string;
    dialogue: DialogueLine[];
  };
  question: string;
  choices: Choice[];
  realOutcome: string[];
  alternativePath: string[];
};

export const scenarios: Scenario[] = [
  {
    id: "kedar-nath-1962",
    title: "Freedom of Speech & Expression (Article 19)",
    theme: "Article 19(1)(a): Free Speech vs Sedition",
    realCase: "Kedar Nath Singh vs State of Bihar (1962)",
    summary:
      "A citizen criticizes the government and is charged with sedition. The Supreme Court clarifies the limits of free speech.",
    scene: {
      setting: "A village gathering. Citizens discuss rising prices and policies.",
      dialogue: [
        {
          id: "d1",
          speaker: "Kedar",
          text:
            "These leaders are exploiting the poor. If things don’t change, people will rise against them!",
        },
        {
          id: "d2",
          speaker: "Police",
          text:
            "You are speaking against the government. That is sedition! You are under arrest.",
        },
        { id: "d3", speaker: "Villager", text: "(Villagers murmur nervously.)" },
      ],
    },
    question: "If you were Kedar’s lawyer, what would you argue in court?",
    choices: [
      {
        id: "c1",
        label: "Say nothing and let the government punish Kedar.",
        outcomeTitle: "Passive Defense",
        outcomeDescription:
          "Kedar gets convicted under sedition and loses his freedom. This path ignores constitutional protections.",
      },
      {
        id: "c2",
        label:
          "Argue that Article 19 guarantees Freedom of Speech, so he can say anything.",
        outcomeTitle: "Absolute Speech Claim",
        outcomeDescription:
          "Weak defense. Courts hold that speech is not absolute; reasonable restrictions apply.",
      },
      {
        id: "c3",
        label:
          "Argue that Article 19 allows criticism unless it incites violence or public disorder.",
        outcomeTitle: "Constitutionally Sound Defense",
        outcomeDescription:
          "Correct. The court protects strong criticism so long as it does not incite violence or threaten public order.",
        isCorrect: true,
      },
    ],
    realOutcome: [
      "The Supreme Court ruled that free speech is protected.",
      "Sedition applies only when speech incites violence or threatens public order.",
      "Kedar Nath Singh’s conviction was partly overturned.",
    ],
    alternativePath: [
      "Villagers could support Kedar peacefully.",
      "They could file a petition citing Article 19(1)(a).",
      "The arrest could have been challenged earlier, reducing trial hardship.",
    ],
  },
];


