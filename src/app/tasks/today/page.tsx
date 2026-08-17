import { SunIcon } from 'lucide-react';

import PageContainer from '@/components/page-container';
import QuickTaskForm from '@/components/task/quick-task-form';
import TaskItem from '@/components/task/task-item';

export default function Today() {
  return (
    <PageContainer
      titleNode={
        <div className="flex items-center pb-5 gap-3">
          <SunIcon />
          <h2 className="text-xl">Hôm nay</h2>
        </div>
      }
    >
      <QuickTaskForm />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </PageContainer>
  );
}
