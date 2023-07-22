# AllTax Technical Test - <Victor Propheta Erbano>

Este projeto é um relatório de vendas que exibe gráficos de linha com base nos dados de vendas por mês de diferentes categorias, produtos e marcas. O gráfico é criado usando a biblioteca Chart.js para visualização dos dados.

## Como executar o projeto

Para executar o projeto, basta seguir os seguintes passos:

1. Clone o repositório ou faça o download dos arquivos.
    
2. Abra o arquivo index.html em um navegador web compatível.

3. Selecione uma categoria, produto e marca nos menus suspensos para visualizar o gráfico de vendas correspondente.

## Dependências

O projeto utiliza as seguintes dependências externas:

    - Bootstrap v5.3.0 - Para estilização do layout.
    - jQuery v3.6.0 - Biblioteca JavaScript para manipulação do DOM.
    - Chart.js - Biblioteca para criação de gráficos de dados.
    - Chart.js Plugin Datalabels - Plugin para exibir rótulos de dados nos gráficos.

Todas as dependências são carregadas externamente a partir de CDNs (Content Delivery Networks) para facilitar a execução do projeto sem a necessidade de instalação local.

## Funcionamento

Ao abrir o arquivo index.html no navegador, você verá um seletor para escolher a categoria de produtos e, em seguida, selecionar o produto e a marca desejada. O gráfico será atualizado automaticamente para exibir os dados de vendas por mês para a marca selecionada.

Os valores de vendas são gerados aleatoriamente entre 100 e 1000 para cada produto e marca, permitindo visualizar o desempenho de vendas de forma fictícia.

## Estilos Personalizados

Os estilos personalizados do projeto estão definidos no arquivo styles.css. Alterações adicionais de estilo podem ser feitas nesse arquivo para personalizar a aparência do relatório de vendas.

## Personalização

Caso você deseje personalizar o projeto, como adicionar novas categorias, produtos ou marcas, basta modificar o objeto `data` no arquivo `script.js`. Você também pode alterar o estilo do gráfico, atualizando as opções do `Chart.js` no mesmo arquivo.
