import React, { useState, useMemo, useCallback } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { packer, SelectionStrategy, SplitStrategy } from "guillotine-packer";
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
  Grid,
  IconButton,
} from "@mui/material";
import {
  stringToColor,
  visualizeItems,
  truckLoad,
  freeTransferCriterion,
  productList,
  transportCreditPercentage,
  findLargestAvailableRectangles,
} from "../utils";
import { ItemVisualization } from "../components";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

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
        {
          selectionStrategy: SelectionStrategy.BEST_AREA_FIT,
          splitStrategy: SplitStrategy.LongLeftoverAxisSplit,
        }
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

  const transportCredit = useCallback(
    (totalPrice) => {
      if (totalPrice > freeTransferCriterion.targetPrice) {
        return (totalPrice * transportCreditPercentage).toFixed(2);
      }
      return 0;
    },
    [freeTransferCriterion]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>คำนวณการจัดส่ง</title>
      </Head>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              รายการสินค้า
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>รายการสินค้า</TableCell>
                    <TableCell align="right">น้ำหนัก</TableCell>
                    <TableCell align="right">
                      พื้นที่แนวราบ (กว้าง x ยาว)
                    </TableCell>
                    <TableCell align="right">ราคาต่อชิ้น</TableCell>
                    <TableCell align="right">จำนวนต่อแพ็ค</TableCell>
                    <TableCell align="right">วางซ้อนได้สูงสุด</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList.map((product, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                        ":hover": {
                          cursor: "pointer",
                          backgroundColor:
                            selectedProduct?.label &&
                            selectedProduct.label === product.label
                              ? undefined
                              : "#fcf2d7",
                        },
                        backgroundColor:
                          selectedProduct?.label &&
                          selectedProduct.label === product.label
                            ? "#FFAA21"
                            : undefined,
                      }}
                      onClick={() => {
                        setSelectedProduct(product);
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {product.label}
                      </TableCell>
                      <TableCell align="right">{product.weight}</TableCell>
                      <TableCell align="right">{`${product.width} x ${product.height}`}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">
                        {product.itemCountPerLoad}
                      </TableCell>
                      <TableCell align="right">{product.maxStack}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: 1,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              เลือกสินค้า
            </Typography>
            <Box
              sx={{
                display: "flex",
                columnGap: 2,
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ minWidth: "250px" }}
                options={productList}
                renderInput={(params) => (
                  <TextField {...params} label="สินค้า" />
                )}
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
                onChange={(e) => {
                  setSelectedProductLoadCount(e.target.value);
                }}
              />
              <Button
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
                onClick={() => {
                  if (selectedProduct && selectedProductLoadCount) {
                    setItems((prev) => {
                      if (
                        items.find((e) => e.label === selectedProduct.label)
                      ) {
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
            <Button
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
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
            {!!selectedProductDetail && (
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">รายละเอียดสินค้า</Typography>

                <Typography variant="body2" mt={1}>
                  รายการสินค้า: {selectedProductDetail.label}
                </Typography>
                <Typography variant="body2" mt={1}>
                  จำนวนต่อแพ็ค: {selectedProductDetail.itemCountPerLoad}
                </Typography>
                <Typography variant="body2" mt={1}>
                  ราคาต่อชิ้น: {selectedProductDetail.price}
                </Typography>
                <Typography variant="body2" mt={1} fontWeight="bold">
                  จำนวนชิ้นรวม:{" "}
                  {selectedProductLoadCount *
                    selectedProductDetail?.itemCountPerLoad}{" "}
                  ชิ้น
                </Typography>
                <Typography variant="body2" mt={1} fontWeight="bold">
                  น้ำหนักรวม:{" "}
                  {selectedProductDetail.weight *
                    selectedProductLoadCount *
                    selectedProductDetail?.itemCountPerLoad}{" "}
                  กก.
                </Typography>
                <Typography variant="body2" mt={1} fontWeight="bold">
                  มูลค่ารวม:{" "}
                  {selectedProductLoadCount *
                    selectedProductDetail?.itemCountPerLoad *
                    selectedProductDetail.price}{" "}
                  บาท
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ m: 5, width: "100%" }} />
      <Grid container spacing={2}>
        <Grid
          item
          md={6}
          xs={12}
          sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              รายการที่เลือก
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>รายการสินค้า</TableCell>
                    <TableCell align="right">น้ำหนัก</TableCell>
                    <TableCell align="right">
                      พื้นที่แนวราบ (กว้าง x ยาว)
                    </TableCell>
                    <TableCell align="right">จำนวนแพ็ค</TableCell>
                    <TableCell align="right">จำนวนชิ้นรวม</TableCell>
                    <TableCell align="right">มูลค่ารวม</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {item.label}
                      </TableCell>
                      <TableCell align="right">{item.weight}</TableCell>
                      <TableCell align="right">{`${item.width} x ${item.height}`}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            disabled={
                              items.find((ea) => ea.label === item.label)
                                .loadCount === 1
                            }
                            onClick={() => {
                              setItems((prev) => {
                                return prev.map((ea) => {
                                  if (ea.label === item.label) {
                                    if (ea.loadCount - 1 > 0) {
                                      ea.loadCount -= 1;
                                    }
                                  }
                                  return ea;
                                });
                              });
                            }}
                          >
                            <RemoveCircleRoundedIcon />
                          </IconButton>
                          {/* <TextField
                          label="จำนวนแพ็ค"
                          sx={{ minWidth: "80px" }}
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
                        /> */}
                          <Typography>{item.loadCount}</Typography>
                          <IconButton
                            onClick={() => {
                              setItems((prev) => {
                                return prev.map((ea) => {
                                  if (ea.label === item.label) {
                                    ea.loadCount += 1;
                                  }
                                  return ea;
                                });
                              });
                            }}
                          >
                            <AddCircleRoundedIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {item.itemCountPerLoad * item.loadCount}
                      </TableCell>
                      <TableCell align="right">
                        {item.itemCountPerLoad * item.loadCount * item.price}
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
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}
        >
          <Typography variant="h5" fontWeight="bold">
            การคำนวณปริมาตรและการจัดส่ง
          </Typography>
          <Typography>จำนวนเที่ยวที่ต้องใช้: {result?.length}</Typography>

          {result
            ?.sort((a, b) => {
              return (
                b.reduce((acc, cur) => {
                  return (acc +=
                    cur.item.price *
                    cur.item.loadCount *
                    cur.item.itemCountPerLoad);
                }, 0) -
                a.reduce((acc, cur) => {
                  return (acc +=
                    cur.item.price *
                    cur.item.loadCount *
                    cur.item.itemCountPerLoad);
                }, 0)
              );
            })
            ?.map((e, i) => {
              const deepClonedArray = [...e.map((each) => ({ ...each }))];
              const groupedItems = deepClonedArray.reduce((acc, cur) => {
                const found = acc.find((x) => x.item.label === cur.item.label);

                if (found) {
                  acc.map((e) => {
                    if (e.label === found.label) {
                      e.item.availableStack +=
                        cur.item.maxStack - cur.item.loadCount;
                      e.item.loadCount += cur.item.loadCount;
                    }
                  });
                } else {
                  acc.push({
                    ...cur,
                    item: {
                      ...cur.item,
                      availableStack: cur.item.maxStack - cur.item.loadCount,
                    },
                  });
                }

                return acc;
              }, []);

              const credit = transportCredit(
                e.reduce((acc, cur) => {
                  return (acc +=
                    cur.item.price *
                    cur.item.loadCount *
                    cur.item.itemCountPerLoad);
                }, 0)
              );

              return (
                <Box display="flex" flexDirection="column" mt={1} key={i}>
                  <Typography fontWeight="bold">เที่ยวที่ {i + 1}:</Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}
                  >
                    <ItemVisualization
                      width={truckLoad.width}
                      height={truckLoad.height}
                      renderWidth={truckLoad.width / 3}
                      renderHeight={truckLoad.height / 3}
                      items={e}
                      // sizeMultiplier={0.5}
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
                  <Typography mt={1}>
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
                  <Typography>
                    มูลค่ารวม:{" "}
                    <b>
                      {" "}
                      {e
                        .reduce((acc, cur) => {
                          return (acc +=
                            cur.item.price *
                            cur.item.loadCount *
                            cur.item.itemCountPerLoad);
                        }, 0)
                        .toFixed(2)}{" "}
                    </b>
                    บาท
                  </Typography>

                  <Typography>
                    เครดิตค่าจัดส่ง ({transportCreditPercentage * 100}%):{" "}
                    <b style={{ color: "green" }}> {credit} </b>
                    บาท
                  </Typography>

                  {(credit <= 0 ||
                    !!groupedItems.find((e) => e.item.availableStack)) && (
                    <>
                      <Typography>คำแนะนำ:</Typography>
                      {credit <= 0 && (
                        <Typography>
                          เพิ่มสินค้าอีกมูลค่า:{" "}
                          <b>
                            {" "}
                            {freeTransferCriterion.targetPrice -
                              e.reduce((acc, cur) => {
                                return (acc +=
                                  cur.item.price *
                                  cur.item.loadCount *
                                  cur.item.itemCountPerLoad);
                              }, 0)}{" "}
                          </b>
                          บาท เพื่อให้ได้เครดิตค่าจัดส่ง
                        </Typography>
                      )}
                      {!!groupedItems.find((e) => e.item.availableStack) && (
                        <>
                          {groupedItems
                            .filter((ea) => ea.item.availableStack)
                            .map((each) => {
                              return (
                                <Typography>
                                  สามารถเพิ่ม {each.item.label} ได้อีก{" "}
                                  {each.item.availableStack} แพ็ค{" "}
                                  โดยไม่ทำให้เสียพื้นที่แนวราบเพิ่ม
                                </Typography>
                              );
                            })}
                        </>
                      )}
                    </>
                  )}

                  <Typography>สินค้า:</Typography>
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>สินค้า</TableCell>
                          <TableCell align="right">จำนวนแพ็ค</TableCell>
                          <TableCell align="right">จำนวนชิ้น</TableCell>
                          <TableCell align="right">มูลค่ารวม</TableCell>
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
                              <TableCell align="right">
                                {itemDetail.loadCount *
                                  itemDetail.itemCountPerLoad *
                                  itemDetail.price}
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
        </Grid>
      </Grid>
    </div>
  );
}
