import { Global } from "./global.model";

export interface Summary {
    id:string;
    message:string;
    global:any[];
    countries:any[];
    date:string;
}