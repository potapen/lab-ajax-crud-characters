const charactersAPI = new APIHandler('http://localhost:8000');
const charactersContainerElt = document.querySelector('.characters-container');
const editFormElt = document.querySelector('#edit-character-form');

const createCharacterCard = (characterObject)=>{
  console.log('characterObject :', characterObject)
  const characterElt = document.createElement('div')
  characterElt.classList.add('character-info')

  const nameElt = document.createElement('div')
  nameElt.innerText = 'Character Name : ' + characterObject.name
  nameElt.classList.add('name')
  characterElt.appendChild(nameElt)

  const occupationElt = document.createElement('div')
  occupationElt.innerText = 'Character Occupation : ' +  characterObject.occupation
  occupationElt.classList.add('occupation')
  characterElt.appendChild(occupationElt)
  
  const cartoonElt = document.createElement('div')
  cartoonElt.innerText = 'Is a cartoon? : ' +  characterObject.cartoon
  cartoonElt.classList.add('cartoon')
  characterElt.appendChild(cartoonElt)
  
  const weaponElt = document.createElement('div')
  weaponElt.innerText = 'Character Weapon  : ' +  characterObject.weapon
  weaponElt.classList.add('weapon')
  characterElt.appendChild(weaponElt)

  return characterElt
}


window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    console.log('inside fetch-all')
    const charactersArray = await charactersAPI.getFullList()
    console.log('charactersArray :', charactersArray)
    charactersContainerElt.innerHTML=''
    charactersArray.forEach(character =>{
      const characterCardElt = createCharacterCard(character)
      charactersContainerElt.appendChild(characterCardElt)
    })


  });
  
  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    console.log('inside fetch-one')
    const id = document.querySelector('input[name="character-id"]').value
    console.log('id is :', id)
    const characterSingle = await charactersAPI.getOneRegister(id)
    console.log('characterSingle :', characterSingle)
    charactersContainerElt.innerHTML=''
    const characterCardElt = createCharacterCard(characterSingle)
    charactersContainerElt.appendChild(characterCardElt)
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    console.log('inside delete-one')
    const id = document.querySelector('input[name="character-id-delete"]').value
    console.log('id is :', id)
    try{
      const characterDeleted = await charactersAPI.deleteOneRegister(id)
    }
    catch(error){console.error(error)}
  

  });

  document.getElementById('send-data-update').addEventListener('click', async function (event) {
    // event.preventDefault()
    const characterObj = {}
    characterObj.id = editFormElt.querySelector('input[name="chr-id"]').value
    characterObj.name = editFormElt.querySelector('input[name="name"]').value
    characterObj.occupation = editFormElt.querySelector('input[name="occupation"]').value
    characterObj.weapon = editFormElt.querySelector('input[name="weapon"]').value
    characterObj.cartoon = editFormElt.querySelector('input[name="cartoon"]').value
    console.log(characterObj)
    const characterUpdated = await charactersAPI.updateOneRegister(characterObj)

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

  });
});
