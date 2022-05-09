import { AppBar, FormControlLabel, FormGroup, Toolbar, Typography, Switch } from "@mui/material";
import React from "react";

interface Props {
    darkMode: boolean,
    setDarkMode(newDarkMode: boolean): void,
}

export default function Header({ darkMode, setDarkMode }: Props) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDarkMode(e.target.checked);
    }

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant='h6'>
                    Re-STORE
                </Typography>
            </Toolbar>
            <FormGroup>
                <FormControlLabel label='Dark' control={
                    <Switch inputProps={{ 'aria-label': 'controlled' }}
                        checked={darkMode}
                        onChange={handleChange} />} />
            </FormGroup>
        </AppBar>
    )
}
