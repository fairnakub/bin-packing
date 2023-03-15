export const truckLoad = {
  width: 500,
  height: 240, // ยาว
  //   width: 100,
  //   height: 100, // ยาว
};

export const transportCreditPercentage = 0.04;

export const freeTransferCriterion = {
  targetPrice: 40000,
  weightLimit: 600,
  maxDistance: 30,
};

export const productList = [
  {
    label: 'เสารั้วอัดแรงหน้า 3"',
    weight: 54,
    width: 100,
    height: 200,
    price: 30,
    itemCountPerLoad: 180,
    maxStack: 2,
    representedColor: "#AADDEA",
  },
  {
    label: 'เสารั้วอัดแรงหน้า 4"',
    weight: 54,
    width: 120,
    height: 250,
    price: 70,
    itemCountPerLoad: 100,
    maxStack: 2,
    representedColor: "#FFD23A",
  },
  {
    label: "อิฐตัวหนอน",
    weight: 54,
    width: 300,
    height: 200,
    price: 80,
    itemCountPerLoad: 40,
    maxStack: 5,
    representedColor: "#AF12EA",
  },
];
