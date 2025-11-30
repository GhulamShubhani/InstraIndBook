import { promisify } from 'util';
import { redisClient } from '../libs/redis';

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

const setSession = async (key: string, value: string)=>{
    await setAsync(key,value,"EX",3600)
}

const getSession = async (key : string)=>{
    await getAsync(key)
}

export {setSession, getSession}