"""Otimiza fotos (acima de 300 KB) e videos (acima de 3 MB) da pasta imagens/.

Como usar (PowerShell, dentro da pasta SITE_ELETRICO):
    pip install pillow
    python otimizar_midia.py

- Fotos: reduz para no maximo 1800 px de largura, qualidade 82.
- Videos: so se o ffmpeg estiver instalado (reduz para no maximo 1280 px de largura).
- So troca o arquivo se o novo ficar menor. Antes de commitar, voce pode desfazer tudo com:
    git checkout -- imagens
"""
import shutil
import subprocess
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Falta o Pillow. Rode primeiro: pip install pillow")

PASTA = Path("imagens")
if not PASTA.is_dir():
    sys.exit("Rode este script dentro da pasta SITE_ELETRICO (onde fica a pasta imagens).")

total_antes = 0
total_depois = 0

for arq in sorted(PASTA.glob("*.jpg")):
    antes = arq.stat().st_size
    if antes < 300 * 1024:
        continue
    img = ImageOps.exif_transpose(Image.open(arq)).convert("RGB")
    if img.width > 1800:
        img = img.resize((1800, int(img.height * 1800 / img.width)), Image.LANCZOS)
    tmp = arq.with_name(arq.stem + ".tmp.jpg")
    img.save(tmp, "JPEG", quality=82, optimize=True, progressive=True)
    depois = tmp.stat().st_size
    if depois < antes:
        tmp.replace(arq)
        total_antes += antes
        total_depois += depois
        print(f"{arq.name}: {antes // 1024} KB -> {depois // 1024} KB")
    else:
        tmp.unlink()

ffmpeg = shutil.which("ffmpeg")
if not ffmpeg:
    try:
        import imageio_ffmpeg

        ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        ffmpeg = None
videos = [v for v in sorted(PASTA.glob("*.mp4")) if v.stat().st_size > 3 * 1024 * 1024]
if videos and not ffmpeg:
    print("\nVideos grandes encontrados, mas nao achei o ffmpeg. Rode: pip install imageio-ffmpeg  e depois python otimizar_midia.py de novo.")
else:
    for arq in videos:
        antes = arq.stat().st_size
        tmp = arq.with_name(arq.stem + ".tmp.mp4")
        cmd = [
            ffmpeg, "-y", "-i", str(arq),
            "-vf", "scale='min(1280,iw)':-2",
            "-c:v", "libx264", "-crf", "28", "-preset", "medium",
            "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart",
            str(tmp),
        ]
        resultado = subprocess.run(cmd, capture_output=True)
        if resultado.returncode != 0 or not tmp.exists():
            print(f"{arq.name}: falhou, mantido o original")
            tmp.unlink(missing_ok=True)
            continue
        depois = tmp.stat().st_size
        if depois < antes:
            tmp.replace(arq)
            total_antes += antes
            total_depois += depois
            print(f"{arq.name}: {antes // 1024} KB -> {depois // 1024} KB")
        else:
            tmp.unlink()

print(f"\nTotal: {total_antes // 1024} KB -> {total_depois // 1024} KB")
