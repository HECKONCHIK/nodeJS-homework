import { useState } from 'react';
import { Box } from '@mui/material';
import SignInUpPage from '../signInUpPage';
import { isSignedIn } from '../../services/authService';
import Fight from '../fight';
import SignOut from '../signOut';
import BattleHistory from '../battleHistory';

export default function StartScreen() {
    const [loggedIn, setLoggedIn] = useState(isSignedIn());

    if (!loggedIn) {
        return <SignInUpPage setIsLoggedIn={setLoggedIn} />;
    }

    return (
        <>
            <SignOut isSignedIn={loggedIn} onSignOut={() => setLoggedIn(false)} />
            <Fight />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <BattleHistory />
            </Box>
        </>
    );
}
