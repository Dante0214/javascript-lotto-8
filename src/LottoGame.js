import {
  calculateProfitRate,
  calculateStatistics,
  calculateTotalPrize,
} from "./lottoCalculator.js";
import { generateLottos } from "./lottoGenerator.js";
import {
  printLottos,
  printProfitRate,
  printPurchaseCount,
  printStatistics,
} from "./Output.js";
import WinningNumbers from "./WinningNumbers.js";

class LottoGame {
  #lottos;
  #purchaseAmount;
  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
    this.#lottos = generateLottos(purchaseAmount);
  }
  showPurchasedLottos() {
    printPurchaseCount(this.#lottos);
    printLottos(this.#lottos);
  }
  showResult(winningNumbersArray, bonusNumber) {
    const winningNumbers = new WinningNumbers(winningNumbersArray, bonusNumber);
    const statistics = calculateStatistics(this.#lottos, winningNumbers);
    const totalPrize = calculateTotalPrize(statistics);
    const profitRate = calculateProfitRate(totalPrize, this.#purchaseAmount);
    printStatistics(statistics);
    printProfitRate(profitRate);
  }
}
export default LottoGame;
