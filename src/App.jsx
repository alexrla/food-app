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
import SelectPayment from "./pages/SelectPayment/SelectPayment";
import Payment from "./pages/Payment/Payment";
import FinishedOrder from "./pages/FinishedOrder/FinishedOrder";
import Admin from "./pages/Admin/Admin";
import Queue from "./pages/Queue/Queue";

import { useContext } from "react";

import { Store } from "./context/OrderInfo";

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
    },
    terciary: { main: "#4169E1", contrastText: "#FFFFFF" }
  }
});

const App = () => {
  const { state } = useContext(Store);
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth={state.widthScreen ? "xl" : "sm"}  style={{paddingLeft: 0, paddingRight: 0}}>
            <Paper>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/choose" element={<Choose />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/review" element={<Review />} />
                  <Route path="/select-payment" element={<SelectPayment />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/finished-order" element={<FinishedOrder />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/services" element={<Queue />} />
                </Routes>
            </Paper>
          </Container>
        </ThemeProvider>
    </BrowserRouter>
  )
};

export default App;
