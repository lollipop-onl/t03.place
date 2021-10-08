type PageUrls = '/' | '/conte' | '/conte/[slug]/[page]';

type GetUrlChunks<Url extends string> = Url extends `/${infer Chunk}/${infer TrailChunks}`
  ? Chunk | GetUrlChunks<`/${TrailChunks}`>
  : Url extends `/${infer Chunk}` ? Chunk : never

type GetUrlParams<Url extends string> = {
  [Chunk in GetUrlChunks<Url> as Chunk extends `[${infer ParamName}]` ? ParamName : never]: string | number | boolean;
}

type WithParamUrl = {
  [Url in PageUrls]: {} extends GetUrlParams<Url> ? never : Url;
}[PageUrls];

type WithoutParamUrl = {
  [Url in PageUrls]: {} extends GetUrlParams<Url> ? Url : never;
}[PageUrls];

export function url<T extends WithoutParamUrl>(path: T): string;
export function url<T extends WithParamUrl>(path: T, params: GetUrlParams<T>): string;
export function url(path: string, params?: Record<string, any>): string {
  return path.replace(/\/\[([a-zA-Z0-9]+)\]/g, (_, $1) => `/${params?.[$1] || `[${$1}]`}`);
}
