const STORAGE_KEY = 'todo_app_data'

/** @returns {TodoAppData} */
export function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw
    ? JSON.parse(raw)
    : { projects: [], filters: { statuses: ['todo','in-progress','done'], tags: [], search: '' } }
}

/** @param {TodoAppData} data */
export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
