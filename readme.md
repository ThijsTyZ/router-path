Utility function that replaces the params from a route template with the values of an object to create a valid route path. Designed for, but not limited to, React-router.

Example:

```createPath('/foo/:bar', { bar: 'test' });```

returns

```'/foo/test'```