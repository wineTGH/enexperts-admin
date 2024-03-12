<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
	import { superForm } from "sveltekit-superforms";
	import { loginSchema} from "./schema";
	import { zodClient } from "sveltekit-superforms/adapters";
	import type { PageData } from "./$types";

    export let data: PageData;

    const form = superForm(data.form, {
        validators: zodClient(loginSchema),
    });
 
  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="w-full p-6 sm:w-auto sm:p-0">
    <Form.Field {form} name="username">
        <Form.Control let:attrs>
            <Form.Label>Username</Form.Label>
            <Input placeholder="Username" {...attrs} bind:value={$formData.username} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <Input placeholder="Password" type="password" {...attrs} bind:value={$formData.password} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Log In</Form.Button>
</form>