import React, { useState, useMemo } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { packer, SelectionStrategy } from "guillotine-packer";
import {
  Autocomplete,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import {
  stringToColor,
  visualizeItems,
  truckLoad,
  freeTransferCriterion,
  productList,
} from "../utils";
import { ItemVisualization } from "../components";

export default function Home() {
  //     {
  //       label: "test",
  //       width: 20,
  //       height: 20,
  //       weight: 20,
  //       loadCount: 5,
  //       itemCountPerLoad: 50
  //     },
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductLoadCount, setSelectedProductLoadCount] = useState("");

  const result = useMemo(() => {
    const reevaluatedItems = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const productDetail = productList.find((e) => e.label === item.label);
      const splitCount = Math.ceil(item.loadCount / productDetail.maxStack);
      let remainingLoadCount = item.loadCount;
      for (let j = 0; j < splitCount; j += 1) {
        reevaluatedItems.push({
          ...item,
          loadCount:
            remainingLoadCount >= productDetail.maxStack
              ? productDetail.maxStack
              : remainingLoadCount,
        });
        remainingLoadCount -= productDetail.maxStack;
      }
    }
    try {
      const calculation = packer(
        {
          binHeight: truckLoad.height,
          binWidth: truckLoad.width,
          items: [
            ...reevaluatedItems.sort((a, b) => b.loadCount - a.loadCount),
          ],
        },
        { selectionStrategy: SelectionStrategy.BEST_AREA_FIT }
      );
      return calculation;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }, [items, productList, truckLoad, packer]);

  const selectedProductDetail = useMemo(
    () => productList.find((p) => p.label === selectedProduct?.label),
    [productList, selectedProduct]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>คำนวณการจัดส่ง</title>
      </Head>

      <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
          <Typography>เลือกสินค้า</Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: 2,
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={productList}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="สินค้า" />}
              value={selectedProduct}
              onChange={(e, value) => {
                // {height: 50;
                // itemCountPerLoad: 100;
                // label: 'เสารั้วอัดแรงหน้า 4"';
                // price: 70;
                // weight: 54;
                // width: 50;}
                setSelectedProduct(value);
              }}
            />
            <TextField
              label="จำนวนแพ็ค"
              type="number"
              value={selectedProductLoadCount}
              helperText={
                selectedProductLoadCount
                  ? `จำนวนชิ้นรวม: ${
                      selectedProductLoadCount *
                      selectedProductDetail?.itemCountPerLoad
                    }`
                  : undefined
              }
              onChange={(e) => {
                setSelectedProductLoadCount(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (selectedProduct && selectedProductLoadCount) {
                  setItems((prev) => {
                    if (items.find((e) => e.label === selectedProduct.label)) {
                      return items.map((ea) => {
                        if (ea.label === selectedProduct.label) {
                          ea.loadCount += parseInt(
                            selectedProductLoadCount,
                            10
                          );
                        }
                        return ea;
                      });
                    }

                    return [
                      ...prev,
                      {
                        ...selectedProduct,
                        loadCount: parseInt(selectedProductLoadCount, 10),
                        itemCountPerLoad: selectedProduct.itemCountPerLoad,
                      },
                    ];
                  });
                  setSelectedProductLoadCount("");
                  setSelectedProduct("");
                }
              }}
            >
              เพิ่มลงตะกร้า
            </Button>
          </Box>
          {!!selectedProductDetail && (
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">รายละเอียดสินค้า</Typography>
              <Typography variant="body2" mt={1}>
                ชื่อ: {selectedProductDetail.label}
              </Typography>
              <Typography variant="body2" mt={1}>
                น้ำหนัก: {selectedProductDetail.weight}
              </Typography>
              <Typography variant="body2" mt={1}>
                ปริมาตรแพ็ค (กว้าง x ยาว): {selectedProductDetail.width} x{" "}
                {selectedProductDetail.height}
              </Typography>
              <Typography variant="body2" mt={1}>
                จำนวนต่อแพ็ค: {selectedProductDetail.itemCountPerLoad}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Divider sx={{ m: 5, width: "100%" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: 4,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
          <Typography>รายการที่เลือก</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>รายการสินค้า</TableCell>
                  <TableCell align="right">น้ำหนัก</TableCell>
                  <TableCell align="right">ปริมาตร (กว้าง x ยาว)</TableCell>
                  <TableCell align="right">จำนวนแพ็ค</TableCell>
                  <TableCell align="right">จำนวนชิ้นรวม</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.label}
                    </TableCell>
                    <TableCell align="right">{item.weight}</TableCell>
                    <TableCell align="right">{`${item.width} x ${item.height}`}</TableCell>
                    <TableCell align="right">
                      <TextField
                        label="จำนวนแพ็ค"
                        type="number"
                        value={item.loadCount}
                        onChange={(e) => {
                          if (e.target.value && e.target.value > 0) {
                            setItems((prev) => {
                              return prev.map((ea) => {
                                if (ea.label === item.label) {
                                  ea.loadCount = e.target.value;
                                }
                                return ea;
                              });
                            });
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {item.itemCountPerLoad * item.loadCount}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          setItems((prev) =>
                            prev.filter((each, i) => i !== index)
                          );
                        }}
                      >
                        ลบสินค้า
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
          <Typography>การคำนวณปริมาตรและการจัดส่ง</Typography>
          <Typography>จำนวนเที่ยวที่ต้องใช้: {result?.length}</Typography>

          {result?.map((e, i) => {
            const deepClonedArray = [...e.map((each) => ({ ...each }))];
            const groupedItems = deepClonedArray.reduce((acc, cur) => {
              const found = acc.find((x) => x.item.label === cur.item.label);

              if (found) {
                acc.map((e) => {
                  if (e.label === found.label) {
                    e.item.loadCount += cur.item.loadCount;
                  }
                });
              } else {
                acc.push({ ...cur, item: { ...cur.item } });
              }

              return acc;
            }, []);
            return (
              <Box display="flex" flexDirection="column" mt={1} key={i}>
                <Typography fontWeight="bold">เที่ยวที่ {i + 1}:</Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
                >
                  <ItemVisualization
                    width={truckLoad.width}
                    height={truckLoad.height}
                    items={e}
                  />
                  <Box>
                    {groupedItems.map((ea, ind) => {
                      return (
                        <Box
                          key={ind}
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                          columnGap={1}
                        >
                          <Box
                            backgroundColor={
                              productList.find(
                                (eac) => eac.label === ea.item.label
                              ).representedColor
                            }
                            width={15}
                            height={15}
                          />
                          <Typography>{ea.item.label}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
                <Typography>
                  การใช้สอยพื้นที่แนวราบ:{" "}
                  {(
                    (e.reduce((acc, cur) => {
                      return (acc += cur.height * cur.width);
                    }, 0) /
                      (truckLoad.width * truckLoad.height)) *
                    100
                  ).toFixed(2)}
                  %
                </Typography>
                <Typography>สินค้า:</Typography>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>สินค้า</TableCell>
                        <TableCell align="right">จำนวนแพ็ค</TableCell>
                        <TableCell align="right">จำนวนชิ้น</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {groupedItems.map((item, index) => {
                        const itemDetail = item.item;
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {itemDetail.label}
                            </TableCell>
                            <TableCell align="right">
                              {itemDetail.loadCount}
                            </TableCell>
                            <TableCell align="right">
                              {itemDetail.loadCount *
                                itemDetail.itemCountPerLoad}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
}
