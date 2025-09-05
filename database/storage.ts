// database/storage.ts
// A simple in-memory key-value store.
// This could be replaced with localStorage, IndexedDB, or a remote database service.

class StorageService {
  private store: Map<string, any> = new Map();

  constructor() {
    console.log('StorageService initialized.');
  }

  set<T>(key: string, value: T): void {
    console.log(`[Storage] Setting key: ${key}`);
    this.store.set(key, value);
  }

  get<T>(key: string): T | undefined {
    console.log(`[Storage] Getting key: ${key}`);
    return this.store.get(key) as T;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  delete(key: string): boolean {
    console.log(`[Storage] Deleting key: ${key}`);
    return this.store.delete(key);
  }

  clear(): void {
    console.log('[Storage] Clearing all data.');
    this.store.clear();
  }
}

export const storage = new StorageService();
