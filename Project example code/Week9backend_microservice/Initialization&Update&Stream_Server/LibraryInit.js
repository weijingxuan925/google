import mongoose from 'mongoose';

export const libraryInit = () => {

    mongoose.connect('mongodb://127.0.0.1/MusicDB').then(

        () => {

            console.log('Database Connected.');

        }

    ).catch(
        e => {
            console.log(e);
        }
    );


}


