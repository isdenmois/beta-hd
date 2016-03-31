/**
 * Define mocks for Task service.
 */
import {Task} from '../class/task';
import {Log} from "../class/log";
export var TASK_LIST: Task[] = [
    {id: 15249,
        project: 'Инитлаб ООО',
        priority: 'Medium',
        summary: 'Миграция drupal-coder.ru на D8 + блог',
        type: 'Задача',
        deadline: '',
        opentime: '18/11/2015 12:05',
        owner: 'Моисеев, Денис',
        worked: 0.00,
        estimated: 0.00,
        details: 'Нужно мигрировать drupal-coder.ru и drupal-coding.com (настроена мультиязычность) на D8 и добавить блог с выводом последних постов на главной. Тему оформления взять какую-нибудь бесплатную адаптивную, желательно на базе Bootstrap.',
        status: 'OPEN'
    },
    {id: 12560,
        project: 'cielparfum.com',
        priority: 'High',
        summary: 'Обновление безопасности Drupal',
        type: 'Поддержка',
        deadline: '02/12/2015 00:00',
        opentime: '18/06/2015 10:45',
        owner: 'Моисеев, Денис',
        worked: 7.55,
        estimated: 0.00,
        details: 'Необходимо выполнить обновление безопасности Drupal. Возможна пауза в работе на 10-30 минут. Если есть необходимость, то надо согласовать время. Если есть dev-версия, то уточнить на ней или сразу на рабочем.',
        status: 'PENDING'
    },
    {id: 15453,
        project: 'dividendinfo.d7c.ru',
        priority: 'Medium',
        summary: 'front',
        type: 'Поддержка',
        deadline: '25/03/2016 00:00',
        opentime: '19/11/2015 00:10',
        owner: 'Моисеев, Денис',
        worked: 19.40,
        estimated: 0.00,
        details: `развернуть копию
        ускорить графики`,
        status: 'OPEN'
    },
    {id: 16578,
        project: 'dividendinfo.d7c.ru',
        priority: 'Medium',
        summary: 'back',
        type: 'Поддержка',
        deadline: '25/03/2016 00:00',
        opentime: '18/06/2015 10:45',
        owner: 'Моисеев, Денис',
        worked: 0.00,
        estimated: 0.00,
        details: 'работы по backend',
        status: 'OPEN'
    },
    {id: 16951,
        project: 'iless.it-oblako.ru',
        priority: 'Medium',
        summary: 'Криптография',
        type: 'Поддержка',
        deadline: '25/03/2016 00:00',
        opentime: '21/02/2016 10:02',
        owner: 'Моисеев, Денис',
        worked: 19.90,
        estimated: 0.00,
        details: 'Обработка qr с новой структурой',
        status: 'OPEN'
    },
    {id: 17137,
        project: 'cielparfum.com',
        priority: 'Medium',
        summary: 'Поддержка cielparfum.com: разграничение остатков',
        type: 'Поддержка',
        deadline: '26/03/2016 00:00',
        opentime: '04/03/2016 14:24',
        owner: 'Моисеев, Денис',
        worked: 0.10,
        estimated: 0.0,
        details: `Приветствую.
Прошу остатки из 1С для сайта выводить в следующем соответствии:
· Если в 1С значение остатка 0 – на сайте статус «Нет в наличии»
· Если в 1С значение остатка от 1 до 20 - на сайте статус «Успей купить»
· Если в 1С значение остатка больше 20 – на сайте статус «Заказать».

Спасибо!

С уважением,
Наталья Сушкова
руководитель Отдела веб-проектов
Департамента маркетинга
Группы компаний «Си Эль парфюм»

Россия, 127434. Москва, Дмитровское ш., д.9а, стр.5
тел.: (495) 2259655 (доб. 1213), факс: (495) 2259650
www.cielparfum.com`,
        status: 'OPEN'
    },
];

export var LOG_LIST = [
    {
        id: 1,
        type: 'MESSAGE',
        time: '25/03/2016 12:05',
        hours: 0.0,
        user: 'Цапурин Андрей (a.tsapurin@teremonline.ru)',
        description: `Добрый день!
        Принято на боевом хосте!.`,
    }, {
        id: 2,
        type: 'QUESTION',
        time: '25/03/2016 10:52',
        hours: 1.70,
        user: 'Денис Моисеев',
        description: `Добрый день!
        Проверьте задачу.`,
        canEdit: true,
        canDelete: true,
    }, {
        id: 3,
        type: 'ASSIGNED',
        time: '24/03/2016 16:40',
        hours: 0,
        user: 'Надежда Моспан',
        description: `Сделай побыстрее.`,
    }
];
