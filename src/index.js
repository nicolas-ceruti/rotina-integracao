import { setupDatabase } from './infra/database/connection.js';
import { User } from './providers/user.js';
import { UserRepository } from './repositories/userRepository.js';
import { processIntegration } from './services/syncService.js';
import { generateReport } from './infra/reports/report.js';
import { logger } from './infra/logger/index.js';

async function main() {
    let db;
    try {
        db = await setupDatabase();
    
        const userRepository = new UserRepository(db);
        const userProvider  = User; 
        
        const report = await processIntegration(userProvider, userRepository);

        await generateReport(report);
        
        logger.info( 'Integração finalizada com sucesso!');
    } catch (error) {
        logger.error({ err: error.message }, 'Erro crítico na execução');
    } finally {
        if (db) {
            await db.close();
        }
    }
}

main();