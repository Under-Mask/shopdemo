/** 장바구니 개수 뱃지 + 공통 */
document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementById("nav-cart-badge");
  if (el && window.ShopCart) {
    var n = ShopCart.count();
    el.textContent = n > 0 ? "(" + n + ")" : "";
  }
});
