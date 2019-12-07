import {AbstractSync, Kopnik} from "./models";

export default class Application {
    static getInstance() {
        if (!this.instance) {
            this.instance = new this()
        }
        return this.instance
    }

    user = null

    constructor() {
        /**
         * Кэш моделей
         * @type {Array}
         */
        // пока не понятно зачем приложению кэш.
        // он вероятно будет сильно торможить приложение из-за реактивности App.$data в которой он находится
        // хотя он же не в App.$data а в App.$options !!
        // уже в дата потому тчо в options не реактивен
        //this.models = AbstractSync.cache

        /**
         * Идентификатор раздела
         * Равен названиею соответствующего компонента
         *
         * @type {string} Map | Profile | Thanks
         */
        this.SECTION = "Map"

        this.user = undefined

        this.initUser()
    }

    getSharedState() {
        return {
            SECTION: this.SECTION
        }
    }

    setState(state) {
        if (state.SECTION) {
            this.SECTION = state.SECTION
        }
    }

    /**
     * Инициализирует ползователя при запуске приложения
     *
     * @returns {Promise<void>}
     */
    async initUser() {
        let vkUser = localStorage.getItem("vkUser")
        if (vkUser) {
            this.setVkUser(JSON.parse(vkUser))
        }
    }

    /**
     * Учстанавливает пользователем объект из VK.Auth callback
     *
     * @param vkUser
     * @returns
     */
    async setVkUser(vkUser) {
        global.credentials= {
            uid: vkUser.uid,
            hash: vkUser.hash
        }
        this.user = await Kopnik.getByUid(vkUser.uid)
        if (!this.user){
            this.user = new Kopnik
            this.user.merge({
                firstName: vkUser.first_name,
                lastName: vkUser.last_name,
                photo: vkUser.photo,
                smallPhoto: vkUser.photo_rec,
            })

            this.SECTION="Profile"
        }
        // this.user.uid= vkUser.uid
        // this.user.hash= vkUser.hash

        // localStorage.setItem("vkUser", JSON.stringify(vkUser))
    }
}