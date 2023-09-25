import { IresponseCode } from '../../core/entity/common/response-code.interface';

export type TreponseCode = 'ERROR' | 'ERROR_CLAIMS' | 'ERROR_DATA' | 'NOT_FOUND' | 500 | 404 | 403 | 400 | 401;

export const RESPONSE_CODE: Record<TreponseCode, IresponseCode> = {
  ERROR: {
    code: 'ERROR',
    message: 'Se presentó error al procesar la solicitud. Por favor, intente en un momento.',
  },
  ERROR_CLAIMS: {
    code: 'ERROR',
    message: 'La solicitud no tiene la información necesaria para ser procesada.',
  },
  ERROR_DATA: {
    code: 'ERROR_DATA',
    message: 'Los datos de la soliCitud no tienen el formato correcto.',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'No se encontró información.',
  },
  500: {
    code: 'ERROR',
    message: 'Se presentó error al procesar la solicitud. Por favor, intente en un momento.',
  },
  404: {
    code: 'ERROR_RESOCURCE',
    message: 'La funcionalidad solicitada no se encuentra implementada en el sistema.',
  },
  403: {
    code: 'FORBIDDEN',
    message: 'No tiene los permisos para ejecutar esta operación.',
  },
  401: {
    code: 'FORBIDDEN',
    message: 'No tiene los permisos para ejecutar esta operación.',
  },
  400: {
    code: 'ERROR_DATA',
    message: 'Los datos de la soliCitud no tienen el formato correcto.',
  },
};
