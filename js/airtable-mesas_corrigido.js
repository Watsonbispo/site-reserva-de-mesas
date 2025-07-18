async function carregarMesas(setor, tipo) {
    const mesaSelect = document.getElementById("mesa");
    mesaSelect.innerHTML = "<option disabled selected>⏳ Carregando mesas...</option>";
    const url = `https://hook.eu2.make.com/rfuslmntgjf7hitx4rskmh784pxn9nvq?setor=${encodeURIComponent(setor)}&tipo=${encodeURIComponent(tipo)}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Falha no servidor Make:", errorText);
            alert("Erro ao buscar mesas. Tente novamente.");
            mesaSelect.innerHTML = "<option disabled selected>⚠️ Erro ao carregar</option>";
            return;
        }

        const data = await response.json();
        console.log("Dados recebidos:", data);
        if (!data.length) {
            mesaSelect.innerHTML = "<option disabled selected>❌ Nenhuma mesa disponível</option>";
            return;
        }
        
        mesaSelect.innerHTML = '<option value="">Selecione...</option>';
        data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.Mesa;
            option.textContent = `${item.Mesa}`;
            option.setAttribute("data-link", item["Link Produto"] || "");
            mesaSelect.appendChild(option);
        });
        
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro de conexão. Verifique sua internet ou tente mais tarde.");
        mesaSelect.innerHTML = "<option disabled selected>⚠️ Erro de conexão</option>";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const setorSelect = document.getElementById("setor");
    const tipoSelect = document.getElementById("cadeiras");
    const mesaSelect = document.getElementById("mesa");
    const reservarBtn = document.getElementById("btn-reservar");
    function checkEnableReservar() {
        reservarBtn.disabled = !(setorSelect.value && tipoSelect.value && mesaSelect.value);
    }
    setorSelect.addEventListener("change", () => {
        if (setorSelect.value && tipoSelect.value) {
            carregarMesas(setorSelect.value, tipoSelect.value);
        }
        checkEnableReservar();
    });
    tipoSelect.addEventListener("change", () => {
        if (setorSelect.value && tipoSelect.value) {
            carregarMesas(setorSelect.value, tipoSelect.value);
        }
        checkEnableReservar();
    });
    mesaSelect.addEventListener("change", checkEnableReservar);
    reservarBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if(!setorSelect.value || !tipoSelect.value || !mesaSelect.value){
            reservarBtn.style.border="solid 2px red"
            alert("preencha todos os campos")
        }
        else{
        reservarBtn.style.border="solid 0px"
        const selectedOption = mesaSelect.options[mesaSelect.selectedIndex];
        const link = selectedOption?.getAttribute("data-link");
        if (link && link.startsWith("http")) {
            window.location.href = link;
        } else {
            alert("Por favor, selecione uma mesa válida com link de pagamento.");
        }}
    });
});
window.addEventListener("pageshow", () => {
    const setorSelect = document.getElementById("setor");
    const tipoSelect = document.getElementById("cadeiras");
    if (setorSelect?.value && tipoSelect?.value) {
        setTimeout(() => {
            carregarMesas(setorSelect.value, tipoSelect.value);
        }, 15);
    }
});
const btnAjud = document.getElementById("ajuda");
const Modal = document.getElementById("modalAjuda");
btnAjud.addEventListener("click", () => {
    Modal.style.display = "block";
});
const fecharMsgAjuda = document.getElementById("fecharModal");
fecharMsgAjuda.addEventListener("click", () => {
    Modal.style.display = "none";
});
document.addEventListener("DOMContentLoaded", () => {
    const telefoneInput = document.getElementById("telefone");
    if (telefoneInput) {
        telefoneInput.addEventListener("input", () => {
            let value = telefoneInput.value.replace(/\D/g, "");
            if (value.length > 11) value = value.slice(0, 11);
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
            telefoneInput.value = value;
        });
    }
});
