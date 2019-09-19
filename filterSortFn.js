let products = [
    {
        name: 'Патч-корд литой 20м',
        itemsAvailable: 10,
        price: 1.5,
        saleStartDate: '2019-06-24',
        images: ['/static/images/products/patch-cord-876123-1.png', '/static/images/products/patch-cord-876123-2.png']
    }
];

/*Результат работы функции - массив-страница, входящая в состав входного массива*/
// Аргументы функции
// sortType: [ITEMS_AVAILABLE | PRICE | SALE_START_DATE] type: string. Поле, по которому необходимо выполнить сортировку.
// orderBy: [ASC | DESC] type: string. Порядок сортировки. ASC - по возрастанию. DESC - по убыванию
// itemsPerPage type: number. Количество продуктов на одну страницу.
// pageToRender type: number. Выводимая страница

const ASC = 'ASC';
const DESC = 'DESC';
const ITEMS_AVAILABLE = 'itemsAvailable';
const PRICE = 'price';
const SALE_START_DATE = 'saleStartDate';

function filterSortFn(itemArr, sortType, orderBy, itemsPerPage, pageToRender) {
    if (Array.isArray(itemArr)) {
        let resultSortFilter = itemArr.filter(el => {
            return (el.price && el.price > 0) && el.itemsAvailable > 0 && el.name && new Date(el.saleStartDate) < new Date()
        }).map((el) => {
            if (!el.images) {
                el.images = '/static/images/products/no-picture.png'
            }
            return el
        }).sort((a, b) => {
            switch (sortType){
                case ITEMS_AVAILABLE:
                    if (orderBy === ASC){
                        return a.itemsAvailable > b.itemsAvailable
                    } else if (orderBy === DESC){
                        return a.itemsAvailable < b.itemsAvailable
                    } else return 0;
                case  PRICE:
                    if (orderBy === ASC){
                        return a.price > b.price
                    } else if (orderBy === DESC){
                        return a.price < b.price
                    } else return 0;
                case SALE_START_DATE:
                    if (orderBy === ASC){
                        return new Date(a.saleStartDate) > new Date(b.saleStartDate)
                    } else if (orderBy === DESC){
                        return new Date(a.saleStartDate) < new Date(b.saleStartDate)
                    } else return 0;
                default: return 0;
            }
        });


        let totalCount =  resultSortFilter.length;
        let pagesCount = Math.ceil(totalCount / itemsPerPage);

        let pages = [];
        for (let i = 0; i < pagesCount; i++){
            pages[i] = resultSortFilter.slice((i * itemsPerPage), (i * itemsPerPage) + itemsPerPage)
        }


        return pages[pageToRender - 1] ? pages[pageToRender - 1] : `Такой страницы не существует. Выберете в диапазоне от 1 до ${pagesCount}`;
    }
    else return 'Неверный входной тип данных'
}

