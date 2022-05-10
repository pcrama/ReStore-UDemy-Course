import { ShoppingCart } from "@mui/icons-material";
import { AppBar, FormControlLabel, FormGroup, Toolbar, Typography, Switch, List, IconButton, Badge, Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { ListItemLink } from "./RouteLink";

interface Props {
    darkMode: boolean,
    setDarkMode(newDarkMode: boolean): void,
}

const midLinks = [
    { title: 'about', path: '/about' },
    { title: 'catalog', path: '/catalog' },
    { title: 'contact', path: '/contact' },
];

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
];

export default function Header({ darkMode, setDarkMode }: Props) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDarkMode(e.target.checked);
    }

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex'>
                    <Typography
                        variant='h6'
                        component={NavLink}
                        to='/'
                        sx={{ color: 'inherit', textDecoration: 'none' }}>
                        Re-STORE
                    </Typography>
                    <FormGroup sx={{ ml: 4 }}>
                        <FormControlLabel label='Dark' control={
                            <Switch inputProps={{ 'aria-label': 'controlled' }}
                                checked={darkMode}
                                onChange={handleChange} />} />
                    </FormGroup>
                </Box>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItemLink
                            key={path}
                            primary={title.toUpperCase()}
                            to={path} />))}
                </List>
                <Box display='flex'>
                    <IconButton size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={4} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItemLink key={path} primary={title.toUpperCase()} to={path} />))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
