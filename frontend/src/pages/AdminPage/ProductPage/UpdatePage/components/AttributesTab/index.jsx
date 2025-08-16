import ProductCard from "@/components/productCard";
import SelectProductModal from "@/components/SelectProductModal";
import CustomTabPanel from "@/components/tabPanel";
import {
  Box,
  Button,
  Card,
  Grid,
  OutlinedInput,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const AttributesTab = () => {
  const [option, setOption] = React.useState(0);
  const [addOption, setAddOption] = React.useState(-1);
  const [optionField, setOptionField] = React.useState();
  const [openOption, setOpenOption] = React.useState(-1);
  const [openModal, setOpenModal] = React.useState(false);
  const [attributes, setAttributes] = React.useState([
    {
      id: uuidv4(),
      label: "Loại da",
      display_type: "image",
      options: [
        {
          id: uuidv4(),
          value: "Da khô/Hỗn hợp khô",
          products: [
            {
              id: 1001,
              reviews: [],
              name: "Xịt Khoáng La Roche-Posay Làm Dịu Và Bảo Vệ Da 300g",
              url: "xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g_Cu8o4rXGKTXGq9fF.png",
              price: 504000,
              total_price: 362880,
              quantity: 0,
              quantity_cart: 0,
              remain: 0,
              sales: 28,
              guide:
                '<div style="font-size: 13px!important; font-family: arial, helvetica, sans-serif;color: black!important;"><ul>\r\n<li>\r\n<p>Sử dụng xịt kho&aacute;ng La Roche-Posay thường xuy&ecirc;n nhất c&oacute; thể, bất kỳ thời điểm n&agrave;o trong ng&agrave;y khi bạn cảm thấy da kh&ocirc;, mệt mỏi hoặc bị k&iacute;ch ứng.</p>\r\n</li>\r\n<li>\r\n<p>Để c&aacute;ch mặt 20cm v&agrave; xịt đều nhẹ nh&agrave;ng l&ecirc;n mặt v&agrave; cổ&nbsp;từ 2-3 lần xịt.</p>\r\n</li>\r\n<li>\r\n<p>Để tr&ecirc;n da 3 ph&uacute;t sau đ&oacute; vỗ nhẹ nh&agrave;ng để l&agrave;m kh&ocirc;. Sau đ&oacute;, tiếp tục d&ugrave;ng sữa dưỡng / kem dưỡng nếu cần.</p>\r\n</li>\r\n<li>\r\n<p>C&oacute; thể bảo quản trong tủ lạnh để tận hưởng cảm gi&aacute;c tươi m&aacute;t khi sử dụng.</p>\r\n</li>\r\n</ul></div>',
              images: [
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g_Cu8o4rXGKTXGq9fF.png",
                "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-1721200478.jpg",
                "https://media.hcdn.vn/catalog/product/t/e/tem-phu-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-1718599252.jpg",
                "https://media.hcdn.vn/catalog/product/certificate/la-roche-posay.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-2-1741854932.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-1-1741854932.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-8-1741854932.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-9-1742798888.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-7-1741854932.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-4-1742798875.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-6-1741854932.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-5-1741854932.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-3-1741854932.jpg",
                "https://media.hcdn.vn/catalog/product/g/o/google-shopping-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-300g-1742798875.jpg",
              ],
              categories_id: 801,
              english_name: "Thermal Spring Water Sensitive Skin",
              brand: {
                name: "La Roche-Posay",
                logo: "https://media.hcdn.vn//hsk/brandLa-roche-posay-logo1690281599.jpg",
              },
              brand_id: 253,
              created_at: "2025-08-13T09:28:07.000000Z",
              search_count: 0,
            },
            {
              id: 995,
              reviews: [],
              name: "Xịt Khoáng La Roche-Posay Làm Dịu Và Bảo Vệ Da 150g",
              url: "xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g",
              thumbnail:
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g_c4gKn4uhQn5w7kXD.png",
              price: 331000,
              total_price: 251560,
              quantity: 0,
              quantity_cart: 0,
              remain: 0,
              sales: 24,
              guide:
                '<div style="font-size: 13px!important; font-family: arial, helvetica, sans-serif;color: black!important;"><ul>\r\n<li>\r\n<p>Sử dụng xịt kho&aacute;ng La Roche-Posay thường xuy&ecirc;n nhất c&oacute; thể, bất kỳ thời điểm n&agrave;o trong ng&agrave;y khi bạn cảm thấy da kh&ocirc;, mệt mỏi hoặc bị k&iacute;ch ứng.</p>\r\n</li>\r\n<li>\r\n<p>Để c&aacute;ch mặt 20cm v&agrave; xịt đều nhẹ nh&agrave;ng l&ecirc;n mặt v&agrave; cổ&nbsp;từ 2-3 lần xịt.</p>\r\n</li>\r\n<li>\r\n<p>Để tr&ecirc;n da 3 ph&uacute;t sau đ&oacute; vỗ nhẹ nh&agrave;ng để l&agrave;m kh&ocirc;. Sau đ&oacute;, tiếp tục d&ugrave;ng sữa dưỡng / kem dưỡng nếu cần.</p>\r\n</li>\r\n<li>\r\n<p>C&oacute; thể bảo quản trong tủ lạnh để tận hưởng cảm gi&aacute;c tươi m&aacute;t khi sử dụng.</p>\r\n</li>\r\n</ul></div>',
              images: [
                "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g_c4gKn4uhQn5w7kXD.png",
                "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-1716607902.jpg",
                "https://media.hcdn.vn/catalog/product/t/e/tem-phu-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-1718598840.jpg",
                "https://media.hcdn.vn/catalog/product/certificate/la-roche-posay.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-9-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-3-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-1-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-7-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-4-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-5-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-8-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-6-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-2-1741857485.jpg",
                "https://media.hcdn.vn/catalog/product/x/i/xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-01.jpg",
                "https://media.hcdn.vn/catalog/product/g/o/google-shopping-xit-khoang-la-roche-posay-lam-diu-va-bao-ve-da-150g-1.jpg",
              ],
              categories_id: 801,
              english_name: "Thermal Spring Water Sensitive Skin",
              brand: {
                name: "La Roche-Posay",
                logo: "https://media.hcdn.vn//hsk/brandLa-roche-posay-logo1690281599.jpg",
              },
              brand_id: 253,
              created_at: "2025-08-13T09:28:16.000000Z",
              search_count: 0,
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      label: "Loại da 2",
      display_type: "image",
      options: [
        {
          id: uuidv4(),
          value: "Da khô/Hỗn hợp khô",
          products: [],
        },
      ],
    },
  ]);

  return (
    <Stack
      sx={{
        paddingY: "20px",
        gap: "20px",
      }}
    >
      {attributes.map((attribute, index) => (
        <Card key={attribute.id} component={Stack} gap="12px">
          <Grid container alignItems="center">
            <Grid size={2}>
              <Typography>Label</Typography>
            </Grid>
            <Grid flex={1}>
              <OutlinedInput
                size="small"
                fullWidth
                value={attribute.label}
                onChange={(e) => {
                  let startAttr = attributes.slice(0, index);
                  let endAttr = attributes.slice(index + 1, attributes.length);
                  setAttributes(
                    startAttr
                      .concat({ ...attribute, label: e.target.value })
                      .concat(endAttr)
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid size={2}>
              <Typography>Display Type</Typography>
            </Grid>
            <Grid flex={1}>
              <OutlinedInput
                size="small"
                fullWidth
                value={attribute.display_type}
                onChange={(e) => {
                  let startAttr = attributes.slice(0, index);
                  let endAttr = attributes.slice(index + 1, attributes.length);
                  setAttributes(
                    startAttr
                      .concat({ ...attribute, display_type: e.target.value })
                      .concat(endAttr)
                  );
                }}
              />
            </Grid>
          </Grid>
          <Stack>
            <Stack direction="row" alignItems="center" gap="12px">
              <Tabs
                value={option}
                onChange={(e, value) => {
                  setOption(value);
                  setOpenOption(attribute);
                }}
              >
                {attribute.options.map((it) => (
                  <Tab label={it.value} value={it} />
                ))}
              </Tabs>
              {attribute.id === addOption && (
                <Stack direction="row" alignItems="center" gap="12px">
                  <OutlinedInput
                    size="small"
                    value={optionField}
                    onChange={(e) => {
                      setOptionField(e.target.value);
                    }}
                    inputRef={(el) => el && el.focus()}
                  />
                </Stack>
              )}
              <div className="flex-1"></div>
              <Button
                onClick={() => {
                  setOptionField("");
                  setAddOption(attribute.id);
                  if (attribute.id === addOption) {
                    let startAttr = attributes.slice(0, index);
                    let endAttr = attributes.slice(
                      index + 1,
                      attributes.length
                    );
                    setAttributes(
                      startAttr
                        .concat({
                          ...attribute,
                          options: [
                            ...attribute.options,
                            {
                              id: uuidv4(),
                              value: optionField,
                              products: [],
                            },
                          ],
                        })
                        .concat(endAttr)
                    );
                    setAddOption(-1);
                  }
                }}
              >
                {attribute.id === addOption ? "Save" : "Add option"}
              </Button>
            </Stack>
            {openOption == attribute && (
              <Grid
                container
                sx={{
                  paddingTop: "12px",
                }}
                spacing="12px"
              >
                {option?.products.map((optionProduct) => (
                  <Grid size={2.4} >
                    <ProductCard size="small" item={optionProduct} />
                  </Grid>
                ))}
                <Grid size={2.4}>
                  <Button onClick={() => setOpenModal(true)}>
                    Add Product {attribute.options.indexOf(option)}
                  </Button>
                  <SelectProductModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    action={(modalValue) => {
                      const optionIndex = attribute.options.indexOf(option);
                      let startOption = attribute.options.slice(0, optionIndex);
                      let endOption = attribute.options.slice(
                        optionIndex + 1,
                        attribute.options.length
                      );
                      let newOption = startOption
                        .concat({
                          ...option,
                          products: option.products.concat(modalValue),
                        })
                        .concat(endOption);
                      let startAttr = attributes.slice(0, index);
                      let endAttr = attributes.slice(
                        index + 1,
                        attributes.length
                      );
                      let newAttr = startAttr
                        .concat({ ...attribute, options: newOption })
                        .concat(endAttr);
                      setAttributes(startAttr.concat(newAttr).concat(endAttr));
                      console.log("new", newAttr);
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Stack>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setAttributes((prev) =>
                prev.filter((it) => it.id !== attribute.id)
              );
            }}
          >
            Delete this attribute {attribute.options.length}
          </Button>
        </Card>
      ))}
      <Button
        variant="outlined"
        onClick={() => {
          setAttributes([
            ...attributes,
            {
              id: uuidv4(),
              label: "Loại da",
              display_type: "image",
              options: [
                {
                  value: "Da khô/Hỗn hợp khô",
                  products: [],
                },
              ],
            },
          ]);
        }}
      >
        Add new attribute
      </Button>
    </Stack>
  );
};

export default AttributesTab;
