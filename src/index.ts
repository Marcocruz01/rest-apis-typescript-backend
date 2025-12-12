import server from './server';
import colors from 'colors';

// Variable del puerto definida
const port = process.env.PORT || 4000;

// Iniciamos el servidor en el puerto 4000
server.listen(port, () => {
    console.log(colors.blue.bold(`REST API en el puerto ${port}`));
});
