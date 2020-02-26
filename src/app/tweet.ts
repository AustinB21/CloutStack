// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface Tweet {
    trends:     Trend[];
    as_of:      string;
    created_at: string;
    locations:  Location[];
}

export interface Location {
    name:  string;
    woeid: number;
}

export interface Trend {
    name:             string;
    url:              string;
    promoted_content: null;
    query:            string;
    tweet_volume:     number | null;
    // from_where:       string;
}
