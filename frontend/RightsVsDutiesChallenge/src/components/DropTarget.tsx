/**
 * DropTarget Component
 * 
 * A target area where DraggableCards can be dropped.
 * Used for Duty cards in the matching game.
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { theme } from '../styles/theme';

interface DropTargetProps {
  id: string;
  title: string;
  icon?: string;
  onLayout?: (layout: { x: number; y: number; width: number; height: number }) => void;
  isActive?: boolean;
  isMatched?: boolean;
  matchedRightId?: string;
  style?: any;
}

export const DropTarget: React.FC<DropTargetProps> = ({
  id,
  title,
  icon,
  onLayout,
  isActive = false,
  isMatched = false,
  matchedRightId,
  style,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const borderColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      // Pulse animation when active
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: theme.animation.fast,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: theme.animation.fast,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Border color animation
      Animated.timing(borderColor, {
        toValue: 1,
        duration: theme.animation.fast,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(borderColor, {
        toValue: 0,
        duration: theme.animation.fast,
        useNativeDriver: false,
      }).start();
    }
  }, [isActive]);

  useEffect(() => {
    if (isMatched) {
      // Success animation
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.1,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isMatched]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    onLayout?.({ x, y, width, height });
  };

  const borderColorInterpolated = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', theme.colors.accent.gold],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [{ scale }],
          borderColor: borderColorInterpolated,
        },
        isMatched && styles.matchedContainer,
      ]}
      onLayout={handleLayout}
    >
      <View style={[styles.card, isMatched && styles.matchedCard]}>
        {icon && <View style={styles.iconContainer} />}
        <Text style={[styles.title, isMatched && styles.matchedText]}>
          {title}
        </Text>
        {isMatched && matchedRightId && (
          <View style={styles.connectorLine} />
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderRadius: theme.borderRadius.md,
    borderColor: 'transparent',
  },
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  matchedContainer: {
    borderColor: theme.colors.accent.gold,
  },
  matchedCard: {
    backgroundColor: theme.colors.accent.gold + '20',
  },
  iconContainer: {
    width: 32,
    height: 32,
    marginBottom: theme.spacing.sm,
    // Icon would be rendered here
  },
  title: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  matchedText: {
    color: theme.colors.text.primary,
  },
  connectorLine: {
    position: 'absolute',
    left: -60,
    width: 50,
    height: 3,
    backgroundColor: theme.colors.accent.gold,
    borderRadius: 2,
  },
});

