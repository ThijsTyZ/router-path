import canCreatePath from '../src/canCreatePath';

const assert = require('assert');

describe('canCreatePath', () => {
	it('should return true', () => {
		assert.equal(canCreatePath('user/'), true);
		assert.equal(canCreatePath('user/', { id: 1 }), true);
		assert.equal(canCreatePath('/user'), true);
		assert.equal(canCreatePath('/user/'), true);
		assert.equal(canCreatePath('user/:id', { id: 1 }), true);
		assert.equal(canCreatePath('user/:id/:slug', { id: 1, slug: 'john-do' }), true);
		assert.equal(canCreatePath('user/:id(/:slug)', { id: 1, slug: 'john-do' }), true);
		assert.equal(canCreatePath('user/:id(/:slug)/', { id: 1, slug: 'john-do' }), true);
		assert.equal(canCreatePath('user/:id/(:slug)', { id: 1, slug: 'john-do' }), true);
		assert.equal(canCreatePath('user/:id(/:slug)', { id: 1 }), true);
		assert.equal(canCreatePath('user/:id/(:slug)', { id: 1 }), true);
		assert.equal(canCreatePath('/:id/:slug/:state', { id: 1, slug: 'john', state: 'x' }), true);
		assert.equal(canCreatePath(':id/:slug/:state', { id: 1, slug: 'john', state: 'x' }), true);
		assert.equal(canCreatePath('user/:id/(:slug/:foo)', { id: 1 }), true);
		assert.equal(canCreatePath('user/:id/(:slug/:foo)', { id: 1, slug: 'slug', foo: 'bar' }), true);
		assert.equal(canCreatePath('user/:id/(:slug/:foo)', { id: 1, foo: 'bar' }), true);
		assert.equal(canCreatePath('user/:id/(:slug)/(:foo)', { id: 1, foo: 'bar' }), true);
		assert.equal(canCreatePath('(:slug/:foo)'), true);
		assert.equal(canCreatePath('/(:slug/:foo)'), true);
		assert.equal(canCreatePath('user/:id/(:slug/x/:foo)', { id: 1, slug: 'a', foo: 'bar' }), true);
		assert.equal(canCreatePath('user/:id/(:slug/x/:foo)', { id: 1, slug: 'a' }), true);
		assert.equal(canCreatePath('user/:id/', { id: '(id)' }), true);
		assert.equal(canCreatePath('user/:id/:slug', { id: '(id)', slug: ('(slug)') }), true);
		assert.equal(canCreatePath('/(shop(/:category))', { category: 'prints' }), true);
	});

	it('should return false', () => {
		assert.equal(canCreatePath('user/:id/'), false);
	});
});
