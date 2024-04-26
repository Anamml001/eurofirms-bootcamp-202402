import mongoose from 'mongoose'
import retrievePosts from './retrievePosts.js'

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            retrievePosts('661e7c9ed5a64604bf056b39')
                .then(posts => console.log('retrieved posts', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })