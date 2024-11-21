- **GENERAL:**

  - | Ticket  | Tarea                  | Descripción                                            | Estado       |
    | ------- | ---------------------- | ------------------------------------------------------ | ------------ |
    | C181124 | Botón Cierre de Sesión | Agregar botón de cierre de sesion con logica en Navbar | **Completo** |
    | 211124  | Botón Cierre de Sesión | Ordenar código, completar catch                        | **Completo** |

- **PRODUCTO:**

  - | Ticket  | Tarea        | Descripción                                                                                        | Estado        |
    | ------- | ------------ | -------------------------------------------------------------------------------------------------- | ------------- |
    | 051124  | Agregar      | Desarrollar formulario de agregar producto                                                         | **Completo**  |
    | 081124  | Modificar    | Desarrolar formulario de modificar producto (reutilizacion)                                        | **Completo**  |
    | 111124  | Modificar    | Organizar y distribuir codigo correctamente                                                        | **En Curso**  |
    | A181124 | Ver Producto | Desarrollar funcionalidad de Ver el producto en detalle, haciendo clic sobre el o en el kebab menú | **Pendiente** |
    | B181124 | Eliminar     | Desarrollar tabla con caja de texto para busqueda y solo la opcion de eliminar el producto         | **Pendiente** |

- **INCIDENCIAS**

  - | Ticket     | Funcionalidad | Incidencia                                                                                | Estado       |
    | ---------- | ------------- | ----------------------------------------------------------------------------------------- | ------------ |
    | **051124** | Agregar       | Al guardar el producto, el mismo no se renderiza en la tabla "consulta", se debe recargar | **Completo** |

### **09/11/24:**

- Se agrego el formulario de "Agregar Producto"
- **Flujo de ejecución:**

  - **Layout.Svelte:** Renderiza la navbar
  - Al hacer clic en **Productos-Agregar**, se setea el Store "MostrarFormularioAgregar"
  - **+page.svelte:** Renderiza el formulario "Agregar" a partir del cambio de estado del store
  - Al renderizarse de llama al componente **FormInput** y se envian las props
  - El componente FormInput genera dos **eventDispatcher** al componente padre (+page) uno para cancelar y otro para guardar el producto (enviar los datos ingresados en el formulario por el usuario a +page.svelte)
  - **+page.svelte** llama a la funcion guardarProducto, la cual hace la peticion a la APIRest.
