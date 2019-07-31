import { normalizeUrl } from '@/lib/ajax';

describe('lib.ajax', () => {

  it('normalizeUrl', () => {
    expect(normalizeUrl('/user/{name}', {
      params: {
        name: 'foo'
      }
    })).toBe('/user/foo');

    expect(normalizeUrl('{name}', {
      params: {
        name: 'foo'
      }
    })).toBe('foo');

    expect(normalizeUrl('/user', {
      params: {
        name: 'foo'
      }
    })).toBe('/user');

    expect(normalizeUrl('/user/{name}', {
      //
    })).toBe('/user/{name}');

    expect(normalizeUrl('/user/{name}/{age}', {
      params: {
        age: '99'
      }
    })).toBe('/user/{name}/99');

    expect(normalizeUrl('/{user}/{name}/{age}', {
      params: {
        age: '99',
        name: 'foo',
        user: 'bar'
      }
    })).toBe('/bar/foo/99');

    expect(normalizeUrl('/user?id', {
      querys: {
        id: '123'
      }
    })).toBe('/user?id=123');

    expect(normalizeUrl('', {
      querys: {
        id: '123'
      }
    })).toBe('?id=123');

    expect(normalizeUrl('/user', {
      querys: {
        id: '123'
      }
    })).toBe('/user?id=123');

    expect(normalizeUrl('/user?id', {
      querys: {
        id: null as any
      }
    })).toBe('/user');

    expect(normalizeUrl('/user?id', {
      querys: {
        id: undefined as any
      }
    })).toBe('/user');

    expect(normalizeUrl('/user?id', {
      querys: {
        id: ''
      }
    })).toBe('/user');

    expect(normalizeUrl('/user?id', {
      querys: {
        id: '',
        name: null as any
      }
    })).toBe('/user');

    expect(normalizeUrl('/user?id&name', {
      querys: {
        id: undefined as any,
        name: 'xxx'
      }
    })).toBe('/user?name=xxx');

    expect(normalizeUrl('/user', {
      querys: {
        id: '123',
        type: 'red',
        height: '170'
      }
    })).toBe('/user?id=123&type=red&height=170');

    expect(normalizeUrl('/{name}/user/{age}?id&type&age', {
      params: {
        name: 'tom',
        age: '99'
      },
      querys: {
        id: '123',
        type: 'red',
        age: '27'
      }
    })).toBe('/tom/user/99?id=123&type=red&age=27');
  });
});
