let hooks = [];
let idx = 0;

export function useState(initialValue) {
  let state = hooks[idx] || initialValue;
  let _idx = idx;
  function setState(newValue) {
    hooks[_idx] = newValue;
    render();
  }

  idx++;

  return [state, setState];
}

export function renderElement(element) {
  const { type, props, children } = element;

  if (typeof type === "function") {
    return renderElement(type(props));
  }

  if (typeof type === "string") {
    // create a DOM element
    const domElement = document.createElement(type);

    children.forEach(child => {
      if (typeof child === "string") {
        const textNode = document.createTextNode(child);
        domElement.appendChild(textNode);
      } else {
        domElement.appendChild(renderElement(child));
      }
    });

    // loop over the props object
    Object.keys(props).forEach(key => {
      if (key.startsWith("on")) {
        console.log(`event handler: `, key);
        const eventName = key.substring(2).toLowerCase();
        domElement.addEventListener(eventName, props[key]);
      }
    });

    return domElement;
  }
}

let _currentApp = null;
let _element = null;
let _container = null;

export function render(element = _element, container = _container) {
  const app = renderElement(element);

  _element = element;
  _container = container;

  _currentApp
    ? container.replaceChild(app, _currentApp)
    : container.appendChild(app);

  container.appendChild(app);
}

export default {
  render
};
