export const Types = {
  GET_COUNTRY_SUMMARY_STATISTICS_REQUEST:
    "subject/GET_COUNTRY_SUMMARY_STATISTICS_REQUEST",
  GET_COUNTRY_SUMMARY_STATISTICS_SUCCESS:
    "subject/GET_COUNTRY_SUMMARY_STATISTICS_SUCCESS",
  GET_COUNTRY_SUMMARY_STATISTICS_ERROR:
    "subject/GET_COUNTRY_SUMMARY_STATISTICS_ERROR",

  GET_COUNTRY_TIMELINE_STATISTICS_REQUEST:
    "subject/GET_COUNTRY_TIMELINE_STATISTICS_REQUEST",
  GET_COUNTRY_TIMELINE_STATISTICS_SUCCESS:
    "subject/GET_COUNTRY_TIMELINE_STATISTICS_SUCCESS",
  GET_COUNTRY_TIMELINE_STATISTICS_ERROR:
    "subject/GET_COUNTRY_TIMELINE_STATISTICS_ERROR",
};

const INITIAL_STATE = {
  summaryData: { data: null, loading: true, error: false },
  timelineData: { data: null, loading: true, error: false },
};

export const Creators = {
  getCountrySummaryStatistics: (country) => ({
    type: Types.GET_COUNTRY_SUMMARY_STATISTICS_REQUEST,
    country,
  }),

  getCountrySummaryStatisticsSuccess: (data) => ({
    type: Types.GET_COUNTRY_SUMMARY_STATISTICS_SUCCESS,
    payload: { data },
  }),

  getCountrySummaryStatisticsFailure: () => ({
    type: Types.GET_COUNTRY_SUMMARY_STATISTICS_ERROR,
  }),

  getCountryTimelineStatistics: (country) => ({
    type: Types.GET_COUNTRY_TIMELINE_STATISTICS_REQUEST,
    country,
  }),

  getCountryTimelineStatisticsSuccess: (data) => ({
    type: Types.GET_COUNTRY_TIMELINE_STATISTICS_SUCCESS,
    payload: { data },
  }),

  getCountryTimelineStatisticsFailure: () => ({
    type: Types.GET_COUNTRY_TIMELINE_STATISTICS_ERROR,
  }),
};

const subject = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_COUNTRY_SUMMARY_STATISTICS_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_COUNTRY_SUMMARY_STATISTICS_SUCCESS:
      return {
        ...state,
        summaryData: { data: payload.data, loading: false, error: false },
      };

    case Types.GET_COUNTRY_SUMMARY_STATISTICS_ERROR:
      return {
        ...state,
        summaryData: { ...state.summaryData.data, loading: false, error: true },
      };

    case Types.GET_COUNTRY_TIMELINE_STATISTICS_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.GET_COUNTRY_TIMELINE_STATISTICS_SUCCESS:
      return {
        ...state,
        timelineData: {
          data: payload.data,
          loading: false,
          error: false,
        },
      };

    case Types.GET_COUNTRY_TIMELINE_STATISTICS_ERROR:
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
