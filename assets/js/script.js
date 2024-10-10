document
  .getElementById("convertButton")
  .addEventListener("click", convertCurrency);

async function convertCurrency() {
  const amountClp = document.getElementById("amountClp").value;
  const selectedCurrency = document.getElementById("currencySelect").value;
  const resultDiv = document.getElementById("result");

  // Validación de los campos
  if (amountClp === "" || selectedCurrency === "") {
    resultDiv.textContent =
      "Por favor, ingrese un monto y seleccione una moneda.";
    return;
  }

  const apiUrl = "https://mindicador.cl/api/";

  try {
    // Obtener los datos de la moneda seleccionada
    const response = await fetch(apiUrl + selectedCurrency);

    // Si la respuesta no es exitosa, lanzamos un error
    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.statusText}`);
    }

    const data = await response.json();
    const conversionRate = data.serie[0].valor;
    const convertedAmount = (amountClp / conversionRate).toFixed(2);

    // Mostrar el resultado de la conversión en el DOM
    resultDiv.textContent = `El monto en ${selectedCurrency} es: ${convertedAmount}`;

    // Llamar a la función del gráfico en el archivo chart.js para mostrar los últimos 10 días
    showCurrencyChart(data.serie.slice(0, 10)); // Tomamos los últimos 10 días de datos
  } catch (error) {
    // Capturamos cualquier error ocurrido y lo mostramos en el DOM
    resultDiv.textContent = `Ocurrió un error: ${error.message}`;
    console.error("Error fetching data:", error);
  }
}
