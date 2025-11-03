import { ERROR_MESSAGES, LOTTO } from "./constants.js";

export const validatePurchaseAmount = (amount) => {
  const numAmount = Number(amount);

  if (isNaN(numAmount)) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT);
  }

  if (numAmount < LOTTO.PRICE) {
    throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
  }

  if (numAmount % LOTTO.PRICE !== 0) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT);
  }

  return numAmount;
};
export const validateLottoNumbers = (numbers) => {
  if (numbers.length !== LOTTO.NUMBER_LENGTH) {
    throw new Error(ERROR_MESSAGES.INVALID_NUMBER_COUNT);
  }
  numbers.forEach((number) => {
    if (isNaN(number)) {
      throw new Error(ERROR_MESSAGES.INVALID_NUMBER_FORMAT);
    }
    if (number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER) {
      throw new Error(ERROR_MESSAGES.INVALID_NUMBER_RANGE);
    }
  });
  if (new Set(numbers).size !== numbers.length) {
    throw new Error(ERROR_MESSAGES.DUPLICATE_NUMBERS);
  }
  return numbers;
};
export const validateBonusNumber = (bonusNumberInput, winningNumbers) => {
  const bonusNumber = Number(bonusNumberInput);
  if (isNaN(bonusNumber)) {
    throw new Error(ERROR_MESSAGES.INVALID_NUMBER_FORMAT);
  }
  if (bonusNumber < LOTTO.MIN_NUMBER || bonusNumber > LOTTO.MAX_NUMBER) {
    throw new Error(ERROR_MESSAGES.INVALID_NUMBER_RANGE);
  }
  if (winningNumbers.includes(bonusNumber)) {
    throw new Error(ERROR_MESSAGES.BONUS_DUPLICATE);
  }
  return bonusNumber;
};
export const parseNumbers = (input) => {
  return input.split(",").map((num) => Number(num.trim()));
};
