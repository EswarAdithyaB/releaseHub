/* ═══════════════════════════════════════════════════
   DB.JS — localStorage Database Wrapper
   Zero-setup, zero-dependency in-browser store.

   Usage:
     DB.get('releases')          → array | null
     DB.set('releases', [...])   → void
     DB.find('releases', '26.05')→ single object by id
     DB.upsert('releases', obj)  → updated array
     DB.remove('releases','id')  → updated array
     DB.seed('releases', data)   → seeds only if empty
     DB.reset('releases', data)  → always overwrites
     DB.clear()                  → wipes all rh_ keys
   ═══════════════════════════════════════════════════ */

const DB = (() => {

  const PREFIX = 'rh_';

  function key(name) { return PREFIX + name; }

  /* ── raw get / set ── */
  function get(name) {
    try {
      const raw = localStorage.getItem(key(name));
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function set(name, value) {
    try {
      localStorage.setItem(key(name), JSON.stringify(value));
    } catch (e) {
      console.warn('[DB] localStorage write failed:', e);
    }
  }

  /* ── find single item by id field ── */
  function find(name, id) {
    const arr = get(name) || [];
    return arr.find(r => r.id === id) || null;
  }

  /* ── insert or update by id ── */
  function upsert(name, item) {
    const arr = get(name) || [];
    const idx = arr.findIndex(r => r.id === item.id);
    if (idx >= 0) arr[idx] = { ...arr[idx], ...item };
    else arr.push(item);
    set(name, arr);
    return arr;
  }

  /* ── update a single field on one item ── */
  function patch(name, id, changes) {
    const arr = (get(name) || []).map(r =>
      r.id === id ? { ...r, ...changes } : r
    );
    set(name, arr);
    return find(name, id);
  }

  /* ── remove item by id ── */
  function remove(name, id) {
    const arr = (get(name) || []).filter(r => r.id !== id);
    set(name, arr);
    return arr;
  }

  /* ── seed only if key doesn't exist yet ── */
  function seed(name, data) {
    if (!get(name)) set(name, data);
  }

  /* ── always overwrite (for dev reset) ── */
  function reset(name, data) {
    set(name, data);
  }

  /* ── wipe all rh_ prefixed keys ── */
  function clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }

  return { get, set, find, upsert, patch, remove, seed, reset, clear };

})();
