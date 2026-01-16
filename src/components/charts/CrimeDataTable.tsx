"use client";

import { formatNumber } from '@/lib/utils';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React, { useState } from 'react';

interface CrimeData {
  year: number;
  state: string;
  violentCrime: number;
  propertyCrime: number;
  population: number;
}

interface CrimeDataTableProps {
  data: CrimeData[];
}

type SortField = keyof CrimeData;
type SortDirection = 'asc' | 'desc' | null;

export const CrimeDataTable: React.FC<CrimeDataTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<SortField>('state');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => {
        if (prev === 'asc') return 'desc';
        if (prev === 'desc') return null;
        return 'asc';
      });
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field || !sortDirection) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc'
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  const calculateCrimeRate = (crimes: number, population: number) => {
    return ((crimes / population) * 100000).toFixed(1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              <button
                onClick={() => handleSort('state')}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                State
                {getSortIcon('state')}
              </button>
            </th>
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              <button
                onClick={() => handleSort('year')}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                Year
                {getSortIcon('year')}
              </button>
            </th>
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              <button
                onClick={() => handleSort('population')}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                Population
                {getSortIcon('population')}
              </button>
            </th>
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              <button
                onClick={() => handleSort('violentCrime')}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                Violent Crime
                {getSortIcon('violentCrime')}
              </button>
            </th>
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              <button
                onClick={() => handleSort('propertyCrime')}
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                Property Crime
                {getSortIcon('propertyCrime')}
              </button>
            </th>
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              Violent Crime Rate*
            </th>
            <th className="text-left p-4 font-semibold text-gray-700 dark:text-gray-300">
              Property Crime Rate*
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={`${row.state}-${row.year}`}
              className={`border-t ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors`}
            >
              <td className="p-4 font-medium text-gray-900 dark:text-gray-100">
                {row.state}
              </td>
              <td className="p-4 text-gray-600 dark:text-gray-400">
                {row.year}
              </td>
              <td className="p-4 text-gray-600 dark:text-gray-400">
                {formatNumber(row.population)}
              </td>
              <td className="p-4 text-red-600 dark:text-red-400 font-medium">
                {formatNumber(row.violentCrime)}
              </td>
              <td className="p-4 text-blue-600 dark:text-blue-400 font-medium">
                {formatNumber(row.propertyCrime)}
              </td>
              <td className="p-4 text-red-600 dark:text-red-400 font-mono">
                {calculateCrimeRate(row.violentCrime, row.population)}
              </td>
              <td className="p-4 text-blue-600 dark:text-blue-400 font-mono">
                {calculateCrimeRate(row.propertyCrime, row.population)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        * Crime rates are calculated per 100,000 population
      </div>
    </div>
  );
};
