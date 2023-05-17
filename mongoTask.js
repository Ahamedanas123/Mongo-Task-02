db.createCollection("zenclass")


db.zenclass.insertMany([
    {
        "user" : "Ahamed Anas Ali A",
        "codekata" : 150,
        "attendance" : "Present",
        "topics" : "React",
        "topic_date" : new Date("<2020-10-05>"),
        "task_date" : new Date("<2020-10-10>"),
        "tasks" : "Stack Overflow",
        "company_drives" : "CTS",
        "company_drives_date" : new Date("<2020-10-20>"),
        "placement": "Appeared",
        "mentors" : "Sanjay"
    },
    {
        "user" : "Dharsan",
        "codekata" : 200,
        "attendance" : "Present",
        "topics" : "MongoDB",
        "topic_date" : new Date("<2020-10-15>"),
        "task_date" : new Date("<2020-10-16>"),
        "tasks" : "mongo_commands",
        "company_drives" : "TCS",
        "company_drives_date" : new Date("<2020-10-25>"),
        "placement": "Appeared",
        "mentors" : "Raghav"
    },    
    {
        "user" : "Pazhani",
        "codekata" : 175,
        "attendance" : "Present",
        "topics" : "Node_js",
        "topic_date" : new Date("<2020-10-20>"),
        "task_date" : new Date("<2020-10-21>"),
        "tasks" : "create_api",
        "company_drives" : "ZOHO",
        "company_drives_date" : new Date("<2020-10-28>"),
        "placement": "Appeared",
        "mentors" : "Raghav"
    },
    {
        "user" : "Gopi",
        "codekata" : 150,
        "attendance" : "Present",
        "topics" : "HTML",
        "topic_date" : new Date("<2020-10-07>"),
        "task_date" : new Date("<2020-10-09>"),
        "tasks" : "responsive_web_design",
        "company_drives" : "WIPRO",
        "company_drives_date" : new Date("<2020-10-22>"),
        "placement": "Appeared",
        "mentors" : "Magesh"
    },    
    {
        "user" : "Salman",
        "codekata" : 250,
        "attendance" : "Present",
        "topics" : "CSS",
        "topic_date" : new Date("<2020-10-12>"),
        "task_date" : new Date("<2020-10-14>"),
        "tasks" : "responsive_web_design",
        "company_drives" : "ZOHO",
        "company_drives_date" : new Date("<2020-10-28>"),
        "placement": "Appeared",
        "mentors" : "Magesh"
    }, 
    {
        "user" : "Sankar",
        "codekata" : 93,
        "attendance" : "Absent",
        "topics" : "JavaScript",
        "topic_date" : new Date("<2020-10-19>"),
        "task_date" : new Date("<2020-10-23>"),
        "tasks" : "functions",
        "company_drives" : "Cognizant",
        "company_drives_date" : new Date("<2020-10-31>"),
        "placement": "Not_appeared",
        "mentors" : "Rupan"
    },    
    {
        "user" : "Faiza",
        "codekata" : 180,
        "attendance" : "Present",
        "topics" : "React",
        "topic_date" : new Date("<2020-10-05>"),
        "task_date" : new Date("<2020-10-16>"),
        "tasks" : "movie_app",
        "company_drives" : "HCL",
        "company_drives_date" : new Date("<2020-10-20>"),
        "placement": "Appeared",
        "mentors" : "Raghav"
    },
    {
        "user" : "Archana",
        "codekata" : 125,
        "attendance" : "Present",
        "topics" : "CSS",
        "topic_date" : new Date("<2020-10-12>"),
        "task_date" : new Date("<2020-10-20>"),
        "tasks" : "responsive_web_design",
        "company_drives" : "TCS",
        "company_drives_date" : new Date("<2020-10-25>"),
        "placement": "Appeared",
        "mentors" : "Magesh"
    }, 
]);
//Find all the topics and tasks which are thought in the month of October


db.zenclass.find({$or: [{topic_date: {$gte : new Date("<2020-10-01>"),$lte: new Date("<2020-10-31>")}},
{task_date: {$gte : new Date("<2020-10-01>"), $lte: new Date("<2020-10-31>")}}]},{topics: 1, tasks: 1}).toArray();

// Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.zenclass.find({company_drives_date: {$gte : new Date("<2020-10-15>"), $lte: new Date("<2020-10-31>")}},{company_drives: 1}).toArray();

// Find all the company drives and students who are appeared for the placement.
db.zenclass.find({placement: "Appeared"},{ _id: 0,user: 1, company_drives: 1}).toArray();

// Find the number of problems solved by the user in codekata
db.zenclass.find({},{_id: 0,user: 1, codekata: 1}).toArray();

// Find all the mentors with who has the mentee's count more than 15
db.zenclass.aggregate([
    {$group: {_id: "$mentors", count: {$sum: 1}}},
    {$match: {_id: {$ne: null}, count: {$gt: 15}}}
]);
db.zenclass.find({mentors: "Raghav"},{user: 1, mentors: 1});

// Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.zenclass.find({$or: [{attendance: "Absent"}, {task_date: {$not: {$gte: new Date("<2020-10-15>"), $lte: new Date("<2020-10-31>")}}}]});