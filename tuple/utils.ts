export declare type IsFinite<Tuple extends any[], Finite, Infinite> = Tuple extends []
  ? Finite
  : Tuple extends Array<infer Element>
  ? Element[] extends Tuple
    ? Infinite
    : Tuple extends [any, ...infer Rest]
    ? IsFinite<Rest, Finite, Infinite>
    : never
  : never;
export declare type _SplitInfiniteTuple<Tuple extends any[], Holder extends any[] = []> = Tuple extends Array<infer Element>
  ? Element[] extends Tuple
    ? [Tuple, Holder]
    : Tuple extends [infer First, ...infer Rest]
    ? _SplitInfiniteTuple<Rest, Prepend<Holder, First>>
    : never
  : never;
export declare type First<Tuple extends any[], Default = never> = Tuple extends [any, ...any[]] ? Tuple[0] : Default;
export declare type Last<Tuple extends any[], Default = never> = Tuple extends []
  ? Default
  : Tuple extends [infer SoleElement]
  ? SoleElement
  : Tuple extends Array<infer Element>
  ? Element[] extends Tuple
    ? Element
    : Tuple extends [any, ...infer Next]
    ? Last<Next>
    : Default
  : never;
export declare type Tail<Tuple extends any[]> = ((...args: Tuple) => any) extends (_: any, ..._1: infer Rest) => any ? Rest : never;
export declare type Prepend<Tuple extends any[], Addend> = [Addend, ...Tuple];
export declare type Reverse<Tuple extends any[], Prefix extends any[] = []> = {
  empty: Prefix;
  nonEmpty: Tuple extends [infer First, ...infer Next] ? Reverse<Next, Prepend<Prefix, First>> : never;
  infinite: {
    ERROR: 'Cannot reverse an infinite tuple';
    CODENAME: 'InfiniteTuple';
  };
}[Tuple extends [any, ...any[]] ? IsFinite<Tuple, 'nonEmpty', 'infinite'> : 'empty'];
export declare type Concat<Left extends any[], Right extends any[]> = [...Left, ...Right];
export declare type Repeat<Type, Count extends number, Holder extends any[] = []> = Count extends never
  ? never
  : number extends Count
  ? Type[]
  : Holder['length'] extends Count
  ? Count extends Holder['length']
    ? Holder
    : Count extends Holder['length'] | infer Rest
    ? Rest extends number
      ? Repeat<Type, Holder['length']> | Repeat<Type, Rest>
      : never
    : never
  : Repeat<Type, Count, Prepend<Holder, Type>>;
export declare type ConcatMultiple<TupleSet extends any[][]> = {
  empty: [];
  nonEmpty: ((..._: Reverse<TupleSet>) => any) extends (_: infer Last, ..._1: infer ReversedRest) => any
    ? Last extends any[]
      ? ReversedRest extends any[][]
        ? Concat<ConcatMultiple<Reverse<ReversedRest>>, Last>
        : never
      : never
    : never;
  infinite: {
    ERROR: 'TupleSet is not finite';
    CODENAME: 'InfiniteTupleSet' & 'Infinite';
  };
}[TupleSet extends [] ? 'empty' : IsFinite<TupleSet, 'nonEmpty', 'infinite'>];
export declare type Drop<Tuple extends any[], Quantity extends number, Count extends any[] = []> = [
  any[] extends Tuple ? true : false,
  number extends Quantity ? true : false
] extends true[]
  ? Tuple
  : Tuple extends []
  ? Tuple
  : Quantity extends Count['length']
  ? Tuple
  : ((...args: Tuple) => any) extends (_: any, ..._1: infer Rest) => any
  ? Drop<Rest, Quantity, Prepend<Count, Count['length']>>
  : never;
export declare type SliceStartQuantity<
  Tuple extends any[],
  Start extends number,
  Quantity extends number,
  Holder extends any[] = [],
  Count extends any[] = []
> = Tuple extends []
  ? Reverse<Holder>
  : Quantity extends Holder['length']
  ? Reverse<Holder>
  : Start extends Count['length']
  ? Tuple extends [infer First, ...infer Rest]
    ? SliceStartQuantity<Rest, Start, Quantity, Prepend<Holder, First>, Count>
    : never
  : SliceStartQuantity<Tail<Tuple>, Start, Quantity, Holder, Prepend<Count, Count['length']>>;
export declare type FillTuple<Tuple extends any[], Replacement, Holder extends any[] = []> = {
  empty: Holder;
  nonEmpty: Tuple extends [any, ...infer Rest] ? FillTuple<Rest, Replacement, Prepend<Holder, Replacement>> : never;
  infinite: Replacement[];
}[Tuple extends [] ? 'empty' : IsFinite<Tuple, 'nonEmpty', 'infinite'>];
export declare type CompareLength<Left extends any[], Right extends any[]> = Left['length'] extends Right['length']
  ? 'equal'
  : Left extends []
  ? 'shorterLeft'
  : Right extends []
  ? 'shorterRight'
  : CompareLength<Tail<Left>, Tail<Right>>;
export declare type SortTwoTuple<Left extends any[], Right extends any[], WhenEqual = [Left, Right]> = {
  equal: WhenEqual;
  shorterLeft: [Left, Right];
  shorterRight: [Right, Left];
}[CompareLength<Left, Right>];
export declare type ShortestTuple<TupleSet extends any[][], Shortest extends any[] = any[]> = TupleSet extends []
  ? Shortest
  : ((..._: TupleSet) => any) extends (_: infer Head, ..._1: infer Tail) => any
  ? Tail extends any[]
    ? Head extends any[]
      ? Tail extends Head[]
        ? SortTwoTuple<Shortest, Head>[0]
        : ShortestTuple<Tail, SortTwoTuple<Shortest, Head>[0]>
      : never
    : never
  : never;
export declare type LongestTuple<TupleSet extends any[][], Longest = []> = {
  empty: Longest;
  nonEmpty: ((..._: TupleSet) => any) extends (_: infer Head, ..._1: infer Tail) => any
    ? Tail extends any[]
      ? Longest extends any[]
        ? Head extends any[]
          ? Tail extends Head[]
            ? SortTwoTuple<Longest, Head>[1]
            : LongestTuple<Tail, SortTwoTuple<Longest, Head>[1]>
          : never
        : never
      : never
    : never;
}[TupleSet extends [] ? 'empty' : 'nonEmpty'];
export declare type FilterTuple<Tuple extends any[], Mask> = ConcatMultiple<{
  [K in keyof Tuple]: Tuple[K] extends Mask ? [Tuple[K]] : [];
}>;
