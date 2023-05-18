export const animationDelayRatio = 0.2;
export const getAnimationDelay = (ind, numberCards) => {
  const maxpairecards = numberCards - 2;
  const maximpairecards = numberCards - 1;
  if (ind < numberCards / 2) {
    return (maxpairecards - 2 * ind) * animationDelayRatio;
  }

  return (
    (maximpairecards - 2 * (ind % (numberCards / 2))) * animationDelayRatio
  );
};

export const textAnimation = {
  initial: { x: 30, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};
export const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
export const BackgroundImageAnimation = {
  initial: { scale: 1, opacity: 1, zIndex: 18 },
  animate: { scale: 1.5, opacity: 0.2, zIndex: 2 },
};

export const CardDescirptiontransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatDelay: 30,
};

export const variantsTop = {
  hidden: { opacity: 0, y: -200 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
export const variantsDown = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
export const variantsCardRight = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 200,
  },
};

export const variantsCardLeft = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const wallAnimationDelay = 70;
export const wallCardAnimationDuration = 0.5;
