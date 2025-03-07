'use client'

import { useOCAuth } from '@opencampus/ocid-connect-js';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function OCLoginButton() {
    const { ocAuth } = useOCAuth();
    const theme = useTheme();

    const handleLogin = async () => {
        try {
            await ocAuth.signInWithRedirect({ state: 'opencampus' });
        } catch (error) {
            console.error('Login error:', error);
        }
    }


    return <Button
        variant="contained"
        style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            borderRadius: '50px',
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: theme.palette.secondary.main
        }}
        onClick={handleLogin}
    >
        Connect OCID
    </Button>;
}