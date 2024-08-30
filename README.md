# Family Accounting Electron

## Descripción

**Family Accounting Electron** es una aplicación de escritorio construida con Electron, React y Python, diseñada para ayudar a las familias a gestionar sus finanzas de manera eficiente. Esta aplicación toma los datos de los gastos de una tarjeta en formato PDF y los clasifica automáticamente, insertando la información en un archivo Excel estructurado.

## Características

- **Clasificación Automática de Gastos**: Toma un extracto de tarjeta en formato PDF, clasifica los gastos por categorías predefinidas y los organiza en un archivo Excel.
- **Interfaz Intuitiva**: Construida con React y Material-UI, la aplicación ofrece una interfaz de usuario moderna y fácil de usar.
- **Integración con Python**: Utiliza scripts de Python para procesar los PDFs y manipular los datos de manera eficiente.
- **Multiplataforma**: Compatible con Windows, macOS y Linux (con algunas adaptaciones).
- **Sistema de Reportes**: Genera reportes mensuales detallados en Excel, facilitando la visualización y análisis de los gastos.

## Requisitos del Sistema

- **Node.js** (versión 14 o superior)
- **Python** (versión 3.7 o superior)
- **pip** (para instalar dependencias de Python)
- **Git** (para clonar el repositorio)

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/familyaccountingElectron.git
   cd familyaccountingElectron

2. **Instalar las dependencias de Node.js**:
   ```bash
   npm install

3. **Instalar las dependencias de Python**: Asegúrate de estar en el directorio raíz del proyecto:
   ```bash
   pip install -r requirements.txt
4. **Compilar la aplicación**:
   ```bash
   npm run build
5. **Ejecutar la aplicación en modo de desarrollo**:
   ```bash
   npm run dev
6. **Generar un ejecutable para distribución**:
   ```bash
   npm run build

## Uso

1. **Iniciar la Aplicación**: Abre la aplicación, y serás recibido con una interfaz donde puedes cargar un archivo Excel donde se guardaran los datos. Luego haz clic en "Procesar"


3. **Configuración y Procesamiento**: Selecciona algunas configuraciones como el nombre de la hoja, el mes a analizar y el pdf a procesar. Finalmente, haz clic en el botón "Comenzar". La aplicación clasificará los gastos y los guardará en el archivo Excel con los resultados.

4. **Revisar el Excel Generado**: Una vez que el procesamiento esté completo, puedes revisar el archivo Excel generado, que estará ordenado por categorías de gastos.

## Contribuir
Si deseas contribuir a este proyecto, sigue estos pasos:

1. **Forkea este repositorio.**
2 **Crea una nueva rama (git checkout -b feature/tu-funcionalidad).**
3. **Realiza tus cambios** y haz un commit **(git commit -m 'Añadir nueva funcionalidad')**.
4. **Sube tu rama (git push origin feature/tu-funcionalidad).**
5. **Abre un Pull Request.**


## Tecnologías Utilizadas
- **Electron**: Para crear la aplicación de escritorio.
- **React**: Para construir la interfaz de usuario.
- **Material-UI**: Para los componentes de la interfaz.
- **Python (PyMuPDF, OpenPyXL)**: Para la manipulación de PDFs y Excel.
- **Electron-Builder**: Para empaquetar y distribuir la aplicación.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto
Alejandro Román Sánchez
[Correo Electrónico](mailto:aromsan03@gmail.com)  
[LinkedIn]([https://www.linkedin.com/in/tuperfil](https://www.linkedin.com/in/alejandro-román-sánchez-448188259/))
