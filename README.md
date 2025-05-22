# Prueba técnica

Aplicación web que simula el flujo de trabajo de un taller automotriz: registro de vehículos que ingresan a servicio, listado de unidades pendientes de inspección y ejecución de listas de chequeo específicas por marca.  
Desarrollada con **Next.js 14**, **TypeScript** y **Tailwind CSS**.

## 1. Funcionalidades principales

1. **Ingreso de vehículos**: formulario para capturar VIN, fecha/hora, datos del cliente, marca (Nissan, Hyundai, Mazda), placas, motivo de ingreso, etc.
2. **Listado de pendientes**: vista que resalta los vehículos que aún no se inspeccionan.
3. **Inspección**: registro dinámico según la marca con selección de estado de luces, presión de llantas, nivel de batería, etc.
4. **Extras** : comentarios y carga de evidencia.

## 2. Requisitos mínimos

- **Node.js 18 LTS** (o versión superior)
- **npm 9** (o _yarn_/pnpm si lo prefieres)

## 3. Instalación paso a paso

```bash
# 1. Clonar el repositorio
 git clone https://github.com/mirunoke/prueba-frontend.git
 cd prueba-frontend

# 2. Instalar las dependencias
 npm install
```


## 4. Ejecución en modo desarrollo

```bash
npm run dev
```

Luego abrir `http://localhost:3000` en tu navegador preferido para ver la aplicación en acción.

## 5. Construcción y despliegue en producción

```bash
# Construir la aplicación
npm run build  

# Iniciar la aplicación construida
npm start
```