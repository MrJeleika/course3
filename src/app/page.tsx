'use client';

import { useState } from 'react';

import { useCampaigns } from './hooks/get/use-exams';

import { DataTable } from '@/components/common/data-table';
import { AddExam } from '@/components/exam/add-exam';
import { columnsExam } from '@/components/exam/columns';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Campaign } from './database/entities/campaign.entity';

export default function Home() {
  const { data: campaigns } = useCampaigns();

  const [open, setOpen] = useState(false);

  const [selectedCampaign, setSelectedCampaign] = useState<null | Campaign>(
    null,
  );

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
