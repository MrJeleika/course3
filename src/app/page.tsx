'use client';

import { useState } from 'react';

import { Campaign } from './database/entities/campaign.entity';
import { useCampaigns } from './hooks/get/use-exams';

import { DataTable } from '@/components/common/data-table';
import { AddExam } from '@/components/exam/add-exam';
import { columnsExam } from '@/components/exam/columns';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

export default function Home() {
  const { data: campaigns } = useCampaigns();

  const [open, setOpen] = useState(false);

  const [selectedCampaign, setSelectedCampaign] = useState<
    null | (Campaign & { clients?: string[] })
  >(null);

  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <p className="mb-4 text-lg font-bold">Активні кампаніі</p>
      <div className="mb-8 flex flex-col gap-4">
        <DataTable
          columns={columnsExam}
          data={campaigns || []}
          onClick={(row) => setSelectedCampaign(row.original)}
        />
        <Button onClick={() => setOpen(true)}>
          Додати нову маркетингову кампанію
        </Button>
      </div>
      {selectedCampaign && (
        <div className="flex justify-between gap-16 rounded-md border p-4">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium">{selectedCampaign.name}</p>
            <p>{selectedCampaign.description}</p>
            <p className="text-destructive">
              Виконує: {selectedCampaign.manager.name}{' '}
              {selectedCampaign.manager.position}
            </p>
            <p className="text-destructive">
              Оплата:{' '}
              {(selectedCampaign.manager.salary *
                (new Date(selectedCampaign.endDate).getTime() -
                  new Date(selectedCampaign.startDate).getTime())) /
                (1000 * 60 * 60 * 24 * 30)}
              $
            </p>
            <p className="text-destructive">
              Клієнти: {selectedCampaign.clients?.join(',')}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {selectedCampaign.startDate} - {selectedCampaign.endDate}
            </p>
          </div>
        </div>
      )}
      {/* {studentsForCurrentExam.length > 0 && selectedExam && (
        <div className="flex flex-col gap-2">
          <p>Оцінки студентів по екзамену з {selectedExam.subject.name}</p>
          <DataTable columns={columnsStudents} data={studentsForCurrentExam} />
        </div>
      )} */}
      <Dialog open={open} onOpenChange={setOpen}>
        <AddExam onClose={() => setOpen(false)} />
      </Dialog>
    </div>
  );
}
