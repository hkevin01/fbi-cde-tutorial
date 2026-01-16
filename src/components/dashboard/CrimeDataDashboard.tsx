"use client";

import { CrimeChart } from '@/components/charts/CrimeChart';
import { CrimeDataTable } from '@/components/charts/CrimeDataTable';
import { TutorialStep } from '@/components/tutorial/TutorialStep';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  MapPin,
  Shield,
  TrendingUp,
  Users
} from 'lucide-react';
import React, { useState } from 'react';

interface CrimeData {
  year: number;
  state: string;
  violentCrime: number;
  propertyCrime: number;
  population: number;
}

const mockCrimeData: CrimeData[] = [
  { year: 2023, state: 'California', violentCrime: 174544, propertyCrime: 998654, population: 39538223 },
  { year: 2023, state: 'Texas', violentCrime: 134623, propertyCrime: 789456, population: 30097526 },
  { year: 2023, state: 'Florida', violentCrime: 87456, propertyCrime: 567890, population: 22610726 },
  { year: 2023, state: 'New York', violentCrime: 95678, propertyCrime: 456789, population: 19336776 },
  { year: 2023, state: 'Pennsylvania', violentCrime: 45678, propertyCrime: 234567, population: 12972008 },
];

const quickStats = [
  {
    title: 'Total Violent Crimes',
    value: '537,979',
    change: '-5.2%',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Property Crimes',
    value: '3,047,356',
    change: '-3.8%',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Agencies Reporting',
    value: '15,726',
    change: '+2.1%',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Population Covered',
    value: '308.2M',
    change: '+0.8%',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export const CrimeDataDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCrimeType, setSelectedCrimeType] = useState('All Crimes');
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Official US Government Banner */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-4 h-3 flex-shrink-0">
              <img
                src="/us-flag.png"
                alt="US Flag"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '🇺🇸';
                }}
              />
            </div>
            <span className="font-medium">An official website of the United States government</span>
            <span className="text-blue-600 dark:text-blue-400">Here's how you know</span>
          </div>
        </div>
      </div>

      {/* FBI Official Header */}
      <TutorialStep id="tutorial-navigation" className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 flex items-center">
                <img
                  src="/fbi-cde-logo.png"
                  alt="FBI CDE"
                  className="h-12 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="h-12 w-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">FBI</div>';
                  }}
                />
              </div>
              <div className="tutorial-dashboard-title">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Crime Data Explorer
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  FBI Uniform Crime Reporting Program
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Data as of: January 15, 2026
            </div>
          </div>
        </div>
      </TutorialStep>

      <div className="container mx-auto px-4 py-6">
        {/* Explorer Page Filters - FBI CDE Style */}
        <TutorialStep id="tutorial-search" delay={0.2} className="mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Filter className="h-4 w-4 text-white" />
              </div>
              Explorer Page Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2 tutorial-year-select">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Time Frame
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>
              <div className="space-y-2 tutorial-state-select">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Location Select
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All States">All States</option>
                  <option value="California">California</option>
                  <option value="Texas">Texas</option>
                  <option value="Florida">Florida</option>
                  <option value="New York">New York</option>
                </select>
              </div>
              <div className="space-y-2 tutorial-crime-select">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Shield className="h-4 w-4 text-blue-600" />
                  Crime Select
                </label>
                <select
                  value={selectedCrimeType}
                  onChange={(e) => setSelectedCrimeType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All Crimes">All Crimes</option>
                  <option value="Violent Crime">Violent Crime</option>
                  <option value="Property Crime">Property Crime</option>
                  <option value="Murder">Murder</option>
                  <option value="Robbery">Robbery</option>
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-1 flex items-end">
                <div className="w-full">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                    Actions
                  </label>
                  <Button
                    onClick={handleFilterChange}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 tutorial-search-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      'Apply Filters'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TutorialStep>

        {/* Quick Stats */}
        < TutorialStep id="tutorial-stats" delay={0.3} className="mb-6" >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              const tutorialClass = index === 0 ? 'tutorial-violent-stat' :
                index === 1 ? 'tutorial-property-stat' :
                  index === 2 ? 'tutorial-agencies-stat' : 'tutorial-population-stat';
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={tutorialClass}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {stat.value}
                          </p>
                          <p className={`text-sm ${stat.color}`}>
                            {stat.change} from last year
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                          <Icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TutorialStep >

        {/* Charts Section */}
        < TutorialStep id="tutorial-charts" delay={0.4} className="mb-6" >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="tutorial-line-chart">
              <CardHeader>
                <CardTitle>Crime Trends by State</CardTitle>
              </CardHeader>
              <CardContent>
                <CrimeChart data={mockCrimeData} />
              </CardContent>
            </Card>
            <Card className="tutorial-bar-chart">
              <CardHeader>
                <CardTitle>Crime Rate Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <CrimeChart data={mockCrimeData} type="bar" />
              </CardContent>
            </Card>
          </div>
        </TutorialStep >

        {/* Data Table */}
        < TutorialStep id="tutorial-data-table" delay={0.5} className="mb-6" >
          <Card>
            <CardHeader className="tutorial-table-headers">
              <div className="flex items-center justify-between">
                <CardTitle>Detailed Crime Statistics</CardTitle>
                <TutorialStep id="tutorial-export">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </TutorialStep>
              </div>
            </CardHeader>
            <CardContent>
              <div className="tutorial-sort-controls">
                <CrimeDataTable data={mockCrimeData} />
              </div>
            </CardContent>
          </Card>
        </TutorialStep >
      </div >
    </div >
  );
};
