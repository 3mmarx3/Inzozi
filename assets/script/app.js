
  function selectOption(btn, stepIndex) {
    var step = document.getElementById('step' + stepIndex);
    step.querySelectorAll('.option-btn').forEach(function(b) {
      b.classList.remove('selected');
    });
    btn.classList.add('selected');

    setTimeout(function() {
      if (stepIndex < 2) {
        document.getElementById('step' + stepIndex).classList.remove('active');
        document.getElementById('step' + (stepIndex + 1)).classList.add('active');
        document.getElementById('dot' + stepIndex).classList.remove('active');
        document.getElementById('dot' + stepIndex).classList.add('done');
        document.getElementById('dot' + (stepIndex + 1)).classList.add('active');
      } else {
        showCelebration();
      }
    }, 320);
  }

  function showCelebration() {
    var quizCard = document.getElementById('quizCard');
    quizCard.style.transition = 'opacity 0.35s, transform 0.35s';
    quizCard.style.opacity = '0';
    quizCard.style.transform = 'scale(0.95)';
    setTimeout(function() {
      quizCard.style.display = 'none';
      var cel = document.getElementById('celebration');
      cel.style.display = 'flex';
      launchConfetti();
    }, 360);
  }

  function launchConfetti() {
    var canvas = document.getElementById('confettiCanvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var colors = ['#f7c12a', '#ffffff', '#1a87c4', '#ffe066', '#2ba0de'];
    var pieces = [];

    for (var i = 0; i < 130; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 180,
        w: 9 + Math.random() * 9,
        h: 5 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI * 2,
        speed: 2.5 + Math.random() * 3.5,
        rotSpeed: (Math.random() - 0.5) * 0.14,
        drift: (Math.random() - 0.5) * 1.1,
        opacity: 1
      });
    }

    var frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      pieces.forEach(function(p) {
        if (p.y < canvas.height + 20) alive = true;
        p.y += p.speed;
        p.x += p.drift;
        p.rot += p.rotSpeed;
        if (p.y > canvas.height * 0.65) p.opacity -= 0.02;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (alive && frame < 280) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }
