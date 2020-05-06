 export interface MongoUriBuilderConfig {
           username? :string , 
           password? : string , 
           host:string  , 
           port? : number , 
           replicas? : {host:string, port :number}[]
           database?: string ,
           options? : {
            tls? :boolean, 
            ssl?:boolean, 
            tlsCertificateKeyFile?:string , 
            tlsCertificateKeyFilePassword?:string, 
            tlsCAFile? : string , 
            tlsAllowInvalidCertificates?:string , 
            tlsAllowInvalidHostnames?:boolean, 
            tlsInsecure? : boolean, 
            connectTimeoutMS? : number , 
            socketTimeoutMS? : number  , 
            compressors? : string ,
            zlibCompressionLevel?:number , 
            maxPoolSize?: number , 
            minPoolSize? :number , 
            maxIdleTimeMS?: number, 
            waitQueueMultiple? : number , 
            waitQueueTimeoutMS? : number ,
            w?: number | string , 
            wtimeoutMS?: number , 
            journal? : boolean , 
            readConcernLevel? : string , 
            readPreference? : string , 
            maxStalenessSeconds? :number , 
            readPreferenceTags? : string , 
            authSource? :string , 
            authMechanism? :string , 
            authMechanismProperties? : string , 
            gssapiServiceName?:string, 
            localThresholdMS? :number , 
            serverSelectionTimeoutMS? :number ,
            serverSelectionTryOnce?: boolean ,
            heartbeatFrequencyMS? :number , 
            appName? : string , 
            retryWrites?: boolean,
            uuidRepresentation?:string, 

        }
        
    }

export  function   mongouribuilder(options:MongoUriBuilderConfig) :  string 
