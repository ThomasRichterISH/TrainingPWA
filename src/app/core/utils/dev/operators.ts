import { OperatorFunction } from 'rxjs';
import { delay, map, pairwise, startWith, tap } from 'rxjs/operators';

export function randomDelay<T>(min = 1000, max = 10000): OperatorFunction<T, T> {
  return source$ => source$.pipe(delay(Math.floor(Math.random() * (max - min + 1)) + min));
}

export function log<T>(message?: unknown, stringify?: boolean): OperatorFunction<T, T> {
  // eslint-disable-next-line no-console
  return source$ => source$.pipe(tap(e => console.log(message || '', stringify ? JSON.stringify(e) : e)));
}

export function logDiff<T>(message?: unknown): OperatorFunction<T, T> {
  return source$ =>
    source$.pipe(
      map(el => el || ({} as T)),
      startWith({} as T),
      pairwise(),
      // eslint-disable-next-line no-console
      tap(([a, b]) => console.log(message || '', keyChanges(a, b), { emit: b })),
      map(([, b]) => b)
    );
}

// https://gist.github.com/Yimiprod/7ee176597fef230d1451
/* eslint-disable @typescript-eslint/no-explicit-any -- utility function */
function keyChanges(a: any, b: any) {
  const changes: any = {};

  // eslint-disable-next-line complexity
  function walkObject(base: any, object: any, path = '') {
    for (const key of Object.keys(base)) {
      const currentPath = path === '' ? key : `${path}.${key}`;

      if (object[key] === undefined) {
        changes[currentPath] = '-';
      }
    }

    for (const [key, value] of Object.entries(object)) {
      const currentPath = Array.isArray(object) ? `${path}[${key}]` : path === '' ? key : `${path}.${key}`;

      if (base[key] === undefined) {
        changes[currentPath] = '+';
      } else if (value !== base[key]) {
        if (typeof value === 'object' && typeof base[key] === 'object') {
          walkObject(base[key], value, currentPath);
        } else {
          changes[currentPath] = object[key];
        }
      }
    }
  }

  walkObject(a, b);

  return changes;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
