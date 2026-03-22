/**
 * 장바구니: localStorage (데모)
 */
(function () {
  var KEY = "shop_demo_cart";

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function add(productId, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    var items = load();
    var found = items.find(function (x) {
      return x.id === productId;
    });
    if (found) found.qty += qty;
    else items.push({ id: productId, qty: qty });
    save(items);
    return items;
  }

  function setQty(productId, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    var items = load();
    var found = items.find(function (x) {
      return x.id === productId;
    });
    if (found) found.qty = qty;
    save(items);
    return items;
  }

  function remove(productId) {
    var items = load().filter(function (x) {
      return x.id !== productId;
    });
    save(items);
    return items;
  }

  function clear() {
    save([]);
  }

  function count() {
    return load().reduce(function (sum, x) {
      return sum + x.qty;
    }, 0);
  }

  window.ShopCart = {
    load: load,
    add: add,
    setQty: setQty,
    remove: remove,
    clear: clear,
    count: count,
  };
})();
