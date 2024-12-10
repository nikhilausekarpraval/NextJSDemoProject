
import { IApplicationContext, IClaim, IPractice, IRole, IRoleClaim, IUser, IUserClaim, IUserGroup } from "../Interfaces/Interfaces";


export const emptyUser = {
  userName: '', password: "", groupId:0,role:"", practiceId:0, email: "", displayName: "", id: "", phoneNumber: "", question1: "", question2: "", question3: "", answer1: "", answer2: "", answer3: "", newPassword: "",
  confirmPassword: ""
}

export const emptyRole = {
  id:"",name:"",claims:null
}

export const emptyClaim ={
  id:0,claimType:"",claimValue:"",roles:[{id:"",name:""}]
}

export const quenstionsAndAnswers = [{ question1: "answer1" }, { question2: "answer2" }, { question3: "answer3" }]

export const questions = ["What was the name of your first pet?",
  "What was the make and model of your first car?",
  "In what city were you born?",
  "What was your childhood nickname?",
  "What is the name of your favorite teacher?",
  "What is the name of your best friend from childhood?",
  "What is the name of the street you grew up on?",
  "What is your father's middle name?",
  "What was the name of your first school?",
  "What is the name of the company where you got your first job?"]
export const registerUserFormErrors = { email: "",role:"",claim:"",practice:"", group:"", password: "", invalid: "", question1: "", username: "", answer1: "", answer2: "", answer3: "", newPassword: "", confirmPassword: "" ,phoneNumber:""}

export const emptyApplicationContext: IApplicationContext = {
  expiration: "",
  token: '',
  userContext: {
    user: {} as IUser,
    userClaim: {} as IClaim,
    roleClaim: {} as IRoleClaim,
    roles: []
  }
};

export const createRoleErrors = {role:"",claim:""}

export const routes = {

  aboutUser: "/Dashboard/AboutUser",
  addClaimToRole: "/Dashboard/AddClaimToRole",
  addClaimToUser: "/Dashboard/AddClaimToUser",
  addRoleToUser: "/Dashboard/AddRoleToUser",
  createTole: "/Dashboard/CreateRole",
  employee: "/Dashboard/EmployeeDashboard/Employee",
  task: "/Dashboard/EmployeeDashboard/Task",
  home: "/Dashboard/Home",
  user:"/Dashboard/User",
  role:"/Dashboard/Role",
  group:"/Dashboard/Group",
  practice:"/Dashboard/Practice",
  roleClaim:"/Dashboard/RoleClaim",

}



export const pleaseSelectQuestionAndAswer = "Please select question and answer";

export const pleaseSelectDifferentQuestion = "Please select different question";

export const totalQuestions = ["question1", "question2", "question3"];

export const totalAnswers = ["answer1", "answer2", "answer3"];

export const UserColumnConfig = [
  {
    field: "id",
    dataType: "string",
  },
  {
    field: "email",
    dataType: "string",
  },
  {
    field: "displayName",
    dataType: "string",
  },
  {
    field: "userName",
    dataType: "string",
  },
  {
    field: "group",
    dataType: "string",
  },
  {
    field: "name",
    dataType: "string",
  },
  {
    field: "userRole",
    dataType: "string",
  },

];


export const RoleColumnConfig = [
  {
    field: "id",
    dataType: "string",
  },
  {
    field: "name",
    dataType: "string",
  },
  {
    field: "claims",
    dataType: "dropdown,claimType",
  },

];

export const rolesData:IRole[]=[
  {id:"234",name:"Admin", claims:null},
  {id:"234",name:"Manager",claims:null},
  {id:"34",name:"User",claims:null},
]

export const groupsData: IUserGroup[] = [
  { id: 1, name: "Admin",modifiedBy:"", modifiedOnDt:new Date() },
  { id: 2, name: "HR", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 3, name: "User", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 4, name: "IT", modifiedBy: "", modifiedOnDt: new Date() },
];

export const mobileNumberRegex = /^[6-9]\d{9}$/;
export const allow15Numbers = /^\d{0,15}$/;
export const allow15_7Numbers = /^(-?\d{0,15}\.\d{0,7})$/;
export const allowIntegers = /^-?[0-9]*$/;
export const allowNumbers = /(?<=\d)\.|\b\d+\b/;
export const allow10Numbers = /^\d{0,10}$/
export const allowDotAndDash = /^[-.]$/;
export const replaceChracterWithSpace = /[^0-9\-]/g;
export const replaceNumbersWithSpace = /[^0-9\.\-]/g;
export const validString = /^[a-zA-Z]+$/;

export const practicesData: IPractice[] = [
  { id: 1, name: "Software Development", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 2, name: "Quality Assurance", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 3, name: "Project Management", modifiedBy: "", modifiedOnDt: new Date() },
  { id: 4, name: "Business Analysis", modifiedBy: "", modifiedOnDt: new Date() },
];

export const userClaims: IUserClaim[] = [
  {
    userId: "user123",
    claimType: "Role",
    claimValue: "Admin",
    id: 1,
  },
  {
    userId: "user124",
    claimType: "Permission",
    claimValue: "ReadOnly",
    id: 2,
  },
  {
    userId: "user125",
    claimType: "Department",
    claimValue: "Finance",
    id: 3,
  },
  {
    userId: "user126",
    claimType: "Region",
    claimValue: "North America",
    id: 4,
  },
];

export const roleClaims: IRoleClaim[] = [
  {
    roleId: "user123",
    claimType: "Role",
    claimValue: "Admin",
    id : 3,
  },
  {
   roleId: "user124",
    claimType: "Permission",
    claimValue: "ReadOnly",
    id: 2,
  }
];

export const userHeaders = {

  id : "ID",

  email: "Email",

  displayName: "Full Name",

  userName: "User Name",

  Group: "Group",

  Practice : "Practice",

  userRole : "Role",

  ModifiedOnDt: 'Modified On Dt',

  ModifiedBy : 'Modified By',

}

export const roleHeaders = {

  id: "ID",

  name: "Role",

  claims:"Claims",

  ModifiedOnDt: 'Modified On Dt',

  ModifiedBy: 'Modified By',

}

export const roleClaimHeader = {

  id: "ID",

  claimType: "Claim Type",

  claimValue: "Claim Value",

  roles : "Roles",

  ModifiedOnDt: 'Modified On Dt',

  ModifiedBy: 'Modified By',

}


export const roleClaimConfig = [
  {
    field: "id",
    dataType: "number",
  },
  {
    field: "claimType",
    dataType: "string",
  },
  {
    field: "claimValue",
    dataType: "string",
  },
  {
    field: "roles",
    dataType: "dropdown,name",
  },

];