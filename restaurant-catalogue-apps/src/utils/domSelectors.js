export const getDomElements = (selectors) => {
  const elements = {};
  for (const [key, selector] of Object.entries(selectors)) {
    if (typeof selector === 'function') {
      elements[key] = selector();
    } else {
      elements[key] = document.querySelector(selector);
    }
  }
  return elements;
};

export const areElementsPresent = (elements) => {
  return Object.values(elements).every((el) => el);
};
