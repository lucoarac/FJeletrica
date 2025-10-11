function sendToWhatsApp() {
  const nome = document.getElementById("nome").value;
  const servico = document.getElementById("servico").value;
  const mensagem = document.getElementById("mensagem").value;
 
  const texto = `Olá, me chamo ${nome}.
 Gostaria de solicitar um orçamento para: *${servico}*.

 Descrição: ${mensagem};`;

  const numeroWhatsApp = "5571992524338";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
  return false;
}

// Troca dinâmica das imagens de fundo do cabeçalho
let slides = document.querySelectorAll('.slide-foto');
let index = 0;
setInterval(() => {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 4000);

// Carrossel de depoimentos dos clientes
const depoimentos = document.querySelectorAll('#depoimentos blockquote');
let depoIndex = 0;
depoimentos[depoIndex].classList.add("active");

setInterval(() => {
  depoimentos[depoIndex].classList.remove("active");
  depoIndex = (depoIndex + 1) % depoimentos.length;
  depoimentos[depoIndex].classList.add("active");
}, 5000);

function enviarAvaliacao() {
  const nome = document.getElementById("nomeCliente").value.trim();
  const genero = document.getElementById("generoCliente").value;
  const comentario = document.getElementById("comentarioCliente").value.trim();

  if (!nome || !genero || !comentario) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  const container = document.createElement("div");
  container.classList.add("cliente", genero);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = genero === "homem" ? "👨‍🔧" : "👩‍🔧";

  const msg = document.createElement("div");
  msg.classList.add("mensagem");
  msg.innerHTML = `${comentario}<br><strong>- ${nome}</strong>`;

  container.appendChild(avatar);
  container.appendChild(msg);

  const section = document.querySelector(".clientes-satisfeitos");
  section.insertBefore(container, section.querySelector(".avaliacao"));

  document.getElementById("formAvaliacao").reset();
  alert("Avaliação enviada com sucesso!");
  return false;
}

