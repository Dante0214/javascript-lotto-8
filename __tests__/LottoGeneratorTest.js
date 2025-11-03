import { generateLottoNumbers, generateLottos } from "../src/lottoGenerator.js";
import { Random } from "@woowacourse/mission-utils";

const mockRandoms = (numbers) => {
  Random.pickUniqueNumbersInRange = jest.fn();
  numbers.forEach((number) => {
    Random.pickUniqueNumbersInRange.mockReturnValueOnce(number);
  });
};

describe("로또 번호 생성 테스트", () => {
  test("로또 번호 6개를 생성한다.", () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    const numbers = generateLottoNumbers();

    expect(numbers).toHaveLength(6);
  });

  test("생성된 로또 번호는 1~45 범위 내의 숫자다.", () => {
    mockRandoms([[8, 21, 23, 41, 42, 43]]);
    const numbers = generateLottoNumbers();

    numbers.forEach((number) => {
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(45);
    });
  });

  test("생성된 로또 번호는 중복되지 않는다.", () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    const numbers = generateLottoNumbers();
    const uniqueNumbers = new Set(numbers);

    expect(uniqueNumbers.size).toBe(6);
  });
});

describe("로또 발행 테스트", () => {
  test("1,000원으로 1장의 로또를 발행한다.", () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    const lottos = generateLottos(1000);

    expect(lottos).toHaveLength(1);
  });

  test("8,000원으로 8장의 로또를 발행한다.", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36],
      [37, 38, 39, 40, 41, 42],
      [1, 3, 5, 7, 9, 11],
    ]);
    const lottos = generateLottos(8000);

    expect(lottos).toHaveLength(8);
  });

  test("발행된 로또는 모두 Lotto 객체다.", () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    const lottos = generateLottos(1000);

    expect(lottos[0].getNumbers).toBeDefined();
    expect(lottos[0].matchCount).toBeDefined();
  });
});
