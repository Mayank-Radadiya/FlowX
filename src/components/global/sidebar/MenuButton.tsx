import {
  Menu,
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubPopup,
  MenuSubTrigger,
  MenuTrigger,
} from "@/components/ui/menu";

interface MenuButtonProps {
  label?: string;
  icon?: React.ReactNode;
}

const MenuButton = () => {
  return (
    <>
      <Menu>
        <MenuTrigger>Open</MenuTrigger>
        <MenuPopup align="start" sideOffset={4}>
          <MenuItem>Profile</MenuItem>
          <MenuSeparator />

          <MenuGroup>
            <MenuGroupLabel>Playback</MenuGroupLabel>
            <MenuItem>Play</MenuItem>
            <MenuItem>Pause</MenuItem>
          </MenuGroup>

          <MenuSeparator />

          <MenuCheckboxItem>Shuffle</MenuCheckboxItem>
          <MenuCheckboxItem>Repeat</MenuCheckboxItem>

          <MenuSeparator />

          <MenuGroup>
            <MenuGroupLabel>Sort by</MenuGroupLabel>
            <MenuRadioGroup>
            </MenuRadioGroup>
          </MenuGroup>

          <MenuSeparator />

          <MenuSub>
            <MenuSubTrigger>Add to playlist</MenuSubTrigger>
            <MenuSubPopup>
              <MenuItem>Jazz</MenuItem>
              <MenuItem>Rock</MenuItem>
            </MenuSubPopup>
          </MenuSub>
        </MenuPopup>
      </Menu>
    </>
  );
};

export default MenuButton;
