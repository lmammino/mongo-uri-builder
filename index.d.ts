declare module 'mongo-uri-builder' {
  export interface MongoUriBuilderConfigReplica {
    host: string;
    port: number;
  }
  
  export interface MongoUriBuilderConfigOptions {
    w: number;
    readPreference: string;
  }
  
  export interface MongoUriBuilderConfig {
    user: string;
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
    options: Partial<MongoUriBuilderConfigOptions>;
    replicas: MongoUriBuilderConfigReplica[];
  }
  
  function Builder(config: Partial<MongoUriBuilderConfig>): string;
  
  export default Builder;
}
