export const LOTTO = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_LENGTH: 6,
  PRICE: 1000,
};
export const PRIZE = {
  FIRST: { match: 6, bonus: false, amount: 2000000000 },
  SECOND: { match: 5, bonus: true, amount: 30000000 },
  THIRD: { match: 5, bonus: false, amount: 1500000 },
  FOURTH: { match: 4, bonus: false, amount: 50000 },
  FIFTH: { match: 3, bonus: false, amount: 5000 },
};

export const RANK = {
  FIRST: "FIRST",
  SECOND: "SECOND",
  THIRD: "THIRD",
  FOURTH: "FOURTH",
  FIFTH: "FIFTH",
  NONE: "NONE",
};
export const ERROR_MESSAGES = {
  INVALID_PURCHASE_AMOUNT:
    "[ERROR] 구입 금액은 1,000원 단위의 숫자여야 합니다.",
  INVALID_AMOUNT: "[ERROR] 구입 금액은 1,000원 이상이어야 합니다.",
  INVALID_NUMBER_COUNT: "[ERROR] 로또 번호는 6개여야 합니다.",
  INVALID_NUMBER_RANGE: "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
  INVALID_NUMBER_COUNT: "[ERROR] 로또 번호는 6개여야 합니다.",
  DUPLICATE_NUMBERS: "[ERROR] 로또 번호는 중복될 수 없습니다.",
  INVALID_NUMBER_FORMAT: "[ERROR] 로또 번호는 숫자여야 합니다.",
  BONUS_DUPLICATE: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
};
export const INPUT_MESSAGES = {
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
  WINNING_NUMBERS: "\n당첨 번호를 입력해 주세요.\n",
  BONUS_NUMBER: "\n보너스 번호를 입력해 주세요.\n",
};
export const OUTPUT_MESSAGES = {
  PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  STATISTICS_HEADER: "\n당첨 통계\n---",
  PROFIT_RATE: (rate) => `총 수익률은 ${rate.toFixed(1)}%입니다.`,
};
