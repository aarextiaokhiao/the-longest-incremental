export class UtilElement {
  constructor(el) {
    this.el = el;
    /*this.observer = new MutationObserver(
      (mutationList) => {
        mutationList.forEach((mutation) => {
          
        })
      }      
    );*/
  }

  writeText(text) {
    this.el.textContent = text;
  }

  writeHTML(html) {
    this.el.innerHTML = html;
  }

  hide() {
		this.el.style.display = "none";
  }
  
  show(type = "block") {
    this.el.style.display = type;
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
}

