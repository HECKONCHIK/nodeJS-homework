import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    return userRepository.getAll();
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(data) {
    const { email, phone } = data;
    const users = userRepository.getAll();

    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("User with this email already exists");
    }

    if (users.some(user => user.phone === phone)) {
      throw new Error("User with this phone number already exists");
    }

    return userRepository.create(data);
  }

  update(id, data) {
    const { email, phone } = data;
    const users = userRepository.getAll();

    if (email && users.some(user => user.id !== id && user.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("User with this email already exists");
    }

    if (phone && users.some(user => user.id !== id && user.phone === phone)) {
      throw new Error("User with this phone number already exists");
    }

    return userRepository.update(id, data);
  }

  delete(id) {
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
