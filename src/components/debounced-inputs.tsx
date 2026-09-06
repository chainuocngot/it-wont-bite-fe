import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { withDebounce } from '@/hocs/with-debounce';

export const DebouncedInput = withDebounce<HTMLInputElement, React.ComponentProps<typeof Input>>(
  Input,
);

export const DebouncedTextarea = withDebounce<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Textarea>
>(Textarea);
