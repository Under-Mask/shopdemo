/**
 * 데모용 인증: localStorage 기반 (실서비스에서는 서버 세션/JWT + HTTPS)
 * 비밀번호 평문 저장 — 학습용만. 절대 실제 서비스에 사용 금지.
 */
(function () {
  var STORAGE_USERS = "shop_demo_users";
  var STORAGE_SESSION = "shop_demo_session";

  function loadUsers() {
    try {
      var raw = localStorage.getItem(STORAGE_USERS);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return [];
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }

  function seedIfEmpty() {
    var users = loadUsers();
    if (users.length === 0) {
      users.push({
        email: "demo@shop.local",
        name: "데모유저",
        password: "demo1234",
        createdAt: new Date().toISOString(),
      });
      saveUsers(users);
    }
  }

  function getSession() {
    try {
      var raw = localStorage.getItem(STORAGE_SESSION);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setSession(user) {
    localStorage.setItem(
      STORAGE_SESSION,
      JSON.stringify({
        email: user.email,
        name: user.name,
        at: new Date().toISOString(),
      })
    );
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_SESSION);
  }

  function register(name, email, password) {
    seedIfEmpty();
    var users = loadUsers();
    var exists = users.some(function (u) {
      return u.email.toLowerCase() === email.toLowerCase();
    });
    if (exists) return { ok: false, message: "이미 가입된 이메일입니다." };
    users.push({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      password: password,
      createdAt: new Date().toISOString(),
    });
    saveUsers(users);
    setSession({ email: email.trim().toLowerCase(), name: name.trim() });
    return { ok: true };
  }

  function login(email, password) {
    seedIfEmpty();
    var users = loadUsers();
    var em = email.trim().toLowerCase();
    var u = users.find(function (x) {
      return x.email === em && x.password === password;
    });
    if (!u) return { ok: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
    setSession({ email: u.email, name: u.name });
    return { ok: true };
  }

  function logout() {
    clearSession();
  }

  function isLoggedIn() {
    return getSession() !== null;
  }

  function currentUser() {
    return getSession();
  }

  seedIfEmpty();

  window.ShopAuth = {
    register: register,
    login: login,
    logout: logout,
    isLoggedIn: isLoggedIn,
    currentUser: currentUser,
  };

  /** 헤더 오른쪽: 로그인 상태에 따라 UI 갱신 */
  window.ShopNav = {
    render: function () {
      var el = document.getElementById("nav-auth");
      if (!el) return;
      var u = currentUser();
      if (u) {
        el.innerHTML =
          '<span class="user-pill" title="' +
          escapeHtml(u.email) +
          '">' +
          escapeHtml(u.name) +
          "님</span>" +
          '<a class="btn btn-ghost btn-sm" href="mypage.html">마이페이지</a>' +
          '<button type="button" class="btn btn-sm" id="btn-logout">로그아웃</button>';
        var btn = document.getElementById("btn-logout");
        if (btn)
          btn.addEventListener("click", function () {
            logout();
            window.location.href = "index.html";
          });
      } else {
        el.innerHTML =
          '<a class="btn btn-ghost btn-sm" href="login.html">로그인</a>' +
          '<a class="btn btn-primary btn-sm" href="signup.html">회원가입</a>';
      }
    },
  };

  function escapeHtml(s) {
    if (!s) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.ShopNav) window.ShopNav.render();
  });
})();
