import React from "react";
import {
  Grid,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
  List,
  ListItemButton,
  Collapse,
  Avatar,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import GeneralTab from "./components/GeneralTab";
import AdvancedTab from "./components/AdvancedTab";
import ImageThumbnail from "@/components/ImageThumbnail";
import { MuiTheme } from "@/theme";
import AdminDefaultLayout from "@/layouts/AdminLayout/DefaultLayout";
import CustomTabPanel from "@/components/tabPanel";
import SelectCategoryModal from "@/components/SelectCategoryModal";
import SelectBrandModal from "@/components/SelectBrandModal";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "@/store/products/action";
import { useNavigate, useParams } from "react-router-dom";

const ViewProductPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.products);
  const [tab, setTab] = React.useState("1");
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openBrand, setOpenBrand] = React.useState(false);
  const [product, setProduct] = React.useState({
    images: [],
    ingredient: {},
    sales: null,
    parameters: {
      Parameter: {
        Barcode: [null],
        "Thương hiệu": [null],
        "Xuất xứ thương hiệu": [null],
        "Nơi sản xuất": [null],
        "Loại da": [null],
        "Dung Tích": [null],
      },
    },
  });

  React.useEffect(() => {
    dispatch(
      getProductById({
        id: params.id,
        action: (data) => {
          setProduct(data);
        },
      })
    );
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        products: product,
        onSuccess: () => {
          navigate("/admin/products");
        },
        id: params.id,
      })
    );
  };

  return (
    <AdminDefaultLayout title={"Create new product"}>
      <Grid container spacing={"28px"} sx={{ paddingBottom: "12px" }}>
        <Grid size={3}>
          <Stack gap={"28px"}>
            <Box
              sx={{
                boxShadow: "custom.card",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingBottom: "40px",
              }}
            >
              <Typography variant="h6">Thumbnail</Typography>
              <ImageThumbnail
                src={product.thumbnail}
                setSrc={(src) =>
                  setProduct({
                    ...product,
                    thumbnail: src,
                  })
                }
              />
              <Typography
                variant="captiontext"
                color={"text.disabled"}
                width={"90%"}
              >
                Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
                image files are accepted
              </Typography>
            </Box>
            <Box
              sx={{
                boxShadow: "custom.card",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingBottom: "40px",
              }}
            >
              <Typography variant="h6">Category</Typography>
              {product?.category?.id ? (
                <Stack direction="row" alignItems="center" gap="12px">
                  <Avatar
                    src={product.category.thumbnail}
                    variant="rounded"
                    sx={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid black",
                      borderColor: "divider",
                    }}
                  />
                  {product.category.name}
                </Stack>
              ) : (
                "No category selected"
              )}
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setOpenCategory(true)}
              >
                Select category
              </Button>
            </Box>
            <Box
              sx={{
                boxShadow: "custom.card",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingBottom: "40px",
              }}
            >
              <Typography variant="h6">Brand</Typography>
              {product?.brand?.id ? (
                <Stack direction="row" alignItems="center" gap="12px">
                  <Avatar
                    src={product.brand.logo}
                    variant="rounded"
                    sx={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid black",
                      borderColor: "divider",
                    }}
                  />
                  {product.brand.name}
                </Stack>
              ) : (
                "No brand selected"
              )}
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setOpenBrand(true)}
              >
                Select Brand
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid size={9}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "primary.lighter",
            }}
          >
            <Tabs
              value={tab}
              onChange={handleTab}
              sx={{
                "& .MuiButtonBase-root.MuiTab-root": {
                  textTransform: "none",
                  fontStyle: theme.typography.subtitle2,
                },
              }}
            >
              <Tab label="General" value="1" />
              <Tab label="Advanced" value="2" />
            </Tabs>
          </Box>
          <CustomTabPanel tab={tab} index={1}>
            <GeneralTab product={product} setProduct={setProduct} />
          </CustomTabPanel>
          <CustomTabPanel tab={tab} index={2}>
            <AdvancedTab product={product} setProduct={setProduct} />
          </CustomTabPanel>
          <Stack
            sx={{
              flexFlow: "row",
              flexDirection: "row",
              justifyContent: "right",
              position: "sticky",
              bottom: 24,
              marginTop: "24px",
            }}
          >
            <Button
              variant="contained"
              color="common"
              sx={{ boxShadow: "main.z1" }}
              endIcon={<Icon icon="eva:save-fill" />}
              onClick={handleSubmit}
              loading={loading}
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <SelectCategoryModal
        open={openCategory}
        handleClose={() => setOpenCategory(false)}
        handleSelect={(categorySelected) => {
          setProduct({ ...product, category: categorySelected });
        }}
      />
      <SelectBrandModal
        open={openBrand}
        handleClose={() => setOpenBrand(false)}
        handleSelect={(brandSelected) => {
          setProduct({ ...product, brand: brandSelected });
        }}
      />
    </AdminDefaultLayout>
  );
};

export default ViewProductPage;
