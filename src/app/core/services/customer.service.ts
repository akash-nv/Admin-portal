import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
   data = [
    {
      "mainDoctor": "Dr. Al-Ghoul",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "active",
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrghoul.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrghoul.com"
      },
      "paidClinicCount": 4,
      "unpaidClinicCount": 21,
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "csiMainDocObjId": "123",
      "dateDeleted": ""
    },
    {
      "mainDoctor": "Dr. Hash Patel",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Implementation",
            "severity": "High",
            "title": "Pending activation",
            "message": "Clinic X is pending activation for customer Dr. Hash Patel."
          }
        ],
        "dateChecked": "May 1, 2023"
      },
      "status": "pending",
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "seema@csidrghoul.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrghoul.com"
      },
      "paidClinicCount": 0,
      "unpaidClinicCount": 1,
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "csiMainDocObjId": "555",
      "dateDeleted": ""
    },
        {
      "mainDoctor": "Dr. Laser Sharp",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Billing",
            "severity": "High",
            "title": "Overdue payment",
            "message": "Clinic X has an overdue payment of $1000 as of Nov 8, 2024."
          },
          {
            "category": "Support",
            "severity": "Medium",
            "title": "Unresolved support tickets",
            "message": "Customer has 4 unresolved support tickets as of Nov 8, 2024."
          }
        ],
        "dateChecked": "Nov 11, 2024"
      },
      "status": "active",
      "contactInfo": {
        "address": "456 Main St, Anytown, USA",
        "phone": "+1-333-444-5555",
          "email": "info@csidrsharp.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrsharp.com"
      },
      "paidClinicCount": 2,
      "unpaidClinicCount": 0,
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "csiMainDocObjId": "124",
      "dateDeleted": ""
    },
    {
      "mainDoctor": "Dr. Swift Douche",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "inactive",
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrswift.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrswift.com"
      },
      "paidClinicCount": 0,
      "unpaidClinicCount": 1,
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "csiMainDocObjId": "125",
      "dateDeleted": ""
    },
    {
      "mainDoctor": "Dr. Danny Morrison",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Usage",
            "severity": "High",
            "title": "Sharp increase",
            "message": "Clinic X usage has increased sharply over the last 7 days."
          },
          {
            "category": "Security",
            "severity": "High",
            "title": "Unauthorized login attempts",
            "message": "Clinic X has 12 unauthorized login attempts over the last 7 days."
          }
        ],
        "dateChecked": "May 4, 2023"
      },
      "status": "active",
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrdanny.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrdanny.com"
      },
      "paidClinicCount": 1,
      "unpaidClinicCount": 0,
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "csiMainDocObjId": "126",
      "dateDeleted": ""
    },
    {
      "mainDoctor": "Dr. Old Monk",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "deleted",
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrmonk.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrmonk.com"
      },
      "paidClinicCount": 0,
      "unpaidClinicCount": 2,
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "csiMainDocObjId": "127",
      "dateDeleted": "2024-11-12"
    },
    {
      "mainDoctor": "Dr. Stone Heart",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "Aug 15, 2023"
      },
      "status": "active",
      "contactInfo": {
        "address": "789 Elm St, Anytown, USA",
        "phone": "+1-555-111-2222",
        "email": "info@csidrstone.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrstone.com"
      },
      "paidClinicCount": 3,
      "unpaidClinicCount": 5,
      "dateCreated": "2023-08-10",
      "dateModified": "2023-08-10",
      "csiMainDocObjId": "128",
      "dateDeleted": ""
    },
    {
      "mainDoctor": "Dr. Pearl White",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Billing",
            "severity": "High",
            "title": "Outstanding invoice",
            "message": "Clinic Y has an outstanding invoice of $800 as of Oct 15, 2024."
          },
          {
            "category": "Compliance",
            "severity": "Medium",
            "title": "Compliance review overdue",
            "message": "Clinic Y has not completed the annual compliance review."
          }
        ],
        "dateChecked": "Oct 20, 2024"
      },
      "status": "active",
      "contactInfo": {
        "address": "101 Maple St, Anytown, USA",
        "phone": "+1-555-333-4444",
        "email": "info@csidrpearl.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrpearl.com"
      },
      "paidClinicCount": 1,
      "unpaidClinicCount": 3,
      "dateCreated": "2023-08-10",
      "dateModified": "2023-08-10",
      "csiMainDocObjId": "129",
      "dateDeleted": ""
    },
    {
      "mainDoctor": "Dr. Amber Rose",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "Jul 20, 2023"
      },
      "status": "inactive",
      "contactInfo": {
        "address": "456 Oak St, Anytown, USA",
        "phone": "+1-555-666-7777",
        "email": "info@csidrrose.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrrose.com"
      },
      "paidClinicCount": 0,
      "unpaidClinicCount": 7,
      "dateCreated": "2023-07-15",
      "dateModified": "2023-07-15",
      "csiMainDocObjId": "130",
      "dateDeleted": ""
    },
    {
      "mainDoctor": "Dr. Alex Crane",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Security",
            "severity": "High",
            "title": "Multiple unauthorized access attempts",
            "message": "Clinic Z has 20 unauthorized access attempts in the past month."
          },
          {
            "category": "Usage",
            "severity": "Low",
            "title": "Usage decline",
            "message": "Clinic Z's usage has decreased by 15% over the last month."
          }
        ],
        "dateChecked": "Oct 1, 2024"
      },
      "status": "active",
      "contactInfo": {
        "address": "123 Birch St, Anytown, USA",
        "phone": "+1-555-888-9999",
        "email": "info@csidrcrane.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrcrane.com"
      },
      "paidClinicCount": 4,
      "unpaidClinicCount": 0,
      "dateCreated": "2023-07-15",
      "dateModified": "2023-07-15",
      "csiMainDocObjId": "131",
      "dateDeleted": ""
    },
    {
      "mainDoctor": "Dr. Ivy Steele",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "Jun 10, 2023"
      },
      "status": "deleted",
      "contactInfo": {
        "address": "789 Cedar St, Anytown, USA",
        "phone": "+1-555-222-3333",
        "email": "info@csidrsteele.com",
        "fax": "+1-202-555-0194",
        "website": "https://www.csidrsteele.com"
      },
      "paidClinicCount": 2,
      "unpaidClinicCount": 1,
      "dateCreated": "2023-06-05",
      "dateModified": "2023-06-05",
      "csiMainDocObjId": "132",
      "dateDeleted": "2024-11-10"
    }
  ]

  clinicData = [
    {
      "clinicName": "Clarity Laser Vision",
      "mainUser": "Dr. Al-Ghoul",
      "customerName": "Dr. Al-Ghoul",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "active",
      "billing": {
        "planId": "1",
        "plan": "Core plan (customer level)",
        "planCode": "CS-CORE-PLAN",
        "price": "$499 / month",
        "discount": "$100 / month",
        "billedAmount": "$399 / month",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "fax": "+1-202-555-0194",
        "email": "info@csidrghoul.com",
        "website": "https://www.csidrghoul.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "123"
    },
    {
      "clinicName": "Clinic of Dr. Hash Patel",
      "mainUser": "Dr. Hash Patel",
      "customerName": "Dr. Hash Patel",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Implementation",
            "severity": "High",
            "title": "Pending activation",
            "message": "Clinic X is pending activation for customer Dr. Hash Patel."
          }
        ],
        "dateChecked": "May 4, 2023"
      },
      "status": "pending",
      "billing": {
        "planId": "0",
        "plan": "Free plan (customer level)",
        "planCode": "CS-FREE-PLAN",
        "price": "Free",
        "discount": "0",
        "billedAmount": "Free",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": false},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": false},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": false}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "fax": "+1-202-555-0194",
        "email": "info@csidrhash.com",
        "website": "https://www.csidrhash.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "999"
    },
    {
      "clinicName": "Sharp Vision Center",
      "mainUser": "Dr. Laser Sharp",
      "customerName": "Dr. Laser Sharp",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Billing",
            "severity": "High",
            "title": "Overdue payment",
            "message": "Clinic X has an overdue payment of $1000 as of Nov 8, 2024."
          },
          {
            "category": "Support",
            "severity": "Medium",
            "title": "Unresolved support tickets",
            "message": "Clinic X has 4 unresolved support tickets as of Nov 8, 2024."
          }
        ],
        "dateChecked": "Nov 11, 2024"
      },
      "status": "active",
      "billing": {
        "planId": "1",
        "plan": "Core plan (customer level)",
        "planCode": "CS-CORE-PLAN",
        "price": "$499 / month",
        "discount": "$100 / month",
        "billedAmount": "$399 / month",
        "startDate": "Jan 2025",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "456 Main St, Anytown, USA",
        "phone": "+1-333-444-5555",
        "fax": "+1-333-444-5555",
        "email": "info@csidrsharp.com",
        "website": "https://www.csidrsharp.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "124"
    },
    {
      "clinicName": "Focus Optometry",
      "mainUser": "Dr. Swift Douche",
      "customerName": "Dr. Swift Douche",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "inactive",
      "billing": {
        "planId": "0",
        "plan": "Free plan (customer level)",
        "planCode": "CS-FREE-PLAN",
        "price": "Free",
        "discount": "0",
        "billedAmount": "Free",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrswift.com",
        "website": "https://www.csidrswift.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "125"
    },
    {
      "clinicName": "Morrison Eye Clinic",
      "mainUser": "Dr. Danny Morrison",
      "customerName": "Dr. Danny Morrison",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Usage",
            "severity": "High",
            "title": "Sharp increase",
            "message": "Clinic X usage has increased sharply over the last 7 days."
          },
          {
            "category": "Security",
            "severity": "High",
            "title": "Unauthorized login attempts",
            "message": "Clinic X has 12 unauthorized login attempts over the last 7 days."
          }
        ],
        "dateChecked": "May 4, 2023"
      },
      "status": "active",
      "billing": {
        "planId": "2",
        "plan": "Advanced plan (customer level)",
        "planCode": "CS-ADV-PLAN",
        "price": "$999 / month",
        "discount": "$200 / month",
        "billedAmount": "$799 / month",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrdanny.com",
        "website": "https://www.csidrdanny.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "126"
    },
    {
      "clinicName": "Farsighted Eye Clinic",
      "mainUser": "Dr. Old Monk",
      "customerName": "Dr. Old Monk",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "deleted",
      "billing": {
        "planId": "0",
        "plan": "Free plan (customer level)",
        "planCode": "CS-FREE-PLAN",
        "price": "Free",
        "discount": "0",
        "billedAmount": "Free",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrmonk.com",
        "website": "https://www.csidrmonk.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "2024-11-12",
      "csiClinicObjId": "127"
    },
    {
      "clinicName": "Seema Eye Care Center",
      "mainUser": "Dr. Al-Ghoul",
      "customerName": "Dr. Al-Ghoul",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "active",
      "billing": {
        "planId": "1",
        "plan": "Core plan (customer level)",
        "planCode": "CS-CORE-PLAN",
        "price": "$499 / month",
        "discount": "$200 / month",
        "billedAmount": "$299 / month",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "fax": "+1-202-555-0194",
        "email": "info@csidrghoul.com",
        "website": "https://www.csidrghoul.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "128"
    },
    {
      "clinicName": "Sharp Vision Center of Edmonton",
      "mainUser": "Dr. Laser Sharp",
      "customerName": "Dr. Laser Sharp",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Billing",
            "severity": "High",
            "title": "Overdue payment",
            "message": "Clinic X has an overdue payment of $1000 as of Nov 8, 2024."
          },
          {
            "category": "Support",
            "severity": "Medium",
            "title": "Unresolved support tickets",
            "message": "Clinic X has 4 unresolved support tickets as of Nov 8, 2024."
          }
        ],
        "dateChecked": "Nov 11, 2024"
      },
      "status": "active",
      "billing": {
        "planId": "1",
        "plan": "Core plan (customer level)",
        "planCode": "CS-CORE-PLAN",
        "price": "$499 / month",
        "discount": "$200 / month",
        "billedAmount": "$299 / month",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "456 Main St, Anytown, USA",
        "phone": "+1-333-444-5555",
        "fax": "+1-333-444-5555",
        "email": "info@csidrsharp.com",
        "website": "https://www.csidrsharp.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "129"
    },
    {
      "clinicName": "Focus Optometry Calgary West",
      "mainUser": "Dr. Swift Douche",
      "customerName": "Dr. Swift Douche",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "inactive",
      "billing": {
        "planId": "0",
        "plan": "Free plan (customer level)",
        "planCode": "CS-FREE-PLAN",
        "price": "Free",
        "discount": "0",
        "billedAmount": "Free",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrswift.com",
        "website": "https://www.csidrswift.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "130"
    },
    {
      "clinicName": "Morrison Eye Clinic Airdrie",
      "mainUser": "Dr. Danny Morrison",
      "customerName": "Dr. Danny Morrison",
      "csiSense": {
        "strValue": "Needs attention",
        "attentionItems": [
          {
            "category": "Usage",
            "severity": "High",
            "title": "Sharp increase",
            "message": "Clinic X usage has increased sharply over the last 7 days."
          },
          {
            "category": "Security",
            "severity": "High",
            "title": "Unauthorized login attempts",
            "message": "Clinic X has 12 unauthorized login attempts over the last 7 days."
          }
        ],
        "dateChecked": "May 4, 2023"
      },
      "status": "active",
      "billing": {
        "planId": "2",
        "plan": "Advanced plan (customer level)",
        "planCode": "CS-ADV-PLAN",
        "price": "$999 / month",
        "discount": "$200 / month",
        "billedAmount": "$799 / month",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
        "email": "info@csidrdanny.com",
        "website": "https://www.csidrdanny.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "",
      "csiClinicObjId": "131"
    },
    {
      "clinicName": "Farsighted Eye Clinic Airdrie",
      "mainUser": "Dr. Old Monk",
        "customerName": "Dr. Old Monk",
      "csiSense": {
        "strValue": "Normal",
        "attentionItems": [],
        "dateChecked": "May 4, 2023"
      },
      "status": "deleted",
      "billing": {
        "planId": "0",
        "plan": "Free plan (customer level)",
        "planCode": "CS-FREE-PLAN",
        "price": "Free",
        "discount": "0",
        "billedAmount": "Free",
        "startDate": "Jan 2023",
        "endDate": "Dec 2025"
      },
      "subscription": [
        {"moduleId": "1", "moduleName": "Dry Eye Portal", "moduleCode":"CS-DRY-PORTAL", "isEnabled": true},
        {"moduleId": "2", "moduleName": "Referral Portal", "moduleCode":"CS-REF-PORTAL", "isEnabled": true},
        {"moduleId": "3", "moduleName": "Analytics", "moduleCode":"CS-ANALYTICS", "isEnabled": true},
        {"moduleId": "4", "moduleName": "Patient App", "moduleCode":"CS-PATIENT-APP", "isEnabled": true}
      ],
      "contactInfo": {
        "address": "123 Main St, Anytown, USA",
        "phone": "+1-202-555-0194",
          "email": "info@csidrmonk.com",
        "website": "https://www.csidrmonk.com"
      },
      "dateCreated": "2023-05-04",
      "dateModified": "2023-05-04",
      "dateDeleted": "2024-11-12",
      "csiClinicObjId": "132"
    }
  ].sort((a, b) => {
    if (a.customerName.toLowerCase() < b.customerName.toLowerCase()) return -1;
    if (a.customerName.toLowerCase() > b.customerName.toLowerCase()) return 1;
    return b.dateCreated.localeCompare(a.dateCreated);
  });
  // sort clinicData first by customerName ASC, then by dateCreated DESC

  getCustomers(limit: number, skip: number, search: string): Observable<any> {
    const str = `${environment.api_url}users?limit=${limit}&skip=${skip}`;
    const searchSTR = `${environment.api_url}users/search?q=${search}&limit=${limit}&skip=${skip}`;
    return this.http.get<any>(search ? searchSTR : str).pipe(map((res) => {
      return res;
    }))
  }

  addCustomer(data: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}users/add`, data)
  }

  updateCustomer(data: any, id: string): Observable<any> {
    return this.http.put<any>(`${environment.api_url}users/${id}`, data)
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}users/${id}`)
  }
}
