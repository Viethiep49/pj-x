import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#8884d8'];

export const RevenueChart = ({ data = [], appointments = [], orders = [], period = 'month' }) => {
  const chartData = useMemo(() => {
    const groups = {};
    const sourceData = orders.length > 0 ? orders : data;
    
    if (!Array.isArray(sourceData)) return [];

    sourceData.forEach(order => {
      if (!order?.created_at) return;
      const date = new Date(order.created_at);
      let key;
      
      if (period === 'day') {
        key = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
      } else if (period === 'week') {
        const firstDay = new Date(date.setDate(date.getDate() - date.getDay()));
        key = `Tuần ${firstDay.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}`;
      } else {
        key = date.toLocaleDateString('vi-VN', { month: 'long' });
      }
      
      groups[key] = (groups[key] || 0) + Number(order.total_amount || 0);
    });

    return Object.entries(groups)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => 0); // Simplified sort
  }, [data, orders, period]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f4a261" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f4a261" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} />
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            formatter={(val) => [Number(val).toLocaleString('vi-VN') + ' đ', 'Doanh thu']}
          />
          <Area type="monotone" dataKey="revenue" stroke="#f4a261" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ServiceDistribution = ({ appointments = [] }) => {
  const chartData = useMemo(() => {
    const counts = {};
    if (!Array.isArray(appointments)) return [];

    appointments.forEach(appt => {
      const name = appt?.service?.name || 'Khác';
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [appointments]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const OrderStatusChart = ({ orders = [] }) => {
  const chartData = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    const statuses = ['delivered', 'cancelled', 'pending', 'confirmed'];
    return statuses.map(s => ({
      name: s.charAt(0).toUpperCase() + s.slice(1),
      count: orders.filter(o => o?.status === s).length
    }));
  }, [orders]);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: '#f8f8f8'}} />
          <Bar dataKey="count" radius={[10, 10, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === 'Cancelled' ? '#ef4444' : '#10b981'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AIScanTrendChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorScans)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TopBreedsChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data} margin={{ left: 40, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="display_name" type="category" axisLine={false} tickLine={false} width={120} tick={{fontSize: 11, fontWeight: 'bold'}} />
          <Tooltip cursor={{fill: '#f0f0f0'}} />
          <Bar dataKey="scan_count" fill="#00C49F" radius={[0, 10, 10, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
