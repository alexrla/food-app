import { Box, Card, CardActionArea, Typography  } from "@mui/material"
import { TouchApp } from "@mui/icons-material"

import Logo from "../../components/Logo/Logo";

import { useStyles } from "../../assets/styles/styles";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const styles = useStyles();
  const navigate= useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate("/choose")}>
        <Box className={[styles.root, styles.red]}>
          <Box className={[styles.main, styles.center]}>
            <Typography component="h6" variant="h6">
              Rápido e Fácil
            </Typography>
            <Typography component="h1" variant="h1">
              Peça <br /> & Pague <br /> Aqui
            </Typography>
            <TouchApp fontSize="large"></TouchApp>
          </Box>
          <Box className={[styles.center, styles.green, styles.space]}>
            <Logo large></Logo>
            <Typography component="h5" variant="h5">
              Clique aqui
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
};

export default Home