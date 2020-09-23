import { IncomingMessage, ServerResponse } from "http"
import { UrlWithParsedQuery } from "url"

export type Dict<T> = Record<string, T>

export type JwtToken = {
  id_token: string;
}

export type Handler = (req: IncomingMessage, res: ServerResponse, parsedUrl?: UrlWithParsedQuery) => Promise<void>

export interface APIresponse<T> {
  data: T
}

export interface BaseParamsInterface {
  page: number;
  size: number;
}

export type CommonHttpReturn<T> = { data: T }