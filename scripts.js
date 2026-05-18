(() => {
  "use strict";

  const numeroWhatsApp = "5571992524338";
  const maxComentarios = 5;
  const avaliacoesStorageKey = "fj-avaliacoes-clientes";
  let intervaloCabecalhoId = null;

  const fotosCabecalho = [
    { src: "imagens/projeto.jpg", alt: "Projeto elétrico técnico" },
    { src: "imagens/executado.jpg", alt: "Instalação elétrica executada" },
    { src: "imagens/quadro1.jpg", alt: "Quadro elétrico organizado" },
    { src: "imagens/instalacao_solar.jpg", alt: "Instalação de sistema solar" },
    { src: "imagens/comando1.jpg", alt: "Comando elétrico montado" },
    { src: "imagens/novo_trabalho1.jpg", alt: "Serviço elétrico profissional" },
    { src: "imagens/novo_trabalho2.jpg", alt: "Detalhe de instalação elétrica" },
    { src: "imagens/trabalho5.jpg", alt: "Manutenção elétrica realizada" }
  ];

  const fotosTrabalhos = [
    { src: "imagens/comando1.jpg", alt: "Comando elétrico em execução" },
    { src: "imagens/instalacao_solar.jpg", alt: "Instalação de sistema solar" },
    { src: "imagens/quadro1.jpg", alt: "Quadro elétrico organizado" },
    { src: "imagens/novo_trabalho1.jpg", alt: "Serviço elétrico realizado" },
    { src: "imagens/novo_trabalho2.jpg", alt: "Acabamento de instalação elétrica" },
    { src: "imagens/executado.jpg", alt: "Instalação elétrica executada" },
    { src: "imagens/trabalho4.jpg", alt: "Trabalho elétrico finalizado" },
    { src: "imagens/trabalho5.jpg", alt: "Manutenção elétrica com acabamento limpo" },
    { src: "imagens/trabalho6.jpg", alt: "Detalhe de serviço elétrico" },
    { src: "imagens/projeto.jpg", alt: "Projeto elétrico técnico" },
    { src: "imagens/novotrabalho5.jpg", alt: "Serviço elétrico recente 5" },
    { src: "imagens/novotrabalho6.jpg", alt: "Serviço elétrico recente 6" },
    { src: "imagens/novotrabalho7.jpg", alt: "Serviço elétrico recente 7" },
    { src: "imagens/novotrabalho8.jpg", alt: "Serviço elétrico recente 8" },
    { src: "imagens/novotrabalho10.jpg", alt: "Serviço elétrico recente 10" },
    { src: "imagens/novotrabalho11.jpg", alt: "Serviço elétrico recente 11" },
    { src: "imagens/novotrabalho13.jpg", alt: "Serviço elétrico recente 13" },
    { src: "imagens/novotrabalho14.jpg", alt: "Serviço elétrico recente 14" },
    { src: "imagens/novotrabalho15.jpg", alt: "Serviço elétrico recente 15" },
    { src: "imagens/novotrabalho16.jpg", alt: "Serviço elétrico recente 16" },
    { src: "imagens/novotrabalho17.jpg", alt: "Serviço elétrico recente 17" },
    { src: "imagens/novotrabalho18.jpg", alt: "Serviço elétrico recente 18" },
    { src: "imagens/novotrabalho19.jpg", alt: "Serviço elétrico recente 19" },
    { src: "imagens/novotrabalho20.jpg", alt: "Serviço elétrico recente 20" },
    { src: "imagens/novotrabalho21.jpg", alt: "Serviço elétrico recente 21" },
    { src: "imagens/novotrabalho22.jpg", alt: "Serviço elétrico recente 22" },
    { src: "imagens/novotrabalho23.jpg", alt: "Serviço elétrico recente 23" },
    { src: "imagens/novotrabalho24.jpg", alt: "Serviço elétrico recente 24" },
    { src: "imagens/novotrabalho25.jpg", alt: "Serviço elétrico recente 25" },
    { src: "imagens/novotrabalho26.jpg", alt: "Serviço elétrico recente 26" },
    { src: "imagens/novotrabalho27.jpg", alt: "Serviço elétrico recente 27" },
    { src: "imagens/cartao.visita.jpg", alt: "Cartão de visita profissional" }
  ];

  const videosTrabalhos = [
    { src: "imagens/video1.mp4", titulo: "Vídeo de serviço elétrico 1" },
    { src: "imagens/video2.mp4", titulo: "Vídeo de serviço elétrico 2" },
    { src: "imagens/video3.mp4", titulo: "Vídeo de serviço elétrico 3" },
    { src: "imagens/video_3.mp4", titulo: "Vídeo de serviço elétrico 4" },
    { src: "imagens/video_4.mp4", titulo: "Vídeo de serviço elétrico 5" }
  ];

  function diaAtual() {
    const data = new Date();
    return Math.floor(
      new Date(data.getFullYear(), data.getMonth(), data.getDate()).getTime() / 86400000
    );
  }

  function selecionarItensDoDia(itens, quantidade, deslocamento = 0) {
    if (!itens.length) {
      return [];
    }

    const copia = [...itens];
    const total = Math.min(quantidade, copia.length);
    const random = criarGeradorDiario(diaAtual() + deslocamento);

    for (let indice = copia.length - 1; indice > 0; indice -= 1) {
      const indiceSorteado = Math.floor(random() * (indice + 1));
      [copia[indice], copia[indiceSorteado]] = [copia[indiceSorteado], copia[indice]];
    }

    return copia.slice(0, total);
  }

  function criarGeradorDiario(semente) {
    let valor = semente % 2147483647;
    if (valor <= 0) {
      valor += 2147483646;
    }

    return () => {
      valor = (valor * 16807) % 2147483647;
      return (valor - 1) / 2147483646;
    };
  }

  function iniciarSliderCabecalho() {
    const slider = document.getElementById("headerSlider");
    if (!slider) {
      return;
    }

    if (intervaloCabecalhoId) {
      clearInterval(intervaloCabecalhoId);
      intervaloCabecalhoId = null;
    }

    const fotosDoDia = selecionarItensDoDia(fotosCabecalho, 5, 1);
    slider.replaceChildren();

    fotosDoDia.forEach((foto, indice) => {
      const slide = document.createElement("div");
      slide.className = indice === 0 ? "slide-foto active" : "slide-foto";
      slide.style.backgroundImage = `url("${foto.src}")`;
      slide.setAttribute("role", "img");
      slide.setAttribute("aria-label", foto.alt);
      slider.appendChild(slide);
    });

    const slides = slider.querySelectorAll(".slide-foto");
    if (slides.length <= 1) {
      return;
    }

    let indiceAtual = 0;
    intervaloCabecalhoId = setInterval(() => {
      slides[indiceAtual].classList.remove("active");
      indiceAtual = (indiceAtual + 1) % slides.length;
      slides[indiceAtual].classList.add("active");
    }, 4500);
  }

  function agendarAtualizacaoDiaria() {
    const agora = new Date();
    const proximaAtualizacao = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate() + 1,
      0,
      2,
      0
    );

    setTimeout(() => {
      iniciarSliderCabecalho();
      montarGaleriaTrabalhos();
      agendarAtualizacaoDiaria();
    }, proximaAtualizacao.getTime() - agora.getTime());
  }

  function montarGaleriaTrabalhos() {
    const galeria = document.getElementById("galeriaTrabalhos");
    if (!galeria) {
      return;
    }

    const fragmento = document.createDocumentFragment();
    const fotosDoDia = selecionarItensDoDia(fotosTrabalhos, 8);
    const videosDoDia = selecionarItensDoDia(videosTrabalhos, 1, 2);
    const posterVideo = fotosDoDia[0]?.src || "imagens/projeto.jpg";

    fotosDoDia.forEach((foto) => {
      const imagem = document.createElement("img");
      imagem.src = foto.src;
      imagem.alt = foto.alt;
      imagem.title = foto.alt;
      imagem.loading = "lazy";
      imagem.decoding = "async";
      imagem.width = 220;
      imagem.height = 150;
      fragmento.appendChild(imagem);
    });

    videosDoDia.forEach((video) => {
      const videoElemento = document.createElement("video");
      const fonte = document.createElement("source");

      videoElemento.controls = true;
      videoElemento.preload = "metadata";
      videoElemento.width = 300;
      videoElemento.poster = posterVideo;
      videoElemento.setAttribute("playsinline", "");
      videoElemento.setAttribute("aria-label", video.titulo);
      videoElemento.title = video.titulo;

      fonte.src = video.src;
      fonte.type = "video/mp4";

      videoElemento.appendChild(fonte);
      videoElemento.append("Seu navegador não suporta vídeo.");
      fragmento.appendChild(videoElemento);
    });

    galeria.replaceChildren(fragmento);
    criarControlesGaleria(galeria);
  }

  function criarControlesGaleria(galeria) {
    if (!galeria || document.querySelector(".galeria-controles")) {
      return;
    }

    const controles = document.createElement("div");
    const anterior = document.createElement("button");
    const proximo = document.createElement("button");

    controles.className = "galeria-controles";
    anterior.type = "button";
    proximo.type = "button";
    anterior.className = "slider-btn prev";
    proximo.className = "slider-btn next";
    anterior.textContent = "<";
    proximo.textContent = ">";
    anterior.setAttribute("aria-label", "Ver trabalhos anteriores");
    proximo.setAttribute("aria-label", "Ver próximos trabalhos");

    anterior.addEventListener("click", () => {
      galeria.scrollBy({ left: -260, behavior: "smooth" });
    });

    proximo.addEventListener("click", () => {
      galeria.scrollBy({ left: 260, behavior: "smooth" });
    });

    controles.append(anterior, proximo);
    galeria.insertAdjacentElement("afterend", controles);
  }

  function criarComentario({ nome, genero, comentario }) {
    const container = document.createElement("div");
    const avatar = document.createElement("div");
    const mensagem = document.createElement("div");
    const quebra = document.createElement("br");
    const autor = document.createElement("strong");

    container.classList.add("cliente", genero);
    avatar.classList.add("avatar");
    avatar.textContent = genero === "homem" ? "👨‍🔧" : "👩‍🔧";

    mensagem.classList.add("mensagem");
    mensagem.append(document.createTextNode(comentario), quebra);
    autor.textContent = `- ${nome}`;
    mensagem.appendChild(autor);

    container.append(avatar, mensagem);
    return container;
  }

  function limitarComentarios() {
    const comentariosDiv = document.querySelector(".comentarios");
    if (!comentariosDiv) {
      return;
    }

    while (comentariosDiv.children.length > maxComentarios) {
      comentariosDiv.firstElementChild.remove();
    }
  }

  function lerAvaliacoesSalvas() {
    try {
      return JSON.parse(localStorage.getItem(avaliacoesStorageKey)) || [];
    } catch (error) {
      return [];
    }
  }

  function salvarAvaliacao(avaliacao) {
    try {
      const avaliacoes = lerAvaliacoesSalvas();
      avaliacoes.push(avaliacao);
      localStorage.setItem(
        avaliacoesStorageKey,
        JSON.stringify(avaliacoes.slice(-maxComentarios))
      );
    } catch (error) {
      // O comentário continua aparecendo mesmo quando o navegador bloqueia armazenamento local.
    }
  }

  function carregarAvaliacoesSalvas() {
    const comentariosDiv = document.querySelector(".comentarios");
    if (!comentariosDiv) {
      return;
    }

    lerAvaliacoesSalvas().forEach((avaliacao) => {
      comentariosDiv.appendChild(criarComentario(avaliacao));
    });

    limitarComentarios();
  }

  window.enviarAvaliacao = function enviarAvaliacao() {
    const nome = document.getElementById("nomeCliente").value.trim();
    const genero = document.getElementById("generoCliente").value;
    const comentario = document.getElementById("comentarioCliente").value.trim();
    const comentariosDiv = document.querySelector(".comentarios");

    if (!nome || !genero || !comentario || !comentariosDiv) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }

    const avaliacao = { nome, genero, comentario };
    comentariosDiv.appendChild(criarComentario(avaliacao));
    limitarComentarios();
    salvarAvaliacao(avaliacao);

    document.getElementById("formAvaliacao").reset();
    alert("Avaliação enviada com sucesso!");
    return false;
  };

  window.sendToWhatsApp = function sendToWhatsApp() {
    const nome = document.getElementById("nome").value.trim();
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !servico || !mensagem) {
      alert("Por favor, preencha todos os campos do orçamento.");
      return false;
    }

    const texto = `Olá, me chamo ${nome}.
Gostaria de solicitar um orçamento para: *${servico}*.

Descrição: ${mensagem}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener");
    return false;
  };

  document.addEventListener("DOMContentLoaded", () => {
    iniciarSliderCabecalho();
    montarGaleriaTrabalhos();
    agendarAtualizacaoDiaria();
    carregarAvaliacoesSalvas();
    limitarComentarios();

    const anoAtual = document.getElementById("anoAtual");
    if (anoAtual) {
      anoAtual.textContent = new Date().getFullYear();
    }
  });
})();
