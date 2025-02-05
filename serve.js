const fastify = require('fastify')();
const port = 1337;

fastify.get('/move', async (request, reply) => {
  const { x, y } = request.query;
  
  if (!x || !y) {
    return { error: 'Les paramètres x et y sont requis' };
  }

  try {
    const { execSync } = require('child_process');
    const cmd = `ydotool mousemove ${x} ${y}` 
    console.info(cmd);
    execSync(cmd);
    return { message: 'Souris déplacée avec succès', position: { x, y } };
  } catch (error) {
    return { error: 'Erreur lors du déplacement de la souris', details: error.message };
  }
});

fastify.get('/click', async (request, reply) => {
  try {
    const { execSync } = require('child_process');
    const cmd = `ydotool click 1`; // 1 pour clic gauche
    console.info(cmd);
    execSync(cmd);
    return { message: 'Clic effectué avec succès' };
  } catch (error) {
    return { error: 'Erreur lors du clic', details: error.message };
  }
});

fastify.listen({ port }, () => console.log('API : http://localhost:' + port));
