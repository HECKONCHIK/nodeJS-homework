import { battleRepository } from "../repositories/battleRepository.js";

class BattleService {
  getAll() {
    const battles = battleRepository.getAll();
    return battles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  create(data) {
    return battleRepository.create(data);
  }
}

const battleService = new BattleService();

export { battleService };
