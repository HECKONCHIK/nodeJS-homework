import { useState, useEffect } from 'react';
import { Box, Button, Divider, Paper, LinearProgress, Typography } from '@mui/material';
import { getFighters } from '../../services/domainRequest/fightersRequest';
import { fight } from '../../services/fight';
import { createBattle } from '../../services/domainRequest/battleRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';

export default function Fight() {
    const [fighters, setFighters] = useState([]);
    const [fighter1, setFighter1] = useState(null);
    const [fighter2, setFighter2] = useState(null);
    const [winner, setWinner] = useState(null);
    const [isFighting, setIsFighting] = useState(false);
    const [health, setHealth] = useState({ fighter1Health: 100, fighter2Health: 100 });

    useEffect(() => {
        getFighters().then((data) => {
            if (data && !data.error) {
                setFighters(data);
            }
        });
    }, []);

    const handleHealthUpdate = (newHealth) => {
        setHealth(newHealth);
    };

    const handleStartFight = async () => {
        setIsFighting(true);
        setWinner(null);
        setHealth({ fighter1Health: 100, fighter2Health: 100 });

        const fightWinner = await fight(fighter1, fighter2, handleHealthUpdate);
        
        setWinner(fightWinner);
        setIsFighting(false);

        await createBattle({
            fighter1: fighter1.id,
            fighter2: fighter2.id,
            winner: fightWinner.id,
        });
    };

    const onCreate = (fighter) => {
        setFighters((prev) => [...prev, fighter]);
    };

    const fighter1List = fighter2 ? fighters.filter((f) => f.id !== fighter2.id) : fighters;
    const fighter2List = fighter1 ? fighters.filter((f) => f.id !== fighter1.id) : fighters;

    return (
        <Box sx={{ mt: 4 }}>
            <NewFighter onCreated={onCreate} />
            <Paper elevation={2} sx={{ width: '70%', mx: 'auto', mt: 3, display: 'flex', alignItems: 'flex-start' }}>
                <Fighter selectedFighter={fighter1} onFighterSelect={setFighter1} fightersList={fighter1List} />
                <Divider orientation="vertical" flexItem />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, pt: 2 }}>
                    <Button variant="contained" color="secondary" disabled={!fighter1 || !fighter2 || isFighting} onClick={handleStartFight}>
                        {isFighting ? 'Fighting...' : 'Start Fight'}
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Fighter selectedFighter={fighter2} onFighterSelect={setFighter2} fightersList={fighter2List} />
            </Paper>
            {(fighter1 && fighter2) && (
                <Paper elevation={2} sx={{ width: '70%', mx: 'auto', mt: 3, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ width: '45%' }}>
                            <Typography variant="subtitle2">{fighter1.name}</Typography>
                            <LinearProgress variant="determinate" value={health.fighter1Health} />
                        </Box>
                        <Box sx={{ width: '45%' }}>
                            <Typography variant="subtitle2">{fighter2.name}</Typography>
                            <LinearProgress variant="determinate" value={health.fighter2Health} />
                        </Box>
                    </Box>
                </Paper>
            )}
            {winner && (
                <Paper elevation={2} sx={{ width: '70%', mx: 'auto', mt: 3, p: 2 }}>
                    <Typography variant="h5" align="center">Winner: {winner.name}</Typography>
                </Paper>
            )}
        </Box>
    );
}
