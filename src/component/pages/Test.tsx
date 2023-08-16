import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Test() {
  React.useEffect(() => {
    console.log("test");
  }, []);

  return (
    <Stack direction="column" spacing={2}>
      <Button>Primary</Button>
      <Button disabled>Disabled</Button>
      <Button href="#text-buttons">Link</Button>
    </Stack>
  );
}

// import React from 'react'

// type Props = {}

// export default function Test({}: Props) {
//   return (
//     <div>Test</div>
//   )
// }
