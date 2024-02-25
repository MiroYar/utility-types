type IPPure = `${number}.${number}.${number}.${number}`;
export enum AdditionalFirstLevelDomain {}
type FirstLevelDomain = keyof typeof AdditionalFirstLevelDomain | 'ru' | 'com';

export declare namespace Url {
  type Protocol = {
    WS: 'ws' | 'wss';
    HTTP: 'http' | 'https';
    All: Protocol[Exclude<keyof Protocol, 'All'>];
  };

  export type IP<P extends number> = `${IPPure}:${P}`;

  export type DNS<S extends string = string, T extends string | '' = string, F extends string = FirstLevelDomain> = `${
    | (T extends string ? `${T}.` : '')
    | ''}${S}.${F}`;

  export type Address<
    Prot extends keyof Protocol,
    Host extends IP<number> | DNS,
    Path extends string = '/'
  > = `${Protocol[Prot]}://${Host}${Path}`;
}
