import {
  readBonusNumber,
  readPurchaseAmount,
  readWinningNumbers,
} from "./Input.js";
import { printError } from "./Output.js";
import LottoGame from "./LottoGame.js";

class App {
  async run() {
    const purchaseAmount = await this.getPurchaseAmount();
    const game = new LottoGame(purchaseAmount);
    game.showPurchasedLottos();
    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);
    game.showResult(winningNumbers, bonusNumber);
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
