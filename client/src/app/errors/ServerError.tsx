import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { safeGetProp } from "../../api/agent";

export default function ServerError() {
    const { state } = useLocation();
    let error = null;
    return (
        <Container component={Paper}>
            {(error = safeGetProp(state, 'error'))
                ? (
                    <>
                        <Typography gutterBottom variant="h3" color='error'>{error.title}</Typography>
                        <Divider />
                        <Typography>{error.detail || 'Internal server error'}</Typography>
                    </>
                )
                : <Typography gutterBottom variant="h6">Server error</Typography>}
            <Button fullWidth component={Link} to="/catalog">Go back to catalog</Button>
        </Container>
    )
}
