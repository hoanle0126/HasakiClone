import { createTheme } from "@mui/material";
import { Palette } from "./elements/palette";
import { typography } from "./elements/typography";
import { Shadows } from "./elements/shadow";
import ComponentsCustom from "./elements/components";

const palette = Palette();
const shadowsData = Shadows(palette);

export const MuiTheme = createTheme({
  palette: Palette(),
  typography: typography,
  shadows: shadowsData.main,
  components: ComponentsCustom(shadowsData, palette, typography),
  customShadows: {
    header: shadowsData.header,
    ...shadowsData.custom,
    ...shadowsData.color,
  },
});
