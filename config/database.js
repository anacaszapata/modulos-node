const mongoose= require('mongoose');
let User

const connectDatabase = async () => {
    try{
         // Se comprueba si el modelo de usuario (User) ya está definido. Si no está definido, se define utilizando el método mongoose.model(). Se pasa el nombre del modelo como primer argumento y el esquema del modelo como segundo argumento
        if(!User){
            User = mongoose.model('notas',require('../models/userModel').schema);
        }
        await mongoose.connect('mongodb+srv://anacaszapata:z8dx8O6uKDIbJzLi@cluster0.a5nijxb.mongodb.net/')
        .then(()=>console.log('MongoDB connected'))
        .catch((err) => console.log(err));

        await initializeData();

    }catch (error){
        console.error('Failed to connect to MongoDB:',error);
        process.exit(1);
    }
};

const initializeData = async () => {
    try{
        await User.deleteMany();

        const notaData = [
            {
                name:"Sofia",
                email:"anacas@gmail.com",
                nota:"",
                
            },
            {
                name:"Victor",
                email:"viictormejia@gmail.com",
                nota:"",
            },
        ];
        await User.insertMany(notaData);
        console.log('Data successfully initialized');
        } catch(error){
            console.error('Data initialization error:',error);
            process.exit(1);
        }
};

module.exports = connectDatabase;