import flushPromises from "flush-promises";
import Vue from 'vue'

import KopnikVue from '../../../src/components/KopnikVue'
import {Kopnik} from "../../../src/models";
import vuePlugins from "../../test-setup";

describe('unit components Kopnik', () => {
    beforeAll(async () => {
        await login(1)
    })

    beforeEach(async () => {
    })

    it('render', async () => {
        const kopnik = Kopnik.getReference(1)
        const vm = new Vue({
            ...KopnikVue,
            ...vuePlugins,
            propsData: {
                value: kopnik,
                fio: true,
                birthyear: true,
                passport: true,
                location: true,
            }
        })
        vm.$mount()
        await flushPromises()
        expect(vm.$el).toMatchSnapshot()
    })
    it('render short', async () => {
        const kopnik = Kopnik.getReference(1)
        const vm = new Vue({
            ...KopnikVue,
            ...vuePlugins,
            propsData: {
                value: kopnik,
            }
        })
        vm.$mount()
        await flushPromises()
        expect(vm.$el).toMatchSnapshot()
    })
})

