import { Card } from 'tamagui';
import type { DataPoint } from '../../types/dashboard';
import { CardHeader } from '../CardHeader';
import { BarChart } from './BarChart';
import { BarChart as BarChartIcon } from '@tamagui/lucide-icons';

export interface BarChartCardsProps {
  title: string;
  data: DataPoint[];
  color?: string;
}

/**
 * BarChartCards - Card wrapper for BarChart component
 */
export function BarChartCards({
  title,
  data,
  color = '#22c55e',
}: BarChartCardsProps): React.JSX.Element {
  return (
    <Card p="$5" gap="$4" borderRadius="$6">
      <CardHeader title={title} icon={<BarChartIcon size={20} />} />
      <BarChart data={data} color={color} />
    </Card>
  );
}
