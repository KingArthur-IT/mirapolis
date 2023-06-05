ymaps.ready(init);

const spin = { w: 96, h: 96 }
var mapCenter = [55.840576, 37.660200]
if (window.innerWidth < 600)
    mapCenter = [55.840452, 37.665044]
var myMap = null

function init() {
    myMap = new ymaps.Map("map", {
        center: mapCenter,
        zoom: 14,
        controls: []
    });

    myMap.behaviors.disable('scrollZoom');

    addMainPlacemark()
    addZoomControls()
    
    //кнопки управления
    document.querySelectorAll('.map-objects__btn').forEach(btn => btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-search')
        document.querySelector('#map').classList.add('selected')
        getObjects(type)
    }))
} 

function addMainPlacemark() {
    // метка с иконкой
    var placemark = new ymaps.Placemark(
        [55.842072, 37.667126],
        {},
        {
        iconLayout: "default#image",
        iconImageHref: "./assets/spin.svg",
        iconImageSize: [spin.w, spin.h],
        iconImageOffset: [-spin.w / 2, -spin.h / 2]
        }
    );
    myMap.geoObjects.add(placemark);

    //пустая метка
    var placemark = new ymaps.Placemark(
        [55.842072, 37.667126],
        {},
        {
        iconLayout: "default#image",
        iconImageHref: "./assets/empty.svg",
        iconImageSize: [300, 300],
        iconImageOffset: [-300 / 2, -300 / 2]
        }
    );
    myMap.geoObjects.add(placemark);
}

function getObjects(type) {
    // Создаем коллекцию.
    myCollection = new ymaps.GeoObjectCollection(),
    // Создаем массив с данными.
    myPoints = [
        { coords: [55.836212, 37.651819], text: 'Парк спорта Яуза', type: 'park' },    
        { coords: [55.830561, 37.655730], text: 'Парк Акведук', type: 'park' },    
        { coords: [55.829315, 37.625891], text: 'ВДНХ', type: 'park' },    
        { coords: [55.831708, 37.634049], text: 'Узбекский парк', type: 'park' },    
        { coords: [55.842181, 37.640614], text: 'Сад будущего', type: 'park' },    
        { coords: [55.843058, 37.635918], text: 'Леоновская роща', type: 'park' },    
        { coords: [55.850028, 37.649658], text: 'Капустинский парк', type: 'park' },    
        { coords: [55.851944, 37.631944], text: 'Усадьба Свиблово', type: 'park' },   

        { coords: [55.836195, 37.662891], text: 'Школа № 1499', type: 'education' },    
        { coords: [55.837433, 37.653221], text: 'Школа № 1499', type: 'education' },    
        { coords: [55.833318, 37.643288], text: 'МГПУ', type: 'education' },    
        { coords: [55.834744, 37.635269], text: 'РГСУ', type: 'education' },    
        { coords: [55.835924, 37.637453], text: 'ВГУК', type: 'education' },    
        { coords: [55.848327, 37.643145], text: 'ГБОУ школа Свиблово', type: 'education' },    
        { coords: [55.851423, 37.688310], text: 'Школа № 1577', type: 'education' },    
        { coords: [55.851423, 37.688310], text: 'Школа № 1577', type: 'education' },    

        { coords: [55.834949, 37.657905], text: 'World Class', type: 'sport' },    
        { coords: [55.835898, 37.634109], text: 'Swimix', type: 'sport' },    
        { coords: [55.844989, 37.635091], text: 'World Class', type: 'sport' },    
        { coords: [55.846037, 37.659632], text: 'DDX FITNESS', type: 'sport' },    
        { coords: [55.855430, 37.695550], text: 'Feniks_swim', type: 'sport' },    
        { coords: [55.856433, 37.667349], text: 'Self club', type: 'sport' },    
        { coords: [55.853356, 37.637574], text: 'Чирлидинг клуб Let\'s go Delta', type: 'sport' },    
        { coords: [55.848717, 37.619772], text: 'NEF', type: 'sport' },    
        { coords: [55.853019, 37.622793], text: 'Xfit Point Green Park', type: 'sport' },  

        { coords: [55.837169, 37.659735], text: 'Магнит', type: 'market' },    
        { coords: [55.835510, 37.669006], text: 'Пятёрочка', type: 'market' },    
        { coords: [55.834568, 37.659622], text: 'ВкусВилл', type: 'market' },    
        { coords: [55.832889, 37.662228], text: 'ВкусВилл', type: 'market' },    
        { coords: [55.834543, 37.657584], text: 'Пятёрочка', type: 'market' },    
        { coords: [55.831997, 37.651639], text: 'Пятёрочка', type: 'market' },    
        { coords: [55.829757, 37.666058], text: 'Пятёрочка', type: 'market' },    
        { coords: [55.832188, 37.641027], text: 'Магнит', type: 'market' },    
        { coords: [55.844222, 37.659919], text: 'О\'Кей', type: 'market' },    
        { coords: [55.849194, 37.653249], text: 'Магнит', type: 'market' }, 
        { coords: [55.851033, 37.679071], text: 'Пятёрочка', type: 'market' },  

        { coords: [55.839319, 37.668724], text: 'ТПУ Ростокино', type: 'transport' },    
        { coords: [55.829373, 37.671161], text: 'Яуза', type: 'transport' },    
        { coords: [55.845243, 37.639635], text: 'МаТПУ Ботанический садгнит', type: 'transport' },    
        { coords: [55.850750, 37.679950], text: 'Лосиноостровская', type: 'transport' },  
        { coords: [55.839224, 37.668407], text: 'Станция метро Ростокино', type: 'transport' },  
        { coords: [55.829308, 37.645000], text: 'Улица Сергея Эйзенштейна', type: 'transport' },  

        { coords: [55.844863, 37.666654], text: 'ПатероКлиник', type: 'medicine' },    
        { coords: [55.834996, 37.660159], text: 'CMD — Центр Молекулярной Диагностики', type: 'medicine' },    
        { coords: [55.832834, 37.662066], text: 'Q-Клиника', type: 'medicine' },    
        { coords: [55.841165, 37.650433], text: 'International Sos', type: 'medicine' },    
        { coords: [55.846918, 37.648720], text: 'Роса', type: 'medicine' }, 
    ]

    // Заполняем коллекцию данными.
    for (var i = 0, l = myPoints.filter(el => el.type === type).length; i < l; i++) {
        var point = myPoints.filter(el => el.type === type)[i];
        myCollection.add(new ymaps.Placemark(
            point.coords, {
                // balloonContentBody: point.text
            },
            {
                iconLayout: "default#image",
                iconImageHref: "./assets/spin-empty.svg",
                iconImageSize: [30, 36],
                iconImageOffset: [-15, -18]
                }
        ));
    }

    // Удалить предыдущие объекты с карты, если они были добавлены
    myMap.geoObjects.removeAll();
    addMainPlacemark()
    // Добавляем коллекцию меток на карту.
    myMap.geoObjects.add(myCollection);
}

function addZoomControls() {
    // пользовательский макет кнопок масштаба
    const controlsSection = `
        <div id='zoom-wrapper'>
            <div id='zoom-in' class='btn zoom-btn'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99967 0.333313C8.55196 0.333313 8.99967 0.781028 8.99967 1.33331V6.99998H14.6663C15.2186 6.99998 15.6663 7.44769 15.6663 7.99998C15.6663 8.55226 15.2186 8.99998 14.6663 8.99998H8.99967V14.6666C8.99967 15.2189 8.55196 15.6666 7.99967 15.6666C7.44739 15.6666 6.99967 15.2189 6.99967 14.6666V8.99998H1.33301C0.780723 8.99998 0.333008 8.55226 0.333008 7.99998C0.333008 7.44769 0.780723 6.99998 1.33301 6.99998H6.99967V1.33331C6.99967 0.781028 7.44739 0.333313 7.99967 0.333313Z" fill="#404040"/>
                </svg>
            </div>
            <div id='zoom-out' class='btn zoom-btn'>
                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99968 4.76837e-07C11.2126 8.18234e-07 14.6663 0 14.6663 0C15.2186 0 15.6663 0.447715 15.6663 1C15.6663 1.55229 15.2186 2 14.6663 2H8.99967H6.99967H1.33301C0.780723 2 0.333008 1.55229 0.333008 1C0.333008 0.447715 0.780723 0 1.33301 0H6.99967C6.99967 0 8.21863 3.56344e-07 8.99968 4.76837e-07Z" fill="#404040"/>
                </svg>
            </div>
        </div>
    `
    ZoomLayout = ymaps.templateLayoutFactory.createClass(controlsSection, {

        // Переопределяем методы макета, чтобы выполнять дополнительные действия
        // при построении и очистке макета.
        build: function () {
            // Вызываем родительский метод build.
            ZoomLayout.superclass.build.call(this);

            // Привязываем функции-обработчики к контексту и сохраняем ссылки
            // на них, чтобы потом отписаться от событий.
            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

            // Начинаем слушать клики на кнопках макета.
            $('#zoom-in').bind('click', this.zoomInCallback);
            $('#zoom-out').bind('click', this.zoomOutCallback);
        },

        clear: function () {
            // Снимаем обработчики кликов.
            $('#zoom-in').unbind('click', this.zoomInCallback);
            $('#zoom-out').unbind('click', this.zoomOutCallback);

            // Вызываем родительский метод clear.
            ZoomLayout.superclass.clear.call(this);
        },

        zoomIn: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
        },

        zoomOut: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
        }
    })

    if (window.innerWidth > 1024)
        zoomControl = new ymaps.control.ZoomControl({ 
            options: { 
                layout: ZoomLayout,
                position: { top: 40, right: 40 }
            }
        });
    else if (window.innerWidth > 600)
        zoomControl = new ymaps.control.ZoomControl({ 
            options: { 
                layout: ZoomLayout,
                position: { bottom: 160, left: 32 }
            }
        });
    else
        zoomControl = new ymaps.control.ZoomControl({ 
            options: { 
                layout: ZoomLayout,
                position: { bottom: 130, left: 20 }
            }
        });

    myMap.controls.add(zoomControl);
}