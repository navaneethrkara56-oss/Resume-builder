import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import logo from '../assets/logo.png';

export default function Header() {
  const aboutText =
    'A Resume Builder App is an essential tool for job seekers looking to create polished and effective resumes. By combining ease of use with professional design options, these apps empower users to present their qualifications confidently and increase their chances of landing job interviews.';

  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        height: '85px',
        justifyContent: 'center',
        backgroundColor: 'indigo',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '85px !important',
          px: {
            xs: 2,
            sm: 3,
            md: 5
          }
        }}
      >

        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Rbuilder Logo"
          sx={{
            width: {
              xs: 48,
              sm: 54,
              md: 60
            },
            height: {
              xs: 48,
              sm: 54,
              md: 60
            },
            objectFit: 'contain',
            borderRadius: '10px',
            mr: 2
          }}
        />

        {/* Rbuilder */}
        <Typography
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: {
              xs: '1.4rem',
              sm: '1.6rem',
              md: '1.8rem'
            }
          }}
        >
          Rbuilder
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* About Us */}
        <Tooltip
          title={aboutText}
          arrow
          placement="bottom"
        >
          <Button
            color="inherit"
            sx={{
              fontSize: {
                xs: '0.95rem',
                sm: '1.05rem',
                md: '1.15rem'
              },
              textTransform: 'none',
              fontWeight: 500,
              px: {
                xs: 1,
                sm: 2,
                md: 2.5
              },
              py: 1
            }}
          >
            About Us
          </Button>
        </Tooltip>

      </Toolbar>
    </AppBar>
  );
}