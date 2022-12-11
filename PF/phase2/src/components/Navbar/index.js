import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Stack,
    Menu,
    MenuItem
  } from '@mui/material'
  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
  import { useState } from 'react'
  import Link from '@mui/material/Link';
  import LogoutIcon from '@mui/icons-material/Logout';
  import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';


  export const MuiNavbar = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null)
    }

    const handleLogOut = () => {
        localStorage.clear();
    }

    return (
      <AppBar position='static' color='transparent'>
        <Toolbar>
            <IconButton href="/" size='large' edge='start' color='primary' aria-label='logo'>
            <FitnessCenterIcon/>
            </IconButton>
          
          <Typography variant='h6' component='div' color='primary' sx={{ flexGrow: 1 }}>
            <b>TORONTO FITNESS CLUB</b>
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button href="/Subscriptions" color='inherit'>
                Subscriptions
            </Button>
            <Button href="/classes" color='inherit'>
                Classes
            </Button>
            <Button
              color='inherit'
              id='resources-button'
              aria-controls={open ? 'resources-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleClick}>
              Profile
            </Button>
            <Button href="/" color="primary">
                SIGNUP
            </Button>
            <Button href="/login" variant="contained" color="primary">
            Login
            </Button>
            <IconButton href="/" color="inherit" onClick={handleLogOut}>
                <LogoutIcon/>
            </IconButton>
          </Stack>
          <Menu
            id='resources-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            MenuListProps={{
              'aria-labelledby': 'resources-button'
            }}>
            <MenuItem onClick={handleClose}>
                <Link href="/edit" color="primary" underline="none">
                    Edit
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link href="/subscriptions/my_plan" color="primary" underline="none">
                    My Plan
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link href="/subscriptions/my_card" color="primary" underline="none">
                    My Card
                </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Link href="/my_payments" color="primary" underline="none">
                    Payments
                </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }