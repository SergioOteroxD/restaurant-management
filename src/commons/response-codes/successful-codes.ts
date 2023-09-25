import { IresponseCode } from '../../core/entity/common/response-code.interface';

export type TreponseCode =
  | 'REGISTER_OK'
  | 'CONFIRM_OK'
  | 'CONFIRM_OK_NO_SESSION'
  | 'REQUEST_ACCESS_OK'
  | 'NO_SESSION'
  | 'ACCESS_OK'
  | 'QUERY_OK'
  | 'REQUEST_VERIFICATION_OK'
  | 'RESULT_VERIFICATION_OK'
  | 'UPDATE_STATUS_OK';

export const SUCCESSFUL_CODES: Record<TreponseCode, IresponseCode> = {
  REGISTER_OK: {
    code: 'OK',
    message:
      'Tus datos han sido registrados. Por favor, confirma tu número de contacto para que puedas disfrutar de todas las funcionalidades.',
  },
  UPDATE_STATUS_OK: {
    code: 'OK',
    message: 'El estado ha sido actualizado correctamente',
  },
  CONFIRM_OK: {
    code: 'OK',
    message: 'Gracias por confirmar tu información de contacto. Bienvenido a la familia Nómadas Cargo.',
  },
  CONFIRM_OK_NO_SESSION: {
    code: 'OK_NO_SESSION',
    message: 'Gracias por confirmar tu información de contacto. Por favor, inicia sesión.',
  },
  REQUEST_ACCESS_OK: {
    code: 'OK',
    message: 'Por favor, confirma los datos de acceso.',
  },
  ACCESS_OK: {
    code: 'OK',
    message: 'Bienvenido nuevamente.',
  },
  NO_SESSION: {
    code: 'NO_SESSION',
    message: 'Se presentó un error validando la información. Por favor, intenta en un momento.',
  },
  QUERY_OK: {
    code: 'OK',
    message: 'Datos consultados correctamente.',
  },
  REQUEST_VERIFICATION_OK: {
    code: 'OK',
    message: 'Solicitud recibida. Muy pronto te daremos respuesta.',
  },
  RESULT_VERIFICATION_OK: {
    code: 'OK',
    message: 'Resultado de verificación registrado correctamente.',
  },
};
