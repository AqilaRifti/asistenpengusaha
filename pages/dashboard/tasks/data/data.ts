import { LucideArrowDown, LucideArrowRight, LucideArrowUp, LucideCheckCircle, LucideCircle, LucideCircleHelp, LucideCircleX, LucideTimer } from 'lucide-vue-next'
import { h } from 'vue'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: h(LucideCircleHelp),
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: h(LucideCircle),
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: h(LucideTimer),
  },
  {
    value: 'done',
    label: 'Done',
    icon: h(LucideCheckCircle),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: h(LucideCircleX),
  },
]

export const priorities = [
  {
    value: 'low',
    label: 'Low',
    icon: h(LucideArrowDown),
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: h(LucideArrowRight),
  },
  {
    value: 'high',
    label: 'High',
    icon: h(LucideArrowUp),
  },
]
