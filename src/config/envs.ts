
import 'dotenv/config'; // para que use las cofiguracion por defecto y cargue mis variables de entorno acorde al  archivo .env

import {get} from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').required().asString(),
}