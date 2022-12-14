import { Box, Button, CircularProgress, Typography } from "@mui/material";

import styles from "../../assets/styles/Styles.module.css";

import { useNavigate } from "react-router-dom";

import Logo from "../../components/Logo/Logo";

const Payment = () => {
  const navigate = useNavigate();

  return (
    <Box className={[styles.root, styles.navy]}>
      <Box className={[styles.main, styles.center]}>
        <Box>
          <Logo large></Logo>
          <Typography
            gutterBottom
            className={styles.title}
            variant="h3"
            component="h3"
          >
            Informe os dados do seu cartão, ririri...
          </Typography>
          <CircularProgress />
        </Box>
      </Box>
      <Box className={[styles.center, styles.space]}>
        <Button
          onClick={() => navigate("/finished-order")}
          variant="contained"
          color="secondary"
          className={styles.xLargeButton}
        >
          Finalize o seu pedido
        </Button>
      </Box>
    </Box>
  )
};

export default Payment;