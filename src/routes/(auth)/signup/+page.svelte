<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
	import { superForm } from "sveltekit-superforms";
	import { registerSchema} from "./schema";
	import { zodClient } from "sveltekit-superforms/adapters";
	import type { PageData } from "./$types";
	import Separator from "$lib/components/ui/separator/separator.svelte";

    export let data: PageData;

    const form = superForm(data.form, {
        validators: zodClient(registerSchema),
    });
 
  const { form: formData, enhance } = form;
</script>

<header class="flex flex-col items-center">
    <h1 class="text-2xl tracking-tight font-bold mb-1">Welcome, newcomer!</h1>
    <p class="text-muted-foreground">Enter your information in the fields below</p>
</header>

<form method="POST" use:enhance class="flex flex-col items-center w-full lg:w-96 gap-2 sm:gap-0">
    <div class="flex flex-col sm:gap-6 sm:flex-row w-full">
        <Form.Field {form} name="username">
            <Form.Control let:attrs>
                <Form.Label>Username</Form.Label>
                <Input placeholder="john_doe" {...attrs} bind:value={$formData.username} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="email">
            <Form.Control let:attrs>
                <Form.Label>Email</Form.Label>
                <Input placeholder="me@example.com" type="email" {...attrs} bind:value={$formData.email} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </div>
    <Separator class="hidden" />
    <div class="flex flex-col sm:gap-6 sm:flex-row w-full">
        <Form.Field {form} name="firstName">
            <Form.Control let:attrs>
                <Form.Label>First name</Form.Label>
                <Input placeholder="John" type="text" {...attrs} bind:value={$formData.firstName} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="lastName">
            <Form.Control let:attrs>
                <Form.Label>Last Name</Form.Label>
                <Input placeholder="Doe" type="text" {...attrs} bind:value={$formData.lastName} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </div>
    <Separator class="hidden" />
    <div class="flex flex-col sm:gap-6 sm:flex-row w-full">
        <Form.Field {form} name="password">
            <Form.Control let:attrs>
                <Form.Label>Password</Form.Label>
                <Input placeholder="********" type="password" {...attrs} bind:value={$formData.password} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    
        <Form.Field {form} name="repeatPassword">
            <Form.Control let:attrs>
                <Form.Label>Repeat Password</Form.Label>
                <Input placeholder="********" type="password" {...attrs} bind:value={$formData.repeatPassword} required />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </div>
    <Form.Button class="w-full mt-0 sm:mt-3">Register</Form.Button>
</form>
<footer class="flex gap-2 justify-center items-baseline">
    <a class="underline text-foreground hover:text-foreground/80" href="/signin">Sign In</a>
    <a class="underline text-foreground hover:text-foreground/80" href="/legal">Legal</a>
</footer>