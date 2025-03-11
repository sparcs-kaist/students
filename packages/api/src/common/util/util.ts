import { BadRequestException, NotFoundException } from "@nestjs/common";

export const takeOne = <T>(values: T[]): T | null => {
  // 하나를 가져올 때 쓰는 함수
  // 배열이 비어있으면 null을 반환
  if (values.length === 0) return null;
  return values[0];
};

type IdType = number;

export function validateSole<T>(name?: string): (array: T[]) => void {
  return (array: T[]) => {
    // 배열의 요소가 하나만 나왔는 지를 검증하는 함수
    // 배열의 요소가 하나가 아니면 예외 던짐
    if (array.length === 0)
      throw new NotFoundException(`${name ?? "array"} is empty`);
    if (array.length > 1)
      throw new BadRequestException(`${name ?? "array"} is not only one`);
  };
}

export function takeSole<T>(name?: string): (array: T[]) => T {
  return (array: T[]) => {
    // 배열의 요소가 하나만 나왔는 지를 검증하는 함수
    // 배열의 요소가 하나가 아니면 예외 던짐
    validateSole(name)(array);
    return array[0];
  };
}

export function getUniqueArray<
  T extends string | number | boolean | symbol | null | undefined | bigint,
>(array: T[]): T[] {
  // 중복을 제외하고 배열을 반환하는 함수
  // JS 기본 자료형에 대해 잘 작동할듯??
  return [...new Set(array)];
}

export function validateContainAllId<T, K extends IdType>(
  ids: K[],
  array: T[],
  name?: string,
): asserts array is T[] & { [key in K]: T } {
  // 중복을 제외하고, 넣은 id가 모두 값이 잘 나왔는지를 체크해서 값을 얻는 함수
  const uniqueIds = getUniqueArray(ids);
  if (ids.some(id => !uniqueIds.includes(id))) {
    throw new NotFoundException(
      `The length of ${name ?? "array"} does not match | id length: ${uniqueIds.length} || array length: ${array.length}`,
    );
  }
}

export function takeEvery<T extends { id: K }, K extends IdType>(
  ids: K[],
  name?: string,
): (array: T[]) => T[] {
  // 중복을 제외하고, 넣은 id가 모두 값이 잘 나왔는지를 체크해서 값을 얻는 함수
  // ex) 다른 모듈에서 club ids 로 find해서 모든 값이 있는 지 확인
  return (array: T[]) => {
    validateContainAllId(ids, array, name);
    return array;
  };
}

export function takeExist<T>(name?: string): (array: T[]) => T[] {
  // 배열이 비어있는 지 확인하고, 비어있으면 예외를 던지고, 비어있지 않으면 배열을 반환하는 함수
  // 생각보다 쓸 일이 없을 듯?
  return (array: T[]) => {
    if (array.length === 0)
      throw new NotFoundException(`${name ?? "array"} is empty`);
    return array;
  };
}

// 그 외에도 쓸 만한 함수들이 있다면 제안해주세요!
