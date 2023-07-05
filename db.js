const {MongoClient, Objectid} = require("mongodb");
const mongoose= require("mongoose")
require("dotenv").config()
mongoose.set("strictQuery",true)
async function main(){
    await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.aisuezz.mongodb.net/`)
}
let singleton;

let connect = async () =>{
    if (singleton) return singleton;

    const client = new MongoClient ("mongodb://127.0.0.1:27017");

    await client.connect();

    singleton = client.db("dataveiculo"); //nome do banco de dados no mongodb, colocar valores nele pra testar

    return singleton;
}

let findAll = async (collection)=>{
    const db = await connect();
    return await db.collection(collection).find().toArray();
}
let insertOne= async(Collection)=>{
    const db=await connect();
    return await db. Collection(Collection).insertOne(Object);
}
let findOne= async(Collection, _id)=>{
    const db=await connect();
    let obj=await db.Collection(Collection).find({'_id':new ObjectId})
    if(obj)
    return obj[0];
    return false;
}

let updateOne=async (Collection, Object, param)=>{
    const db= await connect();
    let result=await db.Collection(Collection).updateOne(param, {})
    return result;
}
