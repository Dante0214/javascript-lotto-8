import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "./constants.js";
import {
  parseNumbers,
  validateBonusNumber,
  validateLottoNumbers,
  validatePurchaseAmount,
} from "./validators.js";

export const readPurchaseAmount = async () => {
  const input = await Console.readLineAsync(INPUT_MESSAGES.PURCHASE_AMOUNT);
  return validatePurchaseAmount(input);
};
export const readWinningNumbers = async () => {
  const input = await Console.readLineAsync(INPUT_MESSAGES.WINNING_NUMBERS);
  const numbers = parseNumbers(input);
  validateLottoNumbers(numbers);
  return numbers;
};
export const readBonusNumber = async (winningNumbers) => {
  const input = await Console.readLineAsync(INPUT_MESSAGES.BONUS_NUMBER);
  validateBonusNumber(input, winningNumbers);
  return Number(input);
};
