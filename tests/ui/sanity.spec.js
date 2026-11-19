import { test } from '../../Infraestructure/UI_Environment_Initializer'

test('Verificar si el sitio esta online', async ({ ui_Production }) => {
    console.log("Inicializando la Prueba Base del Sitio")
    await ui_Production.navigateToLandingPage()
})