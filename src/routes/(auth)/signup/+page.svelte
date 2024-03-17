<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
	import { superForm } from "sveltekit-superforms";
	import { registerSchema} from "./schema";
	import { zodClient } from "sveltekit-superforms/adapters";
	import type { PageData } from "./$types";

    export let data: PageData;

    const form = superForm(data.form, {
        validators: zodClient(registerSchema),
    });
 
  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="w-full p-6 sm:w-auto sm:p-0">
    <div class="flex flex-col sm:gap-3 sm:flex-row">
        <Form.Field {form} name="username">
            <Form.Control let:attrs>
                <Form.Label>Username</Form.Label>
                <Input placeholder="Username" {...attrs} bind:value={$formData.username} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="email">
            <Form.Control let:attrs>
                <Form.Label>Email</Form.Label>
                <Input placeholder="Email" type="email" {...attrs} bind:value={$formData.email} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </div>

    <div class="flex flex-col sm:gap-3 sm:flex-row">
        <Form.Field {form} name="firstName">
            <Form.Control let:attrs>
                <Form.Label>First name</Form.Label>
                <Input placeholder="Your name" type="text" {...attrs} bind:value={$formData.firstName} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="lastName">
            <Form.Control let:attrs>
                <Form.Label>Last Name</Form.Label>
                <Input placeholder="Last Name" type="text" {...attrs} bind:value={$formData.lastName} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </div>

    <Form.Field {form} name="password">
        <Form.Control let:attrs>
            <Form.Label>Password</Form.Label>
            <Input placeholder="Password" type="password" {...attrs} bind:value={$formData.password} required />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="repeatPassword">
        <Form.Control let:attrs>
            <Input placeholder="Repeat password" type="password" {...attrs} bind:value={$formData.repeatPassword} required />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Register</Form.Button>
</form>