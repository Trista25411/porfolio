import type {Meta, StoryObj} from '@storybook/vue3';
import BaseButton from './BaseButton.vue';

const meta:Meta<typeof BaseButton> ={
    title: 'Components/BaseButton',
    component:BaseButton,
}
export default meta;

type Story = StoryObj<typeof BaseButton>;

export const Default: Story = {
    args:{
        icon:'figma',
        name:'button',
        path:'',
        theme:'default',
    }
}