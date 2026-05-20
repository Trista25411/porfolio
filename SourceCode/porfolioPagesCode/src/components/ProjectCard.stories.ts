import type { Meta, StoryObj } from '@storybook/vue3';
import ProjectCard from './ProjectCard.vue';
import { Project } from '@/data/projectcard';

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
};
export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    item: Project[0],
  },
};