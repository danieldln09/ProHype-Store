// Script simple para interacciones: menú móvil, carrito front, modal quickview
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('nav');
  const cartBtn = document.getElementById('cartBtn');
  const cartCount = document.getElementById('cartCount');
  const addButtons = document.querySelectorAll('.add-to-cart');
  const quickviewBtns = document.querySelectorAll('.quickview-btn');
  const modal = document.getElementById('quickviewModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const newsletterForm = document.getElementById('newsletterForm');

  // Estado simple del carrito en memoria
  let cart = {};

  function updateCartUI(){
    const totalItems = Object.values(cart).reduce((sum,v)=>sum+v,0);
    cartCount.textContent = totalItems;
  }

  // Toggle menú móvil
  mobileToggle?.addEventListener('click', () => {
    if (nav.style.display === 'flex') {
      nav.style.display = '';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '0.5rem';
    }
  });

  // Añadir al carrito (solo frontend demo)
  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      cart[id] = (cart[id] || 0) + 1;
      updateCartUI();
      btn.textContent = 'Añadido ✓';
      setTimeout(()=> btn.textContent = 'Añadir', 900);
    });
  });

  // Quickview modal
  const productData = {
    p1: {
      title: 'Zapatillas Runner X',
      price: 'USD 119.99',
      img: 'https://images.unsplash.com/photo-1519744346366-0d63a4d8c1b0?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      desc: 'Ligera, con excelente amortiguación y suela anti-deslizante. Ideal para entrenamientos de media y larga distancia.'
    },
    p2: {
      title: 'Camiseta Pro Dry',
      price: 'USD 29.99',
      img: 'https://images.unsplash.com/photo-1526406915891-30a44f2d7f62?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      desc: 'Tejido técnico que evapora el sudor rápidamente. Corte ergonómico para mejor libertad de movimiento.'
    },
    p3: {
      title: 'Set Mancuernas 2x10kg',
      price: 'USD 79.99',
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder',
      desc: 'Acabado en goma, aptas para entrenamiento en casa. Mango antideslizante y fácil de almacenar.'
    }
  };

  quickviewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const p = productData[id];
      modalBody.innerHTML = `
        <div style="display:flex;gap:1rem;flex-wrap:wrap">
          <img src="${p.img}" alt="${p.title}" style="width:320px;max-width:100%;border-radius:10px;object-fit:cover">
          <div style="flex:1">
            <h3 style="margin-top:0">${p.title}</h3>
            <p style="color:var(--accent);font-weight:700">${p.price}</p>
            <p style="color:var(--muted)}">${p.desc}</p>
            <div style="margin-top:1rem;display:flex;gap:0.5rem">
              <button class="btn btn-primary" id="modalAdd" data-id="${id}">Añadir al carrito</button>
              <button class="btn btn-outline" id="modalCloseAction">Cerrar</button>
            </div>
          </div>
        </div>
      `;
      modal.setAttribute('aria-hidden','false');
      // handler para añadir desde modal
      document.getElementById('modalAdd')?.addEventListener('click', (ev) => {
        const pid = ev.currentTarget.dataset.id;
        cart[pid] = (cart[pid] || 0) + 1;
        updateCartUI();
        modal.setAttribute('aria-hidden','true');
      });
      document.getElementById('modalCloseAction')?.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
    });
  });

  modalClose?.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('aria-hidden','true') });

  // Newsletter (demo)
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const el = document.getElementById('newsletterEmail');
    if (el.value) {
      alert('Gracias por suscribirte: ' + el.value);
      el.value = '';
    }
  });

  // Inicializa UI
  updateCartUI();
});