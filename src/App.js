import { Console } from "@woowacourse/mission-utils";
import {
  readBonusNumber,
  readPurchaseAmount,
  readWinningNumbers,
} from "./Input.js";
import { printError, printLottos, printPurchaseCount } from "./Output.js";
import { generateLottos } from "./lottoGenerator.js";
import { validateBonusNumber } from "./validators.js";

class App {
  async run() {
    const purchaseAmount = await this.getPurchaseAmount();
    const lottos = generateLottos(purchaseAmount);
    printPurchaseCount(lottos);
    printLottos(lottos);
    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);
  }
  async getPurchaseAmount() {
    try {
      return await readPurchaseAmount();
    } catch (error) {
      printError(error);
      return await this.getPurchaseAmount();
    }
  }
  async getWinningNumbers() {
    try {
      return await readWinningNumbers();
    } catch (error) {
      printError(error);
      return await this.getWinningNumbers();
    }
  }
  async getBonusNumber(winningNumbers) {
    try {
      return await readBonusNumber(winningNumbers);
    } catch (error) {
      printError(error);
      return await this.getBonusNumber(winningNumbers);
    }
  }
}

export default App;
