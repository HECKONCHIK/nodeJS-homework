import { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getBattles } from '../../services/domainRequest/battleRequest';
import { getFighters } from '../../services/domainRequest/fightersRequest';

export default function BattleHistory() {
    const [battles, setBattles] = useState([]);
    const [fighters, setFighters] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getFighters().then((data) => {
            if (data && !data.error) {
                setFighters(data);
            }
        });
    }, []);

    const handleOpen = () => {
        getBattles().then((data) => {
            if (data && !data.error) {
                const battlesWithNames = data.map(battle => {
                    const fighter1 = fighters.find(f => f.id === battle.fighter1);
                    const fighter2 = fighters.find(f => f.id === battle.fighter2);
                    const winner = fighters.find(f => f.id === battle.winner);
                    return {
                        ...battle,
                        fighter1Name: fighter1 ? fighter1.name : 'Unknown',
                        fighter2Name: fighter2 ? fighter2.name : 'Unknown',
                        winnerName: winner ? winner.name : 'Unknown',
                    };
                });
                setBattles(battlesWithNames);
            }
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
                View History
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Battle History
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fighter 1</TableCell>
                                    <TableCell>Fighter 2</TableCell>
                                    <TableCell>Winner</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {battles.map((battle) => (
                                    <TableRow key={battle.id}>
                                        <TableCell>{battle.fighter1Name}</TableCell>
                                        <TableCell>{battle.fighter2Name}</TableCell>
                                        <TableCell>{battle.winnerName}</TableCell>
                                        <TableCell>{new Date(battle.createdAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </>
    );
}
