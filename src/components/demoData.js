const hospitalData = [
  {
    id: 1,
    name: "City General Hospital",
    address: "123 Main Street, City",
    openTime: "08:00 AM",
    closeTime: "06:00 PM",
    features: ["Urgent Care", "Pediatric Care", "Emergency Services", "Accepts Insurance", "Accepts Self Pay"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 2,
    name: "Central Regional Medical Center",
    address: "456 Elm Avenue, Central",
    openTime: "09:00 AM",
    closeTime: "07:00 PM",
    features: ["Laboratory Services", "Radiology", "Pharmacy", "Accepts Insurance"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 3,
    name: "Westside Community Hospital",
    address: "789 Oak Drive, Westside",
    openTime: "07:30 AM",
    closeTime: "08:30 PM",
    features: ["Urgent Care", "Pediatric Care", "Physical Therapy", "Accepts Insurance", "Accepts Self Pay"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 4,
    name: "Northview General Hospital",
    address: "321 Pine Lane, Northview",
    openTime: "08:00 AM",
    closeTime: "05:00 PM",
    features: ["Pediatric Care", "Maternity Services", "Accepts Insurance"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 5,
    name: "Sunset Medical Center",
    address: "987 Sunset Boulevard, Sunset",
    openTime: "08:30 AM",
    closeTime: "07:30 PM",
    features: ["Pediatric Care", "Pharmacy", "Accepts Insurance", "Accepts Self Pay"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 6,
    name: "East County Hospital",
    address: "654 Maple Street, East County",
    openTime: "07:00 AM",
    closeTime: "06:00 PM",
    features: ["Laboratory Services", "Radiology", "Physical Therapy", "Accepts Self Pay"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 7,
    name: "Southside Medical Center",
    address: "234 Cedar Avenue, Southside",
    openTime: "08:00 AM",
    closeTime: "07:00 PM",
    features: ["Urgent Care", "Pediatric Care", "Emergency Services", "Pharmacy"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 8,
    name: "Lakeview General Hospital",
    address: "876 Lake Road, Lakeview",
    openTime: "09:30 AM",
    closeTime: "08:30 PM",
    features: ["Pediatric Care", "Maternity Services", "Laboratory Services", "Radiology", "Pharmacy", "Accepts Insurance"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 9,
    name: "Riverside Community Hospital",
    address: "543 River Street, Riverside",
    openTime: "07:30 AM",
    closeTime: "06:30 PM",
    features: ["Laboratory Services", "Radiology", "Physical Therapy"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  },
  {
    id: 10,
    name: "Mountainview Medical Center",
    address: "432 Hillside Drive, Mountainview",
    openTime: "08:00 AM",
    closeTime: "05:30 PM",
    features: ["Urgent Care", "Pediatric Care", "Emergency Services", "Accepts Self Pay"],
    image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  }
];

  
export default hospitalData;
  

export const providerData = [
  {
  id: 1,
  name: "City General Hospital",
  address: "123 Main Street, City",
  openTime: "08:00 AM",
    closeTime: "06:00 PM",
    patient: [{
      id: 2,
      name: 'Patient',
      email: '  patient@gmail.com',
      status: ['Reserved', 'Here', 'Ready', 'In Exam', 'Canceled', 'No Show', 'Transfer']
    },{
      id: 22,
      name: 'Duo',
      email: 'Duo@gmail.com',
      status: ['Reserved', 'Here', 'Ready', 'In Exam', 'Canceled', 'No Show', 'Transfer']
    },{
      id: 222,
      name: 'test',
      email: 'test@gmail.com',
      status: ['Reserved', 'Here', 'Ready', 'In Exam', 'Canceled', 'No Show', 'Transfer']
    },{
      id: 2222,
      name: 'john',
      email: 'john@gmail.com',
      status: ['Reserved', 'Here', 'Ready', 'In Exam', 'Canceled', 'No Show', 'Transfer']
    },
    ],
  features: ["Urgent Care", "Pediatric Care", "Emergency Services", "Accepts Insurance", "Accepts Self Pay"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
{
  id: 2,
  name: "Central Regional Medical Center",
  address: "456 Elm Avenue, Central",
  openTime: "09:00 AM",
  closeTime: "07:00 PM",
  features: ["Laboratory Services", "Radiology", "Pharmacy", "Accepts Insurance"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
{
  id: 3,
  name: "Westside Community Hospital",
  address: "789 Oak Drive, Westside",
  openTime: "07:30 AM",
  closeTime: "08:30 PM",
  features: ["Urgent Care", "Pediatric Care", "Physical Therapy", "Accepts Insurance", "Accepts Self Pay"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
{
  id: 4,
  name: "Northview General Hospital",
  address: "321 Pine Lane, Northview",
  openTime: "08:00 AM",
  closeTime: "05:00 PM",
  features: ["Pediatric Care", "Maternity Services", "Accepts Insurance"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
{
  id: 5,
  name: "Sunset Medical Center",
  address: "987 Sunset Boulevard, Sunset",
  openTime: "08:30 AM",
  closeTime: "07:30 PM",
  features: ["Pediatric Care", "Pharmacy", "Accepts Insurance", "Accepts Self Pay"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
{
  id: 6,
  name: "East County Hospital",
  address: "654 Maple Street, East County",
  openTime: "07:00 AM",
  closeTime: "06:00 PM",
  features: ["Laboratory Services", "Radiology", "Physical Therapy", "Accepts Self Pay"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
{
  id: 7,
  name: "Southside Medical Center",
  address: "234 Cedar Avenue, Southside",
  openTime: "08:00 AM",
  closeTime: "07:00 PM",
  features: ["Urgent Care", "Pediatric Care", "Emergency Services", "Pharmacy"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
{
  id: 8,
  name: "Lakeview General Hospital",
  address: "876 Lake Road, Lakeview",
  openTime: "09:30 AM",
  closeTime: "08:30 PM",
  features: ["Pediatric Care", "Maternity Services", "Laboratory Services", "Radiology", "Pharmacy", "Accepts Insurance"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
{
  id: 9,
  name: "Riverside Community Hospital",
  address: "543 River Street, Riverside",
  openTime: "07:30 AM",
  closeTime: "06:30 PM",
  features: ["Laboratory Services", "Radiology", "Physical Therapy"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
},
  {
  
  id: 10,
  name: "Mountainview Medical Center",
  address: "432 Hillside Drive, Mountainview",
  openTime: "08:00 AM",
  closeTime: "05:30 PM",
  features: ["Urgent Care", "Pediatric Care", "Emergency Services", "Accepts Self Pay"],
  image: "https://static.vecteezy.com/system/resources/previews/004/493/181/original/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg"
  }
]

