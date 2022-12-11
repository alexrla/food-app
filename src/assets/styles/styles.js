import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  navy: {
    backgroundColor: "#003080"
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
  centerColumn: {
    flexDirection: "column"
  },
  green: {
    backgroundColor: "#00B020"
  },
  largeLogo: {
    height: 100
  },
  logo: {
    height: 50
  },
  cards: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%"
  },
  card: { 
    margin: 10, 
    width: "60%" 
  },
  space: { padding: 10 },
  media: { width: 200 },
}));

export { useStyles };