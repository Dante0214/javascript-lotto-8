import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES } from "./constants.js";
export const printPurchaseCount = (lottos) => {
  Console.print(OUTPUT_MESSAGES.PURCHASE_COUNT(lottos.length));
};
export const printError = (error) => {
  Console.print(error.message);
};
export const printLottos = (lottos) => {
  lottos.forEach((lotto) => {
    const sortedNumbers = lotto.getSortedNumbers();
    Console.print(`[${sortedNumbers.join(", ")}]`);
  });
};
