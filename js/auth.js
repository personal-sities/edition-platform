if (!localStorage.getItem("user")) {
  localStorage.setItem("user", JSON.stringify({
    login: "admin",
    password: "1234"
  }));
}

function doLogin() {
  const l = document.getElementById("login").value;
  const p = document.getElementById("password").value;
  const u = JSON.parse(localStorage.getItem("user"));

  if (l === u.login && p === u.password) {
    location.href = "dashboard.html";
  } else {
    alert("Login yoki parol noto‘g‘ri");
  }
}

function resetData() {
  const u = JSON.parse(localStorage.getItem("user"));

  if (
    oldLogin.value === u.login &&
    oldPass.value === u.password
  ) {
    // 🔥 MANA SHU JOY TO‘G‘RILANDI
    u.login = newLogin.value || u.login;
    u.password = newPass.value || u.password;

    localStorage.setItem("user", JSON.stringify(u));
    alert("Yangilandi");
    location.href = "index.html";
  } else {
    alert("Eski ma’lumotlar noto‘g‘ri");
  }
}
