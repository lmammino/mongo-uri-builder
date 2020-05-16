import    {mongouribuilder , MongoUriBuilderConfig}  from "../mongouribuilder"
import {expect} from "chai"

describe("Mongo Uri Builder Tests"  , ()=>{
    
    let config : MongoUriBuilderConfig    
    before(()=>{
       config =  {
            username : "user1" ,
            password : "pass1", 
            host: "192.168.0.15" , 
            port : 27017 ,
            replicas : [{
                host : "localhost" , 
                port : 1224 
            }],
            database : "test1" ,
            options : {
                connectTimeoutMS : 1000 
            }
        }
    })
    it("should generated url eq  mongodb://localhost:27017", ()=>{
        
        let expectedUri = "mongodb://localhost:27017/"
        let uri = mongouribuilder({
            host : "localhost" ,
            port : 27017 
        })
        expect(uri.toString()).to.be.eq(expectedUri)
    })

    it("should generated url host match match replica" , ()=>{

        let uri = mongouribuilder(config) 
        expect(uri.toString()).to.match(/,[\w]+:[\d]+/)


    })

    it("should generated url includes username and password" , ()=>{

        let uri = mongouribuilder(config) 
        expect(uri.toString()).to.match(/[\w\d]+:[\w\d]+@/)  
    })
})