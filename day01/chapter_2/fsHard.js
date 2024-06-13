const fs = require('fs');
const path = require('path');

// Функция для отображения прогресс-бара
function progressBar(percentage, file) {
    const width = 70; // Ширина прогресс-бара
    const progress = Math.round(width * percentage);
    const bar = '[' + '='.repeat(progress) + ' '.repeat(width - progress) + ']';
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(bar + ' ' + Math.round(percentage * 100) + '% ' + file);
    const readline = require('readline-sync');
}

// Функция для загрузки файлов из папки
function loadFilesFromFolder(folderPath) {
    let commonSize = 0;
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Ошибка при чтении папки:', err);
            return;
        }
        let totalFiles = files.length;
        let loadedFiles = 0;
        let loadedFilesData = 0;

             //вес всех файлов
              files.forEach((file) => {
                let filePath = path.join(folderPath, file);
                let stats = fs.statSync(filePath)
                let fileSizeInBytes = stats.size;
                commonSize = commonSize + fileSizeInBytes;
             });
            //  console.log(commonSize);

             progressBar(0, 0);
        
        files.forEach((file) => {
            filePath = path.join(folderPath, file);
                fs.readFile(filePath, (err, data) => {totalFiles
                   if (err) {
                       console.error('Ошибка при чтении файла:', err);
                   } else {
                   fs.readFile(filePath, 'utf8', function(err, data){})
                //    fs.appendFileSync('newFileForFsHard.txt', `${data}`); // запись данных в общий файл для наглядности
                   sleep(1000);  // отдых
                   loadedFiles++; // счётчик загруженных файлов

                   loadedFilesData = loadedFilesData + fileSizeInBytes // счётчик считанной информации
                   let percentage = loadedFilesData / commonSize;
                //    console.log(' сейчас считаем: '+ file + ', вес: ' + fileSizeInBytes + ', уже загружено: ' + loadedFilesData + 'общий вес: ' + commonSize, percentage)
                   progressBar(percentage, file);
                    if (loadedFiles === totalFiles) {
                        console.log('\nAll your files are loaded!!!');
                    }
                  }
                });
            let stats = fs.statSync(filePath)
            let fileSizeInBytes = stats.size;
        });
    });
}

const folderPath = './files/fsHard/'; // путь к папке
loadFilesFromFolder(folderPath);


function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}