<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
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


<header class="flex flex-col items-center">
    <h1 class="text-2xl tracking-tight font-bold mb-1">Welcome back!</h1>
    <p class="text-muted-foreground">Select a login method on a tab panel</p>
</header>

<Tabs.Root value="username" class="w-full lg:p-0 lg:w-96">
    <Tabs.List class="grid w-full grid-cols-2">
        <Tabs.Trigger value="username">Username</Tabs.Trigger>
        <Tabs.Trigger value="email">Email</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="username">
        <form method="POST" use:enhance class="w-full flex flex-col">
            <Form.Field {form} name="username">
                <Form.Control let:attrs>
                    <Form.Label>Username</Form.Label>
                    <Input placeholder="Username" {...attrs} bind:value={$formData.username} required/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="password">
                <Form.Control let:attrs>
                    <Form.Label>Password</Form.Label>
                    <Input placeholder="Password" type="password" {...attrs} bind:value={$formData.password} required />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Button class="mt-3">Log In</Form.Button>
        </form>
    </Tabs.Content>

    <Tabs.Content value="email">
        <!-- TODO: Email sign in -->
        <form method="POST" use:enhance class="w-full flex flex-col">
            <Form.Field {form} name="username">
                <Form.Control let:attrs>
                    <Form.Label>Email</Form.Label>
                    <Input placeholder="Email" {...attrs} bind:value={$formData.username} required/>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="password">
                <Form.Control let:attrs>
                    <Form.Label>Password</Form.Label>
                    <Input placeholder="Password" type="password" {...attrs} bind:value={$formData.password} required />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Button disabled class="mt-3">Log In</Form.Button>
        </form>
    </Tabs.Content>
</Tabs.Root>
<footer class="flex gap-2 justify-center items-baseline">
    <a class="underline text-foreground hover:text-foreground/80" href="/reset">Reset password</a>
    <a class="underline text-foreground hover:text-foreground/80" href="/signup">Sign Up</a>
</footer>