<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Input } from "$lib/components/ui/input";
	import { superForm } from "sveltekit-superforms";
	import { loginSchema} from "./schema";
	import { zodClient } from "sveltekit-superforms/adapters";
	import type { PageData } from "./$types";
    import background from "$lib/assets/images/signin-background.jpg?enhanced";

    export let data: PageData;

    const form = superForm(data.form, {
        validators: zodClient(loginSchema),
    });
 
  const { form: formData, enhance } = form;
</script>

<main class="grid place-items-center lg:place-items-stretch lg:grid-cols-2 lg:grid-rows-3 h-screen">
    
    <section class="row-span-3 bg-gradient-to-t from-black to-transparent hidden lg:block">
        <p class="absolute text-white text-lg bottom-0 m-3">
            Photo by
            <a class="font-bold underline" href="https://unsplash.com/@accrualbowtie?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Ryan Wallace
            </a>
            on
            <a class="font-bold underline" href="https://unsplash.com/photos/alphabet-learning-toy-on-gray-apparel-azA1hLbjBBo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Unsplash
            </a>
        </p>
        <enhanced:img src={background} class="h-full object-cover relative -z-10" alt="Wooden letters of english alphabet" />
        <!-- <img src={background} class="h-full object-cover relative -z-10" alt="Wooden letters of english alphabet"/> -->
    </section>

    <section class="row-span-3 flex flex-col justify-center items-center gap-6">
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
    </section>
</main>