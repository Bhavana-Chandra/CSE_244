export interface Reward {
  id: string;
  type: 'achievement' | 'card' | 'fact' | 'treasure' | 'badge';
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  color: string;
}

export const rewards: Reward[] = [
  // Achievement Badges
  {
    id: 'memory-master',
    type: 'badge',
    title: 'Memory Master',
    description: 'You\'ve mastered the constitutional memory challenge!',
    icon: '🧠',
    rarity: 'epic',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'constitutional-champion',
    type: 'badge',
    title: 'Constitutional Champion',
    description: 'Your knowledge of rights and duties is exceptional!',
    icon: '🏆',
    rarity: 'legendary',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'rights-defender',
    type: 'badge',
    title: 'Rights Defender',
    description: 'You understand and protect fundamental rights!',
    icon: '🛡️',
    rarity: 'rare',
    color: 'from-blue-500 to-cyan-600'
  },

  // Hero Cards
  {
    id: 'dr-ambedkar-card',
    type: 'card',
    title: 'Dr. B.R. Ambedkar Card',
    description: 'The Father of the Indian Constitution - A true visionary!',
    icon: '👨‍⚖️',
    rarity: 'legendary',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'nehru-card',
    type: 'card',
    title: 'Jawaharlal Nehru Card',
    description: 'The first Prime Minister who shaped India\'s democratic journey!',
    icon: '🌹',
    rarity: 'epic',
    color: 'from-red-500 to-pink-600'
  },

  // Fun Facts
  {
    id: 'constitution-facts',
    type: 'fact',
    title: 'Constitution Trivia',
    description: 'The Indian Constitution was adopted on November 26, 1949!',
    icon: '📜',
    rarity: 'common',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'rights-facts',
    type: 'fact',
    title: 'Rights Knowledge',
    description: 'There are 6 fundamental rights in the Indian Constitution!',
    icon: '🔢',
    rarity: 'common',
    color: 'from-blue-500 to-indigo-600'
  },

  // Treasure Chests
  {
    id: 'golden-chest',
    type: 'treasure',
    title: 'Golden Treasure Chest',
    description: 'A chest filled with constitutional wisdom and golden insights!',
    icon: '🏆',
    rarity: 'legendary',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'silver-chest',
    type: 'treasure',
    title: 'Silver Treasure Chest',
    description: 'Contains valuable knowledge about democratic principles!',
    icon: '🥈',
    rarity: 'epic',
    color: 'from-gray-400 to-slate-500'
  }
];

export const getRandomReward = (): Reward => {
  const randomIndex = Math.floor(Math.random() * rewards.length);
  return rewards[randomIndex];
};

export const getRewardByRarity = (rarity: Reward['rarity']): Reward => {
  const filteredRewards = rewards.filter(reward => reward.rarity === rarity);
  const randomIndex = Math.floor(Math.random() * filteredRewards.length);
  return filteredRewards[randomIndex];
};
