/**
 * Animation Utils - Phase 2
 * Utility functions for smooth animations
 */

import * as THREE from 'three';

/**
 * Ease-in-out cubic easing function
 * @param {number} t - Progress value (0 to 1)
 * @returns {number} Eased value
 */
export const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Linear interpolation between two values
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Progress (0 to 1)
 * @returns {number} Interpolated value
 */
export const lerp = (start, end, t) => {
  return start + (end - start) * t;
};

/**
 * Linear interpolation between two vectors
 * @param {THREE.Vector3} start - Start vector
 * @param {THREE.Vector3} end - End vector
 * @param {number} t - Progress (0 to 1)
 * @returns {THREE.Vector3} Interpolated vector
 */
export const lerpVector3 = (start, end, t) => {
  return new THREE.Vector3(
    lerp(start.x, end.x, t),
    lerp(start.y, end.y, t),
    lerp(start.z, end.z, t)
  );
};

/**
 * Animate a value from start to end over duration
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Duration in milliseconds
 * @param {function} callback - Callback with current value
 * @returns {function} Cancel function
 */
export const animateValue = (start, end, duration, callback) => {
  const startTime = performance.now();
  let animationId = null;

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    const currentValue = lerp(start, end, easedProgress);
    callback(currentValue);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  animationId = requestAnimationFrame(animate);

  // Return cancel function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };
};

/**
 * Animate a vector from start to end over duration
 * @param {THREE.Vector3} start - Start vector
 * @param {THREE.Vector3} end - End vector
 * @param {number} duration - Duration in milliseconds
 * @param {function} callback - Callback with current vector
 * @returns {function} Cancel function
 */
export const animateVector3 = (start, end, duration, callback) => {
  const startTime = performance.now();
  let animationId = null;

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    const currentVector = lerpVector3(start, end, easedProgress);
    callback(currentVector);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  animationId = requestAnimationFrame(animate);

  // Return cancel function
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };
};
