import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, createStandaloneToast } from "@chakra-ui/react";
import Loading from "./Loading";

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const toast = createStandaloneToast();
  const dispatch = useDispatch();
  useEffect(() => {
    if (alert.error) {
      return toast({
        title: "An error occurred.",
        description: `${alert.error}`,
        variant: "left-accent",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => dispatch({ type: "ALERT", payload: {} }),
      });
    } else if (alert.success) {
      return toast({
        title: "Success.",
        description: `${alert.success}`,
        variant: "left-accent",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => dispatch({ type: "ALERT", payload: {} }),
      });
    } else if (alert.info) {
      return toast({
        title: "Info.",
        description: `${alert.info}`,
        variant: "left-accent",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => dispatch({ type: "ALERT", payload: {} }),
      });
    } else if (alert.warning) {
      return toast({
        title: "Warning",
        description: `${alert.warning}`,
        variant: "left-accent",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => dispatch({ type: "ALERT", payload: {} }),
      });
    }
  }, [alert, toast]);

  return (
    <div>
      {alert.loading && (
        <Box
          w={"100vw"}
          h={"100vh"}
          mt={"-10vh"}
          position={"fixed"}
          zIndex={"1000"}
          display={"grid"}
          placeItems={"center"}
          background={"whiteAlpha.800"}
        >
          <Loading />
        </Box>
      )}
    </div>
  );
};

export default Alert;
