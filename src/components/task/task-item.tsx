'use client';

import { StarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useUiStore } from '@/stores/ui';

export default function TaskItem() {
  const toggleTaskDetailSidebar = useUiStore((store) => store.toggleTaskDetailSidebar);

  return (
    <Card className="gap-0 py-2 mt-4 cursor-pointer" onClick={() => toggleTaskDetailSidebar(true)}>
      <CardContent>
        <div className="flex items-center gap-3">
          <Checkbox />
          <div className="flex flex-col">
            <p className="text-sm">Title</p>
            <div className="flex items-center gap-2">
              <span>Tasks</span>
              <span>·</span>
              <span>0 of 2</span>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" className="ml-auto">
            <StarIcon className="size-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
