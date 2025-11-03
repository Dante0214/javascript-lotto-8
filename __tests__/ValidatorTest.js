import {
  validatePurchaseAmount,
  validateBonusNumber,
  parseNumbers,
} from "../src/validators.js";

describe("구입 금액 검증 테스트", () => {
  test("1,000원 단위가 아니면 예외가 발생한다.", () => {
    expect(() => validatePurchaseAmount("1500")).toThrow("[ERROR]");
  });

  test("1,000원 미만이면 예외가 발생한다.", () => {
    expect(() => validatePurchaseAmount("500")).toThrow("[ERROR]");
  });

  test("숫자가 아니면 예외가 발생한다.", () => {
    expect(() => validatePurchaseAmount("abc")).toThrow("[ERROR]");
  });

  test("올바른 금액은 숫자로 반환된다.", () => {
    expect(validatePurchaseAmount("8000")).toBe(8000);
  });
});

describe("보너스 번호 검증 테스트", () => {
  test("1~45 범위를 벗어나면 예외가 발생한다.", () => {
    expect(() => validateBonusNumber(46, [1, 2, 3, 4, 5, 6])).toThrow(
      "[ERROR]"
    );
  });

  test("당첨 번호와 중복되면 예외가 발생한다.", () => {
    expect(() => validateBonusNumber(1, [1, 2, 3, 4, 5, 6])).toThrow("[ERROR]");
  });

  test("올바른 보너스 번호는 숫자로 반환된다.", () => {
    expect(validateBonusNumber(7, [1, 2, 3, 4, 5, 6])).toBe(7);
  });
});

describe("번호 파싱 테스트", () => {
  test("쉼표로 구분된 문자열을 숫자 배열로 변환한다.", () => {
    expect(parseNumbers("1,2,3,4,5,6")).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("공백이 있어도 올바르게 파싱한다.", () => {
    expect(parseNumbers("1, 2, 3, 4, 5, 6")).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
