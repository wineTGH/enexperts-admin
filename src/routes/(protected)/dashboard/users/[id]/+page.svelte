<script lang="ts">
	import { superForm } from "sveltekit-superforms/client";
	import type { PageData } from "./$types";
	import { editUserSchema } from "./schema";
	import { zodClient } from "sveltekit-superforms/adapters";
    import * as Form from "$lib/components/ui/form";
	import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input";
	import { usersRoles } from "$lib/server/db/schema";


    export let data: PageData;

    const {editUser} = data;

    const form = superForm(data.form, {
        validators: zodClient(editUserSchema),
    });

    const { form: formData, enhance } = form;
</script>

<div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold">Edit {editUser?.username}</h1>
    <form method="POST" action="?/editUser" use:enhance>
        <Form.Field {form} name="id">
            <Form.Control let:attrs>
                <Input type="hidden" {...attrs} bind:value={$formData.id} required />
            </Form.Control>    
        </Form.Field>
        <Form.Field {form} name="username">
            <Form.Control let:attrs>
                <Form.Label>Username</Form.Label>
                <Input placeholder="john_doe" type="text" {...attrs} bind:value={$formData.username} required />
            </Form.Control>    
        </Form.Field>
        <Form.Field {form} name="email">
            <Form.Control let:attrs>
                <Form.Label>Email</Form.Label>
                <Input placeholder="me@me.com" type="email" {...attrs} bind:value={$formData.email} required />
            </Form.Control>
        </Form.Field>
    
        <Form.Field {form} name="firstName">
            <Form.Control let:attrs>
                <Form.Label>First Name</Form.Label>
                <Input placeholder="John" type="text" {...attrs} bind:value={$formData.firstName} required />
            </Form.Control>
        </Form.Field>
    
        <Form.Field {form} name="lastName">
            <Form.Control let:attrs>
                <Form.Label>Last Name</Form.Label>
                <Input placeholder="Doe" type="text" {...attrs} bind:value={$formData.lastName} required />
            </Form.Control>
        </Form.Field>
    
        <Form.Field {form} name="role">
            <Form.Control let:attrs>
                <Form.Label>Role</Form.Label>
                <Select.Root >
                    <Select.Trigger class="w-44" {...attrs}>
                        <Select.Value placeholder={$formData.role}>{$formData.role}</Select.Value>
                    </Select.Trigger>
                    <Select.Content>
                        {#each usersRoles as role}
                            <Select.Item value={role}>{role}</Select.Item>
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
        </Form.Field>
    
        <Form.Button>Save</Form.Button>
    </form>
</div>

