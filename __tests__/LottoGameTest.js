import LottoGame from "../src/LottoGame.js";
import { Console, Random } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();
  inputs.forEach((input) => {
    Console.readLineAsync.mockResolvedValueOnce(input);
  });
};

const mockRandoms = (numbers) => {
  Random.pickUniqueNumbersInRange = jest.fn();
  numbers.forEach((number) => {
    Random.pickUniqueNumbersInRange.mockReturnValueOnce(number);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("LottoGame 클래스 테스트", () => {
  test("구입 금액에 맞는 개수의 로또를 발행한다.", () => {
    const game = new LottoGame(5000);
    const logSpy = getLogSpy();

    game.showPurchasedLottos();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("5개를 구매했습니다.");
  });

  test("발행된 로또 번호가 오름차순으로 정렬되어 출력된다.", () => {
    mockRandoms([[8, 21, 23, 41, 42, 43]]);
    const game = new LottoGame(1000);
    const logSpy = getLogSpy();

    game.showPurchasedLottos();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("[8, 21, 23, 41, 42, 43]");
  });

  test("당첨 통계를 올바르게 출력한다.", () => {
    mockRandoms([
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ]);

    const game = new LottoGame(8000);
    const logSpy = getLogSpy();

    game.showResult([1, 2, 3, 4, 5, 6], 7);

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("당첨 통계");
    expect(logs).toContain("3개 일치 (5,000원) - 1개");
    expect(logs).toContain("4개 일치 (50,000원) - 0개");
    expect(logs).toContain("5개 일치 (1,500,000원) - 0개");
    expect(logs).toContain("5개 일치, 보너스 볼 일치 (30,000,000원) - 0개");
    expect(logs).toContain("6개 일치 (2,000,000,000원) - 0개");
  });

  test("수익률을 올바르게 계산하고 출력한다.", () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);

    const game = new LottoGame(1000);
    const logSpy = getLogSpy();

    game.showResult([1, 2, 3, 4, 5, 6], 7);

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("총 수익률은 200000000.0%입니다.");
  });

  test("5등 당첨 시 수익률을 정확히 계산한다.", () => {
    mockRandoms([[1, 2, 3, 7, 8, 9]]);

    const game = new LottoGame(1000);
    const logSpy = getLogSpy();

    game.showResult([1, 2, 3, 4, 5, 6], 7);

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("총 수익률은 500.0%입니다.");
  });

  test("2등 당첨을 정확히 판정한다.", () => {
    mockRandoms([[1, 2, 3, 4, 5, 7]]);

    const game = new LottoGame(1000);
    const logSpy = getLogSpy();

    game.showResult([1, 2, 3, 4, 5, 6], 7);

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("5개 일치, 보너스 볼 일치 (30,000,000원) - 1개");
  });

  test("3등 당첨을 정확히 판정한다.", () => {
    mockRandoms([[1, 2, 3, 4, 5, 9]]);

    const game = new LottoGame(1000);
    const logSpy = getLogSpy();

    game.showResult([1, 2, 3, 4, 5, 6], 7);

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("5개 일치 (1,500,000원) - 1개");
  });

  test("낙첨 시 모든 등수가 0개로 표시된다.", () => {
    mockRandoms([[10, 20, 30, 40, 41, 42]]);

    const game = new LottoGame(1000);
    const logSpy = getLogSpy();

    game.showResult([1, 2, 3, 4, 5, 6], 7);

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("3개 일치 (5,000원) - 0개");
    expect(logs).toContain("총 수익률은 0.0%입니다.");
  });

  test("여러 장의 로또가 각각 다른 등수에 당첨된다.", () => {
    mockRandoms([
      [1, 2, 3, 4, 5, 6], // 1등
      [1, 2, 3, 4, 5, 7], // 2등
      [1, 2, 3, 4, 5, 9], // 3등
      [1, 2, 3, 4, 8, 9], // 4등
      [1, 2, 3, 8, 9, 10], // 5등
    ]);

    const game = new LottoGame(5000);
    const logSpy = getLogSpy();

    game.showResult([1, 2, 3, 4, 5, 6], 7);

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("3개 일치 (5,000원) - 1개");
    expect(logs).toContain("4개 일치 (50,000원) - 1개");
    expect(logs).toContain("5개 일치 (1,500,000원) - 1개");
    expect(logs).toContain("5개 일치, 보너스 볼 일치 (30,000,000원) - 1개");
    expect(logs).toContain("6개 일치 (2,000,000,000원) - 1개");
  });
});
