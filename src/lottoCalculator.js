import { PRIZE, RANK } from "./constants.js";

export const determineRank = (matchCount, hasBonusMatch) => {
  if (matchCount === 6) {
    return RANK.FIRST;
  }

  if (matchCount === 5 && hasBonusMatch) {
    return RANK.SECOND;
  }

  if (matchCount === 5) {
    return RANK.THIRD;
  }

  if (matchCount === 4) {
    return RANK.FOURTH;
  }

  if (matchCount === 3) {
    return RANK.FIFTH;
  }

  return RANK.NONE;
};
// 모든 로또의 당첨통계
export const calculateStatistics = (lottos, winningNumbers) => {
  const statistics = {
    [RANK.FIFTH]: 0,
    [RANK.FOURTH]: 0,
    [RANK.THIRD]: 0,
    [RANK.SECOND]: 0,
    [RANK.FIRST]: 0,
  };

  lottos.forEach((lotto) => {
    const { matchCount, hasBonusMatch } = winningNumbers.match(lotto);
    const rank = determineRank(matchCount, hasBonusMatch);

    if (rank !== RANK.NONE) {
      statistics[rank]++;
    }
  });

  return statistics;
};
// 총 상금 계산
export const calculateTotalPrize = (statistics) => {
  return Object.entries(statistics).reduce((total, [rank, count]) => {
    return total + PRIZE[rank].amount * count;
  }, 0);
};

//수익률 계산
export const calculateProfitRate = (totalPrize, purchaseAmount) => {
  const rate = (totalPrize / purchaseAmount) * 100;
  return Math.round(rate * 10) / 10;
};
