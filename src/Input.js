import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "./constants.js";
import { validatePurchaseAmount } from "./validators.js";

export const readPurchaseAmount = async () => {
  const input = await Console.readLineAsync(INPUT_MESSAGES.PURCHASE_AMOUNT);
  return validatePurchaseAmount(input);
};
