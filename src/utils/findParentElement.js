const findParentElement = (event, type, name) => {
  let prefix;
  switch (type) {
    case "id":
      prefix = "#";
      break;
    case "class":
      prefix = ".";
      break;
    default:
      break;
  }
  let parentElement = event.target.closest(prefix + name);
  return parentElement;
};

export default findParentElement;
