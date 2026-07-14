# Painel de Vistoria de Campo — publicar no GitHub Pages (PWA)

Este pacote transforma o painel em um **site https** que funciona **offline** e pode ser
**instalado na tela inicial** do celular (Android e iPhone), com salvamento confiável.

## Arquivos (mantenha todos juntos, na raiz do repositório)
- `index.html` — o painel (com Chart.js e SheetJS embutidos; funciona offline)
- `chart.umd.js` — biblioteca de gráficos (Chart.js)
- `xlsx.full.min.js` — biblioteca de leitura de Excel (SheetJS)
- `manifest.webmanifest` — dados do app (nome, ícones, cores)
- `sw.js` — service worker (guarda o app para uso offline)
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — ícones

## Passo a passo (uma vez)
1. Crie um repositório no GitHub (pode ser **público**), ex.: `vistoria-campo`.
2. Envie **todos os arquivos acima** para a raiz do repositório
   (botão **Add file ▸ Upload files**, arraste tudo, **Commit**).
3. No repositório: **Settings ▸ Pages**.
4. Em **Build and deployment ▸ Source**, escolha **Deploy from a branch**.
5. Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique **Save**.
6. Aguarde ~1 minuto. O endereço aparece no topo da página Pages, no formato:
   `https://SEU-USUARIO.github.io/vistoria-campo/`

## Instalar no celular
- **Android (Chrome):** abra o link, toque no menu **⋮ ▸ Instalar app / Adicionar à tela inicial**.
- **iPhone (Safari):** abra o link, toque em **Compartilhar** (quadrado com seta) **▸ Adicionar à Tela de Início**.

Depois de instalado, o app abre em tela cheia, funciona **sem internet** e **salva** os dados
das visitas normalmente (as fotos também). Dica: abra o app **uma vez com internet** para ele
guardar tudo para o modo offline.

## Atualizar o painel depois
Quando você tiver uma versão nova do `index.html`:
1. Substitua o `index.html` no repositório (Upload files ▸ Commit).
2. Abra o `sw.js` e **troque a versão do cache** (ex.: `vistoria-campo-v1` → `vistoria-campo-v2`)
   e faça commit. Isso força os aparelhos a baixarem a versão nova.

## Backup dos dados
Os registros ficam salvos **no aparelho** (não no GitHub). Para backup ou para levar os dados
a outro aparelho, use **Exportar visitas (JSON)** na aba *Visitas* e **Importar** no destino.
