const fs = require("fs");
const fsPromises = require("fs/promises");
const inputFilePath = './files/fsSimple/file1.txt'
const outputFilePath = './files/fsSimple/file2.txt'

const readAndWriteCallbackHell = () => {
    fs.readFile(inputFilePath, 'utf8', function(err, data){
       fs.writeFile(outputFilePath, data, function(err, data){
        console.log('Файл успешно записан');
       })
     });
};

readAndWriteCallbackHell();

const readAndWritePromises = () => {
    fs.promises.readFile(inputFilePath, 'utf-8')
    .then((data) => fs.promises.writeFile(outputFilePath, data))
    .then(() => console.log('Всё хорошо'))
    .catch(error => console.log('Всё плохо', error.message))
};

readAndWritePromises();


const readAndWriteAsyncAwait = async () => {
    try {let reading = await fs.promises.readFile('./files/fsSimple/file1.txt', 'utf8');
    let writing = await fs.promises.writeFile('./files/fsSimple/file2.txt', reading);
    console.log(reading);
    } catch (error){console.log('Ошибка')} 
};

readAndWriteAsyncAwait();





