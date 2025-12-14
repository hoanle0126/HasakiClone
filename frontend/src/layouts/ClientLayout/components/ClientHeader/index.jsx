import { MuiTheme } from "@/theme";
import { Icon } from "@iconify/react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getCategoryById } from "@/store/categories/action";
import MainSection from "./MainSection";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ClientHeader = () => {
  const containerRef = React.useRef(null);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [onDanhMuc, setOnDanhMuc] = React.useState(false);
  const dispatch = useDispatch();
  const categoriesReducer = useSelector((store) => store.categories);
  const [categoriesChildren, setCategoriesChildren] = React.useState({
    children: [],
  });

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  React.useEffect(() => {
    setOnDanhMuc(false);
    setCategoriesChildren({ children: [] });
  }, [location.pathname]);

  return (
    <>
      <MainSection />
      <Stack
        sx={{
          flexDirection: "row",
          backgroundColor: "primary.light",
          paddingX: { xs: "20px", sm: "40px", md: "80px", lg: "120px" },
          color: "primary.main",
          gap: "8px",
          alignItems: "center",
          height: "36px",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Stack
          direction="row"
          gap="4px"
          alignItems="center"
          height="100%"
          sx={{
            cursor: "pointer",
          }}
          onMouseEnter={() => setOnDanhMuc(true)}
          onMouseLeave={() => setOnDanhMuc(false)}
        >
          <Icon
            icon="solar:hamburger-menu-outline"
            width="28"
            height="28"
            color={theme.palette.primary.main}
          />
          <Typography
            variant="captiontext"
            textTransform="uppercase"
            color="primary.main"
            fontWeight={600}
          >
            Danh mục
          </Typography>
          <Icon icon="fluent:divider-tall-20-regular" width="18" height="18" />
        </Stack>
        {[
          { title: "Hasaki deals", to: "/deal-dang-dien-ra" },
          { title: "hot deals", to: "/campaign/wow" },
          { title: "thương hiệu", to: "/thuong-hieu" },
          { title: "hàng mới về" },
          { title: "bán chạy" },
        ].map((item, index) => (
          <Link to={item.to} key={index}>
            <Typography
              key={index}
              textTransform="uppercase"
              variant="captiontext"
              fontWeight={600}
            >
              {item.title}
            </Typography>
          </Link>
        ))}
        <div className="flex-1"></div>
      </Stack>
      {(onDanhMuc || categoriesChildren?.children?.length > 0) && (
        <Grid
          container
          sx={{
            paddingX: { xs: "20px", sm: "40px", md: "80px", lg: "120px" },
            position: "absolute",
            width: "100%",
            zIndex: "10000",
            display: { xs: "none", sm: "flex" },
          }}
        >
        {onDanhMuc && (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Stack
              sx={{
                border: "1px solid black",
                backgroundColor: "background.paper",
              }}
              onMouseEnter={() => setOnDanhMuc(true)}
              onMouseLeave={() => setOnDanhMuc(false)}
            >
              <Typography
                variant="captiontext"
                fontWeight={600}
                padding="8px 12px"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "grey.0",
                  },
                }}
                onClick={() => {
                  dispatch(
                    getCategoryById({
                      id: "suc-khoe-lam-dep",
                      onSuccess: () => {
                        navigate("/danh-muc/suc-khoe-lam-dep");
                      },
                    })
                  );
                }}
              >
                Sức Khỏe - Làm Đẹp
              </Typography>
              {categoriesReducer.categories?.map((item, index) => (
                <Stack
                  key={index}
                  onMouseEnter={() => {
                    setCategoriesChildren(item);
                  }}
                  onMouseLeave={() => {
                    setCategoriesChildren({ children: [] });
                  }}
                  sx={{
                    padding: "8px 12px",
                    flexDirection: "row",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "secondary.main",
                      color: "grey.0",
                    },
                  }}
                  onClick={() => {
                    dispatch(
                      getCategoryById({
                        id: item.url,
                        onSuccess: () => {
                          navigate("/danh-muc/" + item.url);
                        },
                      })
                    );
                  }}
                >
                  <Typography variant="captiontext" textTransform="capitalize">
                    {item.name}
                  </Typography>
                  <div className="flex-1"></div>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    width="20"
                    height="20"
                  />
                </Stack>
              ))}
            </Stack>
          </Grid>
        )}
        {categoriesChildren?.children?.length > 0 && (
          <Grid size={{ xs: 12, sm: 6, md: 8, lg: 6 }}>
            <Grid
              container
              sx={{
                border: "1px solid black",
                height: "100%",
                backgroundColor: "background.paper",
              }}
              onMouseEnter={() => {
                setOnDanhMuc(true);
                setCategoriesChildren(categoriesChildren);
              }}
              onMouseLeave={() => {
                setOnDanhMuc(false);
                setCategoriesChildren({ children: [] });
              }}
            >
              <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                <Box
                  ref={containerRef}
                  sx={{
                    paddingY: "16px",
                    maxHeight: "392px",
                    columnCount: { xs: 1, sm: 1, md: 2, lg: 2 },
                    overflowX: "auto",
                    "&::-webkit-scrollbar": {
                      display: "none", // Chrome, Safari
                    },
                  }}
                >
                  {categoriesChildren?.children?.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        breakInside: "avoid",
                      }}
                    >
                      <Typography
                        variant="captiontext"
                        padding="2px 12px"
                        display="block"
                        fontWeight={600}
                        className="cursor-pointer"
                        onClick={() => {
                          dispatch(
                            getCategoryById({
                              id: item.url,
                              onSuccess: () => {
                                navigate("/danh-muc/" + item.url);
                              },
                            })
                          );
                        }}
                      >
                        {item.name}
                      </Typography>
                      {item.children &&
                        item?.children?.map((itemChild, indexChild) => (
                          <Typography
                            key={indexChild}
                            variant="captiontext"
                            padding="2px 12px"
                            textTransform="capitalize"
                            display="block"
                            className="cursor-pointer"
                            onClick={() => {
                              dispatch(
                                getCategoryById({
                                  id: itemChild.url,
                                  onSuccess: () => {
                                    navigate("/danh-muc/" + itemChild.url);
                                  },
                                })
                              );
                            }}
                          >
                            {itemChild.name}
                          </Typography>
                        ))}
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <Stack
                  sx={{
                    position: "relative",
                    flexDirection: "column",
                    alignItems: "end",
                    height: "100%",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  <img
                    src={categoriesChildren.thumbnail}
                    alt=""
                    className="absolute -right-[50px] bottom-0  h-full"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        )}
        </Grid>
      )}
    </>
  );
};

export default ClientHeader;
