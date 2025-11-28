import { formatDate } from "@/Function/formatDate";
import { formatTime } from "@/Function/formatTime";
import { Icon } from "@iconify/react";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  Stack,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepContent,
  StepLabel,
  Stepper,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ViewOrderPage = () => {
  const theme = useTheme();

  return (
    <AdminLayout title={"Detail"}>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          minHeight: "calc(100vh - 80px)",
        }}
        className="p-[30px] pt-0 flex flex-col gap-[28px] w-full"
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            paddingRight: "20px",
            gap: "12px",
          }}
        >
          <Stack direction="row" alignItems="start" gap="8px">
            <IconButton>
              <Icon icon="solar:alt-arrow-left-outline" />
            </IconButton>
            <Stack gap="4px">
              <Typography variant="h4" color="text.primary">
                Order #{props.order.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(props.order.created_at)
                  .concat(" ")
                  .concat(formatTime(props.order.created_at))}
              </Typography>
            </Stack>
          </Stack>
          <div className="flex-1"></div>
          <Button
            startIcon={<Icon icon="solar:check-read-broken" />}
            variant="contained"
            color="common"
            onClick={() =>
              router.put(route("orders.update", props.order.id), {
                status: "Shipping",
              })
            }
          >
            Submit
          </Button>
        </Stack>
        <Grid2 container spacing="20px" padding="20px">
          <Grid2 size={8}>
            <Stack gap="20px">
              <Box
                sx={{
                  boxShadow: "custom.card",
                  borderRadius: "12px",
                  backgroundColor:
                    theme.palette.mode === "dark" && "background.default",
                }}
              >
                <Box
                  sx={{
                    padding: "20px",
                    borderBottom: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    Details
                  </Typography>
                  <Stack sx={{ paddingTop: "20px" }}>
                    {props.order.products.map((item) => (
                      <Stack
                        key={item}
                        direction="row"
                        gap="12px"
                        sx={{
                          borderTop:
                            props.order.products.indexOf(item) != 0 &&
                            "1px dashed",
                          borderColor: "divider",
                          paddingY: "6px",
                        }}
                      >
                        <img
                          src={item.thumbnail}
                          alt=""
                          className="w-[48px] h-[48px] rounded-[12px]"
                        />
                        <Stack
                          sx={{
                            justifyContent: "center",
                            flex: 1,
                          }}
                        >
                          <Typography variant="body2" color="text.primary">
                            {item.name}
                          </Typography>
                          <Stack direction="row" gap="12px">
                            <Typography variant="body2" color="text.secondary">
                              #{item.id}
                            </Typography>
                            <div className="flex-1"></div>
                            <Typography variant="body2" color="text.primary">
                              x{item.pivot.quantity}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                            >
                              {formatCurrency(getPriceValue(item.price))}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
                <Grid2
                  container
                  sx={{
                    padding: "20px",
                  }}
                >
                  <Grid2 size={9}>
                    {["Subtotal"].map((item) => (
                      <Stack key={item} sx={{ alignItems: "end" }}>
                        <Typography variant="body2" color="text.secondary">
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Grid2>
                  <Grid2 size={3}>
                    {["Subtotal"].map((item) => (
                      <Stack key={item} sx={{ alignItems: "end" }}>
                        <Typography variant="subtitle2" color="text.primary">
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Grid2>
                </Grid2>
              </Box>
              <Box
                sx={{
                  boxShadow: "custom.card",
                  borderRadius: "12px",
                }}
              >
                <Stack
                  sx={{
                    padding: "20px",
                    borderBottom: "1px dashed",
                    borderColor: "divider",
                    gap: "20px",
                    backgroundColor:
                      theme.palette.mode === "dark" && "background.default",
                  }}
                >
                  <Typography variant="h6" color="text.primary">
                    History
                  </Typography>
                  <Stack direction="row">
                    <Timeline
                      sx={{
                        padding: 0,
                        [`& .${timelineItemClasses.root}:last-child`]: {
                          minHeight: 0,
                        },
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0,
                        },
                        "& .MuiTimelineConnector-root": {
                          backgroundColor: "divider",
                        },
                      }}
                    >
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot color="primary" />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Stack>
                            <Typography
                              variant="subtitle2"
                              color="text.primary"
                            >
                              Eat
                            </Typography>
                            <Typography
                              variant="captiontext"
                              color="text.secondary"
                            >
                              Eat
                            </Typography>
                          </Stack>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography color="text.primary">Code</Typography>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography color="text.primary">Sleep</Typography>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                    <Stack
                      sx={{
                        border: "1px dashed",
                        borderColor: "divider",
                        padding: "20px",
                        borderRadius: "12px",
                        minWidth: "240px",
                        gap: "16px",
                      }}
                    >
                      {[1, 2].map((item) => (
                        <Stack key={item} gap="4px">
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Order Time
                          </Typography>
                          <Typography variant="body2" color="text.primary">
                            30 Oct 2024 2:36 pm
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={4}>
            <Box
              sx={{
                boxShadow: "custom.card",
                borderRadius: "12px",
                backgroundColor:
                  theme.palette.mode === "dark" && "background.default",
              }}
            >
              <Stack
                sx={{
                  padding: "20px",
                  gap: "20px",
                  borderBottom: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" color="text.primary">
                  Customer info
                </Typography>
                <Stack direction="row" gap="12px">
                  <Avatar
                    sx={{
                      width: "44px",
                      height: "44px",
                      color: "text.primary",
                    }}
                  />
                  <Stack gap="4px">
                    <Typography variant="subtitle2" color="text.primary">
                      {props.order.user.first_name
                        .concat(" ")
                        .concat(props.order.user.last_name)}
                    </Typography>
                    <Typography variant="captiontext" color="text.secondary">
                      {props.order.user.email}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  padding: "20px",
                  gap: "20px",
                  borderBottom: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" color="text.primary">
                  Delivery
                </Typography>
                <Grid2 container spacing="12px">
                  <Grid2 size={4}>
                    <Stack gap="12px">
                      <Typography variant="body2" color="text.secondary">
                        Ship by
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Speedy
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Tracking No.
                      </Typography>
                    </Stack>
                  </Grid2>
                  <Grid2 size={8}>
                    <Stack gap="12px">
                      <Typography variant="body2" color="text.primary">
                        DHL
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        Standard
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "underline",
                        }}
                        color="text.primary"
                      >
                        SPX037739199373
                      </Typography>
                    </Stack>
                  </Grid2>
                </Grid2>
              </Stack>
              <Stack
                sx={{
                  padding: "20px",
                  gap: "20px",
                  borderBottom: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" color="text.primary">
                  Shipping
                </Typography>
                <Grid2 container spacing="12px">
                  <Grid2 size={4}>
                    <Stack gap="12px">
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                    </Stack>
                  </Grid2>
                  <Grid2 size={8}>
                    <Stack gap="12px">
                      <Typography variant="body2" color="text.primary">
                        19034 Verna Unions Apt. 164 - Honolulu, RI / 87535
                      </Typography>
                    </Stack>
                  </Grid2>
                  <Grid2 size={4}>
                    <Stack gap="12px">
                      <Typography variant="body2" color="text.secondary">
                        Phone number
                      </Typography>
                    </Stack>
                  </Grid2>
                  <Grid2 size={8}>
                    <Stack gap="12px">
                      <Typography variant="body2" color="text.primary">
                        365-374-4961
                      </Typography>
                    </Stack>
                  </Grid2>
                </Grid2>
              </Stack>
              <Stack
                sx={{
                  padding: "20px",
                  gap: "20px",
                  borderBottom: "1px dashed",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h6" color="text.primary">
                  Payment
                </Typography>
                <Stack direction="row" gap="12px" alignItems="center">
                  <div className="flex-1"></div>
                  <Typography variant="subtitle2" color="text.primary">
                    **** **** **** 5678
                  </Typography>
                  <Icon icon="logos:mastercard" />
                </Stack>
              </Stack>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </AdminLayout>
  );
};

export default ViewOrderPage;
