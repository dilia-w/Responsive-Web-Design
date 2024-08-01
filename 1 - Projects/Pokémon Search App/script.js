document.getElementById('search-button').addEventListener('click', async () => {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    if (!searchInput) {
        alert("Pokémon not found");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        
        const data = await response.json();

        document.getElementById('pokemon-info').style.display = 'block';
        document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
        document.getElementById('pokemon-id').textContent = `#${data.id}`;
        document.getElementById('weight').textContent = `Weight: ${data.weight}`;
        document.getElementById('height').textContent = `Height: ${data.height}`;

        const typesContainer = document.getElementById('types');
        typesContainer.innerHTML = '';
        data.types.forEach(typeInfo => {
            const typeElement = document.createElement('p');
            typeElement.textContent = typeInfo.type.name.toUpperCase();
            typesContainer.appendChild(typeElement);
        });

        document.getElementById('hp').textContent = data.stats[0].base_stat;
        document.getElementById('attack').textContent = data.stats[1].base_stat;
        document.getElementById('defense').textContent = data.stats[2].base_stat;
        document.getElementById('special-attack').textContent = data.stats[3].base_stat;
        document.getElementById('special-defense').textContent = data.stats[4].base_stat;
        document.getElementById('speed').textContent = data.stats[5].base_stat;

        const sprite = document.getElementById('sprite');
        sprite.src = data.sprites.front_default;
        sprite.style.display = 'block';
    } catch (error) {
        alert(error.message);
        document.getElementById('pokemon-info').style.display = 'none';
    }
});
