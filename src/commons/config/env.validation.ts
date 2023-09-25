import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  development = 'development',
  production = 'production',
}

//Declaración de variables de ambiente requeridas u obligatorias
class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  MODULE: string;

  @IsString()
  APPLICATION_ID: string;

  @IsString()
  MONGODB_URI: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const variables = errors.map((error) => error.property);
    Logger.error(
      'error',
      'No se encontró valores para las siguientes variables:',
      'Validating environment',
      variables,
    );
    throw new Error('Pendiente configuración de ambiente.');
  }
  return validatedConfig;
}
