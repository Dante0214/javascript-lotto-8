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
