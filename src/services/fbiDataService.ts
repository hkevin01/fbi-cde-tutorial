// FBI Crime Data Explorer Service
// This service provides mock data and would integrate with actual FBI Crime Data Explorer API

export interface CrimeData {
  year: number;
  state: string;
  violentCrime: number;
  propertyCrime: number;
  population: number;
  agencies?: number;
  murder?: number;
  rape?: number;
  robbery?: number;
  aggravatedAssault?: number;
}

export interface CrimeStatistics {
  totalViolentCrimes: number;
  totalPropertyCrimes: number;
  agenciesReporting: number;
  populationCovered: number;
  crimeRate: number;
  changeFromPrevious: number;
}

export interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

// Mock data that simulates real FBI Crime Data Explorer API responses
const MOCK_CRIME_DATA: CrimeData[] = [
  {
    year: 2023,
    state: 'California',
    violentCrime: 174544,
    propertyCrime: 998654,
    population: 39538223,
    agencies: 730,
    murder: 2301,
    rape: 8923,
    robbery: 58456,
    aggravatedAssault: 104864
  },
  {
    year: 2023,
    state: 'Texas',
    violentCrime: 134623,
    propertyCrime: 789456,
    population: 30097526,
    agencies: 1234,
    murder: 1893,
    rape: 6789,
    robbery: 32456,
    aggravatedAssault: 93485
  },
  {
    year: 2023,
    state: 'Florida',
    violentCrime: 87456,
    propertyCrime: 567890,
    population: 22610726,
    agencies: 567,
    murder: 1234,
    rape: 4567,
    robbery: 23456,
    aggravatedAssault: 58199
  },
  {
    year: 2023,
    state: 'New York',
    violentCrime: 95678,
    propertyCrime: 456789,
    population: 19336776,
    agencies: 456,
    murder: 1456,
    rape: 3789,
    robbery: 34567,
    aggravatedAssault: 55866
  },
  {
    year: 2023,
    state: 'Pennsylvania',
    violentCrime: 45678,
    propertyCrime: 234567,
    population: 12972008,
    agencies: 345,
    murder: 789,
    rape: 2345,
    robbery: 12456,
    aggravatedAssault: 30088
  },
  // Historical data for trend analysis
  {
    year: 2022,
    state: 'California',
    violentCrime: 185432,
    propertyCrime: 1087456,
    population: 39029342,
    agencies: 725
  },
  {
    year: 2021,
    state: 'California',
    violentCrime: 198765,
    propertyCrime: 1156789,
    population: 38648435,
    agencies: 720
  }
];

const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

const CRIME_TYPES = [
  'Violent Crime',
  'Property Crime',
  'Murder',
  'Rape',
  'Robbery',
  'Aggravated Assault',
  'Burglary',
  'Larceny-Theft',
  'Motor Vehicle Theft',
  'Arson'
];

class FBIDataService {
  private baseURL = 'https://api.usa.gov/crime/fbi/cde'; // This would be the actual API URL

  /**
   * Simulates API delay for realistic testing
   */
  private async simulateDelay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get crime data with filtering options
   */
  async getCrimeData(filters: {
    year?: number;
    state?: string;
    crimeType?: string;
    limit?: number;
  } = {}): Promise<APIResponse<CrimeData[]>> {
    await this.simulateDelay(800);

    try {
      let filteredData = [...MOCK_CRIME_DATA];

      if (filters.year) {
        filteredData = filteredData.filter(item => item.year === filters.year);
      }

      if (filters.state && filters.state !== 'All States') {
        filteredData = filteredData.filter(item => item.state === filters.state);
      }

      if (filters.limit) {
        filteredData = filteredData.slice(0, filters.limit);
      }

      return {
        data: filteredData,
        status: 'success',
        pagination: {
          page: 1,
          limit: filters.limit || 50,
          total: filteredData.length
        }
      };
    } catch (error) {
      return {
        data: [],
        status: 'error',
        message: 'Failed to fetch crime data'
      };
    }
  }

  /**
   * Get aggregated crime statistics
   */
  async getCrimeStatistics(year: number = 2023): Promise<APIResponse<CrimeStatistics>> {
    await this.simulateDelay(500);

    try {
      const yearData = MOCK_CRIME_DATA.filter(item => item.year === year);
      const totalViolentCrimes = yearData.reduce((sum, item) => sum + item.violentCrime, 0);
      const totalPropertyCrimes = yearData.reduce((sum, item) => sum + item.propertyCrime, 0);
      const totalPopulation = yearData.reduce((sum, item) => sum + item.population, 0);
      const totalAgencies = yearData.reduce((sum, item) => sum + (item.agencies || 0), 0);

      const stats: CrimeStatistics = {
        totalViolentCrimes,
        totalPropertyCrimes,
        agenciesReporting: totalAgencies,
        populationCovered: totalPopulation,
        crimeRate: ((totalViolentCrimes + totalPropertyCrimes) / totalPopulation) * 100000,
        changeFromPrevious: -5.2 // Mock percentage change
      };

      return {
        data: stats,
        status: 'success'
      };
    } catch (error) {
      return {
        data: {} as CrimeStatistics,
        status: 'error',
        message: 'Failed to fetch crime statistics'
      };
    }
  }

  /**
   * Get list of available states
   */
  getStates(): string[] {
    return STATES;
  }

  /**
   * Get list of available crime types
   */
  getCrimeTypes(): string[] {
    return CRIME_TYPES;
  }

  /**
   * Get available years for data
   */
  getAvailableYears(): number[] {
    return [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];
  }

  /**
   * Search agencies by name or location
   */
  async searchAgencies(query: string): Promise<APIResponse<any[]>> {
    await this.simulateDelay(300);

    // Mock agency search results
    const mockAgencies = [
      { id: '1', name: 'Los Angeles Police Department', state: 'California', type: 'Municipal' },
      { id: '2', name: 'New York City Police Department', state: 'New York', type: 'Municipal' },
      { id: '3', name: 'Chicago Police Department', state: 'Illinois', type: 'Municipal' },
      { id: '4', name: 'Houston Police Department', state: 'Texas', type: 'Municipal' },
      { id: '5', name: 'Phoenix Police Department', state: 'Arizona', type: 'Municipal' }
    ];

    const filtered = mockAgencies.filter(agency =>
      agency.name.toLowerCase().includes(query.toLowerCase()) ||
      agency.state.toLowerCase().includes(query.toLowerCase())
    );

    return {
      data: filtered,
      status: 'success'
    };
  }

  /**
   * Export crime data in various formats
   */
  async exportData(data: CrimeData[], format: 'csv' | 'json' | 'xlsx' = 'csv'): Promise<Blob> {
    await this.simulateDelay(500);

    switch (format) {
      case 'csv':
        const csvContent = this.convertToCSV(data);
        return new Blob([csvContent], { type: 'text/csv' });
      case 'json':
        const jsonContent = JSON.stringify(data, null, 2);
        return new Blob([jsonContent], { type: 'application/json' });
      default:
        throw new Error('Unsupported format');
    }
  }

  /**
   * Convert data to CSV format
   */
  private convertToCSV(data: CrimeData[]): string {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  }

  /**
   * Download file helper
   */
  downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Create and export a singleton instance
export const fbiDataService = new FBIDataService();
export default fbiDataService;
