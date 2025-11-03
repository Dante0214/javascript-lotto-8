import {
  determineRank,
  calculateProfitRate,
  calculateTotalPrize,
} from "../src/lottoCalculator.js";
import { RANK } from "../src/constants.js";

describe("등수 판정 테스트", () => {
  test("6개 일치하면 1등이다.", () => {
    expect(determineRank(6, false)).toBe(RANK.FIRST);
  });

  test("5개 일치하고 보너스 번호가 일치하면 2등이다.", () => {
    expect(determineRank(5, true)).toBe(RANK.SECOND);
  });

  test("5개 일치하면 3등이다.", () => {
    expect(determineRank(5, false)).toBe(RANK.THIRD);
  });

  test("4개 일치하면 4등이다.", () => {
    expect(determineRank(4, false)).toBe(RANK.FOURTH);
  });

  test("3개 일치하면 5등이다.", () => {
    expect(determineRank(3, false)).toBe(RANK.FIFTH);
  });

  test("2개 이하 일치하면 낙첨이다.", () => {
    expect(determineRank(2, false)).toBe(RANK.NONE);
    expect(determineRank(1, false)).toBe(RANK.NONE);
    expect(determineRank(0, false)).toBe(RANK.NONE);
  });
});

describe("수익률 계산 테스트", () => {
  test("수익률을 소수점 둘째 자리에서 반올림한다.", () => {
    expect(calculateProfitRate(5000, 8000)).toBe(62.5);
  });

  test("손실인 경우에도 수익률을 계산한다.", () => {
    expect(calculateProfitRate(0, 8000)).toBe(0);
  });

  test("수익률이 100%를 넘을 수 있다.", () => {
    expect(calculateProfitRate(10000, 8000)).toBe(125);
  });
});

describe("총 상금 계산 테스트", () => {
  test("당첨 통계로부터 총 상금을 계산한다.", () => {
    const statistics = {
      [RANK.FIRST]: 0,
      [RANK.SECOND]: 0,
      [RANK.THIRD]: 0,
      [RANK.FOURTH]: 0,
      [RANK.FIFTH]: 1,
    };
    expect(calculateTotalPrize(statistics)).toBe(5000);
  });

  test("여러 등수의 당첨이 있을 때 합계를 계산한다.", () => {
    const statistics = {
      [RANK.FIRST]: 0,
      [RANK.SECOND]: 0,
      [RANK.THIRD]: 0,
      [RANK.FOURTH]: 1,
      [RANK.FIFTH]: 2,
    };
    expect(calculateTotalPrize(statistics)).toBe(60000);
  });
});
