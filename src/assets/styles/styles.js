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
  },
  cardOption: { 
    margin: 10, 
    width: "60%"
  },
  title: { marginTop: 18 },
  space: { padding: 10 },
  media: { width: 200 },
  btn: { width: 120 },
  largeButton: { width: 180 },
  largeInput: {
    fontSize: "35px!important",
    padding: "0!important",
    textAlign: "center!important",
    width: "60px!important",
  },
  bordered: {
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 2,
    margin: 5
  },
  borderColor: { borderColor: "#FFFFFF" },
  row: {
    display: "flex",
    padding: 10
  },
  around: { justifyContent: "space-around" },
  between: { justifyContent: "space-between" },
  fixed: {
    backgroundColor: "#FFFAFA",
    bottom: 0,
    position: "fixed",
    maxWidth: 600,
    width: "100%"
  },
  otherColor: {
    backgroundColor: "#003080",
    color: "#FFFFFF"
  },
  margin: { marginBottom: 115 },
  column: { flexDirection: "column" }
}));

export { useStyles };

// backgroundColor: "#F5F5F5",