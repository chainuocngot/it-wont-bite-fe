import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { BellIcon, CalendarClockIcon, PencilIcon, StarIcon, SunIcon } from 'lucide-react';

export default function Today() {
  return (
    <div>
      <div className="flex items-center mb-5 gap-3">
        <SunIcon />
        <h2 className="text-xl">Hôm nay</h2>
      </div>

      <Card className="gap-0 pt-0">
        <CardContent className="py-2">
          <div className="flex items-center gap-2">
            <PencilIcon className="size-4" />
            <Input className="focus-visible:ring-0 pl-3 border-none focus:outline-none bg-transparent!" />
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

      <Card className="gap-0 py-2 mt-4">
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
    </div>
  );
}
