class SafeStorage {
  #storage: Storage;
  
  constructor(storage: Storage) {
    this.#storage = storage;
  }

  public getItem(key: string): string | null {
    return this.#storage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    try {
      this.#storage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  }

  public removeItem(key: string): void {
    this.#storage.removeItem(key);
  }

  public clear(): void {
    this.#storage.clear();
  }
}

export const SafeLocalStorage = new SafeStorage(localStorage)