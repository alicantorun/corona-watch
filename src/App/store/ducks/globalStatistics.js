export const Types = {
  GET_GLOBAL_SUMMARY_STATISTICS_REQUEST:
    "subject/GET_GLOBAL_SUMMARY_STATISTICS_REQUEST",
  GET_GLOBAL_SUMMARY_STATISTICS_SUCCESS:
    "subject/GET_GLOBAL_SUMMARY_STATISTICS_SUCCESS",
  GET_GLOBAL_SUMMARY_STATISTICS_ERROR:
    "subject/GET_GLOBAL_SUMMARY_STATISTICS_ERROR",

  GET_GLOBAL_COUNTRY_STATISTICS_REQUEST:
    "subject/GET_GLOBAL_COUNTRY_STATISTICS_REQUEST",
  GET_GLOBAL_COUNTRY_STATISTICS_SUCCESS:
    "subject/GET_GLOBAL_COUNTRY_STATISTICS_SUCCESS",
  GET_GLOBAL_COUNTRY_STATISTICS_ERROR:
    "subject/GET_GLOBAL_COUNTRY_STATISTICS_ERROR",

  GET_GLOBAL_TIMELINE_STATISTICS_REQUEST:
    "subject/GET_GLOBAL_TIMELINE_STATISTICS_REQUEST",
  GET_GLOBAL_TIMELINE_STATISTICS_SUCCESS:
    "subject/GET_GLOBAL_TIMELINE_STATISTICS_SUCCESS",
  GET_GLOBAL_TIMELINE_STATISTICS_ERROR:
    "subject/GET_GLOBAL_TIMELINE_STATISTICS_ERROR",
};

const INITIAL_STATE = {
  summaryData: { data: null, loading: true, error: false },
  timelineData: { data: null, loading: true, error: false },
  countryData: { data: null, loading: true, error: false },
};

export const Creators = {
  getGlobalSummaryStatistics: () => ({
    type: Types.GET_GLOBAL_SUMMARY_STATISTICS_REQUEST,
  }),

  getGlobalSummaryStatisticsSuccess: (data) => ({
    type: Types.GET_GLOBAL_SUMMARY_STATISTICS_SUCCESS,
    payload: { data },
  }),

  getGlobalSummaryStatisticsFailure: () => ({
    type: Types.GET_GLOBAL_SUMMARY_STATISTICS_ERROR,
  }),

  getGlobalCountryStatistics: () => ({
    type: Types.GET_GLOBAL_COUNTRY_STATISTICS_REQUEST,
  }),

  getGlobalCountryStatisticsSuccess: (data) => ({
    type: Types.GET_GLOBAL_COUNTRY_STATISTICS_SUCCESS,
    payload: { data },
  }),

  getGlobalCountryStatisticsFailure: () => ({
    type: Types.GET_GLOBAL_COUNTRY_STATISTICS_ERROR,
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
    case Types.GET_GLOBAL_SUMMARY_STATISTICS_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_GLOBAL_SUMMARY_STATISTICS_SUCCESS:
      return {
        ...state,
        summaryData: { data: payload.data, loading: false, error: false },
      };

    case Types.GET_GLOBAL_SUMMARY_STATISTICS_ERROR:
      return {
        ...state,
        summaryData: { ...state.summaryData.data, loading: false, error: true },
      };

    case Types.GET_GLOBAL_COUNTRY_STATISTICS_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_GLOBAL_COUNTRY_STATISTICS_SUCCESS:
      return {
        ...state,
        countryData: { data: payload.data, loading: false, error: false },
      };

    case Types.GET_GLOBAL_COUNTRY_STATISTICS_ERROR:
      return {
        ...state,
        countryData: { ...state.countryData.data, loading: false, error: true },
      };

    case Types.GET_GLOBAL_TIMELINE_STATISTICS_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_GLOBAL_TIMELINE_STATISTICS_SUCCESS:
      return {
        ...state,
        timelineData: {
          data: payload.data,
          loading: false,
          error: false,
        },
      };

    case Types.GET_GLOBAL_TIMELINE_STATISTICS_ERROR:
      return {
        ...state,
        timelineData: {
          ...state.timelineData.data,
          loading: false,
          error: true,
        },
      };

    default:
      return state;
  }
};

export default subject;
