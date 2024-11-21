<script>
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		SkipToContent,
		Content,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';
	import { mostrarTable, mostrarFormulario, mostrarFormularioAgregar } from './js/store';
	import Button from './Button.svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import errores from '../utils/errors.js';
	let isSideNavOpen = false;

	export const mostrarProdutos = (e) => {
		e.preventDefault();
		// Cambia el estado a true
		mostrarTable.set(true);
		mostrarFormulario.set(false);
	};

	export const mostrarFormularioAdd = (e) => {
		e.preventDefault();
		mostrarTable.set(false);
		mostrarFormulario.set(false);
		mostrarFormularioAgregar.set(true);
	};

	const cerrarSesion = async (e) => {
		try {
			e.preventDefault();
			const response = await axios.post(
				`http://localhost:4000/api/logout`,
				{},
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			const res = response.data;

			if (res.status === 'success') goto('/');
		} catch (error) {
			errores.manejoDeErrores(error);
		}
	};
</script>

<Header company="Milessima" platformName="Sistema de Gestión" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderNav>
		<HeaderNavMenu text="Productos">
			<!-- Llamo a la funcion mostrarProductos para que le cambie el estado a mostrarTable a true -->
			<HeaderNavItem on:click={mostrarProdutos} text="Consulta" />
			<HeaderNavItem on:click={mostrarFormularioAdd} text="Agregar" />
			<HeaderNavItem href="/" text="Modificar" />
			<HeaderNavItem href="/" text="Eliminar" />
		</HeaderNavMenu>
		<HeaderNavMenu text="Clientes">
			<HeaderNavItem href="/" text="Consulta" />
			<HeaderNavItem href="/" text="Agregar" />
			<HeaderNavItem href="/" text="Modificar" />
			<HeaderNavItem href="/" text="Eliminar" />
		</HeaderNavMenu>
		<HeaderNavMenu text="Ordenes">
			<HeaderNavItem href="/" text="Consulta" />
			<HeaderNavItem href="/" text="Agregar" />
			<HeaderNavItem href="/" text="Modificar" />
			<HeaderNavItem href="/" text="Eliminar" />
		</HeaderNavMenu>
	</HeaderNav>
	<div class="botonCerrarSesion">
		<!-- para que on:click funcione se tiene que agregar un dispatch en el componente hijo Button, para que se propague el evento desde el hacia el componente
		padre, en este caso, Navbar -->
		<Button type="button" kind="danger" title="Cerrar Sesión" on:click={cerrarSesion} />
	</div>
</Header>

<!-- <Content>
	<Grid>
		<Row>
			<Column>
				<h1>Welcome</h1>
			</Column>
		</Row>
	</Grid>
</Content> -->

<style>
	.botonCerrarSesion {
		margin-left: auto;
		display: flex;
		align-items: center;
	}
</style>
