import { logger } from '../infra/logger/index.js';

export async function processIntegration(userProvider, userRepository) {
    const report = { totalProcessed: [], added: [], updated: [], ignored: [], errors: [] };
    
    let users = [];
    
    try {
        users = await userProvider.fetchUsers();
    } catch (error) {
        logger.error({ err: error.message }, 'Falha crítica ao buscar usuários da origem.');
        report.errors.push(`Falha na origem de dados: ${error.message}`);
        return report; 
    }
    
    logger.info('Iniciando regras de negócio e persistência...');
    
    for (const user of users) {
        report.totalProcessed++;

        if (user.age < 18) {
            logger.error({ user: user }, 'Falha ao salvar usuário. Idade inválida.');
            report.ignored.push(user.email);
            continue;  
        }

        try {
            const existingUser = await userRepository.findByEmail(user.email);

            // RQ04
            if (existingUser) {
                await userRepository.update(user);
                report.updated.push(user.email);
            } else {
                await userRepository.create(user);
                report.added.push(user.email);
            }
        } catch (error) {
            logger.error({ email: user.email, err: error.message }, 'Erro ao processar usuário');
            report.errors.push(`Erro no e-mail ${user.email}: ${error.message}`);
        }
    }

    logger.info('Processamento de integração finalizado.');
    return report;
}