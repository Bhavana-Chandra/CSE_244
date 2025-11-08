export type Character = {
  name: string;
  gender: "male" | "female" | "child";
  age: "young" | "adult" | "elderly";
  role: string;
  emotion?: "neutral" | "angry" | "sad" | "happy" | "worried";
};

export type DialogueLine = {
  id: string;
  speaker: string;
  text: string;
  character?: Character;
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
    title: "Freedom of Speech & Expression",
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
          text: "These leaders are exploiting the poor. If things don't change, people will rise against them!",
          character: {
            name: "Kedar Nath Singh",
            gender: "male",
            age: "adult",
            role: "Citizen",
            emotion: "angry"
          }
        },
        {
          id: "d2",
          speaker: "Police Officer",
          text: "You are speaking against the government. That is sedition! You are under arrest.",
          character: {
            name: "Police Officer",
            gender: "male",
            age: "adult",
            role: "Law Enforcement",
            emotion: "neutral"
          }
        },
        { 
          id: "d3", 
          speaker: "Villager", 
          text: "(Villagers murmur nervously.)",
          character: {
            name: "Village People",
            gender: "female",
            age: "adult",
            role: "Citizen",
            emotion: "worried"
          }
        },
      ],
    },
    question: "If you were Kedar's lawyer, what would you argue in court?",
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
      "Kedar Nath Singh's conviction was partly overturned.",
    ],
    alternativePath: [
      "Villagers could support Kedar peacefully.",
      "They could file a petition citing Article 19(1)(a).",
      "The arrest could have been challenged earlier, reducing trial hardship.",
    ],
  },
  {
    id: "right-to-education",
    title: "Right to Education",
    theme: "Article 21A: Free and Compulsory Education",
    realCase: "Unni Krishnan vs State of Andhra Pradesh (1993)",
    summary:
      "A child is denied admission to school due to poverty. The case establishes education as a fundamental right.",
    scene: {
      setting: "A government school. A poor family tries to enroll their child.",
      dialogue: [
        {
          id: "d1",
          speaker: "Parent",
          text: "Please admit my child. We cannot afford private school fees.",
          character: {
            name: "Concerned Parent",
            gender: "female",
            age: "adult",
            role: "Parent",
            emotion: "worried"
          }
        },
        {
          id: "d2",
          speaker: "School Official",
          text: "Sorry, we need proof of residence and income certificate. Come back when you have all documents.",
          character: {
            name: "School Administrator",
            gender: "male",
            age: "adult",
            role: "Official",
            emotion: "neutral"
          }
        },
        { 
          id: "d3", 
          speaker: "Child", 
          text: "(Child looks sad and confused.)",
          character: {
            name: "Young Student",
            gender: "child",
            age: "young",
            role: "Student",
            emotion: "sad"
          }
        },
      ],
    },
    question: "What should the parent do to ensure their child's right to education?",
    choices: [
      {
        id: "c1",
        label: "Give up and keep the child at home to work.",
        outcomeTitle: "Denial of Rights",
        outcomeDescription:
          "This violates the child's fundamental right to education and perpetuates poverty.",
      },
      {
        id: "c2",
        label: "File a complaint with the school principal.",
        outcomeTitle: "Basic Advocacy",
        outcomeDescription:
          "Good first step, but may not be sufficient to enforce constitutional rights.",
      },
      {
        id: "c3",
        label: "Approach the education department citing Article 21A.",
        outcomeTitle: "Constitutional Remedy",
        outcomeDescription:
          "Correct approach. Article 21A guarantees free education for children 6-14 years.",
        isCorrect: true,
      },
    ],
    realOutcome: [
      "The Supreme Court recognized education as a fundamental right.",
      "Article 21A was later added to the Constitution.",
      "Right to Education Act 2009 was enacted.",
    ],
    alternativePath: [
      "Local NGOs could help with documentation.",
      "Legal aid could be sought for free.",
      "Community support could pressure authorities.",
    ],
  },
  {
    id: "right-to-privacy",
    title: "Right to Privacy",
    theme: "Article 21: Right to Life and Personal Liberty",
    realCase: "Justice K.S. Puttaswamy vs Union of India (2017)",
    summary:
      "The government wants to collect biometric data for Aadhaar. Citizens challenge this as violation of privacy.",
    scene: {
      setting: "A government office. Officials are collecting biometric data.",
      dialogue: [
        {
          id: "d1",
          speaker: "Official",
          text: "You must provide your fingerprints and iris scan for Aadhaar. It's mandatory.",
          character: {
            name: "Government Official",
            gender: "male",
            age: "adult",
            role: "Official",
            emotion: "neutral"
          }
        },
        {
          id: "d2",
          speaker: "Citizen",
          text: "But what about my privacy? Can't I refuse?",
          character: {
            name: "Concerned Citizen",
            gender: "female",
            age: "adult",
            role: "Citizen",
            emotion: "worried"
          }
        },
        { 
          id: "d3", 
          speaker: "Official", 
          text: "No exceptions. It's for your own good.",
          character: {
            name: "Government Official",
            gender: "male",
            age: "adult",
            role: "Official",
            emotion: "neutral"
          }
        },
      ],
    },
    question: "What constitutional right protects citizens from forced biometric collection?",
    choices: [
      {
        id: "c1",
        label: "There is no right to privacy in the Constitution.",
        outcomeTitle: "Incorrect Understanding",
        outcomeDescription:
          "The Supreme Court has recognized privacy as part of Article 21.",
      },
      {
        id: "c2",
        label: "Article 19 - Freedom of Speech protects privacy.",
        outcomeTitle: "Partial Understanding",
        outcomeDescription:
          "While related, privacy is primarily protected under Article 21.",
      },
      {
        id: "c3",
        label: "Article 21 - Right to Life includes Right to Privacy.",
        outcomeTitle: "Correct Constitutional Understanding",
        outcomeDescription:
          "The Supreme Court ruled that privacy is intrinsic to life and liberty under Article 21.",
        isCorrect: true,
      },
    ],
    realOutcome: [
      "Supreme Court recognized privacy as a fundamental right.",
      "Aadhaar was upheld but with safeguards.",
      "Privacy is now protected under Article 21.",
    ],
    alternativePath: [
      "Citizens can opt out of non-essential services.",
      "Legal challenges can be filed for privacy violations.",
      "Data protection laws can be advocated for.",
    ],
  },
  {
    id: "right-to-equality",
    title: "Right to Equality",
    theme: "Article 14: Equality Before Law",
    realCase: "Indra Sawhney vs Union of India (1992)",
    summary:
      "A qualified candidate is denied a job due to caste-based reservation policies. The case tests equality principles.",
    scene: {
      setting: "A government recruitment office. A candidate receives rejection letter.",
      dialogue: [
        {
          id: "d1",
          speaker: "Candidate",
          text: "I scored higher than the selected candidate. Why was I rejected?",
          character: {
            name: "Job Candidate",
            gender: "male",
            age: "young",
            role: "Job Applicant",
            emotion: "angry"
          }
        },
        {
          id: "d2",
          speaker: "Official",
          text: "The selected candidate belongs to a reserved category. That's the policy.",
          character: {
            name: "Recruitment Official",
            gender: "female",
            age: "adult",
            role: "Official",
            emotion: "neutral"
          }
        },
        { 
          id: "d3", 
          speaker: "Candidate", 
          text: "But I'm more qualified!",
          character: {
            name: "Job Candidate",
            gender: "male",
            age: "young",
            role: "Job Applicant",
            emotion: "angry"
          }
        },
      ],
    },
    question: "Does this reservation policy violate Article 14 (Right to Equality)?",
    choices: [
      {
        id: "c1",
        label: "Yes, it completely violates equality by treating people differently.",
        outcomeTitle: "Misunderstanding of Equality",
        outcomeDescription:
          "Article 14 allows reasonable classification for social justice.",
      },
      {
        id: "c2",
        label: "No, because all candidates are treated equally within their categories.",
        outcomeTitle: "Partial Understanding",
        outcomeDescription:
          "The policy aims for substantive equality, not just formal equality.",
      },
      {
        id: "c3",
        label: "No, because Article 14 allows reasonable classification for social justice.",
        outcomeTitle: "Constitutional Understanding",
        outcomeDescription:
          "Correct. The Supreme Court upheld reservations as reasonable classification for social justice.",
        isCorrect: true,
      },
    ],
    realOutcome: [
      "Supreme Court upheld reservation policy.",
      "50% ceiling was established for reservations.",
      "Creamy layer exclusion was introduced.",
    ],
    alternativePath: [
      "Merit-based opportunities can be increased.",
      "Economic criteria can be considered.",
      "Educational reforms can reduce disparities.",
    ],
  },
  {
    id: "right-to-protest",
    title: "Right to Peaceful Assembly",
    theme: "Article 19(1)(b): Freedom of Assembly",
    realCase: "Mazdoor Kisan Shakti Sangathan vs Union of India (2018)",
    summary:
      "Farmers want to protest against agricultural laws. Police deny permission citing law and order concerns.",
    scene: {
      setting: "Police station. Farmers seek permission for peaceful protest.",
      dialogue: [
        {
          id: "d1",
          speaker: "Farmer Leader",
          text: "We want to hold a peaceful march to express our concerns about the new laws.",
          character: {
            name: "Farmers' Union Leader",
            gender: "male",
            age: "elderly",
            role: "Community Leader",
            emotion: "neutral"
          }
        },
        {
          id: "d2",
          speaker: "Police Officer",
          text: "Sorry, we cannot allow protests. It might cause traffic and law and order issues.",
          character: {
            name: "Police Inspector",
            gender: "male",
            age: "adult",
            role: "Law Enforcement",
            emotion: "neutral"
          }
        },
        { 
          id: "d3", 
          speaker: "Farmer", 
          text: "But we have a constitutional right to protest!",
          character: {
            name: "Local Farmer",
            gender: "female",
            age: "adult",
            role: "Farmer",
            emotion: "angry"
          }
        },
      ],
    },
    question: "Can the police completely ban peaceful protests?",
    choices: [
      {
        id: "c1",
        label: "Yes, police can ban any protest for any reason.",
        outcomeTitle: "Incorrect Understanding",
        outcomeDescription:
          "This would violate the fundamental right to peaceful assembly.",
      },
      {
        id: "c2",
        label: "No, but police can impose reasonable restrictions.",
        outcomeTitle: "Basic Understanding",
        outcomeDescription:
          "Correct principle, but the restrictions must be reasonable and specific.",
      },
      {
        id: "c3",
        label: "No, police must allow peaceful protests and can only impose reasonable restrictions.",
        outcomeTitle: "Complete Constitutional Understanding",
        outcomeDescription:
          "Correct. Article 19(1)(b) guarantees peaceful assembly, subject only to reasonable restrictions.",
        isCorrect: true,
      },
    ],
    realOutcome: [
      "Supreme Court upheld right to peaceful protest.",
      "Police must allow peaceful assemblies.",
      "Restrictions must be reasonable and specific.",
    ],
    alternativePath: [
      "Protest organizers can coordinate with police.",
      "Alternative routes can be suggested.",
      "Time restrictions can be negotiated.",
    ],
  },
];


