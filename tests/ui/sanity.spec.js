import { test, expect } from '../../Infraestructure/UI_Environment_Initializer'

test('Verificar si el sitio esta online', async ({ ui_Production }) => {
    console.log("Inicializando de Salud del Gimnasio")
    await ui_Production.navigateToLandingPage()
    let title = ui_Production.getPageFixture().locator('.brand span:nth-child(2)')
    await expect(title).toHaveText('RINOS CROSS')
    await expect(title).toContainText('RINOS')
})

test('Verificar Labels del Header', async ({ ui_Production }) => {
    console.log("Inicializando la de Labels del Sitio")
    await ui_Production.navigateToLandingPage()
    const localPage = ui_Production.getPageFixture()
    let labelHorarios = localPage.locator("nav>a[href*='horarios']")
    let labelClases = localPage.locator("nav>a[href*='clases']")
    let labelComunidad = localPage.locator("nav>a[href*='comunidad']")
    let labelContacto = localPage.locator("nav>a[href*='contacto']")

    await expect(labelHorarios).toHaveText('Horarios')
    await expect(labelClases).toHaveText('Clases')
    await expect(labelComunidad).toHaveText('Comunidad')
    await expect(labelContacto).toHaveText('Contacto')
})
