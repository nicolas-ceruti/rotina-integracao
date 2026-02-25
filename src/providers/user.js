import { config } from '../config/env.js';
import { logger } from '../infra/logger/index.js';

export class User {
    static async fetchUsers() {
        try {
            logger.info( 'Iniciando requisição para a API externa...');
            
            const response = await fetch(config.apiUrl);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            logger.info( 'Dados recebidos com sucesso. Mapeando payload...');
            
            return data.results.map(rawUser => ({
                email:         rawUser.email,
                firstName:     rawUser.name.first,
                lastName:      rawUser.name.last,
                age:           rawUser.dob.age,
                birthDate:     rawUser.dob.date
            }));

        } catch (error) {
            logger.error({ err: error.message }, 'Falha na comunicação com a API RandomUser');
            throw error;
        }
    }
}