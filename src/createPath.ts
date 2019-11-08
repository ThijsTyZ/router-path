/**
 * Builds a path from a template and replaces the params.
 *
 * It will throw an error is mandatory params are not available in the params object.
 *
 * @param template The configured path template (e.g. /foo/:bar or /user(/:id))
 * @param params The param values that is used to replace the params in the template (e.g. { bar: 'baz' }
 */
export default function createPath (template: string, params?: {[key: string]: any}):string {
	// Match text within parenthesis that are no variables (does not start with ":")
	const PARENTHESIZED_CONST = /\(([^:\()]+?)\)/g;

	// temporary replace values for brackets
	const OPEN_BRACKET = '#OPEN-BRACKET#';
	const CLOSE_BRACKET = '#CLOSE-BRACKET#';

	return template
		// first replace all params
		.replace(/:(\w+)\??/g, (match, param) =>
			(params && typeof params[param] !== 'undefined' ?
				`${params[param]}`
					// temporary replace brackets to avoid conflicts
					.replace(/\(/g, OPEN_BRACKET)
					.replace(/\)/g, CLOSE_BRACKET)
				:
				match))

		// remove parenthesis for resolved optional parts
		.replace(/.+/g, (temp) => {
			while (PARENTHESIZED_CONST.test(temp)) {
				temp = temp.replace(PARENTHESIZED_CONST, (_match, part) => part);
			}
			return temp;
		})

		// remove the other (unresolved) optional parts
		.replace(/\(.+?\)/g, '')
		.replace(/\/?\:\w+\?.*/g, '')

		// do we still have params left?
		.replace(/:(\w+)/g, (_match, param) => {
			throw new Error(`Param "${param}" is missing in params (${JSON.stringify(params)}), needed for '${template}'`);
		})

		// replace temporary brackets with real brackets
		.replace(new RegExp(OPEN_BRACKET, 'g'), '(')
		.replace(new RegExp(CLOSE_BRACKET, 'g'), ')');
}