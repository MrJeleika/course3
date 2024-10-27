'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { DialogContent, DialogTitle } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { useSubjects } from '@/app/hooks/get/use-subjects';
import { useAddExam } from '@/app/hooks/mutate/use-add-exam';

interface Props {
  onClose: () => void;
}

export const AddExam = ({ onClose }: Props) => {
  const { data: subjects } = useSubjects();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('10:00');
  const [subject, setSubject] = useState('');

  const { mutateAsync } = useAddExam();

  const onSubmit = useCallback(async () => {
    const toastId = toast.loading('Adding exam...');
    try {
      const subjectId = subjects!.find((s) => s.name === subject)!.id;

      await mutateAsync({ subjectId, time, date: date!.toISOString() });
      toast.dismiss(toastId);
      toast.success('Exam added');
      onClose();
    } catch (error) {
      toast.dismiss(toastId);

      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, [date, mutateAsync, onClose, subject, subjects, time]);

  return (
    <DialogContent>
      <DialogTitle>Add exam</DialogTitle>

      <div className="flex flex-col gap-2">
        <label htmlFor="select" className="text-sm">
          Виберіть предмет
        </label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger id="select" className="w-full">
            <SelectValue placeholder="Виберіть предмет" />
          </SelectTrigger>
          <SelectContent>
            {subjects?.map((subject) => (
              <SelectItem key={subject.id} value={subject.name}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="day" className="text-sm">
          Виберіть день
        </label>
        <Calendar
          id="day"
          mode="single"
          selected={date}
          onSelect={setDate}
          className=""
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="time" className="text-sm">
          Виберіть час
        </label>
        <Select onValueChange={setTime} value={time}>
          <SelectTrigger id="time" className="w-full">
            <SelectValue placeholder="Виберіть час" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[15rem]">
              {Array.from({ length: 96 }).map((_, i) => {
                const hour = Math.floor(i / 4)
                  .toString()
                  .padStart(2, '0');
                const minute = ((i % 4) * 15).toString().padStart(2, '0');
                return (
                  <SelectItem key={i} value={`${hour}:${minute}`}>
                    {hour}:{minute}
                  </SelectItem>
                );
              })}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
      <Button disabled={!subject || !date || !subjects} onClick={onSubmit}>
        Додати
      </Button>
    </DialogContent>
  );
};
