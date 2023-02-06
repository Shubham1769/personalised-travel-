export interface TripStop {
  placeId: string;
}

export enum TRIP_TYPE {
  MARRIED_KIDS = 'married_kids',
  MARRIED_WO_KIDS = 'married_wo_kids',
  UNMARRIED = 'unmarried',
  FRIENDS = 'friends',
  ELDERS = 'elders',
}

export const TRIP_TYPE_TO_BUDGET = {
  [TRIP_TYPE.MARRIED_KIDS]: {
    min: 2,
    max: 4,
  },
  [TRIP_TYPE.MARRIED_WO_KIDS]: {
    min: 2,
    max: 4,
  },
  [TRIP_TYPE.UNMARRIED]: {
    min: 1,
    max: 2,
  },
  [TRIP_TYPE.FRIENDS]: {
    min: 2,
    max: 3,
  },
  [TRIP_TYPE.ELDERS]: {
    min: 2,
    max: 3,
  },
};

export interface TripBudget {
  min: number;
  max: number;
}
