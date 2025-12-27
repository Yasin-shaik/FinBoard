'use client';

import { Widget } from '@/types';
import { useFetchData } from '@/hooks/useFetchData';
import WidgetWrapper from './WidgetWrapper';
import CardWidget from './CardWidget';
import TableWidget from './TableWidget';
import ChartWidget from './ChartWidget';
import { useAppDispatch } from '@/store/hooks';
import { removeWidget } from '@/store/dashboardSlice';

interface SmartWidgetProps {
  widget: Widget;
  onEdit: (widget: Widget) => void;
}

export default function SmartWidget({ widget, onEdit }: SmartWidgetProps) {
  const dispatch = useAppDispatch();
  const { data, isLoading, error, refetch } = useFetchData({
    url: widget.apiEndpoint,
    refreshInterval: widget.refreshInterval
  });
  const renderContent = () => {
    if (widget.type === 'card') {
      return <CardWidget data={data} config={widget} />;
    }
    if (widget.type === 'table') {
      return <TableWidget data={data} config={widget} />;
    }
    if (widget.type === 'chart') {
      return <ChartWidget data={data} config={widget} />;
    }
    return <div>Unknown Widget Type</div>;
  };
  return (
    <WidgetWrapper
      id={widget.id}
      title={widget.name}
      isLoading={isLoading}
      error={error ? error.message : null}
      onRemove={() => dispatch(removeWidget(widget.id))}
      onEdit={() => onEdit(widget)}
      onRefresh={() => refetch()}
    >
      {data ? renderContent() : null}
    </WidgetWrapper>
  );
}