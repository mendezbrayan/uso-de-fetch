

let container = document.querySelector('.container-fluid')
const selectTypes = document.querySelector('#typeOpcion')
const types = fetch("https://pokeapi.co/api/v2/type/")
let species = document.querySelector('#especies')
const cargarPokemones = (value) => {

    const pokemones = fetch('https://pokeapi.co/api/v2/pokemon')

    let pokes = []
    let contador = 0;
    let habilidadesTexto = ''
    let columnas = ''
    let filas = ''

    pokemones
        .then((response) => (response.json()))
        .then((data) => {
            pokes = data.results
            pokes.forEach((pokemon) => {

                let habilidades = fetch(pokemon.url)
                habilidades.then((repuesta) => repuesta.json())

                    .then((miniData) => {
                        let abilities = miniData.abilities
                        abilities.forEach((item) => {

                            habilidadesTexto += ' ' + item.ability.name + ', '
                        })
                        let img = miniData.sprites.other.home.front_default
                        let imgIcono = miniData.sprites.versions["generation-v"]["black-white"].animated.front_default


                        contador = contador + 1;

                        habilidadesTexto = habilidadesTexto.slice(0, habilidadesTexto.length - 2)

                        if (miniData.types.find((item) => item.type.name == value) || value == undefined) {
                            columnas += ` <div class="conteiner col-lg-3 col-md-6 col-sm-6 col-xs-6" style="18rem"> 
                              <div class="card-body mb-4 " style="min-height: 380px; max-height; 380px">
                         <div class="card" style="min-height: 380px; max-height; 380px">
                             <div class="d-flex align-items-center justify-content-center fondo"> <img src="${img}" alt="" width="180px" height="180px"></div>
                             <p><img src="${imgIcono}" alt="" width="40px" height="40px"><b>${pokemon.name.toUpperCase()}</b></p>
                         
                             <p>Habilidades:${habilidadesTexto}</p>      
                             <div class=""> <a href="${pokemon.url}">Detalles</a></div>
                            </div>
 
                                  </div>
                             </div> `



                        } else {

                            if (contador == 20 && columnas == '') {
                                columnas = `<div class="d-flex justify-content-center text-center"><div class="estilo"><img src="${img}" alt="" width="180px" height="180px">No hay Especies</div></div>`
                                container.insertAdjacentHTML('afterbegin', columnas)
                            }
// logica para obtener el value de select

                            container.insertAdjacentHTML('afterbegin', columnas)
                            console.log(container)
                        }

                        if (contador == pokes.length) {

                            filas = ` <div class='row text-center'>${columnas}</div>`

                            container.replaceChildren('')
                            container.insertAdjacentHTML('afterbegin', filas)

                        }
                        habilidadesTexto = ''
                    })

            });


        })
        .catch((error) => console.error(error))


}


types.then((reponse) => reponse.json())
    .then((data) => {
        let tipos = data.results
        tipos.forEach((tipo) => {
            selectTypes.insertAdjacentHTML('afterbegin', `<option value ="${tipo.name}">${tipo.name}</option>`)

        })

    })



selectTypes.addEventListener('change', (e) => {
    if (e.target.value == 'especies') {
        cargarPokemones()
    }
    else {
        cargarPokemones(e.target.value)

    }


})

cargarPokemones()

