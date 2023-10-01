const gen_table = async () => {
  try {
    document.getElementById("tab").innerHTML = "";
    const capitalInput = document.getElementById("capital");
    const cuotaInput = document.getElementById("cuota");
    const interesInput = document.getElementById("interes");

    const capital = Number(capitalInput.value);
    const capital2 = Number(cuotaInput.value);
    const capital3 = Number(interesInput.value);

    if (!isNaN(capital) && !isNaN(capital2) && !isNaN(capital3) && capital > 0 && capital2 > 0 && capital3 > 0) {
      const tableRows = [];
      const data = [];

      let totalDeInteres = 0;

      for (let i = 1; i <= capital2; i++) {
        const cuota = capital / capital2;
        const decimal1 = cuota.toFixed(2);
        const interes2 = (capital * capital3) / 100 / capital2;
        const decimal2 = interes2.toFixed(2);
        const total = cuota + interes2;
        const decimal3 = total.toFixed(2);

        console.log(`Iteración ${i}: Cuota=${decimal1}, Interés=${decimal2}, Total=${decimal3}`);

        tableRows.push(`
          <tr>
            <td>${i}</td>
            <td>${decimal1}</td>
            <td>${decimal2}</td>
            <td>${decimal3}</td>
          </tr>
        `);

        data.push({
          Iteracion: i,
          Cuota: decimal1,
          Interes: decimal2,
          Total: decimal3
        });

        totalDeInteres += interes2;
      }

      const capital1 = capital.toFixed(2);
      const decimal4 = totalDeInteres.toFixed(2);
      const totalAPagar = (capital / capital2 + totalDeInteres) * capital2;
      const decimal5 = totalAPagar.toFixed(2);

      console.log("Total de Interés:", decimal4);
      console.log("Total a Pagar:", decimal5);

      const jsonData = JSON.stringify(data);

      localStorage.setItem('tablaData', jsonData);

      const storedData = localStorage.getItem('tablaData');

      localStorage.removeItem('tablaData');

      document.getElementById("tab").innerHTML = tableRows.join("");

      document.getElementById("total1").innerHTML = capital1;
      document.getElementById("total2").innerHTML = decimal4;
      document.getElementById("total3").innerHTML = decimal5;

      const errorDiv = document.getElementById("errorMensaje");
      errorDiv.textContent = "";

      swal("¡Éxito!", "Cálculos realizados correctamente", "success");
    } else {
      swal("Error", "Falta ingresar los datos correspondientes a cada sección o los valores no son válidos", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    const errorDiv = document.getElementById("errorMensaje");
    errorDiv.textContent = "Ocurrió un error al calcular la tabla.";
  }
};

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("btnCalcular").addEventListener("click", gen_table);
});
