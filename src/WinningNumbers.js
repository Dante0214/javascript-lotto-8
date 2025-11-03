import { validateBonusNumber, validateLottoNumbers } from "./validators.js";

class WinningNumbers {
  #numbers;
  #bonusNumber;
  constructor(numbers, bonusNumber) {
    validateLottoNumbers(numbers);
    this.#numbers = numbers;
    this.#bonusNumber = validateBonusNumber(bonusNumber, numbers);
  }
  getNumbers() {
    return [...this.#numbers];
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
  match(lotto) {
    const matchCount = lotto.matchCount(this.#numbers);
    const hasBonusMatch = lotto.hasNumber(this.#bonusNumber);
    return { matchCount, hasBonusMatch };
  }
}
export default WinningNumbers;
