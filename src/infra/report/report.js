import fs from 'fs/promises';
import { config } from '../../config/env.js';
import { logger } from '../logger/index.js';

const REPORTS_DIR = config.reportsDir;

export async function generateReport(reportData) {
    await fs.mkdir(REPORTS_DIR, { recursive: true });

    const fileName = `${REPORTS_DIR}/relatorio_${Date.now()}.txt`;

    const content = `
========================================
    RELATÓRIO DE INTEGRAÇÃO
========================================
Data de Execução: ${new Date().toLocaleString('pt-BR')}

RESUMO:
- Total de registros lidos: ${reportData.totalProcessed}
- Usuários adicionados: ${reportData.added.length}
- Usuários atualizados: ${reportData.updated.length}
- Usuários ignorados (< 18 anos): ${reportData.ignored.length}

ERROS ENCONTRADOS (${reportData.errors.length}):
${reportData.errors.length > 0 ? reportData.errors.join('\n') : 'Nenhum erro.'}
========================================

USUÁRIOS ADICIONADOS:
${reportData.added.length > 0 ? reportData.added.map(email => ` ${email}`).join('\n') : ' Nenhum usuário novo adicionado.'}

USUÁRIOS ATUALIZADOS:
${reportData.updated.length > 0 ? reportData.updated.map(email => ` ${email}`).join('\n') : ' Nenhum usuário atualizado.'}
    
USUÁRIOS IGNORADOS:
${reportData.ignored.length > 0 ? reportData.ignored.map(email => ` ${email}`).join('\n') : ' Nenhum usuário ignorado.'}
    
    `;

    await fs.writeFile(fileName, content, 'utf8');
    logger.info(`Relatório gerado com sucesso: ${fileName}`);
    
}