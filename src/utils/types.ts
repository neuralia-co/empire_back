import { JwtPayload } from "jsonwebtoken";
import { Note } from "../models";

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

/*interface Note {
    id: number,
    content: string,
    important: boolean,
    date: Date
}*/

export interface IGetUserAuthInfoRequest extends Express.Request {
    params: {id:number}
    note: Note | null,
    decodedToken: JwtPayload,
    headers:{authorization: string}
}

export interface AuthPostRequest extends IGetUserAuthInfoRequest {
    body: {
        content: string,
        important?: boolean
    }
}

export interface AuthPutRequest extends IGetUserAuthInfoRequest {
    body: {
        content: string,
        important: boolean
    }
}