export const Types = {
  GET_SUMMARY_STATISTICS_REQUEST: "subject/GET_SUMMARY_STATISTICS_REQUEST",
  GET_SUMMARY_STATISTICS_SUCCESS: "subject/GET_SUMMARY_STATISTICS_SUCCESS",
  GET_SUMMARY_STATISTICS_ERROR: "subject/GET_SUMMARY_STATISTICS_ERROR",

  GET_COUNTRIES_STATISTICS_REQUEST: "subject/GET_COUNTRIES_STATISTICS_REQUEST",
  GET_COUNTRIES_STATISTICS_SUCCESS: "subject/GET_COUNTRIES_STATISTICS_SUCCESS",
  GET_COUNTRIES_STATISTICS_ERROR: "subject/GET_COUNTRIES_STATISTICS_ERROR",

  GET_GLOBAL_TIMELINE_STATISTICS_REQUEST:
    "subject/GET_GLOBAL_TIMELINE_STATISTICS_REQUEST",
  GET_GLOBAL_TIMELINE_STATISTICS_SUCCESS:
    "subject/GET_GLOBAL_TIMELINE_STATISTICS_SUCCESS",
  GET_GLOBAL_TIMELINE_STATISTICS_ERROR:
    "subject/GET_GLOBAL_TIMELINE_STATISTICS_ERROR",
};

const INITIAL_STATE = {
  // loading: true,
  // error: false,
  summaryData: { data: null, loading: true, error: false },
  globalTimelineData: { data: null, loading: true, error: false },
  countriesData: { data: null, loading: true, error: false },
};

export const Creators = {
  getSummaryStatictics: () => ({
    type: Types.GET_SUMMARY_STATISTICS_REQUEST,
  }),

  getSummaryStaticticsSuccess: (data) => ({
    type: Types.GET_SUMMARY_STATISTICS_SUCCESS,
    payload: { data },
  }),

  getSummaryStaticticsFailure: () => ({
    type: Types.GET_SUMMARY_STATISTICS_ERROR,
  }),

  getCountriesStatictics: () => ({
    type: Types.GET_COUNTRIES_STATISTICS_REQUEST,
  }),

  getCountriesStaticticsSuccess: (data) => ({
    type: Types.GET_COUNTRIES_STATISTICS_SUCCESS,
    payload: { data },
  }),

  getCountriesStaticticsFailure: () => ({
    type: Types.GET_COUNTRIES_STATISTICS_ERROR,
  }),

  getGlobalTimelineStatistics: () => ({
    type: Types.GET_GLOBAL_TIMELINE_STATISTICS_REQUEST,
  }),

  getGlobalTimelineStatisticsSuccess: (data) => ({
    type: Types.GET_GLOBAL_TIMELINE_STATISTICS_SUCCESS,
    payload: { data },
  }),

  getGlobalTimelineStatisticsFailure: () => ({
    type: Types.GET_GLOBAL_TIMELINE_STATISTICS_ERROR,
  }),
};

const subject = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_SUMMARY_STATISTICS_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_SUMMARY_STATISTICS_SUCCESS:
      return {
        ...state,
        summaryData: { data: payload.data, loading: false, error: false },
      };

    case Types.GET_SUMMARY_STATISTICS_ERROR:
      return {
        ...state,
        summaryData: { ...state.summary, loading: false, error: true },
      };

    case Types.GET_COUNTRIES_STATISTICS_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_COUNTRIES_STATISTICS_SUCCESS:
      return {
        ...state,
        countriesData: { data: payload.data, loading: false, error: false },
      };

    case Types.GET_COUNTRIES_STATISTICS_ERROR:
      return {
        ...state,
        countriesData: { ...state.summary, loading: false, error: true },
      };

    case Types.GET_GLOBAL_TIMELINE_STATISTICS_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_GLOBAL_TIMELINE_STATISTICS_SUCCESS:
      return {
        ...state,
        globalTimelineData: {
          data: payload.data,
          loading: false,
          error: false,
        },
      };

    case Types.GET_GLOBAL_TIMELINE_STATISTICS_ERROR:
      return {
        ...state,
        globalTimelineData: { ...state.summary, loading: false, error: true },
      };

    default:
      return state;
  }
};

export default subject;
