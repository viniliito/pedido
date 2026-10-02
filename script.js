const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonsArea = document.getElementById("buttonsArea");
const successScreen = document.getElementById("successScreen");
const hint = document.getElementById("hint");
const backgroundHearts = document.getElementById("backgroundHearts");
let moveCount = 0;

function moveNoButton(mouseX, mouseY) {
  const area = buttonsArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, area.width - btn.width);
  const maxY = Math.max(0, area.height - btn.height);
  let newX, newY, attempts = 0;

  do {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
    attempts++;
  } while (attempts < 40 && Math.hypot(
    area.left + newX + btn.width / 2 - mouseX,
    area.top + newY + btn.height / 2 - mouseY
  ) < 110);

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
  noBtn.style.transform = "none";
  moveCount++;

  if (moveCount === 1) hint.textContent = "Ops! Parece que o NÃO está tímido! 🤭";
  else if (moveCount === 3) hint.textContent = "Você não desiste, né? 😂💕";
  else if (moveCount >= 5) hint.textContent = "Acho que você já sabe a resposta! ❤️";
}

document.addEventListener("mousemove", (event) => {
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    event.clientX - (rect.left + rect.width / 2),
    event.clientY - (rect.top + rect.height / 2)
  );
  if (distance < 105) moveNoButton(event.clientX, event.clientY);
});

noBtn.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton(event.clientX, event.clientY);
});
noBtn.addEventListener("mouseenter", (event) => {
  moveNoButton(event.clientX, event.clientY);
});
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  const touch = event.touches[0];
  moveNoButton(touch.clientX, touch.clientY);
}, { passive: false });

yesBtn.addEventListener("click", () => {
  successScreen.classList.add("active");
  createCelebration();
});

function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  const hearts = ["💗", "💕", "💖", "❤️", "💘", "💞"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (15 + Math.random() * 25) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  backgroundHearts.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createFloatingHeart, 500);

function createCelebration() {
  for (let i = 0; i < 65; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = ["💖", "❤️", "💗", "💕", "💘"][Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.bottom = "-50px";
      heart.style.fontSize = (20 + Math.random() * 35) + "px";
      heart.style.animationDuration = (3 + Math.random() * 3) + "s";
      heart.style.zIndex = "20";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6500);
    }, i * 90);
  }
}
