import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  FormControl,
  Input,
  InputLabel,
  ListItemButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import EditorTiptap from "@/components/EditorTiptap";

const GeneralTab = ({ product, setProduct }) => {
  return (
    <Stack
      sx={{
        paddingTop: "20px",
        gap: "28px",
        "& .MuiInputBase-input.MuiOutlinedInput-input": {
          fontSize: 14,
        },
      }}
    >
      <Card>
        <Stack gap={"20px"}>
          <Typography variant="h6">General</Typography>
          <Stack gap={"8px"}>
            <Typography variant="subtitle2">Name</Typography>
            <OutlinedInput
              size="small"
              color="custom"
              fullWidth
              placeholder="Enter product name..."
              value={product?.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
            />
            <Typography variant="captiontext" color={"text.disabled"}>
              A product name is required and recommended to be unique.
            </Typography>
          </Stack>
          <Stack gap={"8px"}>
            <Typography variant="subtitle2">English Name</Typography>
            <OutlinedInput
              size="small"
              color="custom"
              fullWidth
              placeholder="Enter product name..."
              value={product?.english_name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  english_name: e.target.value,
                })
              }
            />
            <Typography variant="captiontext" color={"text.disabled"}>
              A product name is required and recommended to be unique.
            </Typography>
          </Stack>
          <Stack gap={"8px"}>
            <Typography variant="subtitle2">Quantity</Typography>
            <OutlinedInput
              size="small"
              color="custom"
              type="number"
              defaultValue={0}
              fullWidth
              placeholder="Enter product name..."
              value={product?.quantity}
              onChange={(e) =>
                setProduct({
                  ...product,
                  quantity: e.target.value,
                })
              }
            />
            <Typography variant="captiontext" color={"text.disabled"}>
              A product name is required and recommended to be unique.
            </Typography>
          </Stack>
          <Stack gap={"8px"}>
            <Typography variant="subtitle2">Description</Typography>
            <EditorTiptap
              content={product.description}
              setContent={(contentValue) =>
                setProduct({
                  ...product,
                  description: contentValue,
                })
              }
            />
            <Typography variant="captiontext" color={"text.disabled"}>
              A product name is required and recommended to be unique.
            </Typography>
          </Stack>
          <Stack gap={"20px"}>
            <Typography variant="h6">Sales</Typography>
            <Stack gap={"8px"}>
              <Typography variant="subtitle2">Base price</Typography>
              <OutlinedInput
                size="small"
                color="custom"
                fullWidth
                type="number"
                placeholder="Enter base price..."
                value={product?.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: e.target.value,
                  })
                }
              />
              <Typography variant="captiontext" color={"text.disabled"}>
                A product name is required and recommended to be unique.
              </Typography>
            </Stack>
            <Stack gap={"8px"}>
              <Typography variant="subtitle2">Sales value</Typography>
              <OutlinedInput
                size="small"
                color="custom"
                fullWidth
                type="number"
                placeholder="Enter base price..."
                value={product?.sales}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    sales: e.target.value,
                  })
                }
              />
              <Typography variant="captiontext" color={"text.disabled"}>
                A product name is required and recommended to be unique.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default GeneralTab;
