# Bases de Dados Públicas — Instituto MONSTER

Pasta pronta para publicação no **GitHub Pages**. Contém apenas o site de
Bases de Dados Públicas e sua subpágina de Materiais de apoio.

## Como publicar

1. Crie um repositório no GitHub.
2. Envie **todo o conteúdo desta pasta** para a raiz do repositório
   (o `index.html` precisa ficar na raiz, não dentro de uma subpasta).
3. Vá em **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**, selecione a branch `main`
   e a pasta **/ (root)**, e clique em **Save**.
5. Em alguns minutos o site estará em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Estrutura

- `index.html` — Bases de Dados Públicas (página inicial)
- `materiais-apoio.html` — subpágina de Materiais de apoio (downloads)
- `assets/` — logo e favicons
- `styles/` — CSS e script de animação
- `downloads/` — os 8 arquivos PDF disponibilizados na página de Materiais
- `.nojekyll` — evita o processamento por Jekyll no GitHub Pages

## Adicionar novos materiais para download

1. Coloque o arquivo dentro de `downloads/`.
2. Abra `materiais-apoio.html` e localize a lista `MATERIAIS`
   (marcada com o comentário **EDITE AQUI**).
3. Adicione uma linha com o título e o caminho do arquivo.
