import flushPromises from "flush-promises";
import {mount} from '@vue/test-utils'

import vuePlugins, {routerFactory} from "../../tests/test-setup";
import {bottle, container} from "../bottle/bottle";
import {AbstractSync, Kopnik} from "../models";
import MainVue from "./MainVue";
import messages from "@/locales";
import waitForExpect from "wait-for-expect";
import KApp from "@/components/KApp/KApp";


describe('components KMain confirmed details', () => {
  let /** @type {Application} */ application,
    /** @typeof {Application.sections.main} */ main,
    /** @type {Kopnik} */ user,
    /** @type {Kopnik} */ other,
    /** @type {Wrapper} */ appWrapper,
    /** @type {Wrapper} */ wrapper
  beforeAll(() => {
    // var app = document.createElement('div')
    // app.setAttribute('data-app', true)
    // document.body.appendChild(app)
  })

  beforeEach(async () => {
    bottle.resetProviders(['application', 'cookieService'])
    AbstractSync.clearCache()
    user = await Kopnik.create({
        status: Kopnik.Status.CONFIRMED,
        isLoaded: true,
      },
      'user'
    )
    other = await Kopnik.create({
        status: Kopnik.Status.CONFIRMED,
        isLoaded: true,
      },
      'other'
    )
    application = container.application
    // application.user= user
    main = application.sections.main

    fetch.resetMocks()
    fetch.mockIfEx(/ids=$/, [user.plain])
    fetch.mockIfEx(/getTopInsideSquare/, [user.plain, other.plain])
    // await application.authenticate()

    const div = document.createElement('div')
    if (document.body) {
      document.body.appendChild(div)
    }

    appWrapper = mount(KApp, {
      ...vuePlugins,
      propsData: {},
      attachTo: div,
    })
    application.user = user

    await flushPromises()
    wrapper = appWrapper.findComponent({ref: 'section'})
  })
  afterEach(()=>{
    appWrapper.destroy()
  })

  it('show on select', async () => {
    main.selected = other
    await flushPromises()

    expect(wrapper.vm.$refs.details.$data.isActive).toBeTruthy()
  })

  it('put foreman request', async () => {
    main.selected = other
    await flushPromises()

    // нажимаю на правую нижнюю кнопку
    wrapper.findComponent({ref: 'foremanAsk'}).trigger('click')
    await flushPromises()

    // проверяю что открылся диалог старшины
    expect(wrapper.vm.$refs.foremanDialog.$data.isActive).toBeTruthy()
  })

  it('reset foreman request', async () => {
    user.foremanRequest = main.selected = other
    await flushPromises()

    // нажимаю на правую нижнюю кнопку
    wrapper.findComponent({ref: 'foremanAsk'}).trigger('click')
    await flushPromises()

    // проверяю что открылся диалог старшины
    expect(wrapper.vm.$refs.foremanDialog.$data.isActive).toBeTruthy()
  })

  it('reset foreman', async () => {
    user.foreman = main.selected = other
    await flushPromises()

    // нажимаю на правую нижнюю кнопку
    wrapper.findComponent({ref: 'foremanAsk'}).trigger('click')
    await flushPromises()

    // проверяю что открылся диалог старшины
    expect(wrapper.vm.$refs.foremanDialog.$data.isActive).toBeTruthy()
  })
})

