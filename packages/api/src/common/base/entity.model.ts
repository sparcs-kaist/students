export type IdType = number | string;

// 순수 plain object인 타입을 나타내는 타입
// 다른 파일로 옮겨도 됨
// 사실 array나 function이 안걸러지긴 한다는데 다들 object만 잘 넣을 거죠?
export type PlainObject = Record<string, unknown>;
export type EmptyObject = Record<string, never>;

/**
 * @description patch에 넣기 위한 static M=>M 함수의 타입
 */
export type ModelPatchFunction<
  Model extends MEntity<Id>,
  Id extends IdType = number,
> = (original: Model) => Model;

export abstract class MEntity<Id extends IdType = number> {
  id: Id;

  static modelName: string;
}
