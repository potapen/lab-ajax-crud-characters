class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }
/*
  //this works with .then
  getFullList () {
    return axios({ //we need to return a promise
      method: 'GET',
      url: 'http://localhost:8000/characters'
    })
      .then(response => {
        console.log('calling getFullList')
        const charactersArray = response.data
        console.log('charactersArray: ', charactersArray)
        return charactersArray
      })
      .catch(err => {
        // Here we catch the error
        console.error(error)
      });
  }
*/

  async getFullList () {
    const response = await axios({ //we need to return a promise
      method: 'GET',
      url: 'http://localhost:8000/characters'
    })
    return response.data
  }
  async getOneRegister (id) {
    const response = await axios({ //we need to return a promise
      method: 'GET',
      baseURL: 'http://localhost:8000/characters',
      url: id
    })
    console.log('response.data: ', response.data)
    return response.data
  }


  async deleteOneRegister (id) {
    try{
      const response = await axios({ //we need to return a promise
        method: 'DELETE',
        baseURL: 'http://localhost:8000/characters',
        url: id
      })
      console.log('response.status: ', response.status)
    }
    catch(error){
      console.log('----------------------------')
      console.error(error)
      }
    }


  createOneRegister () {

  }

  async updateOneRegister (characterObj) {
    console.log('inside updateOneRegister')
    try{
      let data = JSON.stringify({
        "name": characterObj.name,
        "occupation": characterObj.occupation,
        "weapon": characterObj.weapon,
        "cartoon": characterObj.cartoon,
        "id": characterObj.id
      });

      let config = {
        method: 'patch',
        baseURL: 'http://localhost:8000/characters/',
        url: characterObj.id,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      const response = await axios(config)
      console.log('response: ', response)
    }
    catch(error){
      console.log('----------------------------')
      console.error(error)
      }
    }
}
