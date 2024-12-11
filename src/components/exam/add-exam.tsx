'use client';

import { useCallback, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { DialogContent, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

import { useManagers } from '@/app/hooks/get/use-managers';
import { useCreateCampaign } from '@/app/hooks/mutate/use-create-campaign';

interface Props {
  onClose: () => void;
}

export const AddExam = ({ onClose }: Props) => {
  const { data: managers } = useManagers();
  const [name, setName] = useState('');
  const [clients, setClients] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<DateRange | undefined>();
  const [timeStart, setTimeStart] = useState('10:00');
  const [timeEnd, setTimeEnd] = useState('10:00');
  const [manager, setManager] = useState('');

  const { mutateAsync } = useCreateCampaign();

  const onSubmit = useCallback(async () => {
    if (!managers) return;
    const toastId = toast.loading('Додаю кампанію...');
    try {
      const managerId = managers.find((s) => s.name === manager)!.id!;

      const startDate = date!.from!;
      const endDate = date!.to!;

      startDate.setHours(
        parseInt(timeStart.split(':')[0]),
        parseInt(timeStart.split(':')[1]),
      );
      endDate.setHours(
        parseInt(timeEnd.split(':')[0]),
        parseInt(timeEnd.split(':')[1]),
      );
      await mutateAsync({
        managerId,
        name,
        description,
        dateStart: startDate.toISOString(),
        dateEnd: endDate.toISOString(),
        clients,
      });

      toast.dismiss(toastId);
      toast.success('Успішно!');
      onClose();
    } catch (error) {
      toast.dismiss(toastId);

      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }, [
    managers,
    date,
    timeStart,
    timeEnd,
    mutateAsync,
    name,
    description,
    clients,
    onClose,
    manager,
  ]);

  return (
    <DialogContent>
      <DialogTitle>Додати нову маркетингову кампанію</DialogTitle>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm">
          Назва
        </label>
        <Input
          id="name"
          value={name}
          placeholder="Назва кампанії"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-sm">
          Опис
        </label>
        <Textarea
          id={'description'}
          value={description}
          placeholder="Опис кампанії"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="select" className="text-sm">
          Виберіть менеджера
        </label>
        <Select value={manager} onValueChange={setManager}>
          <SelectTrigger id="select" className="w-full">
            <SelectValue placeholder="Виберіть менеджера" />
          </SelectTrigger>
          <SelectContent>
            {managers?.map((manager) => (
              <SelectItem key={manager.id} value={manager.name}>
                {manager.name}, {manager.position}, {manager.department.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="day" className="text-sm">
            Виберіть дати кампанії
          </label>
          <Calendar
            id="day"
            mode="range"
            selected={date}
            onSelect={setDate}
            className=""
          />
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="time" className="text-sm">
              Виберіть час початку
            </label>
            <Select onValueChange={setTimeStart} value={timeStart}>
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
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="time" className="text-sm">
              Виберіть час кінця
            </label>
            <Select onValueChange={setTimeEnd} value={timeEnd}>
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
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm">
          Імена клієнтів
        </label>
        <Input
          id="name"
          value={clients}
          placeholder="Імена клієнтів через кому"
          onChange={(e) => setClients(e.target.value)}
        />
      </div>

      <Button
        disabled={
          !clients ||
          !date?.to ||
          !date.from ||
          !timeEnd ||
          !timeStart ||
          !name ||
          !description
        }
        onClick={onSubmit}
      >
        Додати
      </Button>
    </DialogContent>
  );
};
