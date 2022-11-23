export class ProcessedPackages {
  _processed = new Map();

  markAsProcessed(packageName: string) {
    return this._processed.set(packageName, true);
  }

  isProcessed(packageName: string) {
    return this._processed.get(packageName) === true;
  }
}
