import React, { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";

const styles = {
  container: {
    width: "100%",
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 12000
  },
  progress: {
    height: "2px"
  }
};

const eventlisteners = {};
export const ProgressListener = {
  on: (eventName, funcCall) => {
    if (!eventName || !funcCall) {
      return;
    }
    eventlisteners[eventName] = funcCall;
  },
  off: (eventName) => {
    if (!eventName || !eventlisteners[eventName]) {
      return;
    }
    delete eventlisteners[eventName];
  },
  emit: (eventName) => {
    if (!eventName || !eventlisteners[eventName]) {
      return;
    }
    eventlisteners[eventName]();
  }
};

export default function Progress() {
  const [state, setState] = useState(false);

  useEffect(() => {
    ProgressListener.on("start", () => setState(true));
    ProgressListener.on("stop", () => setState(false));

    return () => {
      ProgressListener.off("start");
      ProgressListener.off("stop");
    };
  }, []);

  return (
    <Box style={styles.container}>
      {state && <LinearProgress style={styles.progress} />}
    </Box>
  );
}
