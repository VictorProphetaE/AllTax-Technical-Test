document.addEventListener("DOMContentLoaded", function() {
    const data = {
        categorias: [
            { nome: 'Roupa', produtos: ['Camisa', 'Calça'] },
            { nome: 'Alimentos', produtos: ['Cereais', 'Fruta'] },
        ],
        vendas: [
            { categoria: 'Roupa', produto: 'Camisa', marca: 'Camisa 1', vendasPorMes: [] },
            { categoria: 'Roupa', produto: 'Camisa', marca: 'Camisa 2', vendasPorMes: [] },
            { categoria: 'Roupa', produto: 'Camisa', marca: 'Camisa 3', vendasPorMes: [] },
            { categoria: 'Roupa', produto: 'Calça', marca: 'Calça 1', vendasPorMes: [] },
            { categoria: 'Roupa', produto: 'Calça', marca: 'Calça 2', vendasPorMes: [] },
            { categoria: 'Roupa', produto: 'Calça', marca: 'Calça 3', vendasPorMes: [] },
            { categoria: 'Alimentos', produto: 'Cereais', marca: 'Cereal 1', vendasPorMes: [] },
            { categoria: 'Alimentos', produto: 'Cereais', marca: 'Cereal 2', vendasPorMes: [] },
            { categoria: 'Alimentos', produto: 'Cereais', marca: 'Cereal 3', vendasPorMes: [] },
            { categoria: 'Alimentos', produto: 'Fruta', marca: 'Fruta 1', vendasPorMes: [] },
            { categoria: 'Alimentos', produto: 'Fruta', marca: 'Fruta 2', vendasPorMes: [] },
            { categoria: 'Alimentos', produto: 'Fruta', marca: 'Fruta 3', vendasPorMes: [] },
        ],
    };

    // Preencher as vendas com valores randômicos entre 100 e 1000
    data.vendas.forEach(venda => {
        venda.vendasPorMes = Array.from({ length: 6 }, () => Math.floor(Math.random() * 901) + 100);
    });
  
    const categoriaSelect = document.getElementById('categoria-select');
    const produtoSelect = document.getElementById('produto-select');
    const marcaSelect = document.getElementById('marca-select');
    // Variável para armazenar a instância do gráfico
    let myChart = null;

    // Preencher as opções de Categoría no select
    data.categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.textContent = categoria.nome;
        categoriaSelect.appendChild(option);
    });

    // Atualizar as opções de Produto e Marca com base na Categoría selecionada
    categoriaSelect.addEventListener('change', () => {
        const categoriaSelecionada = categoriaSelect.value;
        produtoSelect.innerHTML = ''; // Limpar as opções anteriores
        marcaSelect.innerHTML = '';

        const produtosFiltrados = data.categorias.find(categoria => categoria.nome === categoriaSelecionada)?.produtos;
        produtosFiltrados.forEach(produto => {
            const option = document.createElement('option');
            option.textContent = produto;
            produtoSelect.appendChild(option);
        });

        // Selecionar o primeiro valor da lista para Produto e Marca automaticamente
        produtoSelect.selectedIndex = 0;
        atualizarMarcas();
    });

    // Atualizar as opções de Marca com base no Produto selecionado
    produtoSelect.addEventListener('change', () => {
        atualizarMarcas();
    });

    // Atualizar as marcas com base no Produto selecionado
    function atualizarMarcas() {
        const categoriaSelecionada = categoriaSelect.value;
        const produtoSelecionado = produtoSelect.value;
        marcaSelect.innerHTML = ''; // Limpar as opções anteriores

        const marcasFiltradas = data.vendas
            .filter(venda => venda.categoria === categoriaSelecionada && venda.produto === produtoSelecionado)
            .map(venda => venda.marca);
        
        marcasFiltradas.forEach(marca => {
            const option = document.createElement('option');
            option.textContent = marca;
            marcaSelect.appendChild(option);
        });

        // Atualizar o gráfico com base nas vendas da marca selecionada
        atualizarGrafico();
    }

    // Atualizar o gráfico com base na Marca selecionada
    marcaSelect.addEventListener('change', () => {
        atualizarGrafico();
    });

    // Atualizar o gráfico com base na Marca selecionada
    function atualizarGrafico() {
        const categoriaSelecionada = categoriaSelect.value;
        const produtoSelecionado = produtoSelect.value;
        const marcaSelecionada = marcaSelect.value;

        const vendaSelecionada = data.vendas.find(venda =>
            venda.categoria === categoriaSelecionada &&
            venda.produto === produtoSelecionado &&
            venda.marca === marcaSelecionada
        );

        // Obter os dados de vendas por mês
        const vendasPorMes = vendaSelecionada?.vendasPorMes.slice(0, 6) || [];

        // Labels para o gráfico
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'];

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                datalabels: {
                    display: true,
                    align: 'end',
                    anchor: 'end',
                    color: 'rgba(0, 0, 0, 0.7)',
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                }
            },
        };  

        // Verificar se a instância do gráfico já foi criada
        if (myChart) {
            myChart.data.labels = meses;
            myChart.data.datasets[0].data = vendasPorMes;
            myChart.data.datasets[0].label = `Vendas por Mês`;
            myChart.options = chartOptions;
            myChart.update();
        } else {
            // Criar o gráfico com base nas vendas da marca selecionada
            const ctx = document.getElementById('chart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: meses,
                    datasets: [{
                        label: `Vendas por Mês`,
                        data: vendasPorMes,
                        borderWidth: 2,
                    }],
                },
                options: chartOptions,
            });
        }
    }

    // Inicializar os selects com a primeira opção
    categoriaSelect.selectedIndex = 0;
    produtoSelect.selectedIndex = 0;
    marcaSelect.selectedIndex = 0;
    
    // Simular o evento 'change' para preencher as opções de Produto e Marca com base na Categoría selecionada (Roupa)
    const eventoChange = new Event('change');
    categoriaSelect.dispatchEvent(eventoChange);

    // Simular o evento 'change' para preencher as opções de Marca com base no Produto selecionado (Camisa)
    produtoSelect.dispatchEvent(eventoChange);

    // Simular o evento 'change' para atualizar o gráfico com base na Marca selecionada (Camisa 1)
    marcaSelect.dispatchEvent(eventoChange);
});