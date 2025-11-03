import { Console } from "@woowacourse/mission-utils";
import { readPurchaseAmount } from "./Input.js";
import { printError } from "./Output.js";

class App {
  async run() {
    const purchaseAmout = await this.getPurchaseAmount();
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
