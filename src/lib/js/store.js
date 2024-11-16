import { writable } from 'svelte/store';

//Esto es un estado inicial, en este caso false, no se muestra
export const mostrarTable = writable(false);
export const mostrarFormulario = writable(false);
export const mostrarFormularioAgregar = writable(false);
