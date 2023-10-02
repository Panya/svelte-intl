
import {flatObject} from './util';

test('#flatObject', () => {
  expect(flatObject({
    a: {b: {c: '1'}},
    d: '2',
  })).toStrictEqual({
    'a.b.c': '1',
    d: '2',
  });
});
