import React, { useEffect, useState } from 'react';
import { Award, Trophy, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import api from '../../services/api';

interface Badge {
  id: string;
  code: string;
  nameId: string;
  nameEn: string;
  descriptionId: string;
  descriptionEn: string;
  icon: string;
  rewardPoints: number;
}

export const RewardsView: React.FC = () => {
  const { t } = useMontessori();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    api
      .get('/badges')
      .then((res) => {
        if (res.data?.data) {
          setBadges(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-100">
          {t('Prestasi & Lencana Reward', 'Achievements & Reward Badges')}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {t(
            'Selesaikan modul dan pertahankan streak latihan untuk membuka lencana kehormatan.',
            'Complete modules and maintain daily streak to unlock honorary badges.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((b) => (
          <div
            key={b.id}
            className="p-5 rounded-2xl glass-panel border border-slate-800 text-center space-y-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Award className="w-7 h-7" />
            </div>

            <div>
              <h4 className="font-bold text-sm text-slate-100">{t(b.nameId, b.nameEn)}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {t(b.descriptionId, b.descriptionEn)}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+{b.rewardPoints} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
