<script>
	import { FluidForm, TextInput, PasswordInput } from 'carbon-components-svelte';
	import Button from './Button.svelte';
	import Notify from './Notify.svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	let userName = '';
	let password = '';
	let notification = null;

	const login = async (e) => {
		try {
			e.preventDefault();

			const data = {
				userName,
				password
			};

			const response = await axios.post('http://localhost:4000/api/loginAdmin', data, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const res = response.data;
			console.log(res);

			notification = res.status === 'success' ? 'success' : 'error';

			if (res.status === 'success') {
				setTimeout(() => {
					goto('/dash');
				}, 3000);
			} else {
				setTimeout(() => {
					goto('/');
				}, 3000);
			}
		} catch (error) {
			console.error('Error de red:', error);
			notification = 'error';
		}
	};
</script>

<div class="form-container">
	<FluidForm on:submit={login}>
		<div class="input-group">
			<TextInput
				labelText="User"
				placeholder="Ingrese su usuario"
				type="text"
				bind:value={userName}
				required
			/>
		</div>
		<div class="input-group">
			<PasswordInput
				required
				type="password"
				labelText="Password"
				placeholder="Ingrese su contraseña"
				bind:value={password}
			/>
		</div>
		<div class="button-group">
			<Button type="submit" kind="tertiary" title="Ingresar" />
		</div>
	</FluidForm>
</div>

{#if notification === 'success'}<Notify
		title="Ingreso Exitoso"
		kind="success"
	/>{:else if notification === 'error'}
	<Notify title="Credenciales Incorrectas" kind="error" />
{/if}

<style>
	/* Contenedor que centra el formulario */
	.form-container {
		justify-content: center;
		align-items: center;
	}

	/* Asegura que los elementos del form estén alineados y con espaciado */
	.input-group {
		display: flexbox;
		margin-bottom: 10px;
		margin-left: 32%;
		width: 35%; /* Hace que los inputs y el botón ocupen el 100% del ancho disponible */
	}

	/* Opcional: Estilo del botón */
	.button-group {
		padding-top: 1%;
		margin-left: 45%;
	}
</style>
