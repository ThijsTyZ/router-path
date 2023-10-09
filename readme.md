Utility function that replaces the params from a route template with the values of an object to create a valid route path. Designed for, but not limited to, React-router.

It supports both colons (`:`) and brackets (`[]`) as param delimiters.

Example with colons:

```createPath('/foo/:bar', { bar: 'test' });```

returns

```'/foo/test'```

Example with brackets:

```createPath('user/[id]/[slug]', { id: 1, slug: 'john-do' });```

returns

```'user/1/john-do'```