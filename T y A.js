document.addEventListener("DOMContentLoaded", () => {
    const URL_API = "https://pokeapi.co/api/v2/pokemon/";

    // 1. Seleccionamos todos los bloques de pokémon que configuramos en el HTML
    const tarjetasPokemon = document.querySelectorAll(".pokemon[data-pokemon]");

    tarjetasPokemon.forEach(tarjeta => {
        // Obtener el nombre del pokémon asignado en el HTML
        const nombrePokemon = tarjeta.getAttribute("data-pokemon");

        // 2. Llamamos a la API usando el nombre
        fetch(URL_API + nombrePokemon)
            .then(response => {
                if (!response.ok) throw new Error("Pokémon no encontrado");
                return response.json();
            })
            .then(data => {
                // 3. Extraemos la imagen oficial (high quality)
                const urlImagen = data.sprites.other["official-artwork"].front_default;

                // 4. Creamos la etiqueta img dinámicamente
                const img = document.createElement("img");
                img.src = urlImagen;
                img.alt = data.name;

                // 5. La inyectamos dentro de la tarjeta correspondiente
                tarjeta.appendChild(img);
            })
            .catch(error => {
                console.error(`Error al cargar a ${nombrePokemon}:`, error);
            });
    });
});
