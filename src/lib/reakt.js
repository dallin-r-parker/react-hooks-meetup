export function createElement(type, props, ...children) {
  const element = { type, props, children };

  Object.freeze(element);
  Object.freeze(element.props);

  return { type, props, children };
}

export function useState(initialValue) {
  return dispatcher.useState(initialValue);
}
