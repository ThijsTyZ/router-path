import createPath from '../src/createPath';

const assert = require('assert');

describe('createPath', () => {
	it('should return the correct path', () => {
		assert.strictEqual(createPath('user/'), 'user/');
		assert.strictEqual(createPath('user/', { id: 1 }), 'user/');
		assert.strictEqual(createPath('/user'), '/user');
		assert.strictEqual(createPath('/user/'), '/user/');
		assert.strictEqual(createPath('user/:id', { id: 1 }), 'user/1');
		assert.strictEqual(createPath('user/:id/:slug', { id: 1, slug: 'john-do' }), 'user/1/john-do');
		assert.strictEqual(createPath('user/:id(/:slug)', { id: 1, slug: 'john-do' }), 'user/1/john-do');
		assert.strictEqual(createPath('user/:id(/:slug)/', { id: 1, slug: 'john-do' }), 'user/1/john-do/');
		assert.strictEqual(createPath('user/:id/(:slug)', { id: 1, slug: 'john-do' }), 'user/1/john-do');
		assert.strictEqual(createPath('user/:id(/:slug)', { id: 1 }), 'user/1');
		assert.strictEqual(createPath('user/:id/(:slug)', { id: 1 }), 'user/1/');
		assert.strictEqual(createPath('/:id/:slug/:state', { id: 1, slug: 'john', state: 'x' }), '/1/john/x');
		assert.strictEqual(createPath(':id/:slug/:state', { id: 1, slug: 'john', state: 'x' }), '1/john/x');
		assert.strictEqual(createPath('user/:id/(:slug/:foo)', { id: 1 }), 'user/1/');
		assert.strictEqual(createPath('user/:id/(:slug/:foo)', { id: 1, slug: 'slug', foo: 'bar' }), 'user/1/slug/bar');
		assert.strictEqual(createPath('user/:id/(:slug/:foo)', { id: 1, foo: 'bar' }), 'user/1/');
		assert.strictEqual(createPath('user/:id/(:slug)/(:foo)', { id: 1, foo: 'bar' }), 'user/1//bar');
		assert.strictEqual(createPath('(:slug/:foo)'), '');
		assert.strictEqual(createPath('/(:slug/:foo)'), '/');
		assert.strictEqual(createPath('user/:id/(:slug/x/:foo)', { id: 1, slug: 'a', foo: 'bar' }), 'user/1/a/x/bar');
		assert.strictEqual(createPath('user/:id/(:slug/x/:foo)', { id: 1, slug: 'a' }), 'user/1/');
		assert.strictEqual(createPath('user/:id/', { id: '(id)' }), 'user/(id)/');
		assert.strictEqual(createPath('user/:id/:slug', { id: '(id)', slug: ('(slug)') }), 'user/(id)/(slug)');
		assert.strictEqual(createPath('/(shop(/:category))', { category: 'prints' }), '/shop/prints');
		assert.strictEqual(createPath('to/page(/:pathParam1)(/:pathParam2)', ), 'to/page');


		assert.strictEqual(createPath('user/:id/:slug?', { id: 1, slug: 'john-do' }), 'user/1/john-do');
		assert.strictEqual(createPath('user/:id/:slug?/', { id: 1, slug: 'john-do' }), 'user/1/john-do/');
		assert.strictEqual(createPath('user/:id/:slug?', { id: 1 }), 'user/1');
		assert.strictEqual(createPath('user/:id/:slug?/:foo?', { id: 1 }), 'user/1');
		assert.strictEqual(createPath('user/:id/:slug?/:foo?', { id: 1, slug: 'slug', foo: 'bar' }), 'user/1/slug/bar');
		assert.strictEqual(createPath('user/:id/:slug?/:foo?', { id: 1, foo: 'bar' }), 'user/1');
		assert.strictEqual(createPath('user/:id/:slug?/:foo?', { id: 1, foo: 'bar' }), 'user/1');
		assert.strictEqual(createPath(':slug?/:foo?'), '');
		assert.strictEqual(createPath('/:slug?/:foo?'), '');
		assert.strictEqual(createPath('user/:id/:slug?/x/:foo?', { id: 1, slug: 'a', foo: 'bar' }), 'user/1/a/x/bar');
		assert.strictEqual(createPath('user/:id/:slug?/x/:foo?', { id: 1, slug: 'a' }), 'user/1/a/x');
		assert.strictEqual(createPath('user/:id/', { id: '(id)' }), 'user/(id)/');
		assert.strictEqual(createPath('user/:id/:slug', { id: '(id)', slug: ('(slug)') }), 'user/(id)/(slug)');
		assert.strictEqual(createPath('/shop/:category?', { category: 'prints' }), '/shop/prints');
		assert.strictEqual(createPath('to/page/:pathParam1?/:pathParam2?', ), 'to/page');

		assert.strictEqual(createPath('/:x/:d', { d: '2020-08-06T00:00:00_2020-08-10T00:00:00',	x: 'foo' } ), '/foo/2020-08-06T00:00:00_2020-08-10T00:00:00');

		assert.strictEqual(createPath('user/[id]', { id: 1 }), 'user/1');
		assert.strictEqual(createPath('user/[id]/[slug]', { id: 1, slug: 'john-do' }), 'user/1/john-do');

	});

	it('should throw an error', () => {
		assert.throws(() => createPath('user/:id/'));
		assert.throws(() => createPath('user/:id/test'));
		assert.throws(() => createPath('user/[id]/test'));
	});
});
