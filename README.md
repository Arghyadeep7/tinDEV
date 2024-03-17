
Account Database Schema:
{
    id: objectID,
    fname: string,
    lname: string,
    email: string,
    password: string,
    dob: date,
    gender: string,
    nationality: string,
    address: string,
    pincode: number,
    college: string,
    university: string,
    roll: string,
    course: string,
    ctype: string,
    specialisation: string,
    duration: number,
    grad: number,
    cstatus: string,
    education: [
        {
            id: number,
            institute: string,
            course: string,
            specialisation: string,
            from: number,
            to: number,
            grade: string"
        }
    ],
    work: [
        {
            id: number,
            firm: string,
            position: string,
            from: date,
            to: string,
        },
    ],
    projects: [
        {
            id: number,
            name: string,
            about: string,
            tech: string,
            repo: string,
            deployed: string,
        },
    ],
    skills: [
        {
            id: string,
            name: string,
            rating: number,
        }
    ],
    certifications: [
        {
            id: number,
            org: string,
            name: string,
            issued: date,
            expiry: string,
            link: string,
        },
    ],
    links: [
        {
            id: number,
            url: string,
        }
    ]
}


Hackathon Projects Schema:
{
    id: objectID,
    name: string,
    organiser: string,
    date: date,
    about: string,
    members: number,
    cost: number,
    repo: string,
    deployed: string,
    mustTech: [
        {
            id: number,
            name: string,
            rating: number,
        },
    ],
    prefTech: [
        {
            id: number,
            name: string,
            rating: number,
        },
    ],
    mustTech: [
        {
            id: number,
            name: string,
        },
    ],
    links: [
        {
            id: number,
            url: string
        }
    ]
}