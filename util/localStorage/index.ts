export function getItemFromStorage(name: string): string {
  return localStorage.getItem(name);
}

export function getObjectFromStorage<T>(name: string): T {
  return JSON.parse(localStorage.getItem(name))
}

export function setObjectOnStorage<T>(name: string, object: T) {
  localStorage.setItem(name, JSON.stringify(object))
}