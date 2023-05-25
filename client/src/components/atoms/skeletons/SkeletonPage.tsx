import React from "react";
import { Grid, Skeleton } from "@mui/material";

function SkeletonPage() {
  const repeatTimes = [1, 2, 3];
  return (
    <Grid item container spacing={5}>
      {repeatTimes.map((item) => (
        <Grid item display={"flex"} flexDirection={"column"} xs={12} key={item}>
          <Skeleton variant="rectangular" width={"100%"} height={118} />
          <Skeleton variant="text" width={"100%"} height={30} />
          <Skeleton variant="text" width={"100%"} height={30} />
          <Skeleton variant="text" width={"100%"} height={30} />
        </Grid>
      ))}
    </Grid>
  );
}

export default SkeletonPage;
