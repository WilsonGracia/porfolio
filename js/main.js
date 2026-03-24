/* ============================================
   main.js — Project tabs & interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Project category tabs ──
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.projects-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + entry.target.id
            ? 'var(--accent)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));

  // ── Copy email button ──
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const email = btn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        // Fallback para navegadores que bloquean el clipboard API
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      // Feedback visual: cambia ícono a check por 2 segundos
      btn.querySelector('.icon-copy').style.display  = 'none';
      btn.querySelector('.icon-check').style.display = 'block';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.querySelector('.icon-copy').style.display  = 'block';
        btn.querySelector('.icon-check').style.display = 'none';
        btn.classList.remove('copied');
      }, 2000);
    });
  });

});
