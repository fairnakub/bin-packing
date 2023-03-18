import ProductList from "../types/ProductList";

export const truckLoad = {
  width: 500,
  height: 240, // ยาว
  weightLimit: 240,
  //   width: 100,
  //   height: 100, // ยาว
};

export const transportCreditPercentage = 0.04;

export const freeTransferCriterion = {
  targetPrice: 40000,
  weightLimit: 600,
  maxDistance: 30,
};

export const productList: ProductList[] = [
  // {
  //   name: 'เสารั้วอัดแรงหน้า 3"',
  //   weight: 54,
  //   width: 100,
  //   height: 200,
  //   price: 30,
  //   itemCountPerLoad: 180,
  //   maxCount: 2,
  //   representedColor: "#AADDEA",
  // },
  {
    name: 'เสารั้ว หน้า 3" x 100',
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 45,
    itemCountPerLoad: 120,
    maxCount: 2,
    representedColor: "#AADDEA",
  },
  {
    name: 'เสารั้ว หน้า 3" x 150',
    weight: 80, // TODO
    itemWeight: 0,
    width: 90,
    height: 150,
    price: 45 * 1.5,
    itemCountPerLoad: 80,
    maxCount: 2,
    representedColor: "#AADDAE",
  },
  {
    name: 'เสารั้ว หน้า 3" x 200',
    weight: 0, // TODO
    itemWeight: 0,
    width: 90,
    height: 200,
    price: 45 * 2,
    itemCountPerLoad: 60,
    maxCount: 2,
    representedColor: "#FFAFAF",
  },
  {
    name: 'เสารั้ว หน้า 3" x 250',
    weight: 0, // TODO
    itemWeight: 0,
    width: 90,
    height: 250,
    price: 45 * 2.5,
    itemCountPerLoad: 50,
    maxCount: 2,
    representedColor: "#FFAFFF",
  },
  {
    name: 'เสารั้ว หน้า 4" x 200',
    weight: 0, // TODO
    itemWeight: 0,
    width: 90,
    height: 200,
    price: 65 * 2,
    itemCountPerLoad: 40,
    maxCount: 2,
    representedColor: "#1EAFAA",
  },
  {
    name: 'เสารั้ว หน้า 4" x 250',
    weight: 0, // TODO
    itemWeight: 0,
    width: 90,
    height: 250,
    price: 65 * 2.5,
    itemCountPerLoad: 32,
    maxCount: 2,
    representedColor: "#134523",
  },
  {
    name: 'เสาบ้าน หน้า 4" x 100',
    weight: 0, // TODO
    itemWeight: 0,
    width: 20,
    height: 100,
    price: 130,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#112233",
  },
  {
    name: 'เสาบ้าน หน้า 4" x 150',
    weight: 0, // TODO
    itemWeight: 0,
    width: 20,
    height: 150,
    price: 110 * 1.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#1FA344",
  },
  {
    name: 'เสาบ้าน หน้า 4" x 200',
    weight: 0, // TODO
    itemWeight: 0,
    width: 20,
    height: 200,
    price: 110 * 2,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#1D31AE",
  },
  {
    name: 'เสาบ้าน หน้า 4" x 250',

    weight: 0, // TODO
    itemWeight: 0,
    width: 20,
    height: 250,
    price: 105 * 2.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#12AADD",
  },
  {
    name: 'เสาบ้าน หน้า 4" x 300',
    weight: 0, // TODO
    itemWeight: 0,
    width: 20,
    height: 300,
    price: 105 * 3,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#31CAFF",
  },
  {
    name: 'เสาบ้าน หน้า 5" x 100',
    weight: 0, // TODO
    itemWeight: 0,
    width: 26.5,
    height: 100,
    price: 160,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#412FAC",
  },
  {
    name: 'เสาบ้าน หน้า 5" x 150',

    weight: 0, // TODO
    itemWeight: 0,
    width: 26.5,
    height: 150,
    price: 145 * 1.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#555AAC",
  },
  {
    name: 'เสาบ้าน หน้า 5" x 200',

    weight: 0, // TODO
    itemWeight: 0,
    width: 26.5,
    height: 200,
    price: 145 * 2,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#222AAC",
  },
  {
    name: 'เสาบ้าน หน้า 5" x 250',

    weight: 0, // TODO
    itemWeight: 0,
    width: 26.5,
    height: 250,
    price: 145 * 2.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#8F1F1F",
  },
  {
    name: 'เสาบ้าน หน้า 5" x 300',

    weight: 0, // TODO
    itemWeight: 0,
    width: 26.5,
    height: 300,
    price: 145 * 3,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#88F888",
  },
  {
    name: 'เสาบ้าน หน้า 5" x 350',

    weight: 0, // TODO
    itemWeight: 0,
    width: 26.5,
    height: 350,
    price: 145 * 3.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#888899",
  },
  {
    name: 'เสาบ้าน หน้า 6" x 100',

    weight: 0, // TODO
    itemWeight: 0,
    width: 30,
    height: 100,
    price: 240,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#777666",
  },
  {
    name: 'เสาบ้าน หน้า 6" x 150',

    weight: 0, // TODO
    itemWeight: 0,
    width: 30,
    height: 150,
    price: 220 * 1.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#455544",
  },
  {
    name: 'เสาบ้าน หน้า 6" x 200',

    weight: 0, // TODO
    itemWeight: 0,
    width: 30,
    height: 200,
    price: 220 * 2,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#112333",
  },
  {
    name: 'เสาบ้าน หน้า 6" x 250',

    weight: 0, // TODO
    itemWeight: 0,
    width: 30,
    height: 250,
    price: 230 * 2.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#884422",
  },
  {
    name: 'เสาบ้าน หน้า 6" x 300',

    weight: 0, // TODO
    itemWeight: 0,
    width: 30,
    height: 300,
    price: 230 * 3,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#766578",
  },
  {
    name: 'เสาบ้าน หน้า 6" x 350',

    weight: 0, // TODO
    itemWeight: 0,
    width: 30,
    height: 350,
    price: 230 * 3.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#889944",
  },
  {
    name: 'เสาบ้าน หน้า 6" x 400',

    weight: 0, // TODO
    itemWeight: 0,
    width: 30,
    height: 400,
    price: 230 * 3.5,
    itemCountPerLoad: 1,
    maxCount: 7,
    representedColor: "#897735",
  },
  {
    name: "อิฐตัวหนอน",
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 5.5,
    itemCountPerLoad: 576,
    maxCount: 1,
    representedColor: "#74645A",
  },
  {
    name: "อิฐตัวหนอน (สี)",
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 6.75,
    itemCountPerLoad: 576,
    maxCount: 1,
    representedColor: "#74645A",
  },
  {
    name: "อิฐตัวไอ",
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 6,
    itemCountPerLoad: 540,
    maxCount: 1,
    representedColor: "#FCB1FA",
  },
  {
    name: "อิฐตัวไอ (สี)",
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 7.25,
    itemCountPerLoad: 540,
    maxCount: 1,
    representedColor: "#FCB1FA",
  },
  {
    name: "อิฐสี่เหลี่ยม",
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 3,
    itemCountPerLoad: 2178,
    maxCount: 1,
    representedColor: "#00A0FA",
  },
  {
    name: "อิฐสี่เหลี่ยม (สี)",

    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 4.25,
    itemCountPerLoad: 2178,
    maxCount: 1,
    representedColor: "#00A0FA",
  },
  {
    name: "อิฐแปดเหลี่ยม",

    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 8.5,
    itemCountPerLoad: 450,
    maxCount: 1,
    representedColor: "#899308",
  },
  {
    name: "อิฐแปดเหลี่ยม (สี)",

    weight: 0, // TODO
    itemWeight: 0,
    width: 1,
    height: 1,
    price: 9.75,
    itemCountPerLoad: 450,
    maxCount: 1,
    representedColor: "#899308",
  },
  {
    name: "อิฐทางเดิน",

    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 22,
    itemCountPerLoad: 100,
    maxCount: 1,
    representedColor: "#949494",
  },
  {
    name: "บล็อคปูหญ้า (หน้าเรียบ)",
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 26,
    itemCountPerLoad: 90,
    maxCount: 1, // TODO: TO CHECK IF TRUE
    representedColor: "#389381",
  },
  {
    name: "บล็อคปูหญ้า (หน้าไม่เรียบ)",
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 23,
    itemCountPerLoad: 90,
    maxCount: 1, // TODO: TO CHECK IF TRUE
    representedColor: "#389381",
  },
  {
    name: "ขอบคันหิน",
    weight: 0, // TODO
    itemWeight: 0,
    width: 100,
    height: 100,
    price: 145,
    itemCountPerLoad: 24,
    maxCount: 1,
    representedColor: "#ABCDEF",
  },
];
