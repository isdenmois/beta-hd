/**
 * Define Task service.
 */
import {Injectable} from 'angular2/core';
import {Http} from "angular2/http";
import {serverPath} from '../constants/server';

@Injectable()
export class AppService {

    error = '';
    projectListResponse = null;
    userListResponse = null;

    constructor(private http:Http) {
    }

    getAuthDetail():any {
        return this.http.get(`${serverPath}/?op=getAutherizedUserInfo`)
            .map(response => response);
    }

    /**
     * Get project list from backend.
     * @returns {any}
     */
    getProjectList() {
        this.projectListResponse = this.projectListResponse || this.http.get(`${serverPath}/?op=getFilteredProjectList`)
            .map(response => {
                const parsed = response.json()

                if (parsed.status == 'ok') {
                    let projects = [];

                    for (let key in parsed.message) {
                        if (parsed.message[key] && parsed.message[key].title) {
                            projects.push({id: key, title: parsed.message[key].title});
                        }
                    }

                    projects.sort(function (p1, p2) {
                        if (p1.title < p2.title) {
                            return -1;
                        }
                        if (p1.title > p2.title) {
                            return 1;
                        }

                        return 0;
                    });

                    return projects;
                }
            })

        return this.projectListResponse
    }

    getUserList() {
        this.userListResponse = this.userListResponse || this.http.get(`${serverPath}/?op=getFilteredUsersList`)
            .map(response => {
                return [
                    {title: 'user1', value: 1},
                    {title: 'Mospan, Nadezhda', value: 23},
                    {title: 'Денис Моисеев', value: 62},
                    {title: 'Дарья Войтова', value: 70},
                    {title: 'Икищели, Михаил', value: 87},
                    {title: 'Куликова, Екатерина', value: 86},
                    {title: 'Михолапов, Валерий', value: 91},
                    {title: 'Осецкий, Алексей', value: 93},
                    {title: 'Рамазан, Кирилл', value: 88},
                    {title: 'Саенко, Илья', value: 85},
                    {title: 'Смирнова, Маргарита', value: 89},
                    {title: 'Трофимов, Денис', value: 90},
                ]
            })

        return this.userListResponse
    }


    /**
     * Returns priorities mapping.
     */
    static getPriorities() {
        return [
            { value: 8, title: 'Payment'  },
            { value: 7, title: 'Question' },
            { value: 1, title: 'Critical' },
            { value: 2, title: 'High'     },
            { value: 3, title: 'Medium'   },
            { value: 4, title: 'Low'      },
            { value: 6, title: 'None'     }
        ]
    }

    /**
     * Returns bin mapping.
     */
    static getBin() {
        return [
            { value: 2, title: 'Internet' },
            { value: 10, title: 'Web курсы' }
        ]
    }

    /**
     * Returns task type mapping.
     */
    static getTaskTypes() {
        return [
            { value: 4,  title: 'Плановый выезд'   },
            { value: 5,  title: 'Экстренный выезд' },
            { value: 6,  title: 'Feature Request'  },
            { value: 9,  title: 'Note'             },
            { value: 7,  title: 'Услуга'           },
            { value: 11, title: 'Продвижение'      },
            { value: 2,  title: 'Поддержка'        },
            { value: 8,  title: 'Задача'           }
        ]
    }
}
