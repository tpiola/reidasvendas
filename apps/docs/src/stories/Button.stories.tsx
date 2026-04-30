import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@altiq/ui';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  args: {
    children: 'Quero meu diagnóstico',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

