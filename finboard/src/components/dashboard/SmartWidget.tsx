'use client';

import { Widget } from '@/types';
import { useFetchData } from '@/hooks/useFetchData';
import WidgetWrapper from './WidgetWrapper';
import CardWidget from './CardWidget';
import TableWidget from './TableWidget';
import ChartWidget from './ChartWidget';
import { useAppDispatch } from '@/store/hooks';
import { removeWidget } from '@/store/dashboardSlice';

// This component decides WHICH visual to render (Card vs Table)
// and handles the API data connection.
export default function SmartWidget({ widget }: { widget: Widget }) {
  const dispatch = useAppDispatch();

  // 1. Fetch Data using the hook from Day 3
  const { data, isLoading, error, refetch } = useFetchData({
    url: widget.apiEndpoint,
    refreshInterval: widget.refreshInterval
  });

  // 2. Render the correct internal component
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
      onEdit={() => console.log('Edit', widget.id)}
      onRefresh={() => refetch()}
    >
      {/* Only render content if we have data */}
      {data ? renderContent() : null}
    </WidgetWrapper>
  );
}