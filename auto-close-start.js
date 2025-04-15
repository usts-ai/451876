const { spawn } = require('child_process');
const kill = require('tree-kill');

const reactApp = spawn('npm', ['run', 'start:no-browser'], {
  shell: true,
  stdio: 'inherit'
});

// Temps avant arrêt (en millisecondes)
const TIMEOUT = 30000;

setTimeout(() => {
  console.log(`⏱️ Temps écoulé (${TIMEOUT / 1000}s). Fermeture du serveur React...`);
  kill(reactApp.pid, 'SIGTERM', (err) => {
    if (err) {
      console.error('❌ Impossible de fermer le serveur :', err);
    } else {
      console.log('✅ Serveur React arrêté proprement.');
    }
  });
}, TIMEOUT);
