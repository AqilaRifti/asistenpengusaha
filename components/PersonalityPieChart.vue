<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
const supabase: any = useNuxtApp().$supabase;

const MBTIData = ref([
  { name: 'Jan', total: 10 },
  { name: 'Feb', total: 10 },
  { name: 'Mar', total: 10 },
  { name: 'Apr', total: 10 },
  { name: 'May', total: 10 },
  { name: 'Jun', total: 10 },
])
async function getUserIdFromSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error('Error retrieving session:', error)
    return null
  }

  if (session) {
    const userId = session.user.id // Get the user_id from session
    console.log('User ID:', userId)
    return userId
  } else {
    console.log('No active session found.')
    return null
  }
}
const userID = ref(await getUserIdFromSession())
async function getUserMBTIData() {
  const { data, error: queryError } = await supabase
    .from('user_mbti')
    .select('*')
    .eq('user_id', userID.value)

  if (queryError) {
    console.error('Error fetching MBTI data:', queryError)
    return
  }
  // @ts-ignore
  MBTIData.value = Object.entries(JSON.parse(data[0].content).percentageStats).map(([name, total]) => ({ name, total }));
}
getUserMBTIData()
</script>

<template>
  <DonutChart
    index="name"
    :category="'total'"
    :data="MBTIData"
    :type="'pie'"
    :colors="['blue', 'indigo', 'purple', '#f7f7f7']"
  />
</template>