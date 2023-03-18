type ProductList = {
  name: string;
  itemWeight: number;
  weight: number;
  width: number;
  height: number;
  price: number;
  itemCountPerLoad: number;
  maxCount: number;
  representedColor: string;
  [others: string]: any;
};

export default ProductList;
