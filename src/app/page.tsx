"use client";

import { CrimeDataDashboard } from "@/components/dashboard/CrimeDataDashboard";
import { TutorialProvider } from "@/components/tutorial/TutorialProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Map, Play, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [tutorialStarted, setTutorialStarted] = useState(false);
  const [currentView, setCurrentView] = useState<'welcome' | 'dashboard'>('welcome');

  const handleStartTutorial = () => {
    setTutorialStarted(true);
    setCurrentView('dashboard');
  };

  if (currentView === 'dashboard') {
    return (
      <TutorialProvider enabled={tutorialStarted}>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <CrimeDataDashboard />
        </div>
      </TutorialProvider>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Official US Government Banner */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <img src="/us-flag.png" alt="US Flag" className="w-4 h-3" onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }} />
            <span className="font-medium">An official website of the United States government</span>
            <span className="text-blue-600 dark:text-blue-400">Here's how you know</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <img
              src="/fbi-cde-logo.png"
              alt="FBI CDE Logo"
              className="h-16 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                FBI Crime Data Explorer
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">Uniform Crime Reporting Program</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-center mb-4">
            Explore reported crime, special studies, and estimated data based on submissions from law enforcement agencies across the U.S.
            This interactive tutorial will guide you through the official FBI Crime Data Explorer interface and data analysis capabilities.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Contractor Training Environment</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  This is an authentic replica of the FBI Crime Data Explorer interface designed specifically for contractor onboarding and training purposes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <CardTitle className="text-lg">Interactive Charts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Explore crime statistics with dynamic, interactive visualizations
                that help you understand trends and patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Map className="h-8 w-8 text-purple-600" />
                <CardTitle className="text-lg">Geographic Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Compare crime data across states, counties, and law enforcement
                agencies with intuitive geographic tools.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Search className="h-8 w-8 text-orange-600" />
                <CardTitle className="text-lg">Data Discovery</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Learn how to filter, search, and discover insights in the FBI's
                comprehensive crime database.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tutorial Steps Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Navigate the Interface", description: "Learn the dashboard layout and key features" },
              { step: 2, title: "Search Crime Data", description: "Filter data by location, crime type, and time period" },
              { step: 3, title: "Analyze Trends", description: "Understand crime patterns and statistical insights" },
              { step: 4, title: "Export Results", description: "Download data for further analysis and reporting" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Explore Crime Data?</h3>
              <p className="text-blue-100 mb-6">
                Start your interactive journey through the FBI Crime Data Explorer.
                This guided tutorial will teach you everything you need to know.
              </p>
              <Button
                onClick={handleStartTutorial}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Interactive Tutorial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
