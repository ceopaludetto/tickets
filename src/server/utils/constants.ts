/**
 * Envs const
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const PUBLIC_PATH = process.env.PUBLIC_PATH as string;
export const STATIC_FOLDER = process.env.STATIC_FOLDER as string;

/**
 * Info const
 */
export const VERSION = '1';
export const APP_NAME = 'F3Desk';

/**
 * SecurityModule
 */
export const SECURITY_ROLE_DECORATOR = 'SECURITY_ROLE';
export const SECURITY_CUSTOM_MATCHER_DECORATOR = 'SECURITY_CUSTOM_MATCHER';

/**
 * Model Names
 */
export const POLITICA = 'Politica';
export const PERFIL = 'Perfil';
export const EMPRESA = 'Empresa';
export const USUARIO = 'Usuario';
export const ASSOCIACAO = 'Associacao';
export const LABEL = 'Label';
export const TICKET = 'Ticket';

/**
 * GraphQL
 */
export const PUB_SUB = 'PUB_SUB';
export const SCHEMA_LINK = 'SCHEMA_LINK';
export const TICKET_ASYNC_ITERATOR = 'TICKET_ITERATOR';
