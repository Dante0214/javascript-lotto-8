import WinningNumbers from "../src/WinningNumbers.js";
import Lotto from "../src/Lotto.js";

describe("WinningNumbers 클래스 테스트", () => {
  test("유효한 당첨 번호와 보너스 번호로 생성할 수 있다.", () => {
    expect(() => {
      new WinningNumbers([1, 2, 3, 4, 5, 6], 7);
    }).not.toThrow();
  });

  test("보너스 번호가 당첨 번호와 중복되면 예외가 발생한다.", () => {
    expect(() => {
      new WinningNumbers([1, 2, 3, 4, 5, 6], 6);
    }).toThrow("[ERROR]");
  });

  test("당첨 번호가 유효하지 않으면 예외가 발생한다.", () => {
    expect(() => {
      new WinningNumbers([1, 2, 3, 4, 5], 7);
    }).toThrow("[ERROR]");
  });

  test("로또와 매칭하여 일치 개수와 보너스 일치 여부를 반환한다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6], 7);
    const lotto = new Lotto([1, 2, 3, 7, 8, 9]);

    const result = winningNumbers.match(lotto);

    expect(result.matchCount).toBe(3);
    expect(result.hasBonusMatch).toBe(true);
  });

  test("보너스 번호가 없는 경우 hasBonusMatch는 false다.", () => {
    const winningNumbers = new WinningNumbers([1, 2, 3, 4, 5, 6], 7);
    const lotto = new Lotto([1, 2, 3, 8, 9, 10]);

    const result = winningNumbers.match(lotto);

    expect(result.matchCount).toBe(3);
    expect(result.hasBonusMatch).toBe(false);
  });
});
