import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const runException = async (input) => {
  // given
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];
  const INPUT_NUMBERS_TO_END = ["1000", "1,2,3,4,5,6", "7"];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions([input, ...INPUT_NUMBERS_TO_END]);

  // when
  const app = new App();
  await app.run();

  // then
  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
};

describe("로또 테스트", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("기능 테스트", async () => {
    // given
    const logSpy = getLogSpy();

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
    mockQuestions(["8000", "1,2,3,4,5,6", "7"]);

    // when
    const app = new App();
    await app.run();

    // then
    const logs = [
      "8개를 구매했습니다.",
      "[8, 21, 23, 41, 42, 43]",
      "[3, 5, 11, 16, 32, 38]",
      "[7, 11, 16, 35, 36, 44]",
      "[1, 8, 11, 31, 41, 42]",
      "[13, 14, 16, 38, 42, 45]",
      "[7, 11, 30, 40, 42, 43]",
      "[2, 13, 22, 32, 38, 45]",
      "[1, 3, 5, 14, 22, 45]",
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 62.5%입니다.",
    ];

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("잘못된 구입 금액 입력 시 재입력을 요구한다.", async () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    mockQuestions(["1500", "1000", "1,2,3,4,5,6", "7"]);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("[ERROR]");
    expect(logs).toContain("1개를 구매했습니다.");
  });

  test("잘못된 당첨 번호 입력 시 재입력을 요구한다.", async () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    mockQuestions(["1000", "1,2,3,4,5", "1,2,3,4,5,6", "7"]);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("[ERROR]");
    expect(logs).toContain("당첨 통계");
  });

  test("잘못된 보너스 번호 입력 시 재입력을 요구한다.", async () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    mockQuestions(["1000", "1,2,3,4,5,6", "1", "7"]);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("[ERROR]");
    expect(logs).toContain("당첨 통계");
  });

  test("1등 당첨 시 수익률이 올바르게 계산된다.", async () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    mockQuestions(["1000", "1,2,3,4,5,6", "7"]);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("6개 일치 (2,000,000,000원) - 1개");
    expect(logs).toContain("총 수익률은 200000000.0%입니다.");
  });

  test("2등 당첨 시 수익률이 올바르게 계산된다.", async () => {
    mockRandoms([[1, 2, 3, 4, 5, 7]]);
    mockQuestions(["1000", "1,2,3,4,5,6", "7"]);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("5개 일치, 보너스 볼 일치 (30,000,000원) - 1개");
    expect(logs).toContain("총 수익률은 3000000.0%입니다.");
  });

  test("모든 로또가 낙첨된 경우 수익률이 0%다.", async () => {
    mockRandoms([[10, 20, 30, 40, 41, 42]]);
    mockQuestions(["1000", "1,2,3,4,5,6", "7"]);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    expect(logs).toContain("총 수익률은 0.0%입니다.");
  });

  test("여러 번 잘못된 입력을 해도 게임이 정상적으로 진행된다.", async () => {
    mockRandoms([[1, 2, 3, 4, 5, 6]]);
    mockQuestions([
      "abc",
      "500",
      "1000",
      "1,2,3,4,5",
      "1,2,3,4,5,46",
      "1,2,3,4,5,6",
      "46",
      "1",
      "7",
    ]);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map((call) => call[0]).join("\n");
    const errorCount = (logs.match(/\[ERROR\]/g) || []).length;
    expect(errorCount).toBeGreaterThanOrEqual(4);
    expect(logs).toContain("당첨 통계");
  });
});

test("예외 테스트", async () => {
  await runException("1000j");
});
