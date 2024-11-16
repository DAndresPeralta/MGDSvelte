- **PRODUCTO:**

  - | Tarea     | Descripción                                                 | Estado        |
    | --------- | ----------------------------------------------------------- | ------------- |
    | Agregar   | Desarrollar formulario de agregar producto                  | **En Curso**  |
    | Modificar | Desarrolar formulario de modificar producto (reutilizacion) | **Completo**  |
    | Modificar | Organizar y distribuir codigo correctamente                 | **Pendiente** |

### **09/11/24:**

- Se agrego el formulario de "Agregar Producto"
- **Flujo de ejecución:**

  - **Layout.Svelte:** Renderiza la navbar
  - Al hacer clic en **Productos-Agregar**, se setea el Store "MostrarFormularioAgregar"
  - **+page.svelte:** Renderiza el formulario "Agregar" a partir del cambio de estado del store
  - Al renderizarse de llama al componente **FormInput** y se envian las props
  - El componente FormInput genera dos **eventDispatcher** al componente padre (+page) uno para cancelar y otro para guardar el producto (enviar los datos ingresados en el formulario por el usuario a +page.svelte)
  - **+page.svelte** llama a la funcion guardarProducto, la cual hace la peticion a la APIRest.
