(() => {
  "use strict";

  const numeroWhatsApp = "5571992524338";
  let intervaloCabecalhoId = null;

  const fotosCabecalho = [
    { src: "imagens/projeto.jpg", alt: "Planta de projeto elétrico de residência com legenda de pontos de iluminação" },
    { src: "imagens/instalacao_solar.jpg", alt: "Usina solar fotovoltaica em campo aberto" },
    { src: "imagens/novotrabalho13.jpg", alt: "Pavilhão coberto com estrutura de madeira e iluminação instalada" },
    { src: "imagens/novotrabalho14.jpg", alt: "Pavilhão iluminado à noite com iluminação das áreas cobertas" },
    { src: "imagens/novotrabalho17.jpg", alt: "Salão amplo com iluminação linear de LED no forro" },
    { src: "imagens/novotrabalho26.jpg", alt: "Cubículo de média tensão instalado em subestação" }
  ];

  // Fotos reais de obra + renders 3D do projeto executado (legendados como render). Imagens de banco ficaram de fora.
  const fotosTrabalhos = [
    { src: "imagens/novo_trabalho1.jpg", alt: "Quadro de distribuição industrial com barramentos e disjuntores montados" },
    { src: "imagens/novo_trabalho2.jpg", alt: "Corredor com iluminação linear de LED embutida no forro" },
    { src: "imagens/instalacao_solar.jpg", alt: "Usina solar fotovoltaica em campo aberto" },
    { src: "imagens/novotrabalho5.jpg", alt: "Eletrocalha e infraestrutura de cabos no teto" },
    { src: "imagens/novotrabalho6.jpg", alt: "Quadros de distribuição embutidos em parede com cabeamento organizado" },
    { src: "imagens/novotrabalho7.jpg", alt: "Quadro de distribuição embutido com barramentos identificados" },
    { src: "imagens/novotrabalho8.jpg", alt: "Poste de entrada de energia em obra rural com cobertura ao fundo" },
    { src: "imagens/novotrabalho10.jpg", alt: "Painel de comando com contatores e dispositivos de proteção" },
    { src: "imagens/novotrabalho11.jpg", alt: "Equipe em poste de rede de distribuição durante obra de rede elétrica" },
    { src: "imagens/novotrabalho13.jpg", alt: "Pavilhão coberto com estrutura de madeira e iluminação instalada" },
    { src: "imagens/novotrabalho14.jpg", alt: "Pavilhão iluminado à noite com iluminação das áreas cobertas" },
    { src: "imagens/novotrabalho15.jpg", alt: "Obra de construção com área externa em acabamento" },
    { src: "imagens/novotrabalho16.jpg", alt: "Infraestrutura elétrica embutida em parede de alvenaria durante obra" },
    { src: "imagens/novotrabalho17.jpg", alt: "Salão amplo com iluminação linear de LED no forro" },
    { src: "imagens/novotrabalho18.jpg", alt: "Fachada de edificação comercial atendida em obra elétrica" },
    { src: "imagens/novotrabalho19.jpg", alt: "Quadro de comando com cabeamento identificado por cores" },
    { src: "imagens/novotrabalho20.jpg", alt: "Quadro de comando com contatores e dispositivos de proteção" },
    { src: "imagens/novotrabalho21.jpg", alt: "Usina solar em telhado ao entardecer" },
    { src: "imagens/novotrabalho22.jpg", alt: "Inversor solar instalado em parede" },
    { src: "imagens/novotrabalho23.jpg", alt: "Módulos fotovoltaicos instalados em cobertura" },
    { src: "imagens/novotrabalho24.jpg", alt: "Quadro de comando com contatores, relés e fiação organizada" },
    { src: "imagens/novotrabalho25.jpg", alt: "Quadro com disjuntor caixa moldada, DPS e barramentos" },
    { src: "imagens/novotrabalho26.jpg", alt: "Cubículo de média tensão instalado em subestação" },
    { src: "imagens/novotrabalho27.jpg", alt: "Forro com iluminação linear de LED embutida em ambiente amplo" },
    { src: "imagens/projeto.jpg", alt: "Planta de projeto elétrico de residência com legenda de pontos de iluminação" },
    { src: "imagens/comando1.jpg", alt: "Render 3D do projeto: ambiente integrado com iluminação em LED e forro de madeira (obra com instalação elétrica executada)" },
    { src: "imagens/executado.jpg", alt: "Render 3D do projeto: sala com forro de madeira e iluminação em LED embutida (obra com instalação elétrica executada)" },
    { src: "imagens/novotrabalho4.jpg", alt: "Render 3D do projeto: cozinha com bancada e iluminação em LED embutida (obra com instalação elétrica executada)" },
    { src: "imagens/trabalho5.jpg", alt: "Render 3D do projeto arquitetônico: varanda com lustre (obra com instalação elétrica executada)" },
    { src: "imagens/cartao.visita.jpg", alt: "Cartão de visita: Fábio Jean, eletricista eletrotécnico, 71 99252-4338" }
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

  function iniciarAmpliacao() {
    const galeria = document.getElementById("galeriaTrabalhos");
    if (!galeria) {
      return;
    }

    const fundo = document.createElement("div");
    const imagem = document.createElement("img");
    const legenda = document.createElement("p");
    const fechar = document.createElement("button");

    fundo.className = "ampliar-fundo";
    fundo.hidden = true;
    fundo.setAttribute("role", "dialog");
    fundo.setAttribute("aria-modal", "true");
    fundo.setAttribute("aria-label", "Foto ampliada");
    fechar.type = "button";
    fechar.className = "ampliar-fechar";
    fechar.textContent = "×";
    fechar.setAttribute("aria-label", "Fechar foto");
    fundo.append(fechar, imagem, legenda);
    document.body.appendChild(fundo);

    const fecharAmpliacao = () => {
      fundo.hidden = true;
      imagem.removeAttribute("src");
    };

    galeria.addEventListener("click", (evento) => {
      const alvo = evento.target;
      if (!(alvo instanceof HTMLImageElement)) {
        return;
      }
      imagem.src = alvo.src;
      imagem.alt = alvo.alt;
      legenda.textContent = alvo.alt;
      fundo.hidden = false;
      fechar.focus();
    });

    fundo.addEventListener("click", (evento) => {
      if (evento.target !== imagem) {
        fecharAmpliacao();
      }
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && !fundo.hidden) {
        fecharAmpliacao();
      }
    });
  }

  window.sendToWhatsApp = function sendToWhatsApp() {
    const nome = document.getElementById("nome").value.trim();
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !servico || !mensagem) {
      alert("Por favor, preencha todos os campos do orçamento.");
      return false;
    }

    const texto = `[Site] Olá, me chamo ${nome}.
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
    iniciarAmpliacao();

    const anoAtual = document.getElementById("anoAtual");
    if (anoAtual) {
      anoAtual.textContent = new Date().getFullYear();
    }
  });
})();
