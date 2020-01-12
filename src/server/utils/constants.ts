/**
 * Envs const
 */
// eslint-disable-next-line no-unneeded-ternary
export const PUBLIC_PATH = process.env.PUBLIC_PATH as string;
export const STATIC_FOLDER = process.env.STATIC_FOLDER as string;

/**
 * Info const
 */
export const VERSION = '1';
export const APP_NAME = 'F3Desk';

/**
 * Sequelize
 */
export const SEQUELIZE_PROVIDER = 'SEQUELIZE';
export const RECURSO = 'Recurso';
export const SUB_RECURSO = 'SubRecurso';
export const PERMISSAO = 'Permissao';
export const EMPRESA = 'Empresa';
export const USUARIO = 'Usuario';
export const ASSOCIACAO = 'Associacao';
export const ROTULO = 'Rotulo';
export const TICKET = 'Ticket';
export const STATUS = 'Status';
export const ASSOCIACAO_PERMISSAO = 'AssociacaoPermissao';
export const PERMISSAO_SUB_RECURSO = 'PermissaoSubRecurso';
export const ROTULO_TICKET = 'RotuloTicket';

/**
 * SecurityModule
 */
export const SECURITY_ROLE_DECORATOR = 'SECURITY_ROLE';
export const SECURITY_CUSTOM_MATCHER_DECORATOR = 'SECURITY_CUSTOM_MATCHER';

/**
 * Custom ID generator
 */
export { generate as SHORTID } from 'shortid';
