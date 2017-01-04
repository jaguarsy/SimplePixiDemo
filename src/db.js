const config = {
  syncURL: 'https://shoot-game.wilddogio.com',
};

wilddog.initializeApp(config);
const ref = wilddog.sync().ref();
const players = ref.child('players');
const actions = ref.child('action');

let currentUserUnit;

export default {
  addCurrentUser(unit) {
    currentUserUnit = unit;
  },

  currentUser() {
    return currentUserUnit;
  },

  addPlayer: (nickName) => {
    const player = players.push({ nickName, count: 0 });
    player.onDisconnect().remove();
    return player;
  },

  onPlayerJoin: (callback) => {
    players.on('child_added', (snapshot) => {
      callback(snapshot.val());
    });
  },

  onPlayerLeave: (callback) => {
    players.on('child_removed', (snapshot) => {
      callback(snapshot.val());
    });
  },

  addAction: (uuid, action, args) => {
    actions.push({
      uuid,
      action,
      args,
    });
  },

  onAction: (callback) => {
    actions.on('child_added', (snapshot) => {
      const action = snapshot.val();
      if (action.uuid !== currentUserUnit.uuid) {
        callback(action);
      }
    });
  },
};