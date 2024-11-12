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
	import { mostrarTable } from './js/store';
	let isSideNavOpen = false;

	export const mostrarProdutos = (e) => {
		e.preventDefault();
		// Cambia el estado a true
		mostrarTable.set(true);
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
			<HeaderNavItem href="/" text="Agregar" />
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
