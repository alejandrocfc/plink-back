## Backend PLINK
### Autor: Alejandro Mora Gómez

### Requisitos
- node v8+
- nodemon, opcional (npm -g i nodemon)
- sequelize cli (npm -g i sequelize-cli)
- MySQL v5+

### Instalación
- Clonar repo https://github.com/alejandrocfc/plink-back.git
- Dentro de la carpeta ejecutar 
    - ``npm install``
    - ``sequelize db:migrate`` Se debe tener creada la tabla ``plink`` en MySQL

### Scripts
``npm run start → Despliega la aplicación en el puerto 3000`` 
 
 ``npm run start:dev → Despliega la aplicación con nodemon en el puerto 3000``
 
### Rutas
``POST /users → Registrar un usuario``   
``POST /users/login → Ingreso de un usuario``   
``POST /criptos → Crear una criptomoneda``   
``GET /criptos/mine → Listado de criptomonedas de un usuario``   
``GET /criptos/top → Las tres criptomonedas con mejor valor``

### Comentarios
La ruta ``/users/login`` retorna un ``TOKEN`` que se utiliza para autenticación en las rutas de ``/criptos``.  
El ``TOKEN`` se debe agregar a la cabecera de la petición: ``Authorization:TOKEN``  
En el archivo ``config/config.json`` cambiar las variables para acceso a la DB de acuerdo a la configuración local 

### Supuestos
- Los usuarios solo se pueden registrar e ingresar
- Las criptomonedas son solo creables y listadas
