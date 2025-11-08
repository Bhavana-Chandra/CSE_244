/**
 * StarRating Component
 * 
 * Displays a star rating (1-3 stars) for level completion
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: number;
  showLabel?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  stars,
  maxStars = 3,
  size = 24,
  showLabel = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {Array.from({ length: maxStars }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.star,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
              },
              index < stars ? styles.filledStar : styles.emptyStar,
            ]}
          />
        ))}
      </View>
      {showLabel && (
        <Text style={styles.label}>
          {stars} / {maxStars} stars
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  star: {
    backgroundColor: theme.colors.accent.gold,
  },
  filledStar: {
    backgroundColor: theme.colors.accent.gold,
  },
  emptyStar: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 2,
    borderColor: theme.colors.accent.gold,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
});

