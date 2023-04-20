const button = document.createElement("button");
button.innerText = "PLAY!";
button.onclick = () => {
  const seek = document.createElement("h1");
  document.body.appendChild(seek);
  button.remove();
  const m = zp(...zm(...music));
  const now = m.context.currentTime;
  setInterval(() => {
    const endTime = now + m.buffer.length / m.buffer.sampleRate;
    const rest = endTime - m.context.currentTime;
    seek.innerText = rest < 0 ? "END" : rest;
  }, 100);
};
document.body.appendChild(button);
