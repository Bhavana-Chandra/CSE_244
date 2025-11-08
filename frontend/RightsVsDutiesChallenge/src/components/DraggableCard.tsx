/**
 * DraggableCard Component
 * 
 * A card that can be dragged and dropped onto DropTarget components.
 * Used for Rights cards in the matching game.
 */

import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../styles/theme';

interface DraggableCardProps {
  id: string;
  title: string;
  article?: string;
  icon?: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrop?: (targetId: string) => void;
  disabled?: boolean;
  matched?: boolean;
  style?: any;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  title,
  article,
  icon,
  onDragStart,
  onDragEnd,
  onDrop,
  disabled = false,
  matched = false,
  style,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && !matched,
      onMoveShouldSetPanResponder: () => !disabled && !matched,
      onPanResponderGrant: () => {
        if (disabled || matched) return;
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        // Lift animation
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1.1,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.9,
            duration: theme.animation.fast,
            useNativeDriver: true,
          }),
        ]).start();
        onDragStart?.();
      },
      onPanResponderMove: (_, gestureState) => {
        if (disabled || matched) return;
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(_, gestureState);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (disabled || matched) return;
        pan.flattenOffset();
        
        // Check if dropped on a target (simplified - in real implementation,
        // you'd check collision with DropTarget bounds)
        // For now, we'll let the parent handle the drop logic
        
        // Return animation
        Animated.parallel([
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: theme.animation.fast,
            useNativeDriver: true,
          }),
        ]).start();
        
        onDragEnd?.();
      },
    })
  ).current;

  const animatedStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      { scale },
    ],
    opacity,
  };

  return (
    <Animated.View
      style={[styles.container, style, animatedStyle]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || matched}
        style={[
          styles.card,
          matched && styles.matchedCard,
          disabled && styles.disabledCard,
        ]}
      >
        {icon && <View style={styles.iconContainer} />}
        <Text style={[styles.title, matched && styles.matchedText]}>
          {title}
        </Text>
        {article && (
          <Text style={[styles.article, matched && styles.matchedText]}>
            {article}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  matchedCard: {
    backgroundColor: theme.colors.accent.gold + '20',
    borderColor: theme.colors.accent.gold,
  },
  disabledCard: {
    opacity: 0.5,
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
  article: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
  matchedText: {
    color: theme.colors.text.primary,
  },
});

