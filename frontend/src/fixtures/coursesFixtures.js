const coursesFixtures = {
    oneCourse: {
        "id": 1,
        "name": "CS156",
        "schoolAbbrev": "ucsb",
        "term": "F23",
        "startDate": "2023-09-24T12:00:00",
        "endDate": "2023-12-15T12:00:00",
        "githubOrg": "ucsb-cs156-f23",
        "school": {
            "abbrev": "ucsb",
            "name": "UC Santa Barbara",
            "termRegex": ".*",
            "termDescription": "f23",
            "termError": "ucsb"
        }
    },
    threeCourses: [
        { 
            "id": 1,
            "name": "CS156",
            "schoolAbbrev": "ucsb",
            "term": "F23",
            "startDate": "2023-09-24T12:00:00",
            "endDate": "2023-12-15T12:00:00",
            "githubOrg": "ucsb-cs156-f23",
            "school": {
                "abbrev": "ucsb",
                "name": "UC Santa Barbara",
                "termRegex": ".*",
                "termDescription": "f23",
                "termError": "ucsb"
            }
        },
        {
            "id": 2,
            "name": "CS185",
            "schoolAbbrev": "ucsb",
            "term": "W24",
            "startDate": "2024-01-08T12:00:00",
            "endDate": "2024-03-22T12:00:00",
            "githubOrg": "ucsb-cs185-w24",
            "school": {
                "abbrev": "ucsb",
                "name": "UC Santa Barbara",
                "termRegex": ".*",
                "termDescription": "f23",
                "termError": "ucsb"
            }
        },
        {
            "id": 3,
            "name": "CS170",
            "schoolAbbrev": "ucsb",
            "term": "S24",
            "startDate": "2024-04-01T12:00:00",
            "endDate": "2024-06-14T12:00:00",
            "githubOrg": "ucsb-cs170-s24",
            "school": {
                "abbrev": "ucsb",
                "name": "UC Santa Barbara",
                "termRegex": ".*",
                "termDescription": "f23",
                "termError": "ucsb"
            }
        }
    ]
};


export { coursesFixtures };
