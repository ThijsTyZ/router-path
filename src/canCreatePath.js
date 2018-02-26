import createPath from './createPath';

/**
 * Checks if a path can be created from a template with the given params.
 *
 * @param template The configured path template (e.g. /foo/:bar or /user(/:id))
 * @param params The param values that is used to replace the params in the template (e.g. { bar: 'baz' }
 * @returns {boolean} return true if a path can be created, otherwise false
 */
export default function canCreatePath(template, params = {}) {
	try {
		createPath(template, params);
		return true;
	} catch (error) {
		return false;
	}
}