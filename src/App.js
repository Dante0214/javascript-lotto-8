import { Console } from "@woowacourse/mission-utils";
import { readPurchaseAmount } from "./Input.js";
import { printError, printLottos, printPurchaseCount } from "./Output.js";
import { generateLottos } from "./lottoGenerator.js";

class App {
  async run() {
    const purchaseAmount = await this.getPurchaseAmount();
    const lottos = generateLottos(purchaseAmount);
    printPurchaseCount(lottos);
    printLottos(lottos);
  }
  async getPurchaseAmount() {
    try {
      return await readPurchaseAmount();
    } catch (error) {
      printError(error);
      return await this.getPurchaseAmount();
    }
  }
}

export default App;
