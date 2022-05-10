import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import {
    NavLink as RouterLink,
    LinkProps as RouterLinkProps
} from 'react-router-dom';

export { ListItemLink };

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
                itemProps,
                ref,
            ) {
                return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
            }),
        [to],
    );

    return (
        <ListItem button
            component={renderLink}
            sx={{
                color: 'inherit',
                typography: 'h6',
                '&:hover': {color:'grey.500'},
                '&.active': {color: 'text.secondary'},
            }} >
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} />
        </ListItem >
    );
}
