import { 
  Container, 
  createTheme,
  CssBaseline, 
  Paper,
  ThemeProvider 
} from "@mui/material";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Choose from "./pages/Choose/Choose";
import Order from "./pages/Order/Order";
import Review from "./pages/Review/Review";

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
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="sm"  style={{paddingLeft: 0, paddingRight: 0}}>
            <Paper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/choose" element={<Choose />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/review" element={<Review />} />
                </Routes>
            </Paper>
          </Container>
        </ThemeProvider>
    </BrowserRouter>
  )
};

export default App;
