import type { Meta, StoryObj } from '@storybook/vue3';
import LifeCard from '../components/LifeCard.vue'; 

const meta: Meta<typeof LifeCard> = {
  title: 'Components/LifeCard', 
  component: LifeCard,           
};
export default meta;
type Story = StoryObj<typeof LifeCard>;

export const Default: Story = {
  args: {

  },
};