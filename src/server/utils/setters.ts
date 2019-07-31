/* eslint-disable @typescript-eslint/no-explicit-any */

type MappedAttributes<T> = {
  [K in keyof T]?: T[K];
} & { [key: string]: any };

export class GettersAndSetters {
  public set<T>(this: T, newData: MappedAttributes<T>) {
    Object.keys(newData).forEach(d => {
      if (newData[d] === undefined) {
        delete newData[d];
      }
    });

    Object.assign(this, this, newData);

    return this;
  }
}
