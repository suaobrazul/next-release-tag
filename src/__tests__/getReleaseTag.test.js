import getReleaseTag from "../getReleaseTag";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it.each([
  [undefined],
  [null],
  ["abc"],
  ["1-0-0-0"],
  ["22-1-6-1"],
  ["DEPLOY-"],
  ["DEV-2"],
  ["DEV-2-3"],
  ["DEPLOY-2-1-1-5-6"],
])("should return first version when invalid version is passed", (input) => {
  jest.setSystemTime(new Date("2022-10-13"));
  expect(getReleaseTag(input)).toBe("2022-10-13-1");
});

it("should throw exception when malformed version is passed", () => {
  jest.setSystemTime(new Date("2022-10-13"));
  expect(getReleaseTag("DEV-2")).toBe("2022-10-13-1");
});

it("should return version with same month and year with incremented iteration", () => {
  jest.setSystemTime(new Date("2022-11-24"));
  expect(getReleaseTag("DEPLOY-2022-11-24-5")).toBe("2022-11-24-6");
});

it.each([["DEPLOY-2022-10-13-23"], ["DEV-2022-2-13-21"]])(
  "should return version with reset iteration, current month and same year",
  (input) => {
    jest.setSystemTime(new Date("2022-11-24"));
    expect(getReleaseTag(input)).toBe("2022-11-24-1");
  }
);

it.each([["DEV-2022-12-13-2"], ["DEPLOY-2020-05-13-14"]])(
  "should return version with reset iteration, current month and year",
  (input) => {
    jest.setSystemTime(new Date("2023-01-02"));
    expect(getReleaseTag(input)).toBe("2023-01-02-1");
  }
);
