import { Icon } from "@iconify/react";
import {
  Avatar,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

const CategoriesItem = ({ category, level = 0, selectItem = () => {} }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = category.children && category.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      selectItem(category);
    }
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick} sx={{ pl: level * 2 }}>
        <ListItemIcon>
          <Avatar
            src={category.thumbnail}
            variant="rounded"
            sx={{
              border: "1px solid black",
              borderColor: "divider",
              width: "32px",
              height: "32px",
            }}
          />
        </ListItemIcon>
        <ListItemText primary={category.name} />
        {hasChildren && (
          <Icon
            icon={
              isOpen
                ? "solar:alt-arrow-up-linear"
                : "solar:alt-arrow-down-linear"
            }
            width="16"
            height="16"
          />
        )}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.children.map((child) => (
              <CategoriesItem
                key={child.id}
                category={child}
                level={level + 1}
                selectItem={selectItem}
              />
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );
};

export default CategoriesItem;
