# News Soberano - Tema WordPress Profissional

Tema profissional para portal de notícias desenvolvido especialmente para o Jornal Campo Soberano.

## Características

### Design & Visual
- ✅ Design moderno inspirado nos melhores portais de notícias do Brasil (G1, UOL, etc)
- ✅ Esquema de cores verde e marrom personalizado
- ✅ Layout responsivo (mobile-first)
- ✅ Modo escuro/claro com toggle
- ✅ Animações suaves e transições
- ✅ Grid de notícias configurável (2, 3 ou 4 colunas)

### Performance
- ✅ Otimizado para Core Web Vitals
- ✅ Lazy loading de imagens nativo
- ✅ CSS e JavaScript minificados
- ✅ Compatível com WP Rocket
- ✅ Prefetch de links ao hover
- ✅ Remoção de scripts desnecessários

### SEO
- ✅ Schema.org markup (NewsArticle)
- ✅ Meta tags Open Graph e Twitter Cards
- ✅ Compatível com Rank Math SEO
- ✅ Breadcrumbs integrados
- ✅ URLs amigáveis
- ✅ Sitemap XML pronto

### AMP (Accelerated Mobile Pages)
- ✅ Suporte completo a AMP
- ✅ Templates AMP customizados
- ✅ Estilos otimizados para AMP
- ✅ Analytics integrado no AMP

### Funcionalidades
- ✅ Sistema de visualizações de posts
- ✅ Posts populares (widget)
- ✅ Posts relacionados automáticos
- ✅ Compartilhamento social (Facebook, Twitter, WhatsApp, Email)
- ✅ Tempo estimado de leitura
- ✅ Box de autor
- ✅ Sistema de comentários estilizado
- ✅ Busca avançada com modal
- ✅ Menu mobile responsivo
- ✅ Botão "Voltar ao topo"
- ✅ 3 áreas de widgets no rodapé
- ✅ Sidebar personalizável
- ✅ Customizer com preview ao vivo

## Instalação

### Via Painel do Hostinger (Recomendado)

1. **Baixe o arquivo ZIP** do tema (`news-soberano.zip`)

2. **Acesse o painel do WordPress** no Hostinger:
   - Vá para `Aparência > Temas`

3. **Adicione o novo tema**:
   - Clique em "Adicionar novo"
   - Clique em "Enviar tema"
   - Clique em "Escolher arquivo"
   - Selecione o arquivo `news-soberano.zip`
   - Clique em "Instalar agora"

4. **Ative o tema**:
   - Após a instalação, clique em "Ativar"

5. **Configure o tema**:
   - Vá para `Aparência > Personalizar` para configurar cores, logo, menus, etc.

### Via File Manager do Hostinger (Alternativo)

1. **Acesse o File Manager** do Hostinger

2. **Navegue até a pasta de temas**:
   ```
   public_html/wp-content/themes/
   ```

3. **Extraia o tema**:
   - Faça upload do arquivo `news-soberano.zip`
   - Extraia o arquivo ZIP (botão direito > Extract)
   - Certifique-se de que a pasta se chama `news-soberano`

4. **Ative o tema** no painel do WordPress:
   - Vá para `Aparência > Temas`
   - Encontre "News Soberano"
   - Clique em "Ativar"

## Configuração Inicial

### 1. Configurar Menus
1. Vá para `Aparência > Menus`
2. Crie um novo menu ou use um existente
3. Atribua ao local "Menu Principal"
4. Adicione as páginas/categorias desejadas

### 2. Configurar Widgets
1. Vá para `Aparência > Widgets`
2. Configure a "Sidebar Principal" com widgets como:
   - Posts Populares (News Soberano)
   - Categorias
   - Pesquisa
3. Configure os widgets do rodapé (Rodapé 1, 2, 3)

### 3. Configurar Logo
1. Vá para `Aparência > Personalizar > Identidade do site`
2. Faça upload do seu logo
3. Ajuste as dimensões conforme necessário

### 4. Configurar Cores (Opcional)
1. Vá para `Aparência > Personalizar > Cores do Tema`
2. Ajuste as cores verde e marrom conforme preferir

### 5. Configurar Homepage
1. Vá para `Configurações > Leitura`
2. Defina quantos posts exibir por página
3. Marque um post como "Destaque" (adicione o campo customizado `_is_ns_featured` com valor `1`)

## Plugins Recomendados

### Obrigatórios/Importantes
- ✅ **WP Rocket** - Para cache e otimização (já configurado)
- ✅ **Rank Math SEO** - Para SEO avançado (já configurado)

### Opcionais mas Recomendados
- **AMP** - Para páginas AMP (tema já tem suporte)
- **Smush** - Para otimização de imagens
- **Contact Form 7** - Para formulários de contato
- **Akismet** - Para anti-spam nos comentários

## Personalização

### Cores
Para alterar as cores do tema, vá para:
```
Aparência > Personalizar > Cores do Tema
```

### Layout
Para alterar o layout (número de colunas no grid, largura do container):
```
Aparência > Personalizar > Layout
```

### Redes Sociais
Para adicionar links de redes sociais no rodapé:
```
Aparência > Personalizar > Redes Sociais
```

## Recursos Técnicos

### Estrutura de Arquivos
```
news-soberano/
├── assets/
│   ├── css/
│   │   ├── additional-styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── lazyload.js
│   └── images/
├── inc/
│   ├── customizer.php
│   ├── template-tags.php
│   └── amp-support.php
├── 404.php
├── archive.php
├── comments.php
├── footer.php
├── functions.php
├── header.php
├── index.php
├── searchform.php
├── sidebar.php
├── single.php
└── style.css
```

### Hooks Disponíveis
O tema segue os padrões WordPress e suporta todos os hooks nativos.

### Tamanhos de Imagem
- `news-featured`: 1200x600px (Destaque principal)
- `news-large`: 800x450px (Cards de notícias)
- `news-medium`: 400x225px (Posts relacionados)
- `news-thumb`: 200x150px (Widgets)

### Áreas de Widgets
- `sidebar-1`: Sidebar principal
- `footer-1`: Rodapé coluna 1
- `footer-2`: Rodapé coluna 2
- `footer-3`: Rodapé coluna 3

## Otimização de Performance

### Recomendações WP Rocket
1. Ative "Minificação de CSS e JavaScript"
2. Ative "Combinar arquivos CSS/JavaScript"
3. Ative "Lazy Load para imagens"
4. Ative "Cache de página"

### Recomendações Rank Math
1. Configure o sitemap XML
2. Ative os breadcrumbs
3. Configure o Schema.org
4. Otimize os títulos e descrições

## Suporte e Documentação

### Problemas Comuns

**P: As cores não estão aparecendo corretamente**
R: Limpe o cache do WP Rocket e do navegador

**P: O menu mobile não está funcionando**
R: Certifique-se de que o JavaScript está carregando corretamente

**P: As imagens não estão sendo lazy-loaded**
R: Verifique se o WP Rocket não está conflitando. Desative o lazy load do WP Rocket se necessário.

**P: O AMP não está funcionando**
R: Instale o plugin "AMP" oficial do WordPress e ative o modo "Paired"

## Créditos

- Desenvolvido para: **Jornal Campo Soberano**
- Tema: **News Soberano v1.0.0**
- WordPress Version: 5.8+
- PHP Version: 7.4+

## Licença

GNU General Public License v2 or later

## Changelog

### v1.0.0 (2025-12-11)
- Lançamento inicial
- Design moderno inspirado em portais de notícias
- Suporte completo a AMP
- Otimização para SEO
- Compatibilidade com WP Rocket e Rank Math
- Modo escuro/claro
- Sistema de visualizações de posts
- Posts populares e relacionados
- Compartilhamento social
