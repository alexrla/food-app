import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
  },
  red: {
    backgroundColor: "#FF2040",
    color: "#FFFFFF"
  },
  main: {
    color: "#FFFFFF",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    overflow: "auto"
  },
  center: {
    alignItems: "center",
    display: "flex",
    gap: 10,
    justifyContent: "center",
    textAlign: "center"
  },
  green: {
    backgroundColor: "#00B020"
  },
  largeLogo: {
    height: 100
  }
}));

export { useStyles };