import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AdapterModule } from './adapter/adapter.module';
import { CoreModule } from './core/core.module';
import { DriversModule } from './drivers/drivers.module';
import { CommonsModule } from './commons/commons.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({})],
      introspection: true,
    }),
    AdapterModule,
    CoreModule,
    DriversModule,
    CommonsModule,
  ],
})
export class AppModule {}
