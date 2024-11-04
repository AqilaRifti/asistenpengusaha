<template>
    <div @dblclick="console.log('clicked')" class="cursor-pointer p-1 m-1 border-green-900 border flex-1">
        <article class="flex justify-between">
            <section class="flex">
                <LucideFile class="mr-2" />
                <span>{{ file.name }}</span>
            </section>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="px-1">
                        <LucideEllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-36">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <LucideSquarePen class="h-4 w-6 stroke-2 text-blue-500" />
                        <span>Rename</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LucideEye class="h-4 w-6 stroke-2 text-violet-500" />
                        <span>Read</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LucideTrash2 class="h-4 w-6 stroke-2 text-rose-500" />
                    <span>Delete</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </article>
    </div>
  </template>
  
  <script setup>

  
  const props = defineProps({
    file: Object,
  })
  </script>
