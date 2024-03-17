

Account Database:
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
    roll: number,
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
