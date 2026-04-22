function adicionarTarefa() {
    const tarefa = document.getElementById("nome-tarefa").value;
    const horas = document.getElementById("horas").value;
    const precohora = document.getElementById("valor-hora").value;
    const imposto = document.getElementById("imposto").value;
    const urgencia = document.getElementById("urgencia").value;

    const header = document.querySelector(".header");
    const dashboard = document.querySelector(".dashboard");
    
    const valorBase = (horas * precohora) * (1 + imposto/100);

    if (urgencia == "media") {
        valorFinal = valorBase * 1.2;
    } else if (urgencia == "alta") {
        valorFinal = valorBase * 1.5;
    } else {
        valorFinal = valorBase;
    }

    const novaTarefa = document.createElement("section");
    novaTarefa.classList.add("tarefas");

    novaTarefa.dataset.valor = valorFinal;
    novaTarefa.dataset.horas = horas;

    novaTarefa.innerHTML = `
        <p>${tarefa}</p>
        <p>${horas}h</p>
        <p>R$ ${valorFinal.toFixed(2)}</p>
        <button class="excluir" onclick="removerTarefa(this)">
            <span class="material-symbols-outlined">delete</span>
        </button>
    `;

    document.getElementById("lista-tarefas").appendChild(novaTarefa);

    document.getElementById("nome-tarefa").value = "";
    document.getElementById("horas").value = "";
    document.getElementById("valor-hora").value = "";
    document.getElementById("imposto").value = "";

    header.classList.remove("oculto");

    dashboard.classList.remove("oculto");
    
    atualizarTotais();
}

function atualizarTotais() {
    const tarefas = document.querySelectorAll(".tarefas");

    let totalHoras = 0;
    let totalCusto = 0;

    tarefas.forEach(tarefa => {
        const horasTexto = tarefa.children[1].textContent;
        const valorTexto = tarefa.children[2].textContent;

        const horas = Number(horasTexto.replace("h", ""));
        const valor = Number(valorTexto.replace("R$ ", ""));

        totalHoras += horas;
        totalCusto += valor;
    });

    document.getElementById("out-horastotais").textContent = totalHoras + "h";
    document.getElementById("out-total").textContent = "R$ " + totalCusto.toFixed(2);
}

function removerTarefa(botao) {
    botao.parentElement.remove();
    verificarListaVazia();
    atualizarTotais();
}

function verificarListaVazia() {
    const lista = document.getElementById("lista-tarefas");
    const header = document.querySelector(".header");
    const dashboard = document.querySelector(".dashboard");

    if (lista.children.length === 0) {
        header.classList.add("oculto");

        dashboard.classList.add("oculto");
    }
}
