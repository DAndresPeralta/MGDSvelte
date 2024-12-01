<script>
	import Table from '../../lib/Table.svelte';
	import FormInput from '../../lib/FormInput.svelte';
	import { Modal, Button } from 'carbon-components-svelte';

	import { mostrarFormularioAgregar, mostrarTable } from '../../lib/js/store';
	import { mostrarFormulario } from '../../lib/js/store';
	import { productStore, mostrarProductoDetalles, productDetailStore } from '../../lib/js/store.js';

	import { onMount } from 'svelte';

	import axios from 'axios';

	// VARIABLES ************
	// Para la Table
	// export let data;
	let product = [];
	let producto;
	// $: modal = false;
	// Variables de estado para el formulario
	let productoSeleccionado = null;
	let productToShow = null;

	const lanzarFormulario = (product) => {
		productoSeleccionado = product;
		mostrarFormulario.set(true);
	};

	const actualizarProducto = async (formData) => {
		try {
			const response = await axios.put(
				`http://localhost:4000/api/product/${productoSeleccionado.id}`,
				formData,
				{
					withCredentials: true
				}
			);
			mostrarFormulario.set(false);
			productoSeleccionado = null;
			cargarProductos();
		} catch (error) {}
	};

	const agregarProducto = async (formData) => {
		try {
			const response = await axios.post(`http://localhost:4000/api/product/`, formData, {
				withCredentials: true
			});
			mostrarFormularioAgregar.set(false);
			mostrarTable.set(true);
			cargarProductos();
		} catch (error) {}
	};

	const cancelarModificacion = () => {
		mostrarFormulario.set(false);
		mostrarFormularioAgregar.set(false);
	};

	const cargarProductos = async () => {
		const response = await axios.get('http://localhost:4000/api/product');

		product = response.data.payload.result.map((item) => ({
			id: item._id,
			code: item.code,
			brand: item.brand,
			product: item.product,
			weight: item.weight,
			stock: item.stock,
			obs: item.obs
		}));
		productStore.set(product);
	};

	const mostrarProducto = (data) => {
		productToShow = data;
		mostrarProductoDetalles.set(true);
		mostrarTable.set(false);
		mostrarFormulario.set(false);
		mostrarFormularioAgregar.set(false);
	};

	// ONMOUNT ************
	// onMount es un ciclo de vida en Svelte que se ejecuta cuando el componente se monta en el DOM, es decir,
	//justo después de que se haya renderizado inicialmente
	onMount(async () => {
		cargarProductos();
	});
</script>

<main>
	<section>
		{#if $mostrarFormulario}
			<FormInput
				datos={productoSeleccionado}
				campos={[
					{ key: 'code', label: 'Código' },
					{ key: 'product', label: 'Producto' },
					{ key: 'brand', label: 'Marca' },
					{ key: 'weight', label: 'Peso' },
					{ key: 'stock', label: 'Stock' },
					{ key: 'obs', label: 'Observaciones' }
				]}
				on:guardar={(e) => {
					const producto = e.detail;
					actualizarProducto(producto);
				}}
				on:cancelar={cancelarModificacion}
			/>
		{:else if $mostrarTable}
			<Table
				{product}
				on:editarProducto={(e) => {
					const producto = e.detail;
					lanzarFormulario(producto);
				}}
				on:mostrarProducto={(e) => {
					const producto = e.detail;
					mostrarProducto(producto);
				}}
			/>
		{:else if $mostrarFormularioAgregar}
			<FormInput
				campos={[
					{ key: 'code', label: 'Código' },
					{ key: 'product', label: 'Producto' },
					{ key: 'brand', label: 'Marca' },
					{ key: 'weight', label: 'Peso' },
					{ key: 'stock', label: 'Stock' },
					{ key: 'obs', label: 'Observaciones' }
				]}
				on:guardar={(e) => {
					const producto = e.detail;
					agregarProducto(producto);
				}}
				on:cancelar={cancelarModificacion}
			/>
		{:else if $mostrarProductoDetalles}
			<section class="productToShow">
				<h2>{productToShow.product}</h2>
				<ul>
					<li><strong>Código:</strong> {productToShow.code}</li>
					<li><strong>Producto:</strong> {productToShow.product}</li>
					<li><strong>Marca:</strong> {productToShow.brand}</li>
					<li><strong>Peso:</strong> {productToShow.weight}</li>
					<li><strong>Stock:</strong> {productToShow.stock}</li>
					<li><strong>Observaciones:</strong> {productToShow.obs}</li>
				</ul>
				<Button
					on:click={() => {
						mostrarProductoDetalles.set(false);
						productDetailStore.set(null);
						mostrarTable.set(true);
					}}
				>
					Volver
				</Button>
			</section>
		{/if}

		<!-- Cuando el valor de mostrarTable sea True, se renderiza -->
		<!-- {#if $mostrarTable}
			<Table {product} />
		{/if} -->
	</section>
</main>

<style>
	main {
		flex: 1;
	}
	section {
		margin-top: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.productToShow {
		display: block;
		width: 50%;
		height: auto;
		padding: 5rem;
		background-color: #393939;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);
		margin: 1rem 0;
	}

	.productToShow ul {
		list-style: none;
		padding: 2rem;
	}

	.productToShow li {
		font-size: 1rem;
		color: #f4f4f4;
		margin-bottom: 1rem;
	}
</style>
