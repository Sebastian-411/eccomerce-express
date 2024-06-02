# Tienda en Línea

## Descripción del Proyecto

Hemos desarrollado una tienda en línea para una empresa local. La tienda permite a los administradores agregar productos y a los clientes comprarlos. Además, se genera una factura para cada compra realizada. La gestión de datos es volátil, es decir, los datos permanecen mientras la aplicación está en ejecución, pero no se guardan permanentemente.

### Funcionalidades

**Roles de Usuario:**
- **Administrador:**
  - Iniciar sesión.
  - Agregar productos al inventario.
- **Cliente:**
  - Registrarse o iniciar sesión.
  - Navegar productos.
  - Agregar productos al carrito.
  - Realizar compras y generar facturas.
  - Ver historial de compras.

**Credenciales de Administrador:**
- **Usuario:** `admin`
- **Contraseña:** `admin`

La aplicación sigue una arquitectura cliente-servidor. El servidor expone servicios REST usando Express, y el cliente consume la API usando fetch para mostrar los datos de manera amigable.

## Instrucciones para Ejecutar la Aplicación

### Requisitos Previos

Asegúrate de tener instalado:
1. [Node.js](https://nodejs.org/)
2. [Git](https://git-scm.com/)

### Clonación del Repositorio

Clona el repositorio utilizando Git:

```bash
git clone https://github.com/Sebastian-411/eccomerce-express.git
```

### Ejecución del Backend

1. Abre una terminal y navega hasta el directorio del backend:

    ```bash
    cd eccomerce-express/backend
    ```

2. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

3. Inicia el servidor del backend:

    ```bash
    npm run dev
    ```

### Ejecución del Frontend en Linux

1. Abre una nueva terminal y navega hasta el directorio del frontend:

    ```bash
    cd eccomerce-express/frontend
    ```

2. Inicia la aplicación frontend:

    ```bash
    xdg-open src/index.html
    ```

### Ejecución del Frontend en Windows

1. Abre una nueva terminal y navega hasta el directorio del frontend:

    ```bash
    cd eccomerce-express/frontend
    ```

2. Inicia la aplicación frontend:

    ```bash
    start src/index.html
    ```

---

Siguiendo estos pasos, podrás ejecutar nuestra aplicación en Linux o Windows. Si encuentras algún problema, no dudes en contactarnos para obtener asistencia.