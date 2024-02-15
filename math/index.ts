export type Enumerate<Length extends number, Acc extends number[] = []> = Acc['length'] extends Length
  ? Acc[number]
  : Enumerate<Length, [...Acc, Acc['length']]>;

export type IntRange<Start extends number, End extends number> = Exclude<Enumerate<End>, Enumerate<Start>>;
