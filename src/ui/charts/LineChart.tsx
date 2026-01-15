import { Card } from 'tamagui';
import type { DataPoint } from '../../types/dashboard';
import { LineChartPure } from './LineChartPure';
import { TrendingUp } from '@tamagui/lucide-icons';
import { CardHeader } from '../CardHeader';

export interface LineChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
  yAxisLabel?: string;
}

/**
 * LineChart - Card wrapper for LineChartPure component
 */
export function LineChart({
  title,
  data,
  color = '#0ea5e9',
}: LineChartProps): React.JSX.Element {
  return (
    <Card p="$5" gap="$4" borderRadius="$6">
      <CardHeader title={title} icon={<TrendingUp size={20} />} />
      <LineChartPure data={data} color={color} />
    </Card>
  );
}
