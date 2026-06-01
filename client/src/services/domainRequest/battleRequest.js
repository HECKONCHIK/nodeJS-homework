import { callApi } from '../requestHelper';

export const getBattles = () => {
    const endpoint = 'battles/history';
    return callApi(endpoint, 'GET');
};

export const createBattle = (battle) => {
    const endpoint = 'battles/history';
    const body = JSON.stringify(battle);
    return callApi(endpoint, 'POST', body);
};
