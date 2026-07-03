
      const target = document.getElementById("target");
      const horizon = document.getElementById("horizon");
      const speedInput = document.getElementById("speed");
      const modeBtn = document.getElementById("modeBtn");
      const resetBtn = document.getElementById("resetBtn");

      let pos = 50;
      let direction = 1;
      let isPingPong = false;
      let lastTime = 0;

      modeBtn.addEventListener("click", () => {
        isPingPong = !isPingPong;
        modeBtn.textContent = isPingPong ? "Ping-pong" : "Looping";
      });

      resetBtn.addEventListener("click", () => {
        pos = 50;
        direction = 1;
      });

      function loop(time) {
        const dt = (time - lastTime) || 16;
        lastTime = time;
        const speedSetting = parseFloat(speedInput.value);
        const velocity = (speedSetting * 0.005) * direction;

        pos += velocity * (dt / 16);

        if (isPingPong) {
          if (pos > 95) direction = -1;
          if (pos < 5) direction = 1;
        } else {
          direction = 1;
          if (pos > 100) pos = 0;
          if (pos < 0) pos = 100;
        }

        const driftY = Math.sin(time * 0.002) * 15;
        target.style.left = `${pos}%`;
        target.style.top = `calc(50% + ${driftY}px)`;
        horizon.style.transform = `translateX(${-pos * 0.5}%)`;

        requestAnimationFrame(loop);
      }

      requestAnimationFrame(loop);

