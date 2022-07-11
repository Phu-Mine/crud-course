import { combineReducers } from 'redux'

import studentsReduicer from '../components/Students/studentSliceReduice';
import coursesReduicer from '../components/courses/coursesSliceReduice';

const reRootReducer = combineReducers({
    students: studentsReduicer,
    courses: coursesReduicer,
})

export default reRootReducer;