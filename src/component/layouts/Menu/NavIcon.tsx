import React from "react";

import Icon from "@mui/material/Icon";

type Props = {
  name: string;
};

const NavIcon = (props: Props) => {
  return <Icon>{props.name}</Icon>;
};

export default NavIcon;
