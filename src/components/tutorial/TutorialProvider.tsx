"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface TutorialContextType {
  startTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  isRunning: boolean;
  currentStep: number;
  isInteractiveMode: boolean;
  startInteractiveSearch: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

interface TutorialProviderProps {
  children: React.ReactNode;
  enabled: boolean;
}

const tutorialSteps: Step[] = [
  {
    target: '.tutorial-navigation',
    content: (
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 text-blue-600">Welcome to the Official FBI Crime Data Explorer</h3>
        <p className="mb-3 text-base">As a contractor, you'll be working directly with the FBI's official Crime Data Explorer interface - the same system used by federal agents, researchers, and law enforcement agencies nationwide.</p>
        <p className="mb-3 text-sm text-gray-600">This system contains real FBI Uniform Crime Reporting (UCR) data from over 18,000 law enforcement agencies.</p>
        <p className="text-sm font-medium text-blue-700">Let's familiarize you with the production interface you'll be using!</p>
      </div>
    ),
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '.tutorial-dashboard-title',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-green-600">Production FBI Database Access</h3>
        <p className="mb-3">You're now connected to the FBI's official Crime Data Explorer - the same interface used by federal agents and authorized personnel.</p>
        <p className="text-sm text-gray-600">All data you access here is from the official UCR Program maintained by the FBI's Criminal Justice Information Services (CJIS) Division.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.tutorial-nav-buttons',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-purple-600">Navigation Options</h3>
        <p className="mb-3">These tabs let you switch between different views: Dashboard, Analytics, and Geographic mapping.</p>
        <p className="text-sm text-gray-600">We'll focus on the Dashboard for this tutorial.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.tutorial-search',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-orange-600">Data Filtering Controls</h3>
        <p className="mb-3">Here you can filter FBI crime data by year, location, and crime type to focus your analysis.</p>
        <p className="mb-3 text-sm text-gray-600">The FBI categorizes crimes into two main types: <strong>Violent Crime</strong> (murder, rape, robbery, aggravated assault) and <strong>Property Crime</strong> (burglary, larceny-theft, motor vehicle theft).</p>
        <p className="text-sm font-medium text-orange-700">Let's set up a search! First, try selecting a different year from the dropdown.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.tutorial-year-select',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-indigo-600">Select Year</h3>
        <p className="mb-3">Choose which year of crime data you want to analyze. Each year represents a complete 12-month reporting period.</p>
        <p className="text-sm text-gray-600">Try selecting 2022 to see how crime patterns changed from the current year.</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tutorial-state-select',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-red-600">Choose Location</h3>
        <p className="mb-3">Filter by specific states or view all states combined. State-level data includes all participating agencies within that state.</p>
        <p className="text-sm text-gray-600">Select a state like California or Texas to focus on a specific region.</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tutorial-crime-select',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-teal-600">Crime Type Filter</h3>
        <p className="mb-3">Focus on specific types of crimes:</p>
        <ul className="mb-3 text-sm text-gray-600 ml-4 list-disc">
          <li><strong>Violent Crime:</strong> Offenses involving force or threat of force</li>
          <li><strong>Property Crime:</strong> Offenses involving theft or destruction of property</li>
          <li><strong>Specific offenses:</strong> Individual crime categories</li>
        </ul>
        <p className="text-sm font-medium text-teal-700">Try selecting "Violent Crime" to focus on the most serious offenses.</p>
      </div>
    ),
    placement: 'right',
  },
  {
    target: '.tutorial-search-button',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-rose-600">Execute Official Query</h3>
        <p className="mb-3">Click "Apply Filters" to execute your query against the FBI's official database. This will retrieve filtered data using the same parameters that federal agents use.</p>
        <p className="text-sm text-gray-600 mb-3">The system will update all displays with current UCR data matching your criteria.</p>
        <p className="text-sm font-bold text-rose-700">Go ahead - click Apply Filters to run your official FBI query!</p>
      </div>
    ),
    placement: 'left',
    disableBeacon: true,
    spotlightClicks: true,
  },
  {
    target: '.tutorial-stats',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-blue-600">Key Crime Statistics</h3>
        <p className="mb-3">These cards show the most important numbers at a glance:</p>
        <ul className="mb-3 text-sm text-gray-600 ml-4 list-disc">
          <li><strong>Total Crimes:</strong> Raw numbers of reported incidents</li>
          <li><strong>Agencies Reporting:</strong> How many law enforcement agencies contributed data</li>
          <li><strong>Population Covered:</strong> Total population in reporting areas</li>
        </ul>
        <p className="text-sm text-blue-700">The percentage changes show trends compared to the previous year.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.tutorial-violent-stat',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-red-600">Violent Crime Totals</h3>
        <p className="mb-3">This shows the total number of violent crimes reported. Violent crimes include:</p>
        <ul className="mb-3 text-sm text-gray-600 ml-4 list-disc">
          <li>Murder and non-negligent manslaughter</li>
          <li>Rape</li>
          <li>Robbery (theft by force or threat)</li>
          <li>Aggravated assault (serious bodily injury)</li>
        </ul>
        <p className="text-sm text-red-700">The negative percentage typically indicates crime is decreasing - a positive trend!</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.tutorial-property-stat',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-blue-600">Property Crime Data</h3>
        <p className="mb-3">Property crimes are much more common than violent crimes. They include:</p>
        <ul className="mb-3 text-sm text-gray-600 ml-4 list-disc">
          <li>Burglary (unlawful entry)</li>
          <li>Larceny-theft (stealing without force)</li>
          <li>Motor vehicle theft</li>
          <li>Arson (in some reports)</li>
        </ul>
        <p className="text-sm text-blue-700">Notice how property crimes outnumber violent crimes by about 6:1.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.tutorial-agencies-stat',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-green-600">Reporting Agencies</h3>
        <p className="mb-3">This shows how many law enforcement agencies contributed data. More agencies means more comprehensive coverage.</p>
        <p className="mb-3 text-sm text-gray-600">Agencies include city police, county sheriffs, state police, and federal agencies.</p>
        <p className="text-sm text-green-700">The FBI works with over 18,000 agencies nationwide for complete data collection.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.tutorial-population-stat',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-purple-600">Population Coverage</h3>
        <p className="mb-3">This represents the total population living in areas covered by reporting agencies.</p>
        <p className="mb-3 text-sm text-gray-600">Higher population coverage means the statistics represent more of the U.S. population.</p>
        <p className="text-sm text-purple-700">The FBI typically covers about 95% of the U.S. population through participating agencies.</p>
      </div>
    ),
    placement: 'bottom',
  },
  {
    target: '.tutorial-charts',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-indigo-600">Interactive Data Visualizations</h3>
        <p className="mb-3">These charts transform raw crime numbers into visual patterns that are easier to understand and analyze.</p>
        <p className="mb-3 text-sm text-gray-600">Visual analysis helps identify trends, compare regions, and spot anomalies in the data.</p>
        <p className="text-sm text-indigo-700">Hover over any data point to see detailed information!</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.tutorial-line-chart',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-green-600">Crime Trends Analysis</h3>
        <p className="mb-3">This line chart shows crime patterns across different states or time periods.</p>
        <ul className="mb-3 text-sm text-gray-600 ml-4 list-disc">
          <li><span className="text-red-600">Red line:</span> Violent crime incidents</li>
          <li><span className="text-blue-600">Blue line:</span> Property crime incidents</li>
        </ul>
        <p className="text-sm text-green-700">Look for patterns - which states have higher crime rates? Are there seasonal trends?</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.tutorial-bar-chart',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-orange-600">Comparative Analysis</h3>
        <p className="mb-3">Bar charts make it easy to compare crime levels between different states or regions.</p>
        <p className="mb-3 text-sm text-gray-600">The height of each bar represents the total number of crimes reported in that area.</p>
        <p className="text-sm text-orange-700">Use this to identify which areas have the highest and lowest crime rates.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.tutorial-data-table',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-teal-600">Detailed Crime Statistics</h3>
        <p className="mb-3">This table provides exact numbers for precise analysis and research.</p>
        <p className="mb-3 text-sm text-gray-600">Each row represents a jurisdiction (state/agency) with complete crime data including population for calculating rates.</p>
        <p className="text-sm text-teal-700">Click column headers to sort by different criteria - very useful for research!</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.tutorial-table-headers',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-purple-600">Understanding the Data Columns</h3>
        <ul className="mb-3 text-sm text-gray-600 ml-4 list-disc">
          <li><strong>Population:</strong> Total residents in the reporting area</li>
          <li><strong>Violent/Property Crime:</strong> Raw number of incidents</li>
          <li><strong>Crime Rate:</strong> Crimes per 100,000 population (standardized for comparison)</li>
        </ul>
        <p className="text-sm text-purple-700">Crime rates let you fairly compare areas of different sizes.</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.tutorial-sort-controls',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-rose-600">Data Sorting Features</h3>
        <p className="mb-3">Click any column header to sort the data by that field. This helps you:</p>
        <ul className="mb-3 text-sm text-gray-600 ml-4 list-disc">
          <li>Find states with highest/lowest crime rates</li>
          <li>Identify population centers</li>
          <li>Compare similar-sized jurisdictions</li>
        </ul>
        <p className="text-sm text-rose-700">Try clicking "Violent Crime Rate" to see which areas are safest!</p>
      </div>
    ),
    placement: 'top',
  },
  {
    target: '.tutorial-export',
    content: (
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-indigo-600">Export Your Research</h3>
        <p className="mb-3">Download the filtered data for use in your own analysis, reports, or presentations.</p>
        <p className="mb-3 text-sm text-gray-600">Available formats include CSV (for spreadsheets) and JSON (for programming).</p>
        <p className="text-sm text-indigo-700">This is how researchers, journalists, and analysts access FBI crime data for their work.</p>
      </div>
    ),
    placement: 'bottom',
  }
];

const BouncingArrow: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0, -10, 0]
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop'
          }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
            <ArrowDown className="h-6 w-6" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children, enabled }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const [interactiveStep, setInteractiveStep] = useState(0);

  useEffect(() => {
    if (enabled) {
      // Small delay to ensure DOM elements are rendered
      const timer = setTimeout(() => {
        setRun(true);
        setShowArrow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [enabled]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      setRun(false);
      setShowArrow(false);
      // Clean up any tutorial artifacts
      const tutorialElements = document.querySelectorAll('[data-tutorial-highlight]');
      tutorialElements.forEach(el => el.removeAttribute('data-tutorial-highlight'));

      // Start interactive search session after tutorial
      setTimeout(() => {
        setIsInteractiveMode(true);
        startInteractiveSearch();
      }, 2000);
    } else if (type === 'step:after') {
      setStepIndex(index + 1);
      // Hide arrow for search step until they actually click
      if (index === 7) { // Search button step
        setShowArrow(false);
      }
    } else if (type === 'step:before') {
      // Highlight current tutorial element
      const currentStep = tutorialSteps[index];
      if (currentStep && currentStep.target) {
        const element = document.querySelector(currentStep.target);
        if (element) {
          element.setAttribute('data-tutorial-highlight', 'true');
        }
      }
      // Clean up previous highlights
      if (index > 0) {
        const prevStep = tutorialSteps[index - 1];
        if (prevStep && prevStep.target) {
          const prevElement = document.querySelector(prevStep.target);
          if (prevElement) {
            prevElement.removeAttribute('data-tutorial-highlight');
          }
        }
      }
    }
  };

  const startInteractiveSearch = () => {
    setInteractiveStep(0);

    // Show initial interactive guidance
    const showInteractivePrompt = (message: string, targetElement?: string) => {
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
      overlay.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md mx-4 shadow-2xl">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">Interactive Search Session</h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-4">${message}</p>
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded" onclick="this.parentElement.parentElement.remove()">
            Continue
          </button>
        </div>
      `;

      if (targetElement) {
        const target = document.querySelector(targetElement);
        if (target) {
          target.setAttribute('data-tutorial-highlight', 'true');
          overlay.onclick = (e) => {
            if (e.target === overlay) {
              target.removeAttribute('data-tutorial-highlight');
              overlay.remove();
            }
          };
        }
      }

      document.body.appendChild(overlay);
    };

    // Start the interactive sequence
    showInteractivePrompt(
      "Great! Now let's practice using the FBI Crime Data Explorer together. I'll guide you through a real search scenario that demonstrates what analysts typically investigate.",
    );

    // Set up interactive sequence
    setTimeout(() => {
      showInteractivePrompt(
        "Let's search for violent crime data in California for 2023. First, make sure 'Time Frame' is set to a recent year like 2023.",
        '.tutorial-year-select'
      );
    }, 3000);
  };

  const tutorialContext: TutorialContextType = {
    startTutorial: () => setRun(true),
    nextStep: () => setStepIndex(prev => Math.min(prev + 1, tutorialSteps.length - 1)),
    prevStep: () => setStepIndex(prev => Math.max(prev - 1, 0)),
    isRunning: run,
    currentStep: stepIndex,
    isInteractiveMode,
    startInteractiveSearch,
  };

  return (
    <TutorialContext.Provider value={tutorialContext}>
      {children}
      <BouncingArrow visible={showArrow && run} />
      <Joyride
        steps={tutorialSteps}
        run={run}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous
        showProgress
        showSkipButton
        spotlightClicks
        disableOverlayClose
        styles={
          {
            options: {
              primaryColor: '#2563eb',
              zIndex: 10000,
            },
            tooltip: {
              borderRadius: '12px',
              fontSize: '16px',
            },
            tooltipContainer: {
              textAlign: 'left' as const,
            },
            buttonNext: {
              backgroundColor: '#2563eb',
              fontSize: '14px',
              padding: '10px 20px',
              borderRadius: '6px',
            },
            buttonBack: {
              color: '#6b7280',
              fontSize: '14px',
              padding: '10px 20px',
              marginRight: '10px',
            },
            buttonSkip: {
              color: '#6b7280',
              fontSize: '14px',
              padding: '10px 20px',
            },
          }
        }
        locale={{
          back: 'Previous',
          close: 'Close',
          last: 'Finish',
          next: 'Next',
          skip: 'Skip Tutorial',
        }}
      />
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};
