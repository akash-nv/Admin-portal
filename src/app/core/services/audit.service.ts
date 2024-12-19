import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  data = [
    {
      userInfo: {
        userObjId: '123',
        personName: 'Aftab Ahmed',
        userName: 'aftab@csidryeye.com',
        userRole: 'Admin',
        userDepartment: 'Development',
        userTitle: 'Chief Executive Officer',
        userEmail: 'aftab@csidryeye.com',
        userPhone: '+1-202-555-0194',
      },
      auditInfo: {
        action: 'Login success',
        color: 'green',
        entity: 'User',
        entityId: '123',
        auditDateTime: 'May 4, 2023 3:15 PM',
        details:
          'User with objId 123 logged in successfully from IP address 123.123.123.123',
      },
    },
    {
      userInfo: {
        userObjId: '124',
        personName: 'Trudy Sales',
        userName: 'trudy@csidryeye.com',
        userRole: 'Manager',
        userDepartment: 'Sales',
        userTitle: 'Chief Sales Officer',
        userEmail: 'trudy@csidryeye.com',
        userPhone: '+1-202-555-0195',
      },
      auditInfo: {
        action: 'Created',
        color: 'green',
        entity: 'Subscription',
        entityId: '124',
        auditDateTime: 'May 4, 2023 3:15 PM',
        details: 'Subscription with objId 124 created successfully',
      },
    },
    {
      userInfo: {
        userObjId: '124',
        personName: 'Trudy Sales',
        userName: 'trudy@csidryeye.com',
        userRole: 'Manager',
        userDepartment: 'Sales',
        userTitle: 'Chief Sales Officer',
        userEmail: 'trudy@csidryeye.com',
        userPhone: '+1-202-555-0195',
      },
      auditInfo: {
        action: 'Deactivated',
        color: 'red',
        entity: 'Clinic',
        entityId: '898',
        auditDateTime: 'May 4, 2023 3:15 PM',
        details: 'Clinic with objId 898 deactivated successfully',
      },
    },
    {
      userInfo: {
        userObjId: '123',
        personName: 'Aftab Ahmed',
        userName: 'aftab@csidryeye.com',
        userRole: 'Admin',
        userDepartment: 'Development',
        userTitle: 'Chief Executive Officer',
        userEmail: 'aftab@csidryeye.com',
        userPhone: '+1-202-555-0194',
      },
      auditInfo: {
        action: 'Edited',
        color: 'blue',
        entity: 'Ticket',
        entityId: '123',
        auditDateTime: 'May 4, 2023 3:15 PM',
        details: 'Ticket with objId 123 edited successfully',
      },
    },
    {
      userInfo: {
        userObjId: '123',
        personName: 'Aftab Ahmed',
        userName: 'aftab@csidryeye.com',
        userRole: 'Admin',
        userDepartment: 'Development',
        userTitle: 'Chief Executive Officer',
        userEmail: 'aftab@csidryeye.com',
        userPhone: '+1-202-555-0194',
      },
      auditInfo: {
        action: 'Accessed',
        color: 'gray',
        entity: 'Page',
        entityId: 'CRM overview',
        auditDateTime: 'May 4, 2023 3:15 PM',
        details: 'User with objId 123 accessed CRM overview page',
      },
    },
    {
      userInfo: {
        userObjId: '125',
        personName: 'John Doe',
        userName: 'john.doe@company.com',
        userRole: 'Manager',
        userDepartment: 'Finance',
        userTitle: 'Chief Financial Officer',
        userEmail: 'john.doe@company.com',
        userPhone: '+1-202-555-0101',
      },
      auditInfo: {
        action: 'Exported',
        color: 'blue',
        entity: 'Report',
        entityId: '456',
        auditDateTime: 'May 5, 2023 10:30 AM',
        details: 'User with objId 125 exported a financial report',
      },
    },
    {
      userInfo: {
        userObjId: '127',
        personName: 'Michael Smith',
        userName: 'michael.smith@company.com',
        userRole: 'Manager',
        userDepartment: 'IT',
        userTitle: 'Chief Information Officer',
        userEmail: 'michael.smith@company.com',
        userPhone: '+1-202-555-0103',
      },
      auditInfo: {
        action: 'Restarted',
        color: 'orange',
        entity: 'Server',
        entityId: '102',
        auditDateTime: 'May 5, 2023 1:15 PM',
        details: 'Server with ID 102 restarted successfully after maintenance',
      },
    },
    {
      userInfo: {
        userObjId: '128',
        personName: 'Sophia Brown',
        userName: 'sophia.brown@company.com',
        userRole: 'Manager',
        userDepartment: 'Product',
        userTitle: 'Chief Product Officer',
        userEmail: 'sophia.brown@company.com',
        userPhone: '+1-202-555-0104',
      },
      auditInfo: {
        action: 'Edited',
        color: 'blue',
        entity: 'Product',
        entityId: '303',
        auditDateTime: 'May 5, 2023 2:45 PM',
        details: 'Product with ID 303 updated successfully',
      },
    },
    {
      userInfo: {
        userObjId: '129',
        personName: 'Oliver Wilson',
        userName: 'oliver.wilson@company.com',
        userRole: 'Member',
        userDepartment: 'Sales',
        userTitle: 'Sales Representative',
        userEmail: 'oliver.wilson@company.com',
        userPhone: '+1-202-555-0105',
      },
      auditInfo: {
        action: 'Edited',
        color: 'green',
        entity: 'Opportunity',
        entityId: '654',
        auditDateTime: 'May 5, 2023 3:30 PM',
        details: 'Closed deal for opportunity ID 654 worth $50,000',
      },
    },
    {
      userInfo: {
        userObjId: '130',
        personName: 'Liam Johnson',
        userName: 'liam.johnson@company.com',
        userRole: 'Member',
        userDepartment: 'Development',
        userTitle: 'Software Engineer',
        userEmail: 'liam.johnson@company.com',
        userPhone: '+1-202-555-0106',
      },
      auditInfo: {
        action: 'Edited',
        color: 'green',
        entity: 'Ticket',
        entityId: '555',
        auditDateTime: 'May 5, 2023 4:00 PM',
        details: 'Fixed bug with ID 555 affecting API performance',
      },
    },
    {
      userInfo: {
        userObjId: '131',
        personName: 'Isabella Martinez',
        userName: 'isabella.martinez@company.com',
        userRole: 'Member',
        userDepartment: 'Quality Assurance',
        userTitle: 'Quality Assurance Engineer',
        userEmail: 'isabella.martinez@company.com',
        userPhone: '+1-202-555-0107',
      },
      auditInfo: {
        action: 'Created',
        color: 'blue',
        entity: 'Ticket',
        entityId: '787',
        auditDateTime: 'May 5, 2023 4:45 PM',
        details: 'Ran test case ID 787 on staging environment',
      },
    },
  ].sort(
    (a, b) =>
      new Date(b.auditInfo.auditDateTime).getTime() -
      new Date(a.auditInfo.auditDateTime).getTime()
  );

  constructor() {}
}
