import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from 'antd/es/avatar/avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { AddCardOutlined } from '@mui/icons-material';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    let token = window.localStorage.getItem("auth-token")

    let name = ""

    if (token !== null) {
        console.log(name)
        name = window.localStorage.getItem("email").charAt(0)


    }
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenCart = () => {
        if (token === null) {
            navigate("/login")
        }
        else {
            navigate("/cart")
        }
    }

    const handleOpenOrder = () => {
        if (token === null) {
            navigate("/login")
        }
        else {
            navigate("/order")
        }
    }

    return (
        <Box height="100vh" >
            <AppBar position="static" className='bg-black'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="http://localhost:3000/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TopShoes
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >

                                <MenuItem key={"products"} onClick={() => { navigate("/search") }}>
                                    <Typography textAlign="center">Products</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TopShoes
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))} */}
                            <Button
                                key="products"
                                onClick={() => { navigate("/search") }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Product
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                {token !== null && (<IconButton>
                                    <AddCardOutlined color="primary" onClick={handleOpenOrder}></AddCardOutlined>
                                </IconButton>)}
                                {token !== null && (<IconButton>
                                    <ShoppingCartOutlinedIcon color="secondary" onClick={handleOpenCart}></ShoppingCartOutlinedIcon>
                                </IconButton>)}
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {token === null && (
                                        <Avatar size="large" icon={<UserOutlined />} />
                                    )}
                                    {token !== null && (
                                        <Avatar size="large" className="bg-orange-400 align-middle">
                                            {name}
                                        </Avatar>
                                    )}
                                </IconButton>

                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                                {token === null && (
                                    <div>
                                        <MenuItem onClick={() => { navigate("/login") }}>
                                            <Typography textAlign="center">Login</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => { navigate("/register") }}>
                                            <Typography textAlign="center">Regsiter</Typography>
                                        </MenuItem>
                                    </div>
                                )}
                                {token !== null && (
                                    <MenuItem onClick={() => {
                                        window.localStorage.removeItem("auth-token")
                                        window.localStorage.removeItem("user")
                                        window.localStorage.removeItem("email")
                                        navigate("/")
                                    }}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </Box >

    );
}
export default ResponsiveAppBar;