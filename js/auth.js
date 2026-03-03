// ====== SUPABASE CONFIG ======
// Supabase Project Settings -> API dan oling va shu yerga qo'ying:
const SUPABASE_URL = "https://yvbvkzmcxqkkmukykxmj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Tzf9bUaWID0B_925ss5yUg_KO9NKGfM";

// HTML sahifalarda auth.js dan OLDIN supabase-js CDN ulangan bo'lishi kerak.
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;

// ====== LOGIN ======
async function doLogin() {
  const login = (document.getElementById("login")?.value || "").trim();
  const password = (document.getElementById("password")?.value || "").trim();

  if (!login || !password) {
    alert("Login (email) va parolni kiriting");
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: login,
    password
  });

  if (error) {
    alert("Login yoki parol noto‘g‘ri");
    return;
  }

  location.href = "dashboard.html";
}

// ====== PAGE GUARD ======
async function requireAuth(redirectTo = "index.html") {
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) location.href = redirectTo;
}

// ====== LOGOUT ======
async function doLogout() {
  await supabaseClient.auth.signOut();
  location.href = "index.html";
}

// ====== RESET / CHANGE PASSWORD ======
async function resetData() {
  const email = (document.getElementById("oldLogin")?.value || "").trim();
  const newPass = (document.getElementById("newPass")?.value || "").trim();

  const { data: sess } = await supabaseClient.auth.getSession();
  if (sess?.session && newPass) {
    const { error } = await supabaseClient.auth.updateUser({ password: newPass });
    if (error) {
      alert("Parolni yangilashda xatolik: " + (error.message || error));
      return;
    }
    alert("Parol yangilandi. Qayta login qiling.");
    await doLogout();
    return;
  }

  if (!email) {
    alert("Email (login) kiriting");
    return;
  }

  const redirectTo = window.location.origin + window.location.pathname.replace(/[^/]+$/, "index.html");

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) {
    alert("Reset link yuborilmadi: " + (error.message || error));
    return;
  }
  alert("Reset link emailga yuborildi (Spam/Promotions ham tekshiring).");
}
