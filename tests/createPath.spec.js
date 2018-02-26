import createPath from '../src/createPath';

const assert = require('assert');

describe('createPath', () => {
	it('should return the correct path', () => {
		assert.equal(createPath('user/'), 'user/');
		assert.equal(createPath('user/', { id: 1 }), 'user/');
		assert.equal(createPath('/user'), '/user');
		assert.equal(createPath('/user/'), '/user/');
		assert.equal(createPath('user/:id', { id: 1 }), 'user/1');
		assert.equal(createPath('user/:id/:slug', { id: 1, slug: 'john-do' }), 'user/1/john-do');
		assert.equal(createPath('user/:id(/:slug)', { id: 1, slug: 'john-do' }), 'user/1/john-do');
		assert.equal(createPath('user/:id(/:slug)/', { id: 1, slug: 'john-do' }), 'user/1/john-do/');
		assert.equal(createPath('user/:id/(:slug)', { id: 1, slug: 'john-do' }), 'user/1/john-do');
		assert.equal(createPath('user/:id(/:slug)', { id: 1 }), 'user/1');
		assert.equal(createPath('user/:id/(:slug)', { id: 1 }), 'user/1/');
		assert.equal(createPath('/:id/:slug/:state', { id: 1, slug: 'john', state: 'x' }), '/1/john/x');
		assert.equal(createPath(':id/:slug/:state', { id: 1, slug: 'john', state: 'x' }), '1/john/x');
		assert.equal(createPath('user/:id/(:slug/:foo)', { id: 1 }), 'user/1/');
		assert.equal(createPath('user/:id/(:slug/:foo)', { id: 1, slug: 'slug', foo: 'bar' }), 'user/1/slug/bar');
		assert.equal(createPath('user/:id/(:slug/:foo)', { id: 1, foo: 'bar' }), 'user/1/');
		assert.equal(createPath('user/:id/(:slug)/(:foo)', { id: 1, foo: 'bar' }), 'user/1//bar');
		assert.equal(createPath('(:slug/:foo)'), '');
		assert.equal(createPath('/(:slug/:foo)'), '/');
		assert.equal(createPath('user/:id/(:slug/x/:foo)', { id: 1, slug: 'a', foo: 'bar' }), 'user/1/a/x/bar');
		assert.equal(createPath('user/:id/(:slug/x/:foo)', { id: 1, slug: 'a' }), 'user/1/');
		assert.equal(createPath('user/:id/', { id: '(id)' }), 'user/(id)/');
		assert.equal(createPath('user/:id/:slug', { id: '(id)', slug: ('(slug)') }), 'user/(id)/(slug)');
		assert.equal(createPath('/(shop(/:category))', { category: 'prints' }), '/shop/prints');
	});

	it('should throw an error', () => {
		assert.throws(() => createPath('user/:id/'));
	});
});
