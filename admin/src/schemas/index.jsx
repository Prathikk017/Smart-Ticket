import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

//Signin validation 
export const signInSchema = Yup.object({
  Aname: Yup.string().matches(/[^\s*].*[^\s*]/g, '* This field cannot contain white space and special character').required('Please enter email or phone number'),
  Apassword: Yup.string().required('Please enter password'),
});

//operator registration validation
export const operRegisterSchema = Yup.object({
  OperName: Yup.string().min(2,'Name must be at least 2 characters').max(45,'Name must be at max 25 characters').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain white space and special character').required('Please enter company name'),
  OperShortName: Yup.string().min(2,'Name must be at least 2 characters').max(25,'Name must be at max 25 characters').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain white space and special character').required('Please enter short name'),
  OperEmail: Yup.string().email('Enter valid email').required('Please enter company email'),
  OperPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').max(10,'Phone number must be equal to 10').required('Please enter your phone number'),
  OperGSTIN: Yup.string().max(15,'GST no must be 15 characters').matches(/^[a-zA-Z0-9]+$/, '* This field cannot contain white space and special character').required('Please enter GST number'),
  OperAddr1: Yup.string().required('Please enter Address'),
  OperAddr2: Yup.string().required('Please enter Address'),
  OperPassword: Yup.string().min(
    8,'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
  ).matches(/[a-zA-Z]/, 'Password can only contain Latin letters.').required('Password is required'),
  OperCity: Yup.string().required('Please enter city'),
  OperPincode: Yup.string().max(6,'Pincode must be equal to 6.').required('Please enter pincode'),
  OperContactName:  Yup.string().matches(/[^\s*].*[^\s*]/g, '* This field cannot contain white space and special character').min(4,'Name must be at least 4 characters').max(25,'Name must be at max 25 characters').required('please enter contact name'),
  OperContactEmail:  Yup.string().email('Enter valid email').required('Please enter your email'),
});

//employee registration validation
const aadharRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const empRegisterSchema = Yup.object({
  EmpName: Yup.string().min(2,'Name must be at least 2 characters').max(25,'Name must be at max 25 characters').matches(/[^\s*].*[^\s*]/g, '* This field cannot contain white space and special character').required('Please enter empolyee name'),
  EmpIntId: Yup.string().min(4,'Name must be at least 4 characters').max(15,'Name must be at max 15 characters').matches(/^[a-zA-Z0-9]+$/, '* This field cannot contain white space and special character').required('Please enter employee id'),
  EmpPhone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').max(10,'Phone number must be equal to 10').required('Please enter phone number'),
  EmpAadhar: Yup.string().matches(aadharRegExp, 'Aadhar number is not valid').max(12,'Aadhar number must be equal to 12').required('Please enter aadhar number'),
  EmpPassword: Yup.string().min(
    8,'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
  ).matches(/[a-zA-Z]/, 'Password can only contain Latin letters.').required('Password is required'),
  EmpAddr1: Yup.string().required('Please enter Address'),
  EmpAddr2: Yup.string().required('Please enter Address'), 
  EmpCity: Yup.string().required('Please enter city'),
  EmpPincode: Yup.string().max(6,'Pincode must be equal to 6.').required('Please enter pincode')
})
