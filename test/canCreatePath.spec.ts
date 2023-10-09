import canCreatePath from '../src/canCreatePath';

const assert = require('assert');

describe('canCreatePath', () => {
	it('should return true', () => {
		assert.strictEqual(canCreatePath('user/'), true);
		assert.strictEqual(canCreatePath('user/', { id: 1 }), true);
		assert.strictEqual(canCreatePath('/user'), true);
		assert.strictEqual(canCreatePath('/user/'), true);
		assert.strictEqual(canCreatePath('user/:id', { id: 1 }), true);
		assert.strictEqual(canCreatePath('user/:id/:slug', { id: 1, slug: 'john-do' }), true);
		assert.strictEqual(canCreatePath('user/:id(/:slug)', { id: 1, slug: 'john-do' }), true);
		assert.strictEqual(canCreatePath('user/:id(/:slug)/', { id: 1, slug: 'john-do' }), true);
		assert.strictEqual(canCreatePath('user/:id/(:slug)', { id: 1, slug: 'john-do' }), true);
		assert.strictEqual(canCreatePath('user/:id(/:slug)', { id: 1 }), true);
		assert.strictEqual(canCreatePath('user/:id/(:slug)', { id: 1 }), true);
		assert.strictEqual(canCreatePath('/:id/:slug/:state', { id: 1, slug: 'john', state: 'x' }), true);
		assert.strictEqual(canCreatePath(':id/:slug/:state', { id: 1, slug: 'john', state: 'x' }), true);
		assert.strictEqual(canCreatePath('user/:id/(:slug/:foo)', { id: 1 }), true);
		assert.strictEqual(canCreatePath('user/:id/(:slug/:foo)', { id: 1, slug: 'slug', foo: 'bar' }), true);
		assert.strictEqual(canCreatePath('user/:id/(:slug/:foo)', { id: 1, foo: 'bar' }), true);
		assert.strictEqual(canCreatePath('user/:id/(:slug)/(:foo)', { id: 1, foo: 'bar' }), true);
		assert.strictEqual(canCreatePath('(:slug/:foo)'), true);
		assert.strictEqual(canCreatePath('/(:slug/:foo)'), true);
		assert.strictEqual(canCreatePath('user/:id/(:slug/x/:foo)', { id: 1, slug: 'a', foo: 'bar' }), true);
		assert.strictEqual(canCreatePath('user/:id/(:slug/x/:foo)', { id: 1, slug: 'a' }), true);
		assert.strictEqual(canCreatePath('user/:id/', { id: '(id)' }), true);
		assert.strictEqual(canCreatePath('user/:id/:slug', { id: '(id)', slug: ('(slug)') }), true);
		assert.strictEqual(canCreatePath('/(shop(/:category))', { category: 'prints' }), true);
	});

	it('should return false', () => {
		assert.strictEqual(canCreatePath('user/:id/'), false);
	});
});
