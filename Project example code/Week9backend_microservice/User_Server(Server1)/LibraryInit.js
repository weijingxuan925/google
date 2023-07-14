import mongoose from 'mongoose';

export const libraryInit = () => {

    mongoose.connect('mongodb://127.0.0.1/MusicDB').then(

        () => {

            console.log('User Server initialized. (Server 1)');

        }

    ).catch(
        e => {
            console.log(e);
        }
    );


}


