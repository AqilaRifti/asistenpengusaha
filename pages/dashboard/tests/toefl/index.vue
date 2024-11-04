<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-3">
        <TOEFLTestTypeCard type="Listening"><LucideAudioLines class="w-16 h-16" /></TOEFLTestTypeCard>
        <TOEFLTestTypeCard type="Writing"><LucideSquarePen class="w-16 h-16" /></TOEFLTestTypeCard>
        <NuxtLink to="/dashboard/tests/toefl/reading">
            <TOEFLTestTypeCard type="Reading">
                <LucideBookOpenText class="w-16 h-16" />
            </TOEFLTestTypeCard>
        </NuxtLink>
        <TOEFLTestTypeCard type="Speaking"><LucideSpeech class="w-16 h-16" /></TOEFLTestTypeCard>
    </div>
</template>