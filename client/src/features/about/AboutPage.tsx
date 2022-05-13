import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const getValidationError = () =>
        agent.TestErrors.getValidationError()
            .then(() => console.log('Should not see this'))
            .catch(error => {
                console.log(error);
                setValidationErrors(error)});
    console.log(validationErrors?.length);

    return (
        <Container>
            <Typography gutterBottom variant="h2">
                Errors for testing purposes
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained'
                    onClick={() => agent.TestErrors.get400Error().catch(console.log)}>
                    Test 400 error
                </Button>
                <Button variant='contained'
                    onClick={() => agent.TestErrors.get401Error().catch(console.log)}>
                    Test 401 error
                </Button>
                <Button variant='contained'
                    onClick={() => agent.TestErrors.get404Error().catch(console.log)}>
                    Test 404 error
                </Button>
                <Button variant='contained'
                    onClick={() => agent.TestErrors.get500Error().catch(console.log)}>
                    Test 500 error
                </Button>
                <Button variant='contained' onClick={getValidationError}>
                    Test Validation error
                </Button>
            </ButtonGroup >
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error =>
                            <ListItem key={error}><ListItemText>{error}</ListItemText></ListItem>)}
                    </List>
                </Alert>}
        </Container>
    );
}
