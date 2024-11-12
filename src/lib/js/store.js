import { writable } from 'svelte/store';

//Esto es un estado inicial, en este caso false, no se muestra
export const mostrarTable = writable(false);
