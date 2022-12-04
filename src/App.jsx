import { 
  Container, 
  createTheme,
  CssBaseline, 
  Paper,
  ThemeProvider 
} from "@mui/material";

import Home from "./pages/Home/Home";

const theme = createTheme({
  typography: {
    h1: { fontWeight: "bold "},
    h2: {
      color: "#000000",
      fontSize: "2rem"
    },
    h3: {
      color: "#FFFFFF",
      fontSize: "1.8rem",
      fontWeight: "bold"
    }
  },
  palette: {
    primary: { main: "#FF1744"},
    secondary: {
      contrastText: "#FFFFFF",
      main: "#118E16"
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm"  style={{paddingLeft: 0, paddingRight: 0}}>
        <Paper>
          <Home />
        </Paper>
      </Container>
    </ThemeProvider>
  )
};

export default App;
