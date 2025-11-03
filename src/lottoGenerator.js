import { Random } from "@woowacourse/mission-utils";
import { LOTTO } from "./constants.js";
import Lotto from "./Lotto.js";

export const generateLottoNumbers = () => {
  return Random.pickUniqueNumbersInRange(
    LOTTO.MIN_NUMBER,
    LOTTO.MAX_NUMBER,
    LOTTO.NUMBER_LENGTH
  );
};

export const generateLottos = (amount) => {
  const count = Math.floor(amount / LOTTO.PRICE);
  const lottos = [];
  for (let i = 0; i < count; i++) {
    const numbers = generateLottoNumbers();
    lottos.push(new Lotto(numbers));
  }
  return lottos;
};
