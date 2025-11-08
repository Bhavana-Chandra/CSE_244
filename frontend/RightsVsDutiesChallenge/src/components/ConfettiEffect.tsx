/**
 * ConfettiEffect Component
 * 
 * Simple confetti animation for level completion
 * Uses a basic particle effect (can be replaced with Lottie animation)
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../styles/theme';

interface ConfettiEffectProps {
  visible: boolean;
  duration?: number;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  visible,
  duration = 2000,
}) => {
  const particles = useRef(
    Array.from({ length: 20 }).map(() => ({
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      opacity: new Animated.Value(1),
      rotation: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (visible) {
      particles.forEach((particle, index) => {
        const delay = index * 50;
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = Math.random() * 300 + 100;
        const randomRotation = Math.random() * 720;

        Animated.parallel([
          Animated.timing(particle.translateY, {
            toValue: randomY,
            duration: duration + delay,
            useNativeDriver: true,
          }),
          Animated.timing(particle.translateX, {
            toValue: randomX,
            duration: duration + delay,
            useNativeDriver: true,
          }),
          Animated.timing(particle.rotation, {
            toValue: randomRotation,
            duration: duration + delay,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.delay(duration / 2),
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    } else {
      particles.forEach((particle) => {
        particle.translateY.setValue(0);
        particle.translateX.setValue(0);
        particle.opacity.setValue(1);
        particle.rotation.setValue(0);
      });
    }
  }, [visible, duration]);

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle, index) => {
        const colors = [
          theme.colors.accent.gold,
          theme.colors.accent.green,
          theme.colors.accent.greenDark,
          '#FF6B6B',
          '#4ECDC4',
        ];
        const color = colors[index % colors.length];

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                backgroundColor: color,
                transform: [
                  { translateY: particle.translateY },
                  { translateX: particle.translateX },
                  {
                    rotate: particle.rotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
                opacity: particle.opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    top: '20%',
    left: '50%',
  },
});

