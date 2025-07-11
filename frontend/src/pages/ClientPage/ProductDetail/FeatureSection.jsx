import GlobalStyle from "@/components/GlobalStyle";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Pagination,
  Rating,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailHeader from "./DetailHeader";
import { addReview } from "@/store/products/action";

const FeatureSection = ({ action }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = React.useState(0);
  const targetRef = React.useRef(null);
  const [expand, setExpand] = React.useState(false);
  const expandRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const paramRef = React.useRef(null);
  const ingredientRef = React.useRef(null);
  const guideRef = React.useRef(null);
  const reviewRef = React.useRef(null);
  const { product } = useSelector((store) => store.products);
  const [isVisible, setIsVisible] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const [reviewForm, setReviewForm] = React.useState({
    rating: 5,
    description: "",
    images: [],
  });

  const tabLists = [
    {
      title: "Mô tả",
      id: "mo-ta",
      action: () => {
        window.scrollTo({
          top:
            descriptionRef.current?.getBoundingClientRect().top +
            window.scrollY -
            74,
          behavior: "smooth",
        });
      },
    },
    {
      title: "Thông số",
      id: "thong-so",
      action: () => {
        window.scrollTo({
          top:
            paramRef.current?.getBoundingClientRect().top +
            window.scrollY -
            134,
          behavior: "smooth",
        });
      },
    },
    {
      title: "Thành phần",
      id: "thanh-phan",
      action: () => {
        window.scrollTo({
          top:
            ingredientRef.current?.getBoundingClientRect().top +
            window.scrollY -
            134,
          behavior: "smooth",
        });
      },
    },
    {
      title: "Cách dùng",
      id: "cach-dung",
      action: () => {
        window.scrollTo({
          top:
            guideRef.current?.getBoundingClientRect().top +
            window.scrollY -
            134,
          behavior: "smooth",
        });
      },
    },
    {
      title: "Đánh giá",
      id: "danh-gia",
      action: () => {
        window.scrollTo({
          top:
            reviewRef.current?.getBoundingClientRect().top +
            window.scrollY -
            134,
          behavior: "smooth",
        });
      },
    },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      const isInView = rect.bottom <= 134;
      setIsVisible(isInView);

      if (reviewRef.current.getBoundingClientRect().top <= 140) {
        setTab(4);
      } else if (guideRef.current.getBoundingClientRect().top <= 140) {
        setTab(3);
      } else if (ingredientRef.current.getBoundingClientRect().top <= 140) {
        setTab(2);
      } else if (paramRef.current.getBoundingClientRect().top <= 140) {
        setTab(1);
      } else if (descriptionRef.current.getBoundingClientRect().top <= 140) {
        setTab(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const timeout = setTimeout(handleScroll, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <DetailHeader
          tab={tab}
          setTab={setTab}
          action={action}
          tabLists={tabLists}
        />
      )}
      <Stack
        ref={descriptionRef}
        component="div"
        sx={{
          bgcolor: "background.paper",
          padding: "20px",
          gap: "32px",
          boxShadow: "custom.card",
          position: "relative",
        }}
      >
        <Stack direction="row" gap="36px" ref={targetRef}>
          {tabLists.map((item, index) => (
            <Typography
              key={index}
              className={Number(tab) === Number(index) && "link__activer"}
              onClick={item.action}
              sx={{
                cursor: "pointer",
              }}
            >
              {item.title}
            </Typography>
          ))}
        </Stack>
        <GlobalStyle>
          <Stack
            id="mo-ta"
            sx={{
              scrollMarginTop: "208px",
              overflow: "hidden",

              height: expand ? "100%" : "600px",
            }}
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></Stack>
        </GlobalStyle>
        <Button
          ref={expandRef}
          sx={{
            position: "absolute",
            bottom: "20px",
            transform: "translateX(-50%)",
            left: "50%",
          }}
          variant="outlined"
          size="large"
          onClick={() => {
            console.log(
              descriptionRef.current?.getBoundingClientRect().top +
                window.scrollY
            );
            setExpand(!expand);
            window.scrollTo({
              top:
                descriptionRef.current?.getBoundingClientRect().top +
                window.scrollY -
                134,
              behavior: "smooth",
            });
          }}
        >
          {!expand ? "Xem thêm" : "Ẩn bớt"}
        </Button>
      </Stack>
      <Stack
        ref={paramRef}
        id="thong-so"
        sx={{
          scrollMarginTop: "132px",
          bgcolor: "background.paper",
          padding: "20px",
          gap: "32px",
          boxShadow: "custom.card",
        }}
      >
        <Typography variant="h6">Thông số sản phẩm </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {product.parameters?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      borderColor: "divider",
                      backgroundColor: "background.neutral",
                    }}
                  >
                    {item.label}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      borderColor: "divider",
                    }}
                  >
                    {item.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack
        ref={ingredientRef}
        id="thanh-phan"
        sx={{
          bgcolor: "background.paper",
          padding: "20px",
          gap: "12px",
          boxShadow: "custom.card",
          scrollMarginTop: "132px",
        }}
      >
        <Typography variant="h6">Thành phần sản phẩm</Typography>
        <GlobalStyle>
          <Stack
            dangerouslySetInnerHTML={{ __html: product?.ingredients }}
          ></Stack>
        </GlobalStyle>
      </Stack>
      <Stack
        ref={guideRef}
        id="cach-dung"
        sx={{
          bgcolor: "background.paper",
          padding: "20px",
          boxShadow: "custom.card",
          scrollMarginTop: "132px",
        }}
      >
        <Typography variant="h6">Cách dùng</Typography>
        <GlobalStyle>
          <Stack dangerouslySetInnerHTML={{ __html: product?.guide }}></Stack>
        </GlobalStyle>
      </Stack>
      {/* Đánh giá */}
      <Stack
        ref={reviewRef}
        id="danh-gia"
        sx={{
          bgcolor: "background.paper",
          padding: "20px",
          boxShadow: "custom.card",
          scrollMarginTop: "132px",
          gap: "8px",
        }}
      >
        <Typography variant="h6">Đánh giá</Typography>
        <Typography variant="body2">Đánh giá trung bình</Typography>
        <Grid container spacing="12px">
          <Grid size={4}>
            <Stack sx={{ alignItems: "center", gap: "4px" }}>
              <Typography variant="h1" color="secondary.main">
                4.9
              </Typography>
              <Rating value={4} size="small" />
              <Typography variant="body2">105 nhận xét</Typography>
            </Stack>
          </Grid>
          <Grid size={4}>
            <Stack sx={{ alignItems: "center", gap: "4px" }}>
              {[
                {
                  name: "5 sao",
                  value: 96,
                  description: "Rất hài lòng",
                },
                { name: "4 sao", value: 0, description: "Hài lòng" },
                { name: "3 sao", value: 2, description: "Bình thường" },
                {
                  name: "2 sao",
                  value: 0,
                  description: "Không hài lòng",
                },
                { name: "1 sao", value: 2, description: "Rất tệ" },
              ].map((item) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap="8px"
                  width="100%"
                >
                  <Typography variant="body2">{item.name}</Typography>
                  <LinearProgress
                    value={item.value}
                    color="secondary"
                    variant="determinate"
                    sx={{ width: 140, height: "12px" }}
                  />
                  <Typography variant="body2">{item.value}</Typography>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {item.description}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid size={4}>
            <Stack
              sx={{
                alignItems: "center",
                gap: "4px",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Chia sẻ nhận xét của bạn về sản phẩm này
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => setOpenReview(!openReview)}
              >
                Viết bình luận
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {openReview && (
          <Stack
            sx={{
              padding: "6px 12px",
              backgroundColor: "background.neutral",
              gap: "12px",
            }}
          >
            <Typography variant="body2">Đánh giá sản phẩm này *</Typography>
            <Rating
              size="large"
              value={reviewForm.rating}
              onChange={(e, value) =>
                setReviewForm({ ...reviewForm, rating: value })
              }
            />
            <Stack direction="row">
              <Typography variant="body2">Mô tả nhận xét *</Typography>
              <div className="flex-1"></div>
              <Typography variant="body2">Ký tự còn lại 2500</Typography>
            </Stack>
            <OutlinedInput
              multiline
              minRows={2}
              value={reviewForm.description}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, description: e.target.value })
              }
            />
            <Stack direction="row" alignItems="center" gap="12px">
              <Typography variant="body2">
                Thêm hình sản phẩm nếu có (tối đa 5 hình):
              </Typography>
              <Button variant="contained" color="secondary">
                Chọn hình
              </Button>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              gap="12px"
              paddingTop="20px"
            >
              <Button variant="outlined" color="primary">
                Bỏ qua
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(
                    addReview({
                      review: { ...reviewForm, product_id: product.id },
                    })
                  );
                  console.log({ ...reviewForm, product_id: product.id });
                }}
              >
                Gửi
              </Button>
            </Stack>
          </Stack>
        )}
        <Stack
          sx={{
            padding: "6px 12px",
            backgroundColor: "background.neutral",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography variant="body1">
            105 bình luận cho sản phẩm này
          </Typography>
          <div className="flex-1"></div>
          <FormControl>
            <Select value={0} size="small" sx={{ width: 160, height: 28 }}>
              <MenuItem value={0}>Ngày đánh giá</MenuItem>
            </Select>
          </FormControl>
          <Pagination size="small" count={5} />
        </Stack>
        <Stack
          sx={{
            "& .review__item": {
              paddingY: "8px",
              borderColor: "divider",
              "&:not(:first-child)": { borderTopWidth: 1 },
            },
          }}
        >
          {product.reviews?.map((item, index) => (
            <Stack gap="4px" key={index} className="review__item">
              <Stack direction="row" alignItems="center" gap="8px">
                <Rating size="small" />
                <Typography variant="subtitle2" color="primary.main">
                  Hoàn Lê
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sữa Rửa Mặt CeraVe Sạch Sâu Cho Da Thường Đến Da Dầu 473ml
                </Typography>
                <div className="flex-1"></div>
                <Typography variant="body2" color="text.secondary">
                  04:58 | 2025-07-11
                </Typography>
              </Stack>
              <Typography variant="body2">
                Mình có chai retinol Candid 0,5% mới dùng 2 lần. Bao check hàng
                Hanna Olala. 600k pass do dùng mạnh với da quá Ai quan tâm liên
                hệ zalo 0362587279
              </Typography>
              <Avatar
                variant="square"
                sx={{
                  width: 80,
                  height: 80,
                }}
              />
              <Stack
                paddingLeft="20px"
                paddingTop="12px"
                alignItems="start"
                gap="8px"
              >
                <Typography
                  variant="captiontext"
                  sx={{
                    span: {
                      padding: "2px 6px",
                      bgcolor: "primary.main",
                      color: "background.paper",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <span>Hasaki</span> - 2025-06-16
                </Typography>
                <Typography variant="body2">
                  Hasaki xin chào! Hasaki cảm ơn Thu Hoa đã dành thời gian đánh
                  giá. Sự hài lòng của khách hàng là động lực to lớn để Hasaki
                  ngày càng phát triển hơn nữa về chất lượng dịch vụ. Cảm ơn bạn
                  đã tin tưởng và mua sắm tại Hasaki!
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
      {/*  */}
    </>
  );
};

export default FeatureSection;
