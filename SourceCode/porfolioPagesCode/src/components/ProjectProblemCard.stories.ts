import type { Meta, StoryObj } from '@storybook/vue3';
import ProjectProblemCard from "./ProjectProblemCard.vue";

const meta: Meta<typeof ProjectProblemCard> = {
    title: 'components/ProjectProblemCard',
    component: ProjectProblemCard
}
export default meta;
type Story = StoryObj<typeof ProjectProblemCard>;

export const Default: Story = {
    args: {
        // 要輸入 data 數據才會顯示 
        items:[ ]
    }
}
