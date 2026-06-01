import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(data) {
    const { name } = data;
    const fighters = fighterRepository.getAll();

    if (fighters.some(fighter => fighter.name.toLowerCase() === name.toLowerCase())) {
      throw new Error("Fighter with this name already exists");
    }

    return fighterRepository.create(data);
  }

  update(id, data) {
    const { name } = data;
    const fighters = fighterRepository.getAll();

    if (name && fighters.some(fighter => fighter.id !== id && fighter.name.toLowerCase() === name.toLowerCase())) {
      throw new Error("Fighter with this name already exists");
    }

    return fighterRepository.update(id, data);
  }

  delete(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };
