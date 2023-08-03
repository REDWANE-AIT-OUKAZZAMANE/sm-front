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

export const wallAnimationDelay = 70;
export const wallCardAnimationDuration = 0.5;
