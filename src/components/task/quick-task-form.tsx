import { BellIcon, CalendarClockIcon, PencilIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function QuickTaskForm() {
  return (
    <Card className="gap-0 pt-0">
      <CardContent className="py-2">
        <div className="flex items-center gap-2">
          <PencilIcon className="size-4" />
          <Input
            autoFocus
            placeholder="Thêm tác vụ"
            className="focus-visible:ring-0 pl-3 border-none focus:outline-none bg-transparent!"
          />
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-accent">
        <div className="flex items-stretch gap-4 w-full">
          <Button variant="outline" size="icon-sm">
            <CalendarClockIcon />
          </Button>
          <Button variant="outline" size="icon-sm">
            <BellIcon />
          </Button>
          <Button variant="outline" size="sm" className="ml-auto">
            Tạo
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
