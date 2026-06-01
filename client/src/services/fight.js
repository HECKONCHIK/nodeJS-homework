function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  return fighter.power * criticalHitChance;
}

function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}

function fight(fighter1, fighter2, onHealthUpdate) {
  return new Promise((resolve) => {
    let winner = null;
    let fighter1Health = fighter1.health;
    let fighter2Health = fighter2.health;

    const updateHealth = () => {
      onHealthUpdate({
        fighter1Health: (fighter1Health / fighter1.health) * 100,
        fighter2Health: (fighter2Health / fighter2.health) * 100,
      });
    };

    const onKeyPress = (event) => {
      if (winner) return;

      // Player 1 Actions
      if (event.code === 'KeyA' && !event.repeat) {
        fighter2Health -= getHitPower(fighter1);
      } else if (event.code === 'KeyD' && !event.repeat) {
        fighter1Health += getBlockPower(fighter1);
      } else if (event.ctrlKey && event.shiftKey && event.code === 'KeyN') {
        fighter2Health -= getHitPower(fighter1) * 2;
      }
      // Player 2 Actions
      else if (event.code === 'KeyJ' && !event.repeat) {
        fighter1Health -= getHitPower(fighter2);
      } else if (event.code === 'KeyL' && !event.repeat) {
        fighter2Health += getBlockPower(fighter2);
      } else if (event.ctrlKey && event.shiftKey && event.code === 'KeyM') {
        fighter1Health -= getHitPower(fighter2) * 2;
      }

      // Clamp health to prevent it from going above the initial value
      if (fighter1Health > fighter1.health) fighter1Health = fighter1.health;
      if (fighter2Health > fighter2.health) fighter2Health = fighter2.health;

      updateHealth();

      if (fighter1Health <= 0) {
        winner = fighter2;
      } else if (fighter2Health <= 0) {
        winner = fighter1;
      }

      if (winner) {
        document.removeEventListener('keydown', onKeyPress);
        resolve(winner);
      }
    };

    document.addEventListener('keydown', onKeyPress);
  });
}

export { fight };
