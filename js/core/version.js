class Version {
  constructor(value) {
    this.release = 0;
    this.layers = 0;
    this.content = 0;
    this.patch = "";
    this.beta = false;
    // four parts
    // x.x.x.x. - beta

    if (typeof value === "number") {
      this.layers = Math.round(value * 10);
      console.warn("This method is depreciated. Use a string instead.");
    } else if (typeof value === "string") {
      const versionArray = value.split(".");
      if (versionArray.length !== 4 && versionArray.length !== 5)
        throw new TypeError(
          "Invalid version format. Version input was " + value
        );
      // AKA relase, layers, content, patch
      this.release = Number(versionArray[0]);
      this.layers = Number(versionArray[1]);
      this.content = Number(versionArray[2]);
      this.patch = Number(versionArray[3]);
      this.beta = (versionArray[4] ?? "").includes("-beta");
    } else if (value instanceof Version) {
      this.release = value.release;
      this.layers = value.layers;
      this.content = value.content;
      this.patch = value.patch;
      this.beta = value.beta;
    } else throw new TypeError("Invalid format. Type was " + typeof value);
  }

  versionCompare(version) {
    const other = new Version(version);

    return (
      this.release > other.release ||
      (this.release === other.release &&
        (this.layers > other.layers ||
          (this.layers === other.layers && this.content > other.content)))
    );
  }

  toString() {
    return (
      "v" +
      this.release +
      "." +
      this.layers +
      (this.content ? "." + this.content : "") +
      (this.patch ? this.patch : "") +
      (this.beta ? "-beta" : "")
    );
  }
}
