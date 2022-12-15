const loginBtn = document.querySelector("#login-btn");
const joinBtn = document.querySelector("#join-btn");

const loginHandler = () => {
  location.href = "/login";
};

loginBtn.addEventListener("click", loginHandler);

const joinHandler = () => {
  location.href = "/join";
};

joinBtn.addEventListener("click", joinHandler);
