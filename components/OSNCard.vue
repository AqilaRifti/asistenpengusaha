<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        badgeContent: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <Card class="flex flex-col justify-center items-center hover:border-primary">
        <CardHeader>
            <slot></slot>
        </CardHeader>
        <CardContent class="flex flex-col justify-center items-center">
            <h2 class="text-3xl font-bold inter-font">{{ title }}</h2>
            <Badge class="bg-secondary text-white">{{ badgeContent }}</Badge>
        </CardContent>
        <CardFooter>
            <Button> Akses -></Button>
        </CardFooter>
    </Card>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
.inter-font {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
}
</style>