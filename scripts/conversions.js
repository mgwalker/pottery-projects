export const volumeConversions = new Map([
  [
    "in3",
    new Map([
      ["in3", 1],
      ["cm3", 16.387],
      ["fl-oz", 1 / 1.805],
      ["cup", 1 / 14.438],
    ]),
  ],
  [
    "cm3",
    new Map([
      ["in3", 1 / 16.387],
      ["cm3", 1],
      ["fl-oz", 1 / 29.574],
      ["cup", 1 / 236.588],
    ]),
  ],
  [
    "fl-oz",
    new Map([
      ["in3", 1.805],
      ["cm3", 29.574],
      ["fl-oz", 1],
      ["cup", 1 / 8],
    ]),
  ],
  [
    "cup",
    new Map([
      ["in3", 14.438],
      ["cm3", 236.588],
      ["fl-oz", 8],
      ["cup", 1],
    ]),
  ],
]);

export const lengthConversions = new Map([
  [
    "in",
    new Map([
      ["in", 1],
      ["cm", 2.54],
    ]),
  ],
  [
    "cm",
    new Map([
      ["in", 1 / 2.54],
      ["cm", 1],
    ]),
  ],
]);
