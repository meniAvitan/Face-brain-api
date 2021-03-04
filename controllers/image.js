import clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '5f4525dcaa0b483bb4d8138310b7ec04'
   });
const handleApiCall = (req, res) =>{
   app.models
   .predict(clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data =>{
    res.json(data);
})
        
          
          .catch(err => res.status(400).json('enable to work with API'))

}

const handleImage = (req, res, db) => {
    const {id} = req.body;
   db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

export {handleImage, handleApiCall};