const readline = require("readline-sync");

/**
 *  Класс плеера
 */
class MusicPlayer
{
    private color: string = "black";
    private brand: string = "walkman";

    private songs: {name:string, second_time: number}[] = [] ;

    /**
     * Метод изменения бренда плеера
     *
     * @param brand
     */
    public setBrand(brand: string = "")
    {
        if (!brand.trim().length) {
            throw new Error('Пустая строка при заполнении поля "производитель"');
        }

        this.brand = brand;
    }

    /**
     * Метод изменения цвета плеера
     *
     * @param color
     */
    public setColor(color: string = "")
    {
        if (!color.trim().length) {
            throw new Error('Пустая строка при заполнении поля "цвет"!');
        }

        this.color = color;
    }

    /**
     * Метод добавления песни в плеер
     */
    public async addSong()
    {
        let songName: string = await readline.question('Введите название песни: ');

        if (!songName.trim().length) {
            throw new Error('Пустая строка при заполнении поля "название песни"!');
        }

        this.songs.push({
            name       : songName,
            second_time: 180
        });
    }

    /**
     * Метод проигрывания музыки
     */
    public async playMusic()
    {
        console.log('Начинает играть музыка...')

        for (let song of this.songs) {
            await this.sleep(1000);

            this.printDash();
            console.log('Песня: ' + song.name);
        }
    }

    /**
     * Метод по показу информации о плеере
     */
    public showMusicPlayerInfo()
    {
        this.printDash();

        console.log(`
Информация по плееру:
Бренд: ${this.brand}
Цвет: ${this.color}
Кол-во песен: ${this.songs.length}
Общая продолжительность песен: ${this.songs.reduce((akk, song) => akk + song.second_time ,0)}
`)

        this.printDash();
    }

    /**
     * Метод остановки скрипта на определённые милисекунды
     *
     * @param ms
     *
     * @private
     */
    private async sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Метод для отрисовки тире
     *
     * @private
     */
    private printDash()
    {
        console.log('-----------------------------------');
    }
}

async function main() {
    const walkman: MusicPlayer = new MusicPlayer();

    await walkman.addSong();
    await walkman.addSong();
    await walkman.addSong();
    await walkman.addSong();

    walkman.showMusicPlayerInfo();
}

main();