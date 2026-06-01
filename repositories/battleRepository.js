import { BaseRepository } from "./baseRepository.js";

class BattleRepository extends BaseRepository {
  constructor() {
    super("battles");
  }
}

const battleRepository = new BattleRepository();

export { battleRepository };
