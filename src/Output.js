import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES, PRIZE, RANK } from "./constants.js";
export const printPurchaseCount = (lottos) => {
  Console.print(OUTPUT_MESSAGES.PURCHASE_COUNT(lottos.length));
};
export const printError = (error) => {
  Console.print(error.message);
};
export const printLottos = (lottos) => {
  lottos.forEach((lotto) => {
    const sortedNumbers = lotto.getNumbers();
    Console.print(`[${sortedNumbers.join(", ")}]`);
  });
};

export const printStatistics = (statistics) => {
  Console.print(OUTPUT_MESSAGES.STATISTICS_HEADER);

  const ranks = [RANK.FIFTH, RANK.FOURTH, RANK.THIRD, RANK.SECOND, RANK.FIRST];

  ranks.forEach((rank) => {
    const prize = PRIZE[rank];
    const count = statistics[rank];
    const message = formatStatisticLine(prize, count);
    Console.print(message);
  });
};

const formatStatisticLine = (prize, count) => {
  const { match, bonus, amount } = prize;
  const formattedAmount = amount.toLocaleString();

  if (bonus) {
    return `${match}개 일치, 보너스 볼 일치 (${formattedAmount}원) - ${count}개`;
  }

  return `${match}개 일치 (${formattedAmount}원) - ${count}개`;
};

export const printProfitRate = (rate) => {
  Console.print(OUTPUT_MESSAGES.PROFIT_RATE(rate));
};
