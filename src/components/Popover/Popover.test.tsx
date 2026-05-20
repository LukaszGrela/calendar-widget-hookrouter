import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';
import { PopoverTrigger } from './PopoverTrigger';
import { PopoverContent } from './PopoverContent';
import { PopoverHeading } from './PopoverHeading';
import { PopoverDescription } from './PopoverDescription';
import { PopoverClose } from './PopoverClose';

describe('components', () => {
  describe('common', () => {
    describe('Popover', () => {
      it('should render', () => {
        const { container } = render(
          <Popover>
            <PopoverTrigger>Click</PopoverTrigger>
            <PopoverContent>
              <PopoverHeading>Header</PopoverHeading>
              <PopoverDescription>Description</PopoverDescription>
              <PopoverClose>Close</PopoverClose>
            </PopoverContent>
          </Popover>
        );

        expect(container).toMatchSnapshot();
      });

      it('should render trigger as child', () => {
        const { container, queryByTestId } = render(
          <Popover>
            <PopoverTrigger asChild>
              <div data-testid="asChild" />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeading>Header</PopoverHeading>
              <PopoverDescription>Description</PopoverDescription>
              <PopoverClose>Close</PopoverClose>
            </PopoverContent>
          </Popover>
        );

        expect(queryByTestId('asChild')).toBeInstanceOf(HTMLDivElement);
        expect(container).toMatchSnapshot();
      });

      it('should open on trigger', async () => {
        const { container, queryByTestId, findByTestId } = render(
          <Popover>
            <PopoverTrigger data-testid="trigger">Click</PopoverTrigger>
            <PopoverContent data-testid="content">
              <PopoverHeading>Header</PopoverHeading>
              <PopoverDescription>Description</PopoverDescription>
              <PopoverClose>Close</PopoverClose>
            </PopoverContent>
          </Popover>
        );

        const trigger = await findByTestId('trigger');

        userEvent.click(trigger);
        await waitFor(() => expect(queryByTestId('content')).toBeVisible());

        expect(container).toMatchSnapshot();
      });

      it('should open on trigger when asChild is true', async () => {
        const { container, queryByTestId, findByTestId } = render(
          <Popover>
            <PopoverTrigger asChild>
              <div data-testid="asChild-trigger" />
            </PopoverTrigger>
            <PopoverContent data-testid="content">
              <PopoverHeading>Header</PopoverHeading>
              <PopoverDescription>Description</PopoverDescription>
              <PopoverClose>Close</PopoverClose>
            </PopoverContent>
          </Popover>
        );

        const trigger = await findByTestId('asChild-trigger');

        userEvent.click(trigger);
        await waitFor(() => expect(queryByTestId('content')).toBeVisible());

        expect(container).toMatchSnapshot();
      });

      it('should close when clicking on trigger for the second time', async () => {
        const { container, queryByTestId, findByTestId } = render(
          <Popover>
            <PopoverTrigger data-testid="trigger">Click</PopoverTrigger>
            <PopoverContent data-testid="content">
              <PopoverHeading>Header</PopoverHeading>
              <PopoverDescription>Description</PopoverDescription>
              <PopoverClose>Close</PopoverClose>
            </PopoverContent>
          </Popover>
        );

        const trigger = await findByTestId('trigger');

        userEvent.click(trigger);
        await waitFor(() => expect(queryByTestId('content')).toBeVisible());

        userEvent.click(trigger);
        await waitFor(() =>
          expect(queryByTestId('content')).not.toBeInTheDocument()
        );

        expect(container).toMatchSnapshot();
      });

      it('should close when clicking on close button', async () => {
        const { container, queryByTestId, findByTestId } = render(
          <Popover>
            <PopoverTrigger data-testid="trigger">Click</PopoverTrigger>
            <PopoverContent data-testid="content">
              <PopoverHeading>Header</PopoverHeading>
              <PopoverDescription>Description</PopoverDescription>
              <PopoverClose data-testid="close">Close</PopoverClose>
            </PopoverContent>
          </Popover>
        );

        const trigger = await findByTestId('trigger');

        userEvent.click(trigger);
        await waitFor(() => expect(queryByTestId('content')).toBeVisible());

        const close = await findByTestId('close');
        userEvent.click(close);
        await waitFor(() =>
          expect(queryByTestId('content')).not.toBeInTheDocument()
        );

        expect(container).toMatchSnapshot();
      });
    });
  });
});
