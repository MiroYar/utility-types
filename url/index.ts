export type TWSProtocol = 'ws' | 'wss';
export type THTTPProtocol = 'http' | 'https';
export type TProtocol = TWSProtocol | THTTPProtocol;

type TIP = `${number}.${number}.${number}.${number}`;
export type TIPWithPort<P extends number = number> = `${TIP}:${P}`;

enum EAdditionalFirstLevelDomain {}
type TFirstLevelDomain = keyof typeof EAdditionalFirstLevelDomain | 'ru' | 'com';
export type TDNS<S extends string = string, T extends string | '' = string, F extends string = TFirstLevelDomain> = `${
  | (T extends string ? `${T}.` : '')
  | ''}${S}.${F}`;
