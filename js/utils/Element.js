class UtilElement {
  constructor(el) {
    this.el = el;
  }

  writeText(text) {
    this.el.textContent = text;
  }

  writeHTML(html) {
    this.el.innerHTML = html;
  }

  write(html) {
    this.writeHTML(html);
  }

  hide() {
    this.el.style.display = "none";
  }

  show(type = "block") {
    this.el.style.display = type;
  }
  
  setDisplay(cond, type = "") {
    this.el.style.display = cond ? type : "none";
  }

  changeAttr(attribute, value) {
    this.el[attribute] = value
  }

  getAttr(attr) {
    return this.el[attr]
  }

  changeStyle(property, value) {
    this.el.style[property] = value;
  }

  setClasses(className) {
    this.el.className = className;
  }

  addClasses(...classes) {
    classes.forEach((c) => this.el.classList.add(c));
  }

  removeClasses(...classes) {
    classes.forEach((c) => this.el.classList.remove(c));
  }

  replaceClass(oldClass, newClass) {
    this.removeClasses(oldClass);
    this.addClasses(newClass);
  }

  clearClasses() {
    this.el.classList.clear();
  }

  remove() {
    this.el.remove()
    delete this
  }

  append(child) {
    this.el.append(child)
  }
}

//Scripts
const elements = new Map();
const ELEMENTS = new Proxy({}, {
  get(target, key) {
   if (!elements.has(key)) {
     elements.set(key, new UtilElement(document.getElementById(key)));
   }
   return elements.get(key);
  },
  set() {
    console.warn("You should not be setting elements in the cache.")
  }
})

function traverseNodes(nodeList, callback) {
  for (const element of nodeList) {
    if (element.children && element.children.length > 0) traverseNodes(element.children, callback);
    if (element.nodeName === "#text") continue;
    callback(element);
  }
}

const observer = new MutationObserver((records) => {
  for (const record of records) {
    if (record.removedNodes.length > 0) {
       traverseNodes(record.removedNodes, (element) => {
         if (!element.id) return;
         elements.delete(element.id);
       })
    }
  }
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})

function el(x) {
  return ELEMENTS[x] ?? new UtilElement(x)
}